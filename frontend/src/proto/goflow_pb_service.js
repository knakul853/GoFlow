// package: goflow
// file: goflow.proto

var goflow_pb = require("./goflow_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GoFlowService = (function () {
  function GoFlowService() {}
  GoFlowService.serviceName = "goflow.GoFlowService";
  return GoFlowService;
}());

GoFlowService.StreamGoroutines = {
  methodName: "StreamGoroutines",
  service: GoFlowService,
  requestStream: false,
  responseStream: true,
  requestType: goflow_pb.StreamRequest,
  responseType: goflow_pb.GoroutineUpdate
};

GoFlowService.StreamChannels = {
  methodName: "StreamChannels",
  service: GoFlowService,
  requestStream: false,
  responseStream: true,
  requestType: goflow_pb.StreamRequest,
  responseType: goflow_pb.ChannelUpdate
};

GoFlowService.StreamDeadlocks = {
  methodName: "StreamDeadlocks",
  service: GoFlowService,
  requestStream: false,
  responseStream: true,
  requestType: goflow_pb.StreamRequest,
  responseType: goflow_pb.DeadlockAlert
};

exports.GoFlowService = GoFlowService;

function GoFlowServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GoFlowServiceClient.prototype.streamGoroutines = function streamGoroutines(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GoFlowService.StreamGoroutines, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GoFlowServiceClient.prototype.streamChannels = function streamChannels(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GoFlowService.StreamChannels, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GoFlowServiceClient.prototype.streamDeadlocks = function streamDeadlocks(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GoFlowService.StreamDeadlocks, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.GoFlowServiceClient = GoFlowServiceClient;

