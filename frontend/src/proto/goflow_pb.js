// source: goflow.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.goflow.ChannelOperation', null, global);
goog.exportSymbol('proto.goflow.ChannelUpdate', null, global);
goog.exportSymbol('proto.goflow.DeadlockAlert', null, global);
goog.exportSymbol('proto.goflow.GoroutineUpdate', null, global);
goog.exportSymbol('proto.goflow.StreamRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.goflow.StreamRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.goflow.StreamRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.goflow.StreamRequest.displayName = 'proto.goflow.StreamRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.goflow.GoroutineUpdate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.goflow.GoroutineUpdate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.goflow.GoroutineUpdate.displayName = 'proto.goflow.GoroutineUpdate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.goflow.ChannelUpdate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.goflow.ChannelUpdate.repeatedFields_, null);
};
goog.inherits(proto.goflow.ChannelUpdate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.goflow.ChannelUpdate.displayName = 'proto.goflow.ChannelUpdate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.goflow.ChannelOperation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.goflow.ChannelOperation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.goflow.ChannelOperation.displayName = 'proto.goflow.ChannelOperation';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.goflow.DeadlockAlert = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.goflow.DeadlockAlert.repeatedFields_, null);
};
goog.inherits(proto.goflow.DeadlockAlert, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.goflow.DeadlockAlert.displayName = 'proto.goflow.DeadlockAlert';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.goflow.StreamRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.goflow.StreamRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.goflow.StreamRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.StreamRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.goflow.StreamRequest}
 */
proto.goflow.StreamRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.goflow.StreamRequest;
  return proto.goflow.StreamRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.goflow.StreamRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.goflow.StreamRequest}
 */
proto.goflow.StreamRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.goflow.StreamRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.goflow.StreamRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.goflow.StreamRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.StreamRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.goflow.GoroutineUpdate.prototype.toObject = function(opt_includeInstance) {
  return proto.goflow.GoroutineUpdate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.goflow.GoroutineUpdate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.GoroutineUpdate.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    state: jspb.Message.getFieldWithDefault(msg, 2, ""),
    functionName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    createdAt: jspb.Message.getFieldWithDefault(msg, 4, 0),
    parentId: jspb.Message.getFieldWithDefault(msg, 5, 0),
    stack: msg.getStack_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.goflow.GoroutineUpdate}
 */
proto.goflow.GoroutineUpdate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.goflow.GoroutineUpdate;
  return proto.goflow.GoroutineUpdate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.goflow.GoroutineUpdate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.goflow.GoroutineUpdate}
 */
proto.goflow.GoroutineUpdate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setState(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFunctionName(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreatedAt(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setParentId(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setStack(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.goflow.GoroutineUpdate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.goflow.GoroutineUpdate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.goflow.GoroutineUpdate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.GoroutineUpdate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getState();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getFunctionName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCreatedAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getParentId();
  if (f !== 0) {
    writer.writeUint64(
      5,
      f
    );
  }
  f = message.getStack_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.goflow.GoroutineUpdate.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.GoroutineUpdate} returns this
 */
proto.goflow.GoroutineUpdate.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string state = 2;
 * @return {string}
 */
proto.goflow.GoroutineUpdate.prototype.getState = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.goflow.GoroutineUpdate} returns this
 */
proto.goflow.GoroutineUpdate.prototype.setState = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string function_name = 3;
 * @return {string}
 */
proto.goflow.GoroutineUpdate.prototype.getFunctionName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.goflow.GoroutineUpdate} returns this
 */
proto.goflow.GoroutineUpdate.prototype.setFunctionName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int64 created_at = 4;
 * @return {number}
 */
proto.goflow.GoroutineUpdate.prototype.getCreatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.GoroutineUpdate} returns this
 */
proto.goflow.GoroutineUpdate.prototype.setCreatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint64 parent_id = 5;
 * @return {number}
 */
proto.goflow.GoroutineUpdate.prototype.getParentId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.GoroutineUpdate} returns this
 */
proto.goflow.GoroutineUpdate.prototype.setParentId = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bytes stack = 6;
 * @return {string}
 */
