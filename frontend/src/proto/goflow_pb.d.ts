// package: goflow
// file: goflow.proto

import * as jspb from "google-protobuf";

export class StreamRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StreamRequest): StreamRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamRequest;
  static deserializeBinaryFromReader(message: StreamRequest, reader: jspb.BinaryReader): StreamRequest;
}

export namespace StreamRequest {
  export type AsObject = {
  }
}

export class GoroutineUpdate extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getState(): string;
  setState(value: string): void;

  getFunctionName(): string;
  setFunctionName(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getParentId(): number;
  setParentId(value: number): void;

  getStack(): Uint8Array | string;
  getStack_asU8(): Uint8Array;
  getStack_asB64(): string;
  setStack(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GoroutineUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: GoroutineUpdate): GoroutineUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GoroutineUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GoroutineUpdate;
  static deserializeBinaryFromReader(message: GoroutineUpdate, reader: jspb.BinaryReader): GoroutineUpdate;
}

export namespace GoroutineUpdate {
  export type AsObject = {
    id: number,
    state: string,
    functionName: string,
    createdAt: number,
    parentId: number,
    stack: Uint8Array | string,
  }
}

export class ChannelUpdate extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getBufferSize(): number;
  setBufferSize(value: number): void;

  getBufferUsed(): number;
  setBufferUsed(value: number): void;

  getIsClosed(): boolean;
  setIsClosed(value: boolean): void;

  clearRecentOperationsList(): void;
  getRecentOperationsList(): Array<ChannelOperation>;
  setRecentOperationsList(value: Array<ChannelOperation>): void;
  addRecentOperations(value?: ChannelOperation, index?: number): ChannelOperation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelUpdate): ChannelUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelUpdate;
  static deserializeBinaryFromReader(message: ChannelUpdate, reader: jspb.BinaryReader): ChannelUpdate;
}

export namespace ChannelUpdate {
  export type AsObject = {
    id: number,
    bufferSize: number,
    bufferUsed: number,
    isClosed: boolean,
    recentOperationsList: Array<ChannelOperation.AsObject>,
  }
}

export class ChannelOperation extends jspb.Message {
  getChannelId(): number;
  setChannelId(value: number): void;

  getOperationType(): string;
  setOperationType(value: string): void;

  getGoroutineId(): number;
  setGoroutineId(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getBlocked(): boolean;
  setBlocked(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelOperation.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelOperation): ChannelOperation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelOperation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelOperation;
  static deserializeBinaryFromReader(message: ChannelOperation, reader: jspb.BinaryReader): ChannelOperation;
}

export namespace ChannelOperation {
  export type AsObject = {
    channelId: number,
    operationType: string,
    goroutineId: number,
    timestamp: number,
    blocked: boolean,
  }
}

export class DeadlockAlert extends jspb.Message {
  getDetectedAt(): number;
  setDetectedAt(value: number): void;

  getCycleDetails(): string;
  setCycleDetails(value: string): void;

  clearInvolvedGoroutinesList(): void;
  getInvolvedGoroutinesList(): Array<number>;
  setInvolvedGoroutinesList(value: Array<number>): void;
  addInvolvedGoroutines(value: number, index?: number): number;

  clearInvolvedChannelsList(): void;
  getInvolvedChannelsList(): Array<number>;
  setInvolvedChannelsList(value: Array<number>): void;
  addInvolvedChannels(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlockAlert.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlockAlert): DeadlockAlert.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlockAlert, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlockAlert;
  static deserializeBinaryFromReader(message: DeadlockAlert, reader: jspb.BinaryReader): DeadlockAlert;
}

export namespace DeadlockAlert {
  export type AsObject = {
    detectedAt: number,
    cycleDetails: string,
    involvedGoroutinesList: Array<number>,
    involvedChannelsList: Array<number>,
  }
}

