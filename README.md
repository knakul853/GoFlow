# GoFlow

## Overview
GoFlow is a powerful Go-based runtime analysis and monitoring tool designed to help developers debug and analyze concurrent Go programs. It provides real-time visibility into goroutines, channels, and potential concurrency issues such as deadlocks. The project offers a gRPC server that streams live updates about your Go program's runtime state, making it ideal for debugging complex concurrent applications.

### Key Features
- Real-time goroutine monitoring and tracking
- Channel operation analysis and state tracking
- Deadlock detection
- Race condition analysis
- Debug server with pprof integration
- gRPC-based streaming API for live updates
- Session management for multiple clients

## Project Structure
- `cmd/`: Application entry points and server implementation
- `pkg/`: Core packages including:
  - `analyzer/`: Deadlock and race condition detection
  - `runtime/`: Goroutine and channel monitoring
  - `server/`: gRPC server implementation
  - `storage/`: Session management
- `api/`: Protocol buffer definitions and generated code
- `configs/`: Configuration files
- `scripts/`: Utility scripts for development
- `internal/`: Private application logic

## Getting Started

### Prerequisites
- Go 1.20 or higher

### Installation
1. Clone the repository
2. Install protocol buffer compiler (protoc)
3. Run `scripts/generate_proto.sh` to generate gRPC code
4. Run `go mod download` to install dependencies
5. Build the project: `go build ./cmd/goflow`

### Running the Application
```bash
go run ./cmd/goflow
```

The server will start on the default port (50051) with a debug server on port 6060.

### Usage
1. Start the GoFlow server
2. Connect to the gRPC server using a client
3. Subscribe to goroutine and channel updates
4. Monitor your application's concurrent behavior in real-time

## Development
- Run tests: `go test ./...`
- Format code: `go fmt ./...`

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.