proto.goflow.GoroutineUpdate.prototype.getStack = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes stack = 6;
 * This is a type-conversion wrapper around `getStack()`
 * @return {string}
 */
proto.goflow.GoroutineUpdate.prototype.getStack_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getStack()));
};


/**
 * optional bytes stack = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getStack()`
 * @return {!Uint8Array}
 */
proto.goflow.GoroutineUpdate.prototype.getStack_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getStack()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.goflow.GoroutineUpdate} returns this
 */
proto.goflow.GoroutineUpdate.prototype.setStack = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.goflow.ChannelUpdate.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.goflow.ChannelUpdate.prototype.toObject = function(opt_includeInstance) {
  return proto.goflow.ChannelUpdate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.goflow.ChannelUpdate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.ChannelUpdate.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    bufferSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    bufferUsed: jspb.Message.getFieldWithDefault(msg, 3, 0),
    isClosed: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    recentOperationsList: jspb.Message.toObjectList(msg.getRecentOperationsList(),
    proto.goflow.ChannelOperation.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.goflow.ChannelUpdate}
 */
proto.goflow.ChannelUpdate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.goflow.ChannelUpdate;
  return proto.goflow.ChannelUpdate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.goflow.ChannelUpdate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.goflow.ChannelUpdate}
 */
proto.goflow.ChannelUpdate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBufferSize(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBufferUsed(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsClosed(value);
      break;
    case 5:
      var value = new proto.goflow.ChannelOperation;
      reader.readMessage(value,proto.goflow.ChannelOperation.deserializeBinaryFromReader);
      msg.addRecentOperations(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.goflow.ChannelUpdate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.goflow.ChannelUpdate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.goflow.ChannelUpdate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.ChannelUpdate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getBufferSize();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getBufferUsed();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getIsClosed();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getRecentOperationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.goflow.ChannelOperation.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.goflow.ChannelUpdate.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.ChannelUpdate} returns this
 */
proto.goflow.ChannelUpdate.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 buffer_size = 2;
 * @return {number}
 */
proto.goflow.ChannelUpdate.prototype.getBufferSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.ChannelUpdate} returns this
 */
proto.goflow.ChannelUpdate.prototype.setBufferSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 buffer_used = 3;
 * @return {number}
 */
proto.goflow.ChannelUpdate.prototype.getBufferUsed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.ChannelUpdate} returns this
 */
proto.goflow.ChannelUpdate.prototype.setBufferUsed = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool is_closed = 4;
 * @return {boolean}
 */
proto.goflow.ChannelUpdate.prototype.getIsClosed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.goflow.ChannelUpdate} returns this
 */
proto.goflow.ChannelUpdate.prototype.setIsClosed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * repeated ChannelOperation recent_operations = 5;
 * @return {!Array<!proto.goflow.ChannelOperation>}
 */
proto.goflow.ChannelUpdate.prototype.getRecentOperationsList = function() {
  return /** @type{!Array<!proto.goflow.ChannelOperation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.goflow.ChannelOperation, 5));
};


/**
 * @param {!Array<!proto.goflow.ChannelOperation>} value
 * @return {!proto.goflow.ChannelUpdate} returns this
*/
proto.goflow.ChannelUpdate.prototype.setRecentOperationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.goflow.ChannelOperation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.goflow.ChannelOperation}
 */
proto.goflow.ChannelUpdate.prototype.addRecentOperations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.goflow.ChannelOperation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.goflow.ChannelUpdate} returns this
 */
