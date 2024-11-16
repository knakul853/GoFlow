import {
  StreamRequest,
  GoroutineUpdate,
  ChannelUpdate,
  DeadlockAlert,
} from '../proto/goflow_pb';
import { GoFlowServiceClient, Status } from '../proto/goflow_pb_service';

class GRPCService {
  private client: GoFlowServiceClient;

  constructor() {
    this.client = new GoFlowServiceClient('http://localhost:50052');
  }

  streamGoroutines(onData: (data: GoroutineUpdate) => void, onError: (error: Error) => void) {
    const request = new StreamRequest();
    const stream = this.client.streamGoroutines(request);

    stream.on('data', onData);
    stream.on('status', (status: Status) => {
      if (status.code !== 0) {
        onError(new Error(`${status.details} (code: ${status.code})`));
      }
    });
    stream.on('end', (status?: Status) => {
      if (status && status.code !== 0) {
        onError(new Error(`Stream ended with error: ${status.details} (code: ${status.code})`));
      }
    });

    return stream;
  }

  streamChannels(onData: (data: ChannelUpdate) => void, onError: (error: Error) => void) {
    const request = new StreamRequest();
    const stream = this.client.streamChannels(request);

    stream.on('data', onData);
    stream.on('status', (status: Status) => {
      if (status.code !== 0) {
        onError(new Error(`${status.details} (code: ${status.code})`));
      }
    });
    stream.on('end', (status?: Status) => {
      if (status && status.code !== 0) {
        onError(new Error(`Stream ended with error: ${status.details} (code: ${status.code})`));
      }
    });

    return stream;
  }

  streamDeadlocks(onData: (data: DeadlockAlert) => void, onError: (error: Error) => void) {
    const request = new StreamRequest();
    const stream = this.client.streamDeadlocks(request);

    stream.on('data', onData);
    stream.on('status', (status: Status) => {
      if (status.code !== 0) {
        onError(new Error(`${status.details} (code: ${status.code})`));
      }
    });
    stream.on('end', (status?: Status) => {
      if (status && status.code !== 0) {
        onError(new Error(`Stream ended with error: ${status.details} (code: ${status.code})`));
      }
    });

    return stream;
  }
}

export const grpcService = new GRPCService();
