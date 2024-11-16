package server

import (
	"fmt"
	"sync"
	"time"

	"github.com/knakul853/goflow/api/proto"
	"github.com/knakul853/goflow/pkg/analyzer"
	"github.com/knakul853/goflow/pkg/errors"
	"github.com/knakul853/goflow/pkg/runtime"
	"github.com/knakul853/goflow/pkg/storage"
)

// GoFlowServer implements the GoFlow gRPC service
type GoFlowServer struct {
	proto.UnimplementedGoFlowServiceServer
	goroutineTracker *runtime.GoroutineTracker
	channelMonitor   *runtime.ChannelMonitor
	deadlockDetector *analyzer.DeadlockDetector
	clientsMu        sync.RWMutex
	clients          map[string][]chan interface{}
	sessionStore     *storage.SessionStore
	debugServer      *DebugServer
}

// NewGoFlowServer creates a new instance of GoFlowServer
func NewGoFlowServer(gt *runtime.GoroutineTracker, cm *runtime.ChannelMonitor, dd *analyzer.DeadlockDetector) *GoFlowServer {
	server := &GoFlowServer{
		goroutineTracker: gt,
		channelMonitor:   cm,
		deadlockDetector: dd,
		clients:          make(map[string][]chan interface{}),
		sessionStore:     storage.NewSessionStore(),
		debugServer:      NewDebugServer(6060), // Start pprof on port 6060
	}

	// Set up event handlers
	gt.OnGoroutineUpdate(server.handleGoroutineUpdate)
	cm.Subscribe(server.handleChannelUpdate)

	// Start debug server
	go func() {
		if err := server.debugServer.Start(); err != nil {
			// Log error but don't crash the server
			fmt.Printf("Debug server error: %v\n", err)
		}
	}()

	// Start session cleanup
	go server.cleanupSessions()

	return server
}

// StreamGoroutines implements the StreamGoroutines RPC method
func (s *GoFlowServer) StreamGoroutines(req *proto.StreamRequest, stream proto.GoFlowService_StreamGoroutinesServer) error {
	updates := make(chan interface{}, 100)
	clientID := time.Now().String() // Simple unique ID

	// Register client
	s.clientsMu.Lock()
	s.clients["goroutine_"+clientID] = append(s.clients["goroutine_"+clientID], updates)
	s.clientsMu.Unlock()

	defer func() {
		// Cleanup on disconnect
		s.clientsMu.Lock()
		delete(s.clients, "goroutine_"+clientID)
		s.clientsMu.Unlock()
		close(updates)
	}()

	// Send initial state
	for _, info := range s.goroutineTracker.GetAllGoroutines() {
		update := &proto.GoroutineUpdate{
			Id:           info.ID,
			State:        info.State,
			FunctionName: info.Function,
			CreatedAt:    info.CreatedAt.Unix(),
			ParentId:     info.ParentID,
			Stack:        info.Stack,
		}
		if err := stream.Send(update); err != nil {
			return s.handleError(err, "Failed to send goroutine update")
		}
	}

	// Stream updates
	for update := range updates {
		if info, ok := update.(runtime.GoroutineInfo); ok {
			protoUpdate := &proto.GoroutineUpdate{
				Id:           info.ID,
				State:        info.State,
				FunctionName: info.Function,
				CreatedAt:    info.CreatedAt.Unix(),
				ParentId:     info.ParentID,
				Stack:        info.Stack,
			}
			if err := stream.Send(protoUpdate); err != nil {
				return s.handleError(err, "Failed to send goroutine update")
			}
		}
	}

	return nil
}