proto.goflow.ChannelUpdate.prototype.clearRecentOperationsList = function() {
  return this.setRecentOperationsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.goflow.ChannelOperation.prototype.toObject = function(opt_includeInstance) {
  return proto.goflow.ChannelOperation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.goflow.ChannelOperation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.ChannelOperation.toObject = function(includeInstance, msg) {
  var f, obj = {
    channelId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    operationType: jspb.Message.getFieldWithDefault(msg, 2, ""),
    goroutineId: jspb.Message.getFieldWithDefault(msg, 3, 0),
    timestamp: jspb.Message.getFieldWithDefault(msg, 4, 0),
    blocked: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.goflow.ChannelOperation}
 */
proto.goflow.ChannelOperation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.goflow.ChannelOperation;
  return proto.goflow.ChannelOperation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.goflow.ChannelOperation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.goflow.ChannelOperation}
 */
proto.goflow.ChannelOperation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setChannelId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperationType(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setGoroutineId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBlocked(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.goflow.ChannelOperation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.goflow.ChannelOperation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.goflow.ChannelOperation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.ChannelOperation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getChannelId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getOperationType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getGoroutineId();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getBlocked();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional uint64 channel_id = 1;
 * @return {number}
 */
proto.goflow.ChannelOperation.prototype.getChannelId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.ChannelOperation} returns this
 */
proto.goflow.ChannelOperation.prototype.setChannelId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string operation_type = 2;
 * @return {string}
 */
proto.goflow.ChannelOperation.prototype.getOperationType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.goflow.ChannelOperation} returns this
 */
proto.goflow.ChannelOperation.prototype.setOperationType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint64 goroutine_id = 3;
 * @return {number}
 */
proto.goflow.ChannelOperation.prototype.getGoroutineId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.ChannelOperation} returns this
 */
proto.goflow.ChannelOperation.prototype.setGoroutineId = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 timestamp = 4;
 * @return {number}
 */
proto.goflow.ChannelOperation.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.ChannelOperation} returns this
 */
proto.goflow.ChannelOperation.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional bool blocked = 5;
 * @return {boolean}
 */
proto.goflow.ChannelOperation.prototype.getBlocked = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.goflow.ChannelOperation} returns this
 */
proto.goflow.ChannelOperation.prototype.setBlocked = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.goflow.DeadlockAlert.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.goflow.DeadlockAlert.prototype.toObject = function(opt_includeInstance) {
  return proto.goflow.DeadlockAlert.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.goflow.DeadlockAlert} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.DeadlockAlert.toObject = function(includeInstance, msg) {
  var f, obj = {
    detectedAt: jspb.Message.getFieldWithDefault(msg, 1, 0),
    cycleDetails: jspb.Message.getFieldWithDefault(msg, 2, ""),
    involvedGoroutinesList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    involvedChannelsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.goflow.DeadlockAlert}
 */
proto.goflow.DeadlockAlert.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.goflow.DeadlockAlert;
  return proto.goflow.DeadlockAlert.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.goflow.DeadlockAlert} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.goflow.DeadlockAlert}
 */
proto.goflow.DeadlockAlert.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDetectedAt(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCycleDetails(value);
      break;
    case 3:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint64() : [reader.readUint64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addInvolvedGoroutines(values[i]);
      }
      break;
    case 4:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint64() : [reader.readUint64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addInvolvedChannels(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.goflow.DeadlockAlert.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.goflow.DeadlockAlert.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.goflow.DeadlockAlert} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.goflow.DeadlockAlert.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDetectedAt();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getCycleDetails();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getInvolvedGoroutinesList();
  if (f.length > 0) {
    writer.writePackedUint64(
      3,
      f
    );
  }
  f = message.getInvolvedChannelsList();
  if (f.length > 0) {
    writer.writePackedUint64(
      4,
      f
    );
  }
};


/**
 * optional int64 detected_at = 1;
 * @return {number}
 */
proto.goflow.DeadlockAlert.prototype.getDetectedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.setDetectedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string cycle_details = 2;
 * @return {string}
 */
proto.goflow.DeadlockAlert.prototype.getCycleDetails = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.setCycleDetails = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated uint64 involved_goroutines = 3;
 * @return {!Array<number>}
 */
proto.goflow.DeadlockAlert.prototype.getInvolvedGoroutinesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.setInvolvedGoroutinesList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.addInvolvedGoroutines = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.clearInvolvedGoroutinesList = function() {
  return this.setInvolvedGoroutinesList([]);
};


/**
 * repeated uint64 involved_channels = 4;
 * @return {!Array<number>}
 */
proto.goflow.DeadlockAlert.prototype.getInvolvedChannelsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.setInvolvedChannelsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.addInvolvedChannels = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.goflow.DeadlockAlert} returns this
 */
proto.goflow.DeadlockAlert.prototype.clearInvolvedChannelsList = function() {
  return this.setInvolvedChannelsList([]);
};


goog.object.extend(exports, proto.goflow);