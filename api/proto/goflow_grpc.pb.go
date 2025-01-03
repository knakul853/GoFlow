// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.21.12
// source: api/proto/goflow.proto

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	GoFlowService_StreamGoroutines_FullMethodName = "/goflow.GoFlowService/StreamGoroutines"
	GoFlowService_StreamChannels_FullMethodName   = "/goflow.GoFlowService/StreamChannels"
	GoFlowService_StreamDeadlocks_FullMethodName  = "/goflow.GoFlowService/StreamDeadlocks"
)

// GoFlowServiceClient is the client API for GoFlowService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type GoFlowServiceClient interface {
	// Stream goroutine updates
	StreamGoroutines(ctx context.Context, in *StreamRequest, opts ...grpc.CallOption) (GoFlowService_StreamGoroutinesClient, error)
	// Stream channel updates
	StreamChannels(ctx context.Context, in *StreamRequest, opts ...grpc.CallOption) (GoFlowService_StreamChannelsClient, error)
	// Get deadlock alerts
	StreamDeadlocks(ctx context.Context, in *StreamRequest, opts ...grpc.CallOption) (GoFlowService_StreamDeadlocksClient, error)
}

type goFlowServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewGoFlowServiceClient(cc grpc.ClientConnInterface) GoFlowServiceClient {
	return &goFlowServiceClient{cc}
}

