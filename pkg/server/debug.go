package server

import (
	"fmt"
	"net/http"
	_ "net/http/pprof" // Register pprof handlers
)

// DebugServer represents an HTTP server for debugging purposes
type DebugServer struct {
	server *http.Server
}

// NewDebugServer creates a new debug server with pprof endpoints
func NewDebugServer(port int) *DebugServer {
	return &DebugServer{
		server: &http.Server{
			Addr: fmt.Sprintf(":%d", port),
		},
	}
}

// Start starts the debug server
func (d *DebugServer) Start() error {
	return d.server.ListenAndServe()
}

// Stop stops the debug server
func (d *DebugServer) Stop() error {
	return d.server.Close()
}
