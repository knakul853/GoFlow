package analyzer

import (
	"sync"
	"sync/atomic"
	"time"
)

// RaceDetector tracks memory access patterns to detect potential race conditions
type RaceDetector struct {
	mu sync.RWMutex
	// Track memory locations and their access patterns
	memoryAccesses map[uintptr]*AccessInfo
	// Track active goroutines
	activeGoroutines map[uint64]bool
}

// AccessInfo stores information about memory access patterns
type AccessInfo struct {
	lastWrite     time.Time
	lastRead      time.Time
	writeRoutine  uint64
	readRoutines  map[uint64]time.Time
	accessCount   int64
	isContended   bool
}

// NewRaceDetector creates a new race condition detector
func NewRaceDetector() *RaceDetector {
	return &RaceDetector{
		memoryAccesses:   make(map[uintptr]*AccessInfo),
		activeGoroutines: make(map[uint64]bool),
	}
}

// TrackMemoryAccess records a memory access operation
func (rd *RaceDetector) TrackMemoryAccess(addr uintptr, isWrite bool, goroutineID uint64) bool {
	rd.mu.Lock()
	defer rd.mu.Unlock()

	info, exists := rd.memoryAccesses[addr]
	if !exists {
		info = &AccessInfo{
			readRoutines: make(map[uint64]time.Time),
		}
		rd.memoryAccesses[addr] = info
	}

	now := time.Now()
	atomic.AddInt64(&info.accessCount, 1)

	// Check for potential race conditions
	if isWrite {
		// Write after Read check
		for routineID, lastRead := range info.readRoutines {
			if routineID != goroutineID && now.Sub(lastRead) < time.Millisecond*100 {
				info.isContended = true
				return true // Race detected
			}
		}

		// Write after Write check
		if info.writeRoutine != 0 && info.writeRoutine != goroutineID {
			if now.Sub(info.lastWrite) < time.Millisecond*100 {
				info.isContended = true
				return true // Race detected
			}
		}

		info.lastWrite = now
		info.writeRoutine = goroutineID
	} else {
		// Read after Write check
		if info.writeRoutine != 0 && info.writeRoutine != goroutineID {
			if now.Sub(info.lastWrite) < time.Millisecond*100 {
				info.isContended = true
				info.readRoutines[goroutineID] = now
				return true // Race detected
			}
		}
		info.readRoutines[goroutineID] = now
		info.lastRead = now
	}

	return false
}

// GetContentionInfo returns information about memory contention
func (rd *RaceDetector) GetContentionInfo() map[uintptr]ContentionInfo {
	rd.mu.RLock()
	defer rd.mu.RUnlock()

	result := make(map[uintptr]ContentionInfo)
	for addr, info := range rd.memoryAccesses {
		if info.isContended {
			result[addr] = ContentionInfo{
				AccessCount:   atomic.LoadInt64(&info.accessCount),
				LastWrite:     info.lastWrite,
				WriteRoutine:  info.writeRoutine,
				ReadRoutines:  len(info.readRoutines),
			}
		}
	}
	return result
}

// ContentionInfo provides information about memory contention
type ContentionInfo struct {
	AccessCount   int64
	LastWrite     time.Time
	WriteRoutine  uint64
	ReadRoutines  int
}

// Reset clears all tracking information
func (rd *RaceDetector) Reset() {
	rd.mu.Lock()
	defer rd.mu.Unlock()
	
	rd.memoryAccesses = make(map[uintptr]*AccessInfo)
	rd.activeGoroutines = make(map[uint64]bool)
}
