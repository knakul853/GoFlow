#!/bin/bash

# Exit on error
set -e

# Remove old generated files
rm -f api/proto/*.pb.go

# Install specific versions of protoc generators
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.31.0
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0

# Create the output directory if it doesn't exist
mkdir -p api/proto

# Generate Go code from proto files
protoc --go_out=. \
       --go_opt=paths=source_relative \
       --go-grpc_out=. \
       --go-grpc_opt=paths=source_relative \
       api/proto/goflow.proto

echo "Proto files generated successfully"
