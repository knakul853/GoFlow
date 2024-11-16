/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 5.28.3
 * source: goflow.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export namespace goflow {
    export class StreamRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {}) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        static fromObject(data: {}): StreamRequest {
            const message = new StreamRequest({});
            return message;
        }
        toObject() {
            const data: {} = {};
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StreamRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new StreamRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): StreamRequest {
            return StreamRequest.deserialize(bytes);
        }
    }
    export class GoroutineUpdate extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            id?: number;
            state?: string;
            function_name?: string;
            created_at?: number;
            parent_id?: number;
            stack?: Uint8Array;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("state" in data && data.state != undefined) {
                    this.state = data.state;
                }
                if ("function_name" in data && data.function_name != undefined) {
                    this.function_name = data.function_name;
                }
                if ("created_at" in data && data.created_at != undefined) {
                    this.created_at = data.created_at;
                }
                if ("parent_id" in data && data.parent_id != undefined) {
                    this.parent_id = data.parent_id;
                }
                if ("stack" in data && data.stack != undefined) {
                    this.stack = data.stack;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get state() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set state(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get function_name() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set function_name(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get created_at() {
            return pb_1.Message.getFieldWithDefault(this, 4, 0) as number;
        }
        set created_at(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get parent_id() {
            return pb_1.Message.getFieldWithDefault(this, 5, 0) as number;
        }
        set parent_id(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get stack() {
            return pb_1.Message.getFieldWithDefault(this, 6, new Uint8Array(0)) as Uint8Array;
        }
        set stack(value: Uint8Array) {
            pb_1.Message.setField(this, 6, value);
        }
        static fromObject(data: {
            id?: number;
            state?: string;
            function_name?: string;
            created_at?: number;
            parent_id?: number;
            stack?: Uint8Array;
        }): GoroutineUpdate {
            const message = new GoroutineUpdate({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.state != null) {
                message.state = data.state;
            }
            if (data.function_name != null) {
                message.function_name = data.function_name;
            }
            if (data.created_at != null) {
                message.created_at = data.created_at;
            }
            if (data.parent_id != null) {
                message.parent_id = data.parent_id;
            }
            if (data.stack != null) {
                message.stack = data.stack;
            }
            return message;
        }
        toObject() {
            const data: {
                id?: number;
                state?: string;
                function_name?: string;
                created_at?: number;
                parent_id?: number;
                stack?: Uint8Array;
            } = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.state != null) {
                data.state = this.state;
            }
            if (this.function_name != null) {
                data.function_name = this.function_name;
            }
            if (this.created_at != null) {
                data.created_at = this.created_at;
            }
            if (this.parent_id != null) {
                data.parent_id = this.parent_id;
            }
            if (this.stack != null) {
                data.stack = this.stack;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id != 0)
                writer.writeUint64(1, this.id);
            if (this.state.length)
                writer.writeString(2, this.state);
            if (this.function_name.length)
                writer.writeString(3, this.function_name);
            if (this.created_at != 0)
                writer.writeInt64(4, this.created_at);
            if (this.parent_id != 0)
                writer.writeUint64(5, this.parent_id);
            if (this.stack.length)
                writer.writeBytes(6, this.stack);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoroutineUpdate {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoroutineUpdate();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readUint64();
                        break;
                    case 2:
                        message.state = reader.readString();
                        break;
                    case 3:
                        message.function_name = reader.readString();
                        break;
                    case 4:
                        message.created_at = reader.readInt64();
                        break;
                    case 5:
                        message.parent_id = reader.readUint64();
                        break;
                    case 6:
                        message.stack = reader.readBytes();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoroutineUpdate {
            return GoroutineUpdate.deserialize(bytes);
        }
    }
    export class ChannelUpdate extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            id?: number;
            buffer_size?: number;
            buffer_used?: number;
            is_closed?: boolean;
            recent_operations?: ChannelOperation[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [5], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("buffer_size" in data && data.buffer_size != undefined) {
                    this.buffer_size = data.buffer_size;
                }
                if ("buffer_used" in data && data.buffer_used != undefined) {
                    this.buffer_used = data.buffer_used;
                }
                if ("is_closed" in data && data.is_closed != undefined) {
                    this.is_closed = data.is_closed;
                }
                if ("recent_operations" in data && data.recent_operations != undefined) {
                    this.recent_operations = data.recent_operations;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get buffer_size() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set buffer_size(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get buffer_used() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0) as number;
        }
        set buffer_used(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get is_closed() {
            return pb_1.Message.getFieldWithDefault(this, 4, false) as boolean;
        }
        set is_closed(value: boolean) {
            pb_1.Message.setField(this, 4, value);
        }
        get recent_operations() {
            return pb_1.Message.getRepeatedWrapperField(this, ChannelOperation, 5) as ChannelOperation[];
        }
        set recent_operations(value: ChannelOperation[]) {
            pb_1.Message.setRepeatedWrapperField(this, 5, value);
        }
        static fromObject(data: {
            id?: number;
            buffer_size?: number;
            buffer_used?: number;
            is_closed?: boolean;
            recent_operations?: ReturnType<typeof ChannelOperation.prototype.toObject>[];
        }): ChannelUpdate {
            const message = new ChannelUpdate({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.buffer_size != null) {
                message.buffer_size = data.buffer_size;
            }
            if (data.buffer_used != null) {
                message.buffer_used = data.buffer_used;
            }
            if (data.is_closed != null) {
                message.is_closed = data.is_closed;
            }
            if (data.recent_operations != null) {
                message.recent_operations = data.recent_operations.map(item => ChannelOperation.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data: {
                id?: number;
                buffer_size?: number;
                buffer_used?: number;
                is_closed?: boolean;
                recent_operations?: ReturnType<typeof ChannelOperation.prototype.toObject>[];
            } = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.buffer_size != null) {
                data.buffer_size = this.buffer_size;
            }
            if (this.buffer_used != null) {
                data.buffer_used = this.buffer_used;
            }
            if (this.is_closed != null) {
                data.is_closed = this.is_closed;
            }
            if (this.recent_operations != null) {
                data.recent_operations = this.recent_operations.map((item: ChannelOperation) => item.toObject());
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id != 0)
                writer.writeUint64(1, this.id);
            if (this.buffer_size != 0)
                writer.writeInt32(2, this.buffer_size);
            if (this.buffer_used != 0)
                writer.writeInt32(3, this.buffer_used);
            if (this.is_closed != false)
                writer.writeBool(4, this.is_closed);
            if (this.recent_operations.length)
                writer.writeRepeatedMessage(5, this.recent_operations, (item: ChannelOperation) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChannelUpdate {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChannelUpdate();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readUint64();
                        break;
                    case 2:
                        message.buffer_size = reader.readInt32();
                        break;
                    case 3:
                        message.buffer_used = reader.readInt32();
                        break;
                    case 4:
                        message.is_closed = reader.readBool();
                        break;
                    case 5:
                        reader.readMessage(message.recent_operations, () => pb_1.Message.addToRepeatedWrapperField(message, 5, ChannelOperation.deserialize(reader), ChannelOperation));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ChannelUpdate {
            return ChannelUpdate.deserialize(bytes);
        }
    }
    export class ChannelOperation extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            channel_id?: number;
            operation_type?: string;
            goroutine_id?: number;
            timestamp?: number;
            blocked?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("channel_id" in data && data.channel_id != undefined) {
                    this.channel_id = data.channel_id;
                }
                if ("operation_type" in data && data.operation_type != undefined) {
                    this.operation_type = data.operation_type;
                }
                if ("goroutine_id" in data && data.goroutine_id != undefined) {
                    this.goroutine_id = data.goroutine_id;
                }
                if ("timestamp" in data && data.timestamp != undefined) {
                    this.timestamp = data.timestamp;
                }
                if ("blocked" in data && data.blocked != undefined) {
                    this.blocked = data.blocked;
                }
            }
        }
        get channel_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set channel_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get operation_type() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set operation_type(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get goroutine_id() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0) as number;
        }
        set goroutine_id(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get timestamp() {
            return pb_1.Message.getFieldWithDefault(this, 4, 0) as number;
        }
        set timestamp(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get blocked() {
            return pb_1.Message.getFieldWithDefault(this, 5, false) as boolean;
        }
        set blocked(value: boolean) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data: {
            channel_id?: number;
            operation_type?: string;
            goroutine_id?: number;
            timestamp?: number;
            blocked?: boolean;
        }): ChannelOperation {
            const message = new ChannelOperation({});
            if (data.channel_id != null) {
                message.channel_id = data.channel_id;
            }
            if (data.operation_type != null) {
                message.operation_type = data.operation_type;
            }
            if (data.goroutine_id != null) {
                message.goroutine_id = data.goroutine_id;
            }
            if (data.timestamp != null) {
                message.timestamp = data.timestamp;
            }
            if (data.blocked != null) {
                message.blocked = data.blocked;
            }
            return message;
        }
        toObject() {
            const data: {
                channel_id?: number;
                operation_type?: string;
                goroutine_id?: number;
                timestamp?: number;
                blocked?: boolean;
            } = {};
            if (this.channel_id != null) {
                data.channel_id = this.channel_id;
            }
            if (this.operation_type != null) {
                data.operation_type = this.operation_type;
            }
            if (this.goroutine_id != null) {
                data.goroutine_id = this.goroutine_id;
            }
            if (this.timestamp != null) {
                data.timestamp = this.timestamp;
            }
            if (this.blocked != null) {
                data.blocked = this.blocked;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.channel_id != 0)
                writer.writeUint64(1, this.channel_id);
            if (this.operation_type.length)
                writer.writeString(2, this.operation_type);
            if (this.goroutine_id != 0)
                writer.writeUint64(3, this.goroutine_id);
            if (this.timestamp != 0)
                writer.writeInt64(4, this.timestamp);
            if (this.blocked != false)
                writer.writeBool(5, this.blocked);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChannelOperation {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChannelOperation();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.channel_id = reader.readUint64();
                        break;
                    case 2:
                        message.operation_type = reader.readString();
                        break;
                    case 3:
                        message.goroutine_id = reader.readUint64();
                        break;
                    case 4:
                        message.timestamp = reader.readInt64();
                        break;
                    case 5:
                        message.blocked = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ChannelOperation {
            return ChannelOperation.deserialize(bytes);
        }
    }
    export class DeadlockAlert extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            detected_at?: number;
            cycle_details?: string;
            involved_goroutines?: number[];
            involved_channels?: number[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3, 4], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("detected_at" in data && data.detected_at != undefined) {
                    this.detected_at = data.detected_at;
                }
                if ("cycle_details" in data && data.cycle_details != undefined) {
                    this.cycle_details = data.cycle_details;
                }
                if ("involved_goroutines" in data && data.involved_goroutines != undefined) {
                    this.involved_goroutines = data.involved_goroutines;
                }
                if ("involved_channels" in data && data.involved_channels != undefined) {
                    this.involved_channels = data.involved_channels;
                }
            }
        }
        get detected_at() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set detected_at(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get cycle_details() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set cycle_details(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get involved_goroutines() {
            return pb_1.Message.getFieldWithDefault(this, 3, []) as number[];
        }
        set involved_goroutines(value: number[]) {
            pb_1.Message.setField(this, 3, value);
        }
        get involved_channels() {
            return pb_1.Message.getFieldWithDefault(this, 4, []) as number[];
        }
        set involved_channels(value: number[]) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            detected_at?: number;
            cycle_details?: string;
            involved_goroutines?: number[];
            involved_channels?: number[];
        }): DeadlockAlert {
            const message = new DeadlockAlert({});
            if (data.detected_at != null) {
                message.detected_at = data.detected_at;
            }
            if (data.cycle_details != null) {
                message.cycle_details = data.cycle_details;
            }
            if (data.involved_goroutines != null) {
                message.involved_goroutines = data.involved_goroutines;
            }
            if (data.involved_channels != null) {
                message.involved_channels = data.involved_channels;
            }
            return message;
        }
        toObject() {
            const data: {
                detected_at?: number;
                cycle_details?: string;
                involved_goroutines?: number[];
                involved_channels?: number[];
            } = {};
            if (this.detected_at != null) {
                data.detected_at = this.detected_at;
            }
            if (this.cycle_details != null) {
                data.cycle_details = this.cycle_details;
            }
            if (this.involved_goroutines != null) {
                data.involved_goroutines = this.involved_goroutines;
            }
            if (this.involved_channels != null) {
                data.involved_channels = this.involved_channels;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.detected_at != 0)
                writer.writeInt64(1, this.detected_at);
            if (this.cycle_details.length)
                writer.writeString(2, this.cycle_details);
            if (this.involved_goroutines.length)
                writer.writePackedUint64(3, this.involved_goroutines);
            if (this.involved_channels.length)
                writer.writePackedUint64(4, this.involved_channels);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DeadlockAlert {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeadlockAlert();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.detected_at = reader.readInt64();
                        break;
                    case 2:
                        message.cycle_details = reader.readString();
                        break;
                    case 3:
                        message.involved_goroutines = reader.readPackedUint64();
                        break;
                    case 4:
                        message.involved_channels = reader.readPackedUint64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): DeadlockAlert {
            return DeadlockAlert.deserialize(bytes);
        }
    }
    interface GrpcUnaryServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    }
    interface GrpcStreamServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
        (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
    }
    interface GrpWritableServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    }
    interface GrpcChunkServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
        (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
    }
    interface GrpcPromiseServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): Promise<R>;
        (message: P, options?: grpc_1.CallOptions): Promise<R>;
    }
    export abstract class UnimplementedGoFlowServiceService {
        static definition = {
            StreamGoroutines: {
                path: "/goflow.GoFlowService/StreamGoroutines",
                requestStream: false,
                responseStream: true,
                requestSerialize: (message: StreamRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => StreamRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: GoroutineUpdate) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => GoroutineUpdate.deserialize(new Uint8Array(bytes))
            },
            StreamChannels: {
                path: "/goflow.GoFlowService/StreamChannels",
                requestStream: false,
                responseStream: true,
                requestSerialize: (message: StreamRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => StreamRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: ChannelUpdate) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => ChannelUpdate.deserialize(new Uint8Array(bytes))
            },
            StreamDeadlocks: {
                path: "/goflow.GoFlowService/StreamDeadlocks",
                requestStream: false,
                responseStream: true,
                requestSerialize: (message: StreamRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => StreamRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: DeadlockAlert) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => DeadlockAlert.deserialize(new Uint8Array(bytes))
            }
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract StreamGoroutines(call: grpc_1.ServerWritableStream<StreamRequest, GoroutineUpdate>): void;
        abstract StreamChannels(call: grpc_1.ServerWritableStream<StreamRequest, ChannelUpdate>): void;
        abstract StreamDeadlocks(call: grpc_1.ServerWritableStream<StreamRequest, DeadlockAlert>): void;
    }
    export class GoFlowServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedGoFlowServiceService.definition, "GoFlowService", {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
            super(address, credentials, options);
        }
        StreamGoroutines: GrpcStreamServiceInterface<StreamRequest, GoroutineUpdate> = (message: StreamRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<GoroutineUpdate> => {
            return super.StreamGoroutines(message, metadata, options);
        };
        StreamChannels: GrpcStreamServiceInterface<StreamRequest, ChannelUpdate> = (message: StreamRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<ChannelUpdate> => {
            return super.StreamChannels(message, metadata, options);
        };
        StreamDeadlocks: GrpcStreamServiceInterface<StreamRequest, DeadlockAlert> = (message: StreamRequest, metadata?: grpc_1.Metadata | grpc_1.CallOptions, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<DeadlockAlert> => {
            return super.StreamDeadlocks(message, metadata, options);
        };
    }
}