package runtime

import (
	"fmt"
	"runtime"
	"strings"
	"sync"
	"time"
)

// GoroutineInfo represents the state and metadata of a goroutine
type GoroutineInfo struct {
	ID        uint64
	State     string
	CreatedAt time.Time
	Function  string
	ParentID  uint64
	Stack     []byte
}

// GoroutineTracker manages goroutine monitoring and state tracking
type GoroutineTracker struct {
	mu        sync.RWMutex
	routines  map[uint64]*GoroutineInfo
	callbacks []func(GoroutineInfo)
}

// NewGoroutineTracker creates a new instance of GoroutineTracker
func NewGoroutineTracker() *GoroutineTracker {
	return &GoroutineTracker{
		routines: make(map[uint64]*GoroutineInfo),
	}
}

// Start begins monitoring goroutines
func (gt *GoroutineTracker) Start() {
	go gt.monitor()
}

// OnGoroutineUpdate registers a callback for goroutine state changes
func (gt *GoroutineTracker) OnGoroutineUpdate(callback func(GoroutineInfo)) {
	gt.mu.Lock()
	defer gt.mu.Unlock()
	gt.callbacks = append(gt.callbacks, callback)
}

// monitor continuously tracks goroutine states
func (gt *GoroutineTracker) monitor() {
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		gt.updateGoroutines()
	}
}

// updateGoroutines updates the state of all goroutines
func (gt *GoroutineTracker) updateGoroutines() {
	gt.mu.Lock()
	defer gt.mu.Unlock()

	// Get current goroutines
	buf := make([]byte, 10000)
	n := runtime.Stack(buf, true)
	stackStr := string(buf[:n])

	// Parse the stack data to extract goroutine information
	currentRoutines := make(map[uint64]bool)
	
	// Basic parsing of runtime.Stack output
	// Format is typically:
	// goroutine 1 [running]:
	// main.main()
	//   /path/to/file.go:line
	
	stackLines := strings.Split(stackStr, "\n")
	var currentID uint64
	var currentState string
	var currentFunc string
	
	for _, line := range stackLines {
		if strings.HasPrefix(line, "goroutine ") {
			// Parse goroutine header line
			var stateStr string
			_, err := fmt.Sscanf(line, "goroutine %d [%s]:", &currentID, &stateStr)
			if err == nil {
				currentState = strings.Trim(stateStr, "[]")
				currentRoutines[currentID] = true
				
				// Create or update goroutine info
				info, exists := gt.routines[currentID]
				if !exists {
					info = &GoroutineInfo{
						ID:        currentID,
						CreatedAt: time.Now(),
					}
					gt.routines[currentID] = info
				}
				
				info.State = currentState
				info.Stack = []byte(line)
			}
		} else if strings.Contains(line, "(") {
			// Parse function name
			currentFunc = strings.TrimSpace(strings.Split(line, "(")[0])
			if info, exists := gt.routines[currentID]; exists {
				info.Function = currentFunc
			}
		}
	}
	
	// Remove information about goroutines that no longer exist
	for id := range gt.routines {
		if !currentRoutines[id] {
			delete(gt.routines, id)
		}
	}
	
	// Notify callbacks about updates
	for _, info := range gt.routines {
		for _, callback := range gt.callbacks {
			callback(*info)
		}
	}
}

// GetGoroutineInfo returns information about a specific goroutine
func (gt *GoroutineTracker) GetGoroutineInfo(id uint64) (*GoroutineInfo, bool) {
	gt.mu.RLock()
	defer gt.mu.RUnlock()
	info, exists := gt.routines[id]
	return info, exists
}

// GetAllGoroutines returns information about all tracked goroutines
func (gt *GoroutineTracker) GetAllGoroutines() []GoroutineInfo {
	gt.mu.RLock()
	defer gt.mu.RUnlock()
	
	routines := make([]GoroutineInfo, 0, len(gt.routines))
	for _, info := range gt.routines {
		routines = append(routines, *info)
	}
	return routines
}
