package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/knakul853/goflow/api/proto"
	"github.com/knakul853/goflow/pkg/runtime"
	"google.golang.org/grpc"
)

var tracker *runtime.GoroutineTracker
var monitor *runtime.ChannelMonitor

func init() {
	tracker = runtime.NewGoroutineTracker()
	monitor = runtime.NewChannelMonitor()

	log.Println("Starting goroutine tracker...")
	tracker.Start()

	// Add callback to monitor for debugging
	monitor.Subscribe(func(event runtime.ChannelEvent) {
		log.Printf("[DEBUG] Channel Event: ID=%d, Operation=%s\n", event.ChannelID, event.Operation)
	})
}

func worker(id int, done chan bool) {
	fmt.Printf("Worker %d starting\n", id)
	time.Sleep(time.Second)
	fmt.Printf("Worker %d done\n", id)
	done <- true
}

func spawnWorkers(n int) {
	done := make(chan bool, n) // Make it buffered to avoid blocking

	// Spawn n workers
	for i := 0; i < n; i++ {
		go worker(i, done)
	}

	// Wait for all workers to finish
	for i := 0; i < n; i++ {
		<-done
	}
}

// Test scenarios
func runGoroutineTest(wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println("Starting goroutine test...")

	// Create a channel for communication
	ch := make(chan string)
	chID := uint64(1)
	monitor.RegisterChannel(chID, 0) // Unbuffered channel
	log.Printf("[DEBUG] Registered channel %d\n", chID)

	// Spawn workers
	go spawnWorkers(3)

	// Spawn message sender
	go func() {
		for i := 0; i < 5; i++ {
			event := runtime.ChannelEvent{
				ChannelID:   chID,
				Operation:   runtime.Send,
				GoroutineID: uint64(i),
				Timestamp:   time.Now(),
			}
			log.Printf("[DEBUG] Sending event: %+v\n", event)
			monitor.RecordEvent(event)
			ch <- fmt.Sprintf("Message %d", i)
			time.Sleep(500 * time.Millisecond)
		}
		close(ch)
		event := runtime.ChannelEvent{
			ChannelID: chID,
			Operation: runtime.Close,
			Timestamp: time.Now(),
		}
		log.Printf("[DEBUG] Channel close event: %+v\n", event)
		monitor.RecordEvent(event)
	}()

	// Read messages
	for msg := range ch {
		event := runtime.ChannelEvent{
			ChannelID: chID,
			Operation: runtime.Receive,
			Timestamp: time.Now(),
		}
		log.Printf("[DEBUG] Receive event: %+v\n", event)
		monitor.RecordEvent(event)
		fmt.Println("Received:", msg)
	}

	time.Sleep(2 * time.Second)
}

func runChannelTest(wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println("Starting channel test...")

	ch := make(chan int, 2)
	chID := uint64(2)
	monitor.RegisterChannel(chID, 2) // Buffered channel with size 2
	log.Printf("[DEBUG] Registered buffered channel %d\n", chID)

	// Producer
	go func() {
		for i := 0; i < 5; i++ {
			event := runtime.ChannelEvent{
				ChannelID:   chID,
				Operation:   runtime.Send,
				GoroutineID: uint64(i),
				Timestamp:   time.Now(),
			}
			log.Printf("[DEBUG] Producer sending event: %+v\n", event)
			monitor.RecordEvent(event)
			ch <- i
			time.Sleep(500 * time.Millisecond)
		}
		close(ch)
		event := runtime.ChannelEvent{
			ChannelID: chID,
			Operation: runtime.Close,
			Timestamp: time.Now(),
		}
		log.Printf("[DEBUG] Channel close event: %+v\n", event)
		monitor.RecordEvent(event)
	}()

	// Consumer
	go func() {
		for val := range ch {
			event := runtime.ChannelEvent{
				ChannelID: chID,
				Operation: runtime.Receive,
				Timestamp: time.Now(),
			}
			log.Printf("[DEBUG] Consumer received event: %+v\n", event)
			monitor.RecordEvent(event)
			fmt.Printf("Received: %d\n", val)
			time.Sleep(1 * time.Second)
		}
	}()

	time.Sleep(5 * time.Second)
}

