package analyzer

import (
	"sync"
	"testing"
	"time"
)

func TestRaceDetection(t *testing.T) {
	detector := NewRaceDetector()

	// Test case 1: Simple race condition between read and write
	t.Run("Read-Write Race", func(t *testing.T) {
		detector.Reset()
		addr := uintptr(0x1234)

		// Simulate concurrent read and write
		hasRace := detector.TrackMemoryAccess(addr, false, 1) // Read from goroutine 1
		if hasRace {
			t.Error("Unexpected race condition detected")
		}

		hasRace = detector.TrackMemoryAccess(addr, true, 2) // Write from goroutine 2
		if !hasRace {
			t.Error("Failed to detect race condition")
		}
	})

	// Test case 2: Multiple readers (no race)
	t.Run("Multiple Readers", func(t *testing.T) {
		detector.Reset()
		addr := uintptr(0x5678)

		// Multiple reads should not cause a race
		hasRace := detector.TrackMemoryAccess(addr, false, 1)
		if hasRace {
			t.Error("False race detection with first reader")
		}

		hasRace = detector.TrackMemoryAccess(addr, false, 2)
		if hasRace {
			t.Error("False race detection with second reader")
		}
	})

	// Test case 3: Write after write race
	t.Run("Write-Write Race", func(t *testing.T) {
		detector.Reset()
		addr := uintptr(0x9ABC)

		hasRace := detector.TrackMemoryAccess(addr, true, 1)
		if hasRace {
			t.Error("Unexpected race condition detected")
		}

		// Immediate write from different goroutine should detect race
		hasRace = detector.TrackMemoryAccess(addr, true, 2)
		if !hasRace {
			t.Error("Failed to detect write-write race")
		}
	})

	// Test case 4: Real concurrent access
	t.Run("Real Concurrent Access", func(t *testing.T) {
		detector.Reset()
		addr := uintptr(0xDEF0)
		var wg sync.WaitGroup
		racesDetected := 0
		var mu sync.Mutex

		for i := uint64(1); i <= 5; i++ {
			wg.Add(1)
			go func(routineID uint64) {
				defer wg.Add(-1)
				time.Sleep(time.Millisecond * time.Duration(routineID*10))
				if detector.TrackMemoryAccess(addr, true, routineID) {
					mu.Lock()
					racesDetected++
					mu.Unlock()
				}
			}(i)
		}

		wg.Wait()
		if racesDetected == 0 {
			t.Error("No races detected in concurrent access scenario")
		}
	})

	// Test case 5: Check contention info
	t.Run("Contention Info", func(t *testing.T) {
		detector.Reset()
		addr := uintptr(0xFEDC)

		detector.TrackMemoryAccess(addr, true, 1)  // First write
		time.Sleep(time.Millisecond)
		detector.TrackMemoryAccess(addr, false, 2) // Read from different goroutine
		time.Sleep(time.Millisecond)
		detector.TrackMemoryAccess(addr, true, 1)  // Write from first goroutine

		info := detector.GetContentionInfo()
		if len(info) == 0 {
			t.Error("Expected contention info to be non-empty")
		}

		if contentionData, exists := info[addr]; exists {
			if contentionData.AccessCount < 3 {
				t.Error("Incorrect access count in contention info")
			}
			if contentionData.WriteRoutine != 1 {
				t.Error("Incorrect last write routine in contention info")
			}
			if contentionData.ReadRoutines != 1 {
				t.Error("Incorrect number of read routines")
			}
		} else {
			t.Error("Expected address not found in contention info")
		}
	})
}
