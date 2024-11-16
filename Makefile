.PHONY: build test clean run docker-build docker-run help

# Go related variables
BINARY_NAME=server
MAIN_PATH=./cmd/server

# Docker related variables
DOCKER_IMAGE=gitflow
DOCKER_TAG=latest

# Build the project
build:
	@echo "Building..."
	go build -o $(BINARY_NAME) $(MAIN_PATH)

# Run the project
run:
	@echo "Running..."
	go run $(MAIN_PATH)

# Clean build files
clean:
	@echo "Cleaning..."
	go clean
	rm -f $(BINARY_NAME)

# Run tests
test:
	@echo "Running tests..."
	go test ./... -v

# Run tests with coverage
test-coverage:
	@echo "Running tests with coverage..."
	go test ./... -coverprofile=coverage.out
	go tool cover -html=coverage.out

# Format code
fmt:
	@echo "Formatting code..."
	go fmt ./...

# Vet code
vet:
	@echo "Vetting code..."
	go vet ./...

# Build docker image
docker-build:
	@echo "Building docker image..."
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

# Run docker container
docker-run:
	@echo "Running docker container..."
	docker run -p 50051:50051 $(DOCKER_IMAGE):$(DOCKER_TAG)

# Stop all running containers
docker-stop:
	@echo "Stopping all running containers..."
	docker stop $$(docker ps -a -q)

# Install dependencies
deps:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

# Show help
help:
	@echo "Available commands:"
	@echo "  make build          - Build the project"
	@echo "  make run           - Run the project"
	@echo "  make clean         - Clean build files"
	@echo "  make test          - Run tests"
	@echo "  make test-coverage - Run tests with coverage"
	@echo "  make fmt           - Format code"
	@echo "  make vet           - Vet code"
	@echo "  make deps          - Install dependencies"
	@echo "  make docker-build  - Build docker image"
	@echo "  make docker-run    - Run docker container"
	@echo "  make docker-stop   - Stop all running containers"

# Default target
default: help
