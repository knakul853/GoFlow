package errors

import (
	"fmt"
	"runtime"
	"strings"
)

// ErrorType represents different categories of errors
type ErrorType int

const (
	// Internal errors are unexpected errors
	Internal ErrorType = iota
	// ValidationError represents invalid input or state
	ValidationError
	// ResourceNotFound represents missing resource errors
	ResourceNotFound
	// ConcurrencyError represents goroutine or channel related errors
	ConcurrencyError
)

// Error represents a custom error with additional context
type Error struct {
	Type    ErrorType
	Message string
	Cause   error
	Stack   string
}

// New creates a new Error with stack trace
func New(errType ErrorType, message string) *Error {
	return &Error{
		Type:    errType,
		Message: message,
		Stack:   getStackTrace(),
	}
}

// Wrap wraps an existing error with additional context
func Wrap(err error, message string) *Error {
	if err == nil {
		return nil
	}

	return &Error{
		Type:    Internal,
		Message: message,
		Cause:   err,
		Stack:   getStackTrace(),
	}
}

// Error implements the error interface
func (e *Error) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf("%s: %v", e.Message, e.Cause)
	}
	return e.Message
}

// Is checks if the error is of a specific type
func (e *Error) Is(errType ErrorType) bool {
	return e.Type == errType
}

func getStackTrace() string {
	const depth = 32
	var pcs [depth]uintptr
	n := runtime.Callers(3, pcs[:])
	frames := runtime.CallersFrames(pcs[:n])

	var builder strings.Builder
	for {
		frame, more := frames.Next()
		if !strings.Contains(frame.File, "runtime/") {
			fmt.Fprintf(&builder, "%s:%d\n", frame.File, frame.Line)
		}
		if !more {
			break
		}
	}
	return builder.String()
}
