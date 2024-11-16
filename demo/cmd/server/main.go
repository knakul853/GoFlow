package main

import (
	"log"
	"net"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/knakul853/goflow/api/proto"
	"github.com/knakul853/goflow/pkg/analyzer"
	"github.com/knakul853/goflow/pkg/runtime"
	"github.com/knakul853/goflow/pkg/server"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/grpc/keepalive"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Expose-Headers", "*")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Max-Age", "86400")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	log.Println("Initializing GoFlow server components...")

	// Initialize components
	goroutineTracker := runtime.NewGoroutineTracker()
	channelMonitor := runtime.NewChannelMonitor()
	deadlockDetector := analyzer.NewDeadlockDetector(goroutineTracker, channelMonitor)

	log.Println("Creating GoFlow server...")
	goflowServer := server.NewGoFlowServer(goroutineTracker, channelMonitor, deadlockDetector)

	// Create gRPC server with reflection enabled
	grpcServer := grpc.NewServer(
		grpc.MaxRecvMsgSize(1024*1024*50), // 50MB
		grpc.MaxSendMsgSize(1024*1024*50), // 50MB
		grpc.KeepaliveParams(keepalive.ServerParameters{
			MaxConnectionIdle:     time.Minute * 5,
			MaxConnectionAge:      time.Hour * 4,
			MaxConnectionAgeGrace: time.Second * 20,
			Time:                 time.Second * 10,
			Timeout:             time.Second * 20,
		}),
		grpc.KeepaliveEnforcementPolicy(keepalive.EnforcementPolicy{
			MinTime:             time.Second * 5,
			PermitWithoutStream: true,
		}),
	)
	proto.RegisterGoFlowServiceServer(grpcServer, goflowServer)
	reflection.Register(grpcServer)

	// Create gRPC-Web wrapper
	wrappedGrpc := grpcweb.WrapServer(grpcServer,
		grpcweb.WithOriginFunc(func(origin string) bool {
			log.Printf("Checking origin: %s", origin)
			return origin == "http://localhost:3000"
		}),
		grpcweb.WithWebsockets(true),
		grpcweb.WithWebsocketPingInterval(time.Second*5),
		grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool {
			origin := req.Header.Get("Origin")
			log.Printf("Checking WebSocket origin: %s", origin)
			return origin == "http://localhost:3000"
		}),
		grpcweb.WithAllowNonRootResource(true),
	)

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request: %s %s from %s", r.Method, r.URL.Path, r.Header.Get("Origin"))
		log.Printf("Headers: %v", r.Header)

		// Set CORS headers
		origin := r.Header.Get("Origin")
		if origin == "" {
			origin = "http://localhost:3000"
		}
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-User-Agent, X-Grpc-Web, X-Client-Type, X-Client-Version, X-Request-Time, X-Stream-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Handle WebSocket
		if websocket.IsWebSocketUpgrade(r) {
			log.Printf("WebSocket upgrade request detected for path: %s", r.URL.Path)
			
			// Check if it's a gRPC-Web WebSocket request
			if wrappedGrpc.IsGrpcWebSocketRequest(r) {
				log.Printf("Valid gRPC-Web WebSocket request")
				w.Header().Set("Sec-WebSocket-Protocol", "grpc-websockets")
				w.Header().Set("Connection", "Upgrade")
				w.Header().Set("Upgrade", "websocket")
			}
		}

		wrappedGrpc.ServeHTTP(w, r)
	})

	// Start monitoring components
	log.Println("Starting monitoring components...")
	goroutineTracker.Start()
	deadlockDetector.Start()

	// Start gRPC server (for Go clients)
	grpcListener, err := net.Listen("tcp", ":50053")
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}
	go func() {
		log.Printf("Starting gRPC server on :50053...")
		if err := grpcServer.Serve(grpcListener); err != nil {
			log.Fatalf("Failed to serve gRPC: %v", err)
		}
	}()

	// Start gRPC-Web server
	log.Printf("Starting gRPC-Web server on :8080...")
	httpServer := &http.Server{
		Addr:              ":8080",
		Handler:           handler,
		ReadHeaderTimeout: 60 * time.Second,
		WriteTimeout:      60 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatalf("Failed to start gRPC-Web server: %v", err)
	}
}
