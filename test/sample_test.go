package test

import (
	"testing"
	"time"
)

func TestDeadlockDetection(t *testing.T) {
	ch1 := make(chan int)
	ch2 := make(chan int)

	// Create a potential deadlock situation
	go func() {
		ch1 <- 1
		<-ch2
	}()

	go func() {
		ch2 <- 1
		<-ch1
	}()

	// Wait for deadlock detection
	time.Sleep(2 * time.Second)
}

func TestChannelCommunication(t *testing.T) {
	ch := make(chan string)

	go func() {
		ch <- "test message"
	}()

	select {
	case msg := <-ch:
		if msg != "test message" {
			t.Errorf("Expected 'test message', got %s", msg)
		}
	case <-time.After(1 * time.Second):
		t.Error("Timeout waiting for channel communication")
	}
}

func TestGoroutineLifecycle(t *testing.T) {
	done := make(chan bool)

	go func() {
		time.Sleep(100 * time.Millisecond)
		done <- true
	}()

	select {
	case <-done:
		// Success
	case <-time.After(1 * time.Second):
		t.Error("Goroutine did not complete in time")
	}
}
