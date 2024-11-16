// package: goflow
// file: goflow.proto

import * as goflow_pb from "./goflow_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GoFlowServiceStreamGoroutines = {
  readonly methodName: string;
  readonly service: typeof GoFlowService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof goflow_pb.StreamRequest;
  readonly responseType: typeof goflow_pb.GoroutineUpdate;
};

type GoFlowServiceStreamChannels = {
  readonly methodName: string;
  readonly service: typeof GoFlowService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof goflow_pb.StreamRequest;
  readonly responseType: typeof goflow_pb.ChannelUpdate;
};

type GoFlowServiceStreamDeadlocks = {
  readonly methodName: string;
  readonly service: typeof GoFlowService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof goflow_pb.StreamRequest;
  readonly responseType: typeof goflow_pb.DeadlockAlert;
};

export class GoFlowService {
  static readonly serviceName: string;
  static readonly StreamGoroutines: GoFlowServiceStreamGoroutines;
  static readonly StreamChannels: GoFlowServiceStreamChannels;
  static readonly StreamDeadlocks: GoFlowServiceStreamDeadlocks;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class GoFlowServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  streamGoroutines(requestMessage: goflow_pb.StreamRequest, metadata?: grpc.Metadata): ResponseStream<goflow_pb.GoroutineUpdate>;
  streamChannels(requestMessage: goflow_pb.StreamRequest, metadata?: grpc.Metadata): ResponseStream<goflow_pb.ChannelUpdate>;
  streamDeadlocks(requestMessage: goflow_pb.StreamRequest, metadata?: grpc.Metadata): ResponseStream<goflow_pb.DeadlockAlert>;
}