func (c *goFlowServiceClient) StreamGoroutines(ctx context.Context, in *StreamRequest, opts ...grpc.CallOption) (GoFlowService_StreamGoroutinesClient, error) {
	stream, err := c.cc.NewStream(ctx, &GoFlowService_ServiceDesc.Streams[0], GoFlowService_StreamGoroutines_FullMethodName, opts...)
	if err != nil {
		return nil, err
	}
	x := &goFlowServiceStreamGoroutinesClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type GoFlowService_StreamGoroutinesClient interface {
	Recv() (*GoroutineUpdate, error)
	grpc.ClientStream
}

type goFlowServiceStreamGoroutinesClient struct {
	grpc.ClientStream
}

func (x *goFlowServiceStreamGoroutinesClient) Recv() (*GoroutineUpdate, error) {
	m := new(GoroutineUpdate)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *goFlowServiceClient) StreamChannels(ctx context.Context, in *StreamRequest, opts ...grpc.CallOption) (GoFlowService_StreamChannelsClient, error) {
	stream, err := c.cc.NewStream(ctx, &GoFlowService_ServiceDesc.Streams[1], GoFlowService_StreamChannels_FullMethodName, opts...)
	if err != nil {
		return nil, err
	}
	x := &goFlowServiceStreamChannelsClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type GoFlowService_StreamChannelsClient interface {
	Recv() (*ChannelUpdate, error)
	grpc.ClientStream
}

type goFlowServiceStreamChannelsClient struct {
	grpc.ClientStream
}

func (x *goFlowServiceStreamChannelsClient) Recv() (*ChannelUpdate, error) {
	m := new(ChannelUpdate)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *goFlowServiceClient) StreamDeadlocks(ctx context.Context, in *StreamRequest, opts ...grpc.CallOption) (GoFlowService_StreamDeadlocksClient, error) {
	stream, err := c.cc.NewStream(ctx, &GoFlowService_ServiceDesc.Streams[2], GoFlowService_StreamDeadlocks_FullMethodName, opts...)
	if err != nil {
		return nil, err
	}
	x := &goFlowServiceStreamDeadlocksClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type GoFlowService_StreamDeadlocksClient interface {
	Recv() (*DeadlockAlert, error)
	grpc.ClientStream
}

type goFlowServiceStreamDeadlocksClient struct {
	grpc.ClientStream
}

func (x *goFlowServiceStreamDeadlocksClient) Recv() (*DeadlockAlert, error) {
	m := new(DeadlockAlert)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// GoFlowServiceServer is the server API for GoFlowService service.
// All implementations must embed UnimplementedGoFlowServiceServer
// for forward compatibility
type GoFlowServiceServer interface {
	// Stream goroutine updates
	StreamGoroutines(*StreamRequest, GoFlowService_StreamGoroutinesServer) error
	// Stream channel updates
	StreamChannels(*StreamRequest, GoFlowService_StreamChannelsServer) error
	// Get deadlock alerts
	StreamDeadlocks(*StreamRequest, GoFlowService_StreamDeadlocksServer) error
	mustEmbedUnimplementedGoFlowServiceServer()
}

// UnimplementedGoFlowServiceServer must be embedded to have forward compatible implementations.
type UnimplementedGoFlowServiceServer struct {
}

func (UnimplementedGoFlowServiceServer) StreamGoroutines(*StreamRequest, GoFlowService_StreamGoroutinesServer) error {
	return status.Errorf(codes.Unimplemented, "method StreamGoroutines not implemented")
}
func (UnimplementedGoFlowServiceServer) StreamChannels(*StreamRequest, GoFlowService_StreamChannelsServer) error {
	return status.Errorf(codes.Unimplemented, "method StreamChannels not implemented")
}
func (UnimplementedGoFlowServiceServer) StreamDeadlocks(*StreamRequest, GoFlowService_StreamDeadlocksServer) error {
	return status.Errorf(codes.Unimplemented, "method StreamDeadlocks not implemented")
}
func (UnimplementedGoFlowServiceServer) mustEmbedUnimplementedGoFlowServiceServer() {}

// UnsafeGoFlowServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to GoFlowServiceServer will
// result in compilation errors.
type UnsafeGoFlowServiceServer interface {
	mustEmbedUnimplementedGoFlowServiceServer()
}

func RegisterGoFlowServiceServer(s grpc.ServiceRegistrar, srv GoFlowServiceServer) {
	s.RegisterService(&GoFlowService_ServiceDesc, srv)
}

func _GoFlowService_StreamGoroutines_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(StreamRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(GoFlowServiceServer).StreamGoroutines(m, &goFlowServiceStreamGoroutinesServer{stream})
}

type GoFlowService_StreamGoroutinesServer interface {
	Send(*GoroutineUpdate) error
	grpc.ServerStream
}

type goFlowServiceStreamGoroutinesServer struct {
	grpc.ServerStream
}

func (x *goFlowServiceStreamGoroutinesServer) Send(m *GoroutineUpdate) error {
	return x.ServerStream.SendMsg(m)
}

func _GoFlowService_StreamChannels_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(StreamRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(GoFlowServiceServer).StreamChannels(m, &goFlowServiceStreamChannelsServer{stream})
}

type GoFlowService_StreamChannelsServer interface {
	Send(*ChannelUpdate) error
	grpc.ServerStream
}

type goFlowServiceStreamChannelsServer struct {
	grpc.ServerStream
}

func (x *goFlowServiceStreamChannelsServer) Send(m *ChannelUpdate) error {
	return x.ServerStream.SendMsg(m)
}

func _GoFlowService_StreamDeadlocks_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(StreamRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(GoFlowServiceServer).StreamDeadlocks(m, &goFlowServiceStreamDeadlocksServer{stream})
}

type GoFlowService_StreamDeadlocksServer interface {
	Send(*DeadlockAlert) error
	grpc.ServerStream
}

type goFlowServiceStreamDeadlocksServer struct {
	grpc.ServerStream
}

func (x *goFlowServiceStreamDeadlocksServer) Send(m *DeadlockAlert) error {
	return x.ServerStream.SendMsg(m)
}

// GoFlowService_ServiceDesc is the grpc.ServiceDesc for GoFlowService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var GoFlowService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "goflow.GoFlowService",
	HandlerType: (*GoFlowServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "StreamGoroutines",
			Handler:       _GoFlowService_StreamGoroutines_Handler,
			ServerStreams: true,
		},
		{
			StreamName:    "StreamChannels",
			Handler:       _GoFlowService_StreamChannels_Handler,
			ServerStreams: true,
		},
		{
			StreamName:    "StreamDeadlocks",
			Handler:       _GoFlowService_StreamDeadlocks_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "api/proto/goflow.proto",
}
