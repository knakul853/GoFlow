package server

import (
	"fmt"
	"sync"
	"strings"
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
	fmt.Printf("[Server] Starting goroutine stream for new client\n")
	updates := make(chan interface{}, 100)
	clientID := time.Now().String()

	// Register client
	s.clientsMu.Lock()
	s.clients["goroutine_"+clientID] = append(s.clients["goroutine_"+clientID], updates)
	s.clientsMu.Unlock()

	fmt.Printf("[Server] Client registered with ID: goroutine_%s\n", clientID)

	defer func() {
		fmt.Printf("[Server] Cleaning up goroutine stream for client: %s\n", clientID)
		s.clientsMu.Lock()
		delete(s.clients, "goroutine_"+clientID)
		s.clientsMu.Unlock()
		close(updates)
	}()

	// Send initial state
	initialGoroutines := s.goroutineTracker.GetAllGoroutines()
	fmt.Printf("[Server] Sending initial state: %d goroutines\n", len(initialGoroutines))
	
	for _, info := range initialGoroutines {
		update := &proto.GoroutineUpdate{
			Id:           info.ID,
			State:        info.State,
			FunctionName: info.Function,
			CreatedAt:    info.CreatedAt.Unix(),
			ParentId:     info.ParentID,
			Stack:        info.Stack,
		}
		fmt.Printf("[Server] Sending goroutine update - ID: %d, Function: %s, State: %s\n", 
			info.ID, info.Function, info.State)
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
			fmt.Printf("[Server] Streaming goroutine update - ID: %d, Function: %s, State: %s\n", 
				info.ID, info.Function, info.State)
			if err := stream.Send(protoUpdate); err != nil {
				return s.handleError(err, "Failed to send goroutine update")
			}
		}
	}

	return nil
}

// StreamChannels implements the StreamChannels RPC method
func (s *GoFlowServer) StreamChannels(req *proto.StreamRequest, stream proto.GoFlowService_StreamChannelsServer) error {
	fmt.Printf("[Server] Starting channel stream for new client\n")
	updates := make(chan interface{}, 100)
	clientID := time.Now().String()

	// Register client
	s.clientsMu.Lock()
	s.clients["channel_"+clientID] = append(s.clients["channel_"+clientID], updates)
	s.clientsMu.Unlock()

	fmt.Printf("[Server] Client registered with ID: channel_%s\n", clientID)

	defer func() {
		fmt.Printf("[Server] Cleaning up channel stream for client: %s\n", clientID)
		s.clientsMu.Lock()
		delete(s.clients, "channel_"+clientID)
		s.clientsMu.Unlock()
		close(updates)
	}()

	// Send initial state
	initialChannels := s.channelMonitor.GetAllChannels()
	fmt.Printf("[Server] Sending initial state: %d channels\n", len(initialChannels))
	
	for _, info := range initialChannels {
		update := &proto.ChannelUpdate{
			Id:         info.ID,
			BufferSize: int32(info.BufferSize),
			IsClosed:   info.Closed,
		}
		fmt.Printf("[Server] Sending channel update - ID: %d, BufferSize: %d, IsClosed: %v\n", 
			info.ID, info.BufferSize, info.Closed)
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
			fmt.Printf("[Server] Streaming channel update - ID: %d, BufferSize: %d, IsClosed: %v\n", 
				info.ID, info.BufferSize, info.Closed)
			if err := stream.Send(protoUpdate); err != nil {
				return s.handleError(err, "Failed to send channel update")
			}
		}
	}

	return nil
}

// StreamDeadlocks implements the StreamDeadlocks RPC method
func (s *GoFlowServer) StreamDeadlocks(req *proto.StreamRequest, stream proto.GoFlowService_StreamDeadlocksServer) error {
	fmt.Printf("[Server] Starting deadlock stream for new client\n")
	updates := make(chan interface{}, 100)
	clientID := time.Now().String()

	// Register client
	s.clientsMu.Lock()
	s.clients["deadlock_"+clientID] = append(s.clients["deadlock_"+clientID], updates)
	s.clientsMu.Unlock()

	fmt.Printf("[Server] Client registered with ID: deadlock_%s\n", clientID)

	defer func() {
		fmt.Printf("[Server] Cleaning up deadlock stream for client: %s\n", clientID)
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
			fmt.Printf("[Server] Streaming deadlock alert - DetectedAt: %d, CycleDetails: %s, InvolvedGoroutines: %v, InvolvedChannels: %v\n", 
				info.DetectedAt.Unix(), info.CycleDetails, involvedGoroutines, involvedChannels)
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

	// Send update to all goroutine clients
	for clientID, channels := range s.clients {
		if strings.HasPrefix(clientID, "goroutine_") {
			for _, ch := range channels {
				select {
				case ch <- info:
					fmt.Printf("[Server] Sent goroutine update to client %s\n", clientID)
				default:
					fmt.Printf("[Server] Warning: Goroutine buffer full for client %s\n", clientID)
				}
			}
		}
	}
}

// handleChannelUpdate handles channel update events
func (s *GoFlowServer) handleChannelUpdate(event runtime.ChannelEvent) {
	fmt.Printf("[Server] Channel Event - ID: %d, Operation: %s, Goroutine: %d, Timestamp: %v\n",
		event.ChannelID, event.Operation, event.GoroutineID, event.Timestamp)
	
	s.clientsMu.RLock()
	defer s.clientsMu.RUnlock()

	for clientID, channels := range s.clients {
		if strings.HasPrefix(clientID, "channel_") {
			for _, ch := range channels {
				select {
				case ch <- event:
					fmt.Printf("[Server] Sent channel event to client %s\n", clientID)
				default:
					fmt.Printf("[Server] Warning: Channel buffer full for client %s\n", clientID)
				}
			}
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
