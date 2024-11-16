import {
  StreamRequest,
  GoroutineUpdate,
  ChannelUpdate,
  DeadlockAlert,
} from '../proto/goflow_pb';
import { GoFlowServiceClient, Status } from '../proto/goflow_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { BrowserHeaders } from 'browser-headers';

// Define the response stream interface that matches the actual stream type
interface ResponseStream<T> {
  on(type: 'data', callback: (response: T) => void): void;
  on(type: 'status', callback: (status: Status) => void): void;
  on(type: 'end', callback: (status?: Status) => void): void;
  cancel(): void;
}

// Define the stream method type that matches the client methods
type StreamMethod<T> = (
  request: StreamRequest,
  metadata?: BrowserHeaders
) => ResponseStream<T>;

class GRPCService {
  private client!: GoFlowServiceClient;
  private reconnectTimeout: number | null = null;
  private readonly maxRetries = 3;
  private retryCount = 0;

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    console.log('Initializing gRPC client...');
    
    // Configure client with WebSocket transport
    const transportFactory = () => {
      const transport = grpc.WebsocketTransport();
      // @ts-ignore - Adding custom properties to enhance WebSocket behavior
      transport.optionsOverride = {
        debug: true,
        headers: {
          'X-Client-Type': 'browser',
          'X-Client-Version': '1.0'
        }
      };
      return transport;
    };

    this.client = new GoFlowServiceClient('http://localhost:8080', {
      debug: true,
      transport: transportFactory()
    });
  }

  private handleConnectionError() {
    console.log('gRPC connection error, attempting to reconnect...');
    if (!this.reconnectTimeout && this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`Retry attempt ${this.retryCount} of ${this.maxRetries}`);
      
      this.reconnectTimeout = window.setTimeout(() => {
        console.log('Attempting to reconnect...');
        this.initializeClient();
        this.reconnectTimeout = null;
      }, Math.min(1000 * Math.pow(2, this.retryCount), 10000)); // Exponential backoff with max 10s
    } else if (this.retryCount >= this.maxRetries) {
      console.error('Max retry attempts reached. Please check server status.');
      this.retryCount = 0; // Reset for next time
    }
  }

  private createStream<T>(
    methodName: string,
    streamMethod: StreamMethod<T>,
    onData: (data: T) => void,
    onError: (error: Error) => void
  ): ResponseStream<T> {
    const request = new StreamRequest();
    console.log(`Starting stream for ${methodName}...`);
    
    // Add metadata for this specific stream
    const metadata = new BrowserHeaders({
      'X-Stream-Type': methodName,
      'X-Request-Time': new Date().toISOString(),
    });
    
    let retries = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    const createStreamWithRetry = (): ResponseStream<T> => {
      console.log(`Creating stream for ${methodName} (attempt ${retries + 1}/${maxRetries + 1})`);
      
      const stream = streamMethod.call(this.client, request, metadata);
      let isFirstMessage = true;
      let hasError = false;
      
      const handleRetry = () => {
        if (retries < maxRetries) {
          retries++;
          const delay = retryDelay * Math.pow(2, retries - 1); // exponential backoff
          console.log(`Retrying stream ${methodName} in ${delay}ms (attempt ${retries}/${maxRetries})`);
          setTimeout(() => {
            stream.cancel();
            createStreamWithRetry();
          }, delay);
          return true;
        }
        return false;
      };
      
      stream.on('data', (response: T) => {
        if (isFirstMessage) {
          console.log(`First message received for ${methodName}`);
          isFirstMessage = false;
        }
        console.log(`Received stream data for ${methodName}:`, response);
        this.retryCount = 0; // Reset retry count on successful data
        onData(response);
      });

      stream.on('status', (status: Status) => {
        console.log(`Stream status for ${methodName}:`, status.code, status.details);
        if (status.code !== 0) {
          console.error(`Stream error for ${methodName}:`, status);
          hasError = true;
          if (!handleRetry()) {
            this.handleConnectionError();
            onError(new Error(`${status.details} (code: ${status.code})`));
          }
        }
      });

      stream.on('end', (status?: Status) => {
        console.log(`Stream ended for ${methodName}${status ? ` with status: ${status.code} - ${status.details}` : ''}`);
        if (!hasError && status && status.code !== 0) {
          console.error(`Stream ended with error for ${methodName}:`, status);
          if (!handleRetry()) {
            this.handleConnectionError();
            onError(new Error(`Stream ended with error: ${status.details} (code: ${status.code})`));
          }
        }
      });

      return stream;
    };

    return createStreamWithRetry();
  }

  streamGoroutines(
    onData: (data: GoroutineUpdate) => void,
    onError: (error: Error) => void
  ): ResponseStream<GoroutineUpdate> {
    return this.createStream<GoroutineUpdate>(
      'streamGoroutines',
      this.client.streamGoroutines.bind(this.client),
      onData,
      onError
    );
  }

  streamChannels(
    onData: (data: ChannelUpdate) => void,
    onError: (error: Error) => void
  ): ResponseStream<ChannelUpdate> {
    return this.createStream<ChannelUpdate>(
      'streamChannels',
      this.client.streamChannels.bind(this.client),
      onData,
      onError
    );
  }

  streamDeadlocks(
    onData: (data: DeadlockAlert) => void,
    onError: (error: Error) => void
  ): ResponseStream<DeadlockAlert> {
    return this.createStream<DeadlockAlert>(
      'streamDeadlocks',
      this.client.streamDeadlocks.bind(this.client),
      onData,
      onError
    );
  }
}

export const grpcService = new GRPCService();