func runDeadlockTest(wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println("Starting deadlock test...")

	ch1 := make(chan int)
	ch2 := make(chan int)

	ch1ID := uint64(3)
	ch2ID := uint64(4)
	monitor.RegisterChannel(ch1ID, 0) // Unbuffered channels
	monitor.RegisterChannel(ch2ID, 0)
	log.Printf("[DEBUG] Registered deadlock test channels %d, %d\n", ch1ID, ch2ID)

	// Create a potential deadlock
	go func() {
		select {
		case <-ch1:
			event1 := runtime.ChannelEvent{
				ChannelID: ch1ID,
				Operation: runtime.Receive,
				Timestamp: time.Now(),
			}
			log.Printf("[DEBUG] Deadlock test receive event: %+v\n", event1)
			monitor.RecordEvent(event1)

			event2 := runtime.ChannelEvent{
				ChannelID: ch2ID,
				Operation: runtime.Send,
				Timestamp: time.Now(),
			}
			log.Printf("[DEBUG] Deadlock test send event: %+v\n", event2)
			monitor.RecordEvent(event2)
			ch2 <- 1
		case <-time.After(3 * time.Second):
			fmt.Println("Timeout in goroutine 1")
		}
	}()

	go func() {
		select {
		case <-ch2:
			event1 := runtime.ChannelEvent{
				ChannelID: ch2ID,
				Operation: runtime.Receive,
				Timestamp: time.Now(),
			}
			log.Printf("[DEBUG] Deadlock test receive event: %+v\n", event1)
			monitor.RecordEvent(event1)

			event2 := runtime.ChannelEvent{
				ChannelID: ch1ID,
				Operation: runtime.Send,
				Timestamp: time.Now(),
			}
			log.Printf("[DEBUG] Deadlock test send event: %+v\n", event2)
			monitor.RecordEvent(event2)
			ch1 <- 1
		case <-time.After(3 * time.Second):
			fmt.Println("Timeout in goroutine 2")
		}
	}()

	time.Sleep(5 * time.Second)
}

func main() {
	log.Println("Starting GoFlow client...")

	// Connect to the GoFlow server
	conn, err := grpc.Dial("localhost:50053",
		grpc.WithInsecure(),
		grpc.WithDefaultCallOptions(grpc.MaxCallRecvMsgSize(1024*1024*50)), // 50MB
		grpc.WithDefaultCallOptions(grpc.MaxCallSendMsgSize(1024*1024*50)), // 50MB
	)
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()
	log.Println("Connected to GoFlow server")

	// Create client
	client := proto.NewGoFlowServiceClient(conn)

	// Start streaming goroutines
	streamGoroutines, err := client.StreamGoroutines(context.Background(), &proto.StreamRequest{})
	if err != nil {
		log.Fatalf("Failed to stream goroutines: %v", err)
	}
	log.Println("Started goroutine stream")

	// Start streaming channels
	streamChannels, err := client.StreamChannels(context.Background(), &proto.StreamRequest{})
	if err != nil {
		log.Fatalf("Failed to stream channels: %v", err)
	}
	log.Println("Started channel stream")

	// Start streaming deadlocks
	streamDeadlocks, err := client.StreamDeadlocks(context.Background(), &proto.StreamRequest{})
	if err != nil {
		log.Fatalf("Failed to stream deadlocks: %v", err)
	}
	log.Println("Started deadlock stream")

	// Start receiving updates in background
	go func() {
		for {
			update, err := streamGoroutines.Recv()
			if err != nil {
				log.Printf("Goroutine stream error: %v", err)
				return
			}
			log.Printf("[DEBUG] Goroutine Update: %+v\n", update)
		}
	}()

	go func() {
		for {
			update, err := streamChannels.Recv()
			if err != nil {
				log.Printf("Channel stream error: %v", err)
				return
			}
			log.Printf("[DEBUG] Channel Update: %+v\n", update)
		}
	}()

	go func() {
		for {
			update, err := streamDeadlocks.Recv()
			if err != nil {
				log.Printf("Deadlock stream error: %v", err)
				return
			}
			log.Printf("[DEBUG] Deadlock Update: %+v\n", update)
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

	// Keep the program running
	select {}
}
