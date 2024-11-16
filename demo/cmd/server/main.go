package main

import (
	"log"
	"net"

	"github.com/knakul853/goflow/api/proto"
	"github.com/knakul853/goflow/pkg/analyzer"
	"github.com/knakul853/goflow/pkg/runtime"
	"github.com/knakul853/goflow/pkg/server"
	"google.golang.org/grpc"
)

func main() {
	// Initialize components
	goroutineTracker := runtime.NewGoroutineTracker()
	channelMonitor := runtime.NewChannelMonitor()
	deadlockDetector := analyzer.NewDeadlockDetector(goroutineTracker, channelMonitor)

	// Create and start the server
	goflowServer := server.NewGoFlowServer(goroutineTracker, channelMonitor, deadlockDetector)

	// Start monitoring components
	goroutineTracker.Start()
	deadlockDetector.Start()

	// Create gRPC server
	grpcServer := grpc.NewServer()
	proto.RegisterGoFlowServiceServer(grpcServer, goflowServer)

	// Listen on port 50051
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	log.Println("GoFlow server started on :50052")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
