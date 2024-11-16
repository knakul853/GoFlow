package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/knakul853/goflow/api/proto"
	"google.golang.org/grpc"
)

// Test scenarios
func runGoroutineTest(wg *sync.WaitGroup) {
	defer wg.Done()
	// Create multiple goroutines with different states
	for i := 0; i < 5; i++ {
		go func(id int) {
			time.Sleep(time.Duration(id) * time.Second)
		}(i)
	}
	time.Sleep(2 * time.Second)
}

func runChannelTest(wg *sync.WaitGroup) {
	defer wg.Done()
	ch := make(chan int, 2)
	
	// Producer
	go func() {
		for i := 0; i < 5; i++ {
			ch <- i
			time.Sleep(500 * time.Millisecond)
		}
		close(ch)
	}()

	// Consumer
	go func() {
		for val := range ch {
			fmt.Printf("Received: %d\n", val)
			time.Sleep(1 * time.Second)
		}
	}()

	time.Sleep(5 * time.Second)
}

func runDeadlockTest(wg *sync.WaitGroup) {
	defer wg.Done()
	ch1 := make(chan int)
	ch2 := make(chan int)

	// Create a potential deadlock
	go func() {
		select {
		case <-ch1:
			ch2 <- 1
		case <-time.After(3 * time.Second):
			fmt.Println("Timeout in goroutine 1")
		}
	}()

	go func() {
		select {
		case <-ch2:
			ch1 <- 1
		case <-time.After(3 * time.Second):
			fmt.Println("Timeout in goroutine 2")
		}
	}()

	time.Sleep(5 * time.Second)
}

func main() {
	// Connect to the GoFlow server
	conn, err := grpc.Dial("localhost:50052", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	// Create client
	client := proto.NewGoFlowServiceClient(conn)

	// Start streaming goroutines
	streamGoroutines, err := client.StreamGoroutines(context.Background(), &proto.StreamRequest{})
	if err != nil {
		log.Fatalf("Failed to stream goroutines: %v", err)
	}

	// Start streaming channels
	streamChannels, err := client.StreamChannels(context.Background(), &proto.StreamRequest{})
	if err != nil {
		log.Fatalf("Failed to stream channels: %v", err)
	}

	// Start streaming deadlocks
	streamDeadlocks, err := client.StreamDeadlocks(context.Background(), &proto.StreamRequest{})
	if err != nil {
		log.Fatalf("Failed to stream deadlocks: %v", err)
	}

	// Start receiving updates in background
	go func() {
		for {
			update, err := streamGoroutines.Recv()
			if err != nil {
				log.Printf("Goroutine stream error: %v", err)
				return
			}
			fmt.Printf("Goroutine Update: %+v\n", update)
		}
	}()

	go func() {
		for {
			update, err := streamChannels.Recv()
			if err != nil {
				log.Printf("Channel stream error: %v", err)
				return
			}
			fmt.Printf("Channel Update: %+v\n", update)
		}
	}()

	go func() {
		for {
			update, err := streamDeadlocks.Recv()
			if err != nil {
				log.Printf("Deadlock stream error: %v", err)
				return
			}
			fmt.Printf("Deadlock Update: %+v\n", update)
		}
	}()

	// Run test scenarios
	var wg sync.WaitGroup
	wg.Add(3)

	fmt.Println("\nRunning Goroutine Test...")
	go runGoroutineTest(&wg)

	fmt.Println("\nRunning Channel Test...")
	go runChannelTest(&wg)

	fmt.Println("\nRunning Deadlock Test...")
	go runDeadlockTest(&wg)

	// Wait for all tests to complete
	wg.Wait()
	fmt.Println("\nAll tests completed!")
}
