package main

import (
	"flag"
	"fmt"
	"log"
	"net"

	"github.com/knakul853/goflow/api/proto"
	"github.com/knakul853/goflow/pkg/analyzer"
	"github.com/knakul853/goflow/pkg/runtime"
	"github.com/knakul853/goflow/pkg/server"
	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

func main() {
	flag.Parse()

	// Initialize components
	goroutineTracker := runtime.NewGoroutineTracker()
	channelMonitor := runtime.NewChannelMonitor()
	deadlockDetector := analyzer.NewDeadlockDetector(goroutineTracker, channelMonitor)

	// Start monitoring
	goroutineTracker.Start()
	deadlockDetector.Start()

	// Create gRPC server
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	goflowServer := server.NewGoFlowServer(goroutineTracker, channelMonitor, deadlockDetector)
	proto.RegisterGoFlowServiceServer(s, goflowServer)

	log.Printf("GoFlow server listening on port %d", *port)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