// StreamChannels implements the StreamChannels RPC method
func (s *GoFlowServer) StreamChannels(req *proto.StreamRequest, stream proto.GoFlowService_StreamChannelsServer) error {
	updates := make(chan interface{}, 100)
	clientID := time.Now().String()

	// Register client
	s.clientsMu.Lock()
	s.clients["channel_"+clientID] = append(s.clients["channel_"+clientID], updates)
	s.clientsMu.Unlock()

	defer func() {
		s.clientsMu.Lock()
		delete(s.clients, "channel_"+clientID)
		s.clientsMu.Unlock()
		close(updates)
	}()

	// Send initial state
	for _, info := range s.channelMonitor.GetAllChannels() {
		update := &proto.ChannelUpdate{
			Id:         info.ID,
			BufferSize: int32(info.BufferSize),
			IsClosed:   info.Closed,
		}
		if err := stream.Send(update); err != nil {
			return s.handleError(err, "Failed to send channel update")
		}
	}

	// Stream updates
	for update := range updates {
		if info, ok := update.(runtime.ChannelInfo); ok {
			protoUpdate := &proto.ChannelUpdate{
				Id:         info.ID,
				BufferSize: int32(info.BufferSize),
				IsClosed:   info.Closed,
			}
			if err := stream.Send(protoUpdate); err != nil {
				return s.handleError(err, "Failed to send channel update")
			}
		}
	}

	return nil
}

// StreamDeadlocks implements the StreamDeadlocks RPC method
func (s *GoFlowServer) StreamDeadlocks(req *proto.StreamRequest, stream proto.GoFlowService_StreamDeadlocksServer) error {
	updates := make(chan interface{}, 100)
	clientID := time.Now().String()

	// Register client
	s.clientsMu.Lock()
	s.clients["deadlock_"+clientID] = append(s.clients["deadlock_"+clientID], updates)
	s.clientsMu.Unlock()

	defer func() {
		s.clientsMu.Lock()
		delete(s.clients, "deadlock_"+clientID)
		s.clientsMu.Unlock()
		close(updates)
	}()

	// Stream deadlock alerts
	for update := range updates {
		if info, ok := update.(analyzer.DeadlockInfo); ok {
			var involvedGoroutines []uint64
			for _, g := range info.Goroutines {
				involvedGoroutines = append(involvedGoroutines, g.ID)
			}

			var involvedChannels []uint64
			for _, c := range info.Channels {
				involvedChannels = append(involvedChannels, c.ID)
			}

			alert := &proto.DeadlockAlert{
				DetectedAt:         info.DetectedAt.Unix(),
				CycleDetails:       info.CycleDetails,
				InvolvedGoroutines: involvedGoroutines,
				InvolvedChannels:   involvedChannels,
			}
			if err := stream.Send(alert); err != nil {
				return s.handleError(err, "Failed to send deadlock alert")
			}
		}
	}

	return nil
}

// handleGoroutineUpdate handles goroutine update events
func (s *GoFlowServer) handleGoroutineUpdate(info runtime.GoroutineInfo) {
	s.clientsMu.RLock()
	defer s.clientsMu.RUnlock()

	for _, client := range s.clients["goroutine_"+time.Now().String()] {
		select {
		case client <- info:
		default:
			// Skip if client buffer is full
		}
	}
}

// handleChannelUpdate handles channel update events
func (s *GoFlowServer) handleChannelUpdate(event runtime.ChannelEvent) {
	s.clientsMu.RLock()
	defer s.clientsMu.RUnlock()

	info, exists := s.channelMonitor.GetChannelInfo(event.ChannelID)
	if !exists {
		return
	}

	for _, client := range s.clients["channel_"+time.Now().String()] {
		select {
		case client <- *info:
		default:
			// Skip if client buffer is full
		}
	}
}

// cleanupSessions periodically removes expired sessions
func (s *GoFlowServer) cleanupSessions() {
	ticker := time.NewTicker(10 * time.Minute)
	for range ticker.C {
		s.sessionStore.CleanupExpiredSessions(30 * time.Minute)
	}
}

// handleError wraps errors with stack trace and context
func (s *GoFlowServer) handleError(err error, message string) error {
	if err == nil {
		return nil
	}
	return errors.Wrap(err, message)
}
