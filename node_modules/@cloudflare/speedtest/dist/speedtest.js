import 'isomorphic-fetch';
import memoize from 'lodash.memoize';
import { scaleThreshold } from 'd3-scale';

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      var base = _superPropBase(target, property);
      var desc;
      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }
      desc = Object.getOwnPropertyDescriptor(receiver, property);
      if (desc) {
        if (!desc.writable) {
          return false;
        }
        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        _defineProperty(receiver, property, value);
      }
      return true;
    };
  }
  return set(target, property, value, receiver);
}
function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);
  if (!s && isStrict) {
    throw new TypeError('failed to set property');
  }
  return value;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return fn;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}

var REL_API_URL = 'https://speed.cloudflare.com';
var defaultConfig = {
  // Engine
  autoStart: true,
  // APIs
  downloadApiUrl: "".concat(REL_API_URL, "/__down"),
  uploadApiUrl: "".concat(REL_API_URL, "/__up"),
  logMeasurementApiUrl: null,
  logAimApiUrl: 'https://aim.cloudflare.com/__log',
  turnServerUri: 'turn.speed.cloudflare.com:50000',
  turnServerCredsApiUrl: "".concat(REL_API_URL, "/turn-creds"),
  turnServerUser: null,
  turnServerPass: null,
  rpkiInvalidHost: 'invalid.rpki.cloudflare.com',
  cfTraceUrl: "".concat(REL_API_URL, "/cdn-cgi/trace"),
  includeCredentials: false,
  // Measurements
  measurements: [{
    type: 'latency',
    numPackets: 1
  },
  // initial ttfb estimation
  {
    type: 'download',
    bytes: 1e5,
    count: 1,
    bypassMinDuration: true
  },
  // initial download estimation
  {
    type: 'latency',
    numPackets: 20
  }, {
    type: 'download',
    bytes: 1e5,
    count: 9
  }, {
    type: 'download',
    bytes: 1e6,
    count: 8
  }, {
    type: 'upload',
    bytes: 1e5,
    count: 8
  }, {
    type: 'packetLoss',
    numPackets: 1e3,
    batchSize: 10,
    batchWaitTime: 10,
    // ms (in between batches)
    responsesWaitTime: 3000 // ms (silent time after last sent msg)
  }, {
    type: 'upload',
    bytes: 1e6,
    count: 6
  }, {
    type: 'download',
    bytes: 1e7,
    count: 6
  }, {
    type: 'upload',
    bytes: 1e7,
    count: 4
  }, {
    type: 'download',
    bytes: 2.5e7,
    count: 4
  }, {
    type: 'upload',
    bytes: 2.5e7,
    count: 4
  }, {
    type: 'download',
    bytes: 1e8,
    count: 3
  }, {
    type: 'upload',
    bytes: 5e7,
    count: 3
  }, {
    type: 'download',
    bytes: 2.5e8,
    count: 2
  }],
  measureDownloadLoadedLatency: true,
  measureUploadLoadedLatency: true,
  loadedLatencyThrottle: 400,
  // ms in between loaded latency requests
  bandwidthFinishRequestDuration: 1000,
  // download/upload duration (ms) to reach for stopping further measurements
  estimatedServerTime: 10,
  // ms to discount from latency calculation (if not present in response headers)

  // Result interpretation
  latencyPercentile: 0.5,
  // Percentile used to calculate latency from a set of measurements
  bandwidthPercentile: 0.9,
  // Percentile used to calculate bandwidth from a set of measurements
  bandwidthMinRequestDuration: 10,
  // minimum duration (ms) to consider a measurement good enough to use in bandwidth calculation
  loadedRequestMinDuration: 250,
  // minimum duration (ms) of a request to consider it to be loading the connection
  loadedLatencyMaxPoints: 20 // number of data points to keep for loaded latency
};

var internalConfig = {
  // AIM
  aimMeasurementScoring: {
    packetLoss: scaleThreshold([0.01, 0.05, 0.25, 0.5], [10, 5, 0, -10, -20]),
    latency: scaleThreshold([10, 20, 50, 100, 500], [20, 10, 5, 0, -10, -20]),
    loadedLatencyIncrease: scaleThreshold([10, 20, 50, 100, 500], [20, 10, 5, 0, -10, -20]),
    jitter: scaleThreshold([10, 20, 100, 500], [10, 5, 0, -10, -20]),
    download: scaleThreshold([1e6, 10e6, 50e6, 100e6], [0, 5, 10, 20, 30]),
    upload: scaleThreshold([1e6, 10e6, 50e6, 100e6], [0, 5, 10, 20, 30])
  },
  aimExperiencesDefs: {
    streaming: {
      input: ['latency', 'packetLoss', 'download', 'loadedLatencyIncrease'],
      pointThresholds: [15, 20, 40, 60]
    },
    gaming: {
      input: ['latency', 'packetLoss', 'loadedLatencyIncrease'],
      pointThresholds: [5, 15, 25, 30]
    },
    rtc: {
      input: ['latency', 'jitter', 'packetLoss', 'loadedLatencyIncrease'],
      pointThresholds: [5, 15, 25, 40]
    }
  }
};

var MAX_RETRIES = 20;
var ESTIMATED_HEADER_FRACTION = 0.005; // ~.5% of packet header / payload size. used when transferSize is not available.

var cfGetServerTime = function cfGetServerTime(r) {
  // extract server-timing from headers: server-timing: cfRequestDuration;dur=15.999794
  var serverTiming = r.headers.get("server-timing");
  if (serverTiming) {
    var re = serverTiming.match(/dur=([0-9.]+)/);
    if (re) return +re[1];
  }
};
var getTtfb = function getTtfb(perf) {
  return perf.responseStart - perf.requestStart;
};
var gePayloadDownload = function gePayloadDownload(perf) {
  return perf.responseEnd - perf.responseStart;
}; // min 1ms

var calcDownloadDuration = function calcDownloadDuration(_ref) {
  var ping = _ref.ping,
    payloadDownloadTime = _ref.payloadDownloadTime;
  return ping + payloadDownloadTime;
}; // request duration excluding server time

var calcUploadDuration = function calcUploadDuration(_ref2) {
  var ttfb = _ref2.ttfb;
  return ttfb;
};
var calcDownloadSpeed = function calcDownloadSpeed(_ref3, numBytes) {
  var duration = _ref3.duration,
    transferSize = _ref3.transferSize;
  // use transferSize if available. if estimating from numBytes, add ~0.5% of headers.
  var bits = 8 * (transferSize || +numBytes * (1 + ESTIMATED_HEADER_FRACTION));
  var secs = duration / 1000;
  return !secs ? undefined : bits / secs;
};
var calcUploadSpeed = function calcUploadSpeed(_ref4, numBytes) {
  var duration = _ref4.duration;
  var bits = 8 * numBytes * (1 + ESTIMATED_HEADER_FRACTION); // take into account estimated packet headers
  var secs = duration / 1000; // subtract estimated server time

  return !secs ? undefined : bits / secs;
};
var genContent = memoize(function (numBytes) {
  return '0'.repeat(numBytes);
});

//
var _qsParams = /*#__PURE__*/new WeakMap();
var _fetchOptions = /*#__PURE__*/new WeakMap();
var _responseHook = /*#__PURE__*/new WeakMap();
var _onRunningChange = /*#__PURE__*/new WeakMap();
var _onNewMeasurementStarted = /*#__PURE__*/new WeakMap();
var _onMeasurementResult = /*#__PURE__*/new WeakMap();
var _onFinished$1 = /*#__PURE__*/new WeakMap();
var _onConnectionError$1 = /*#__PURE__*/new WeakMap();
var _measurements = /*#__PURE__*/new WeakMap();
var _downloadApi = /*#__PURE__*/new WeakMap();
var _uploadApi = /*#__PURE__*/new WeakMap();
var _running$2 = /*#__PURE__*/new WeakMap();
var _finished$1 = /*#__PURE__*/new WeakMap();
var _results$1 = /*#__PURE__*/new WeakMap();
var _measIdx = /*#__PURE__*/new WeakMap();
var _counter = /*#__PURE__*/new WeakMap();
var _retries = /*#__PURE__*/new WeakMap();
var _minDuration = /*#__PURE__*/new WeakMap();
var _throttleMs = /*#__PURE__*/new WeakMap();
var _estimatedServerTime = /*#__PURE__*/new WeakMap();
var _currentFetchPromise = /*#__PURE__*/new WeakMap();
var _currentNextMsmTimeoutId = /*#__PURE__*/new WeakMap();
var _setRunning$2 = /*#__PURE__*/new WeakSet();
var _saveMeasurementResults = /*#__PURE__*/new WeakSet();
var _nextMeasurement = /*#__PURE__*/new WeakSet();
var _cancelCurrentMeasurement = /*#__PURE__*/new WeakSet();
var BandwidthMeasurementEngine = /*#__PURE__*/function () {
  function BandwidthMeasurementEngine(_measurements2) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      downloadApiUrl = _ref5.downloadApiUrl,
      uploadApiUrl = _ref5.uploadApiUrl,
      _ref5$throttleMs = _ref5.throttleMs,
      throttleMs = _ref5$throttleMs === void 0 ? 0 : _ref5$throttleMs,
      _ref5$estimatedServer = _ref5.estimatedServerTime,
      estimatedServerTime = _ref5$estimatedServer === void 0 ? 0 : _ref5$estimatedServer;
    _classCallCheck(this, BandwidthMeasurementEngine);
    _classPrivateMethodInitSpec(this, _cancelCurrentMeasurement);
    _classPrivateMethodInitSpec(this, _nextMeasurement);
    _classPrivateMethodInitSpec(this, _saveMeasurementResults);
    // Internal methods
    _classPrivateMethodInitSpec(this, _setRunning$2);
    _classPrivateFieldInitSpec(this, _qsParams, {
      writable: true,
      value: {}
    });
    _classPrivateFieldInitSpec(this, _fetchOptions, {
      writable: true,
      value: {}
    });
    _defineProperty(this, "finishRequestDuration", 1000);
    // download/upload duration (ms) to reach for stopping further measurements
    _defineProperty(this, "getServerTime", cfGetServerTime);
    // method to extract server time from response
    _classPrivateFieldInitSpec(this, _responseHook, {
      writable: true,
      value: function value(r) {
        return r;
      }
    });
    _classPrivateFieldInitSpec(this, _onRunningChange, {
      writable: true,
      value: function value() {}
    });
    _classPrivateFieldInitSpec(this, _onNewMeasurementStarted, {
      writable: true,
      value: function value() {}
    });
    _classPrivateFieldInitSpec(this, _onMeasurementResult, {
      writable: true,
      value: function value() {}
    });
    _classPrivateFieldInitSpec(this, _onFinished$1, {
      writable: true,
      value: function value() {}
    });
    _classPrivateFieldInitSpec(this, _onConnectionError$1, {
      writable: true,
      value: function value() {}
    });
    // Internal state
    _classPrivateFieldInitSpec(this, _measurements, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _downloadApi, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _uploadApi, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _running$2, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _finished$1, {
      writable: true,
      value: {
        down: false,
        up: false
      }
    });
    _classPrivateFieldInitSpec(this, _results$1, {
      writable: true,
      value: {
        down: {},
        up: {}
      }
    });
    _classPrivateFieldInitSpec(this, _measIdx, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _counter, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _retries, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _minDuration, {
      writable: true,
      value: -Infinity
    });
    // of current measurement
    _classPrivateFieldInitSpec(this, _throttleMs, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _estimatedServerTime, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _currentFetchPromise, {
      writable: true,
      value: undefined
    });
    _classPrivateFieldInitSpec(this, _currentNextMsmTimeoutId, {
      writable: true,
      value: undefined
    });
    if (!_measurements2) throw new Error('Missing measurements argument');
    if (!downloadApiUrl) throw new Error('Missing downloadApiUrl argument');
    if (!uploadApiUrl) throw new Error('Missing uploadApiUrl argument');
    _classPrivateFieldSet(this, _measurements, _measurements2);
    _classPrivateFieldSet(this, _downloadApi, downloadApiUrl);
    _classPrivateFieldSet(this, _uploadApi, uploadApiUrl);
    _classPrivateFieldSet(this, _throttleMs, throttleMs);
    _classPrivateFieldSet(this, _estimatedServerTime, Math.max(0, estimatedServerTime));
  }

  // Public attributes
  _createClass(BandwidthMeasurementEngine, [{
    key: "results",
    get: function get() {
      // read access to results
      return _classPrivateFieldGet(this, _results$1);
    }
  }, {
    key: "qsParams",
    get:
    // additional query string params to include in the requests
    function get() {
      return _classPrivateFieldGet(this, _qsParams);
    },
    set: function set(v) {
      _classPrivateFieldSet(this, _qsParams, v);
    }
  }, {
    key: "fetchOptions",
    get:
    // additional options included in the requests
    function get() {
      return _classPrivateFieldGet(this, _fetchOptions);
    },
    set: function set(v) {
      _classPrivateFieldSet(this, _fetchOptions, v);
    }
  }, {
    key: "responseHook",
    set:
    // pipe-through of response objects
    function set(f) {
      _classPrivateFieldSet(this, _responseHook, f);
    }
  }, {
    key: "onRunningChange",
    set:
    // callback invoked when engine starts/stops
    function set(f) {
      _classPrivateFieldSet(this, _onRunningChange, f);
    }
  }, {
    key: "onNewMeasurementStarted",
    set:
    // callback invoked when a new item in the measurement list is started
    function set(f) {
      _classPrivateFieldSet(this, _onNewMeasurementStarted, f);
    }
  }, {
    key: "onMeasurementResult",
    set:
    // callback invoked when a new measurement result arrives
    function set(f) {
      _classPrivateFieldSet(this, _onMeasurementResult, f);
    }
  }, {
    key: "onFinished",
    set:
    // callback invoked when all the measurements are finished
    function set(f) {
      _classPrivateFieldSet(this, _onFinished$1, f);
    }
  }, {
    key: "onConnectionError",
    set:
    // Invoked when unable to get a response from the API
    function set(f) {
      _classPrivateFieldSet(this, _onConnectionError$1, f);
    }

    // Public methods
  }, {
    key: "pause",
    value: function pause() {
      clearTimeout(_classPrivateFieldGet(this, _currentNextMsmTimeoutId));
      _classPrivateMethodGet(this, _cancelCurrentMeasurement, _cancelCurrentMeasurement2).call(this);
      _classPrivateMethodGet(this, _setRunning$2, _setRunning2$2).call(this, false);
    }
  }, {
    key: "play",
    value: function play() {
      if (!_classPrivateFieldGet(this, _running$2)) {
        _classPrivateMethodGet(this, _setRunning$2, _setRunning2$2).call(this, true);
        _classPrivateMethodGet(this, _nextMeasurement, _nextMeasurement2).call(this);
      }
    }
  }]);
  return BandwidthMeasurementEngine;
}();
function _setRunning2$2(running) {
  var _this = this;
  if (running !== _classPrivateFieldGet(this, _running$2)) {
    _classPrivateFieldSet(this, _running$2, running);
    setTimeout(function () {
      return _classPrivateFieldGet(_this, _onRunningChange).call(_this, _classPrivateFieldGet(_this, _running$2));
    });
  }
}
function _saveMeasurementResults2(measIdx, measTiming) {
  var _this2 = this;
  var _classPrivateFieldGet2 = _classPrivateFieldGet(this, _measurements)[measIdx],
    bytes = _classPrivateFieldGet2.bytes,
    dir = _classPrivateFieldGet2.dir;
  var results = _classPrivateFieldGet(this, _results$1);
  var bytesResult = results[dir].hasOwnProperty(bytes) ? results[dir][bytes] : {
    timings: [],
    // count all measurements with same bytes and direction
    numMeasurements: _classPrivateFieldGet(this, _measurements).filter(function (_ref6) {
      var b = _ref6.bytes,
        d = _ref6.dir;
      return bytes === b && dir === d;
    }).map(function (m) {
      return m.count;
    }).reduce(function (agg, cnt) {
      return agg + cnt;
    }, 0)
  };
  !!measTiming && bytesResult.timings.push(measTiming);
  bytesResult.timings = bytesResult.timings.slice(-bytesResult.numMeasurements);
  results[dir][bytes] = bytesResult;
  if (measTiming) {
    setTimeout(function () {
      _classPrivateFieldGet(_this2, _onMeasurementResult).call(_this2, _objectSpread2({
        type: dir,
        bytes: bytes
      }, measTiming), results);
    });
  } else {
    _classPrivateFieldGet(this, _onNewMeasurementStarted).call(this, _classPrivateFieldGet(this, _measurements)[measIdx], results);
  }
}
function _nextMeasurement2() {
  var _this3 = this;
  var measurements = _classPrivateFieldGet(this, _measurements);
  var meas = measurements[_classPrivateFieldGet(this, _measIdx)];
  if (_classPrivateFieldGet(this, _counter) >= meas.count) {
    // Finished current measurement
    var finished = _classPrivateFieldGet(this, _finished$1);
    if (_classPrivateFieldGet(this, _minDuration) > this.finishRequestDuration && !meas.bypassMinDuration) {
      // mark direction as finished
      var _dir = meas.dir;
      _classPrivateFieldGet(this, _finished$1)[_dir] = true;
      Object.values(_classPrivateFieldGet(this, _finished$1)).every(function (finished) {
        return finished;
      }) && _classPrivateFieldGet(this, _onFinished$1).call(this, _classPrivateFieldGet(this, _results$1));
    }

    // clear settings
    _classPrivateFieldSet(this, _counter, 0);
    _classPrivateFieldSet(this, _minDuration, -Infinity);
    performance.clearResourceTimings();
    do {
      _classPrivateFieldSet(this, _measIdx, _classPrivateFieldGet(this, _measIdx) + 1); // skip through finished measurements
    } while (_classPrivateFieldGet(this, _measIdx) < measurements.length && finished[measurements[_classPrivateFieldGet(this, _measIdx)].dir]);
    if (_classPrivateFieldGet(this, _measIdx) >= measurements.length) {
      // reached the end: halt further measurements
      _classPrivateFieldSet(this, _finished$1, {
        down: true,
        up: true
      });
      _classPrivateMethodGet(this, _setRunning$2, _setRunning2$2).call(this, false);
      _classPrivateFieldGet(this, _onFinished$1).call(this, _classPrivateFieldGet(this, _results$1));
      return;
    }
    meas = measurements[_classPrivateFieldGet(this, _measIdx)];
  }
  var measIdx = _classPrivateFieldGet(this, _measIdx);
  if (_classPrivateFieldGet(this, _counter) === 0) {
    _classPrivateMethodGet(this, _saveMeasurementResults, _saveMeasurementResults2).call(this, measIdx); // register measurement start
  }

  var _meas = meas,
    numBytes = _meas.bytes,
    dir = _meas.dir;
  var isDown = dir === 'down';
  var apiUrl = isDown ? _classPrivateFieldGet(this, _downloadApi) : _classPrivateFieldGet(this, _uploadApi);
  var qsParams = Object.assign({}, _classPrivateFieldGet(this, _qsParams));
  isDown && (qsParams.bytes = "".concat(numBytes));
  var url = "".concat(apiUrl.startsWith('http') || apiUrl.startsWith('//') ? '' : window.location.origin // use abs to match perf timing urls
  ).concat(apiUrl, "?").concat(Object.entries(qsParams).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      k = _ref8[0],
      v = _ref8[1];
    return "".concat(k, "=").concat(v);
  }).join('&'));
  var fetchOpt = Object.assign({}, isDown ? {} : {
    method: 'POST',
    body: genContent(numBytes)
  }, _classPrivateFieldGet(this, _fetchOptions));
  var serverTime;
  var curPromise = _classPrivateFieldSet(this, _currentFetchPromise, fetch(url, fetchOpt) // eslint-disable-line compat/compat
  .then(function (r) {
    if (r.ok) return r;
    throw Error(r.statusText);
  }).then(function (r) {
    _this3.getServerTime && (serverTime = _this3.getServerTime(r));
    return r;
  }).then(function (r) {
    return r.text().then(function (body) {
      _classPrivateFieldGet(_this3, _responseHook) && _classPrivateFieldGet(_this3, _responseHook).call(_this3, {
        url: url,
        headers: r.headers,
        body: body
      });
      return body;
    });
  }).then(function (_, reject) {
    if (curPromise._cancel) {
      reject('cancelled');
      return;
    }
    var perf = performance.getEntriesByName(url).slice(-1)[0]; // get latest perf timing
    var timing = {
      transferSize: perf.transferSize,
      ttfb: getTtfb(perf),
      payloadDownloadTime: gePayloadDownload(perf),
      serverTime: serverTime || -1,
      measTime: new Date()
    };
    timing.ping = Math.max(1e-2, timing.ttfb - (serverTime || _classPrivateFieldGet(_this3, _estimatedServerTime))); // ttfb = network latency + server time

    timing.duration = (isDown ? calcDownloadDuration : calcUploadDuration)(timing);
    timing.bps = (isDown ? calcDownloadSpeed : calcUploadSpeed)(timing, numBytes);
    if (isDown && numBytes) {
      var reqSize = +numBytes;
      if (timing.transferSize && (timing.transferSize < reqSize || timing.transferSize / reqSize > 1.05)) {
        // log if transferSize is too different from requested size
        console.warn("Requested ".concat(reqSize, "B but received ").concat(timing.transferSize, "B (").concat(Math.round(timing.transferSize / reqSize * 1e4) / 1e2, "%)."));
      }
    }
    _classPrivateMethodGet(_this3, _saveMeasurementResults, _saveMeasurementResults2).call(_this3, measIdx, timing);
    var requestDuration = timing.duration;
    _classPrivateFieldSet(_this3, _minDuration, _classPrivateFieldGet(_this3, _minDuration) < 0 ? requestDuration : Math.min(_classPrivateFieldGet(_this3, _minDuration), requestDuration)); // carry minimum request duration

    _classPrivateFieldSet(_this3, _counter, _classPrivateFieldGet(_this3, _counter) + 1);
    _classPrivateFieldSet(_this3, _retries, 0);
    if (_classPrivateFieldGet(_this3, _throttleMs)) {
      _classPrivateFieldSet(_this3, _currentNextMsmTimeoutId, setTimeout(function () {
        return _classPrivateMethodGet(_this3, _nextMeasurement, _nextMeasurement2).call(_this3);
      }, _classPrivateFieldGet(_this3, _throttleMs)));
    } else {
      _classPrivateMethodGet(_this3, _nextMeasurement, _nextMeasurement2).call(_this3);
    }
  })["catch"](function (error) {
    var _this$retries, _this$retries2;
    if (curPromise._cancel) return;
    console.warn("Error fetching ".concat(url, ": ").concat(error));
    if ((_classPrivateFieldSet(_this3, _retries, (_this$retries = _classPrivateFieldGet(_this3, _retries), _this$retries2 = _this$retries++, _this$retries)), _this$retries2) < MAX_RETRIES) {
      _classPrivateMethodGet(_this3, _nextMeasurement, _nextMeasurement2).call(_this3); // keep trying
    } else {
      _classPrivateFieldSet(_this3, _retries, 0);
      _classPrivateMethodGet(_this3, _setRunning$2, _setRunning2$2).call(_this3, false);
      _classPrivateFieldGet(_this3, _onConnectionError$1).call(_this3, "Connection failed to ".concat(url, ". Gave up after ").concat(MAX_RETRIES, " retries."));
    }
  }));
}
function _cancelCurrentMeasurement2() {
  var curPromise = _classPrivateFieldGet(this, _currentFetchPromise);
  curPromise && (curPromise._cancel = true);
}
var BandwidthEngine$2 = BandwidthMeasurementEngine;

var _excluded$5 = ["measureParallelLatency", "parallelLatencyThrottleMs", "downloadApiUrl", "uploadApiUrl", "estimatedServerTime"];
var _latencyEngine = /*#__PURE__*/new WeakMap();
var _setLatencyRunning = /*#__PURE__*/new WeakSet();
var BandwidthWithParallelLatencyEngine = /*#__PURE__*/function (_BandwidthEngine) {
  _inherits(BandwidthWithParallelLatencyEngine, _BandwidthEngine);
  var _super = _createSuper(BandwidthWithParallelLatencyEngine);
  function BandwidthWithParallelLatencyEngine(measurements) {
    var _thisSuper, _thisSuper2, _this;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$measureParallelL = _ref.measureParallelLatency,
      measureParallelLatency = _ref$measureParallelL === void 0 ? false : _ref$measureParallelL,
      _ref$parallelLatencyT = _ref.parallelLatencyThrottleMs,
      parallelLatencyThrottleMs = _ref$parallelLatencyT === void 0 ? 100 : _ref$parallelLatencyT,
      downloadApiUrl = _ref.downloadApiUrl,
      uploadApiUrl = _ref.uploadApiUrl,
      _ref$estimatedServerT = _ref.estimatedServerTime,
      estimatedServerTime = _ref$estimatedServerT === void 0 ? 0 : _ref$estimatedServerT,
      ptProps = _objectWithoutProperties(_ref, _excluded$5);
    _classCallCheck(this, BandwidthWithParallelLatencyEngine);
    _this = _super.call(this, measurements, _objectSpread2({
      downloadApiUrl: downloadApiUrl,
      uploadApiUrl: uploadApiUrl,
      estimatedServerTime: estimatedServerTime
    }, ptProps));
    // Internal methods
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _setLatencyRunning);
    // Internal state
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _latencyEngine, {
      writable: true,
      value: void 0
    });
    if (measureParallelLatency) {
      _classPrivateFieldSet(_assertThisInitialized(_this), _latencyEngine, new BandwidthEngine$2([{
        dir: 'down',
        bytes: 0,
        count: Infinity,
        bypassMinDuration: true
      }], {
        downloadApiUrl: downloadApiUrl,
        uploadApiUrl: uploadApiUrl,
        estimatedServerTime: estimatedServerTime,
        throttleMs: parallelLatencyThrottleMs
      }));
      _classPrivateFieldGet(_assertThisInitialized(_this), _latencyEngine).qsParams = {
        during: "".concat(measurements[0].dir, "load")
      };
      _set((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(BandwidthWithParallelLatencyEngine.prototype)), "onRunningChange", _classPrivateMethodGet(_assertThisInitialized(_this), _setLatencyRunning, _setLatencyRunning2), _thisSuper, true);
      _set((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(BandwidthWithParallelLatencyEngine.prototype)), "onConnectionError", function () {
        return _classPrivateFieldGet(_assertThisInitialized(_this), _latencyEngine).pause();
      }, _thisSuper2, true);
    }
    return _this;
  }

  // Public attributes
  _createClass(BandwidthWithParallelLatencyEngine, [{
    key: "latencyResults",
    get: function get() {
      // read access to latency results
      return _classPrivateFieldGet(this, _latencyEngine) && _classPrivateFieldGet(this, _latencyEngine).results.down[0].timings;
    }

    // callback invoked when a new parallel latency result arrives
  }, {
    key: "onParallelLatencyResult",
    set: function set(f) {
      _classPrivateFieldGet(this, _latencyEngine) && (_classPrivateFieldGet(this, _latencyEngine).onMeasurementResult = function (res) {
        return f(res);
      });
    }

    // Overridden attributes
  }, {
    key: "fetchOptions",
    get: function get() {
      return _get(_getPrototypeOf(BandwidthWithParallelLatencyEngine.prototype), "fetchOptions", this);
    },
    set: function set(fetchOptions) {
      _set(_getPrototypeOf(BandwidthWithParallelLatencyEngine.prototype), "fetchOptions", fetchOptions, this, true);
      _classPrivateFieldGet(this, _latencyEngine) && (_classPrivateFieldGet(this, _latencyEngine).fetchOptions = fetchOptions);
    }
  }, {
    key: "onRunningChange",
    set: function set(onRunningChange) {
      var _this2 = this;
      _set(_getPrototypeOf(BandwidthWithParallelLatencyEngine.prototype), "onRunningChange", function (running) {
        _classPrivateMethodGet(_this2, _setLatencyRunning, _setLatencyRunning2).call(_this2, running);
        onRunningChange(running);
      }, this, true);
    }
  }, {
    key: "onConnectionError",
    set: function set(onConnectionError) {
      var _this3 = this;
      _set(_getPrototypeOf(BandwidthWithParallelLatencyEngine.prototype), "onConnectionError", function () {
        _classPrivateFieldGet(_this3, _latencyEngine) && _classPrivateFieldGet(_this3, _latencyEngine).pause();
        onConnectionError.apply(void 0, arguments);
      }, this, true);
    }
  }]);
  return BandwidthWithParallelLatencyEngine;
}(BandwidthEngine$2);
function _setLatencyRunning2(running) {
  var _this4 = this;
  _classPrivateFieldGet(this, _latencyEngine) && (!running ? _classPrivateFieldGet(this, _latencyEngine).pause() :
  // slight delay in starting latency measurements
  setTimeout(function () {
    return _classPrivateFieldGet(_this4, _latencyEngine).play();
  }, 20));
}
var BandwidthEngine$1 = BandwidthWithParallelLatencyEngine;

var _excluded$4 = ["measurementId", "logApiUrl"];
var _measurementId$1 = /*#__PURE__*/new WeakMap();
var _token = /*#__PURE__*/new WeakMap();
var _requestTime = /*#__PURE__*/new WeakMap();
var _logApiUrl = /*#__PURE__*/new WeakMap();
var _loggingResponseHook = /*#__PURE__*/new WeakSet();
var _logMeasurement = /*#__PURE__*/new WeakSet();
var LoggingBandwidthEngine = /*#__PURE__*/function (_BandwidthEngine) {
  _inherits(LoggingBandwidthEngine, _BandwidthEngine);
  var _super = _createSuper(LoggingBandwidthEngine);
  function LoggingBandwidthEngine(measurements) {
    var _thisSuper, _thisSuper2, _thisSuper3, _this;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      measurementId = _ref.measurementId,
      logApiUrl = _ref.logApiUrl,
      ptProps = _objectWithoutProperties(_ref, _excluded$4);
    _classCallCheck(this, LoggingBandwidthEngine);
    _this = _super.call(this, measurements, ptProps);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _logMeasurement);
    // Internal methods
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _loggingResponseHook);
    // Internal state
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _measurementId$1, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _token, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _requestTime, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _logApiUrl, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _measurementId$1, measurementId);
    _classPrivateFieldSet(_assertThisInitialized(_this), _logApiUrl, logApiUrl);
    _set((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(LoggingBandwidthEngine.prototype)), "qsParams", logApiUrl ? {
      measId: _classPrivateFieldGet(_assertThisInitialized(_this), _measurementId$1)
    } : {}, _thisSuper, true);
    _set((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(LoggingBandwidthEngine.prototype)), "responseHook", function (r) {
      return _classPrivateMethodGet(_assertThisInitialized(_this), _loggingResponseHook, _loggingResponseHook2).call(_assertThisInitialized(_this), r);
    }, _thisSuper2, true);
    _set((_thisSuper3 = _assertThisInitialized(_this), _getPrototypeOf(LoggingBandwidthEngine.prototype)), "onMeasurementResult", function (meas) {
      return _classPrivateMethodGet(_assertThisInitialized(_this), _logMeasurement, _logMeasurement2).call(_assertThisInitialized(_this), meas);
    }, _thisSuper3, true);
    return _this;
  }

  // Overridden attributes
  _createClass(LoggingBandwidthEngine, [{
    key: "qsParams",
    set: function set(qsParams) {
      _set(_getPrototypeOf(LoggingBandwidthEngine.prototype), "qsParams", _classPrivateFieldGet(this, _logApiUrl) ? _objectSpread2({
        measId: _classPrivateFieldGet(this, _measurementId$1)
      }, qsParams) : qsParams, this, true);
    }
  }, {
    key: "responseHook",
    set: function set(responseHook) {
      var _this2 = this;
      _set(_getPrototypeOf(LoggingBandwidthEngine.prototype), "responseHook", function (r) {
        responseHook(r);
        _classPrivateMethodGet(_this2, _loggingResponseHook, _loggingResponseHook2).call(_this2, r);
      }, this, true);
    }
  }, {
    key: "onMeasurementResult",
    set: function set(onMeasurementResult) {
      var _this3 = this;
      _set(_getPrototypeOf(LoggingBandwidthEngine.prototype), "onMeasurementResult", function (meas) {
        for (var _len = arguments.length, restArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          restArgs[_key - 1] = arguments[_key];
        }
        onMeasurementResult.apply(void 0, [meas].concat(restArgs));
        _classPrivateMethodGet(_this3, _logMeasurement, _logMeasurement2).call(_this3, meas);
      }, this, true);
    }
  }]);
  return LoggingBandwidthEngine;
}(BandwidthEngine$1);
function _loggingResponseHook2(r) {
  if (!_classPrivateFieldGet(this, _logApiUrl)) return;

  // get request time
  _classPrivateFieldSet(this, _requestTime, +r.headers.get("cf-meta-request-time"));

  // get token in payload
  _classPrivateFieldSet(this, _token, r.body.slice(-300).split('___').pop());
}
function _logMeasurement2(measData) {
  if (!_classPrivateFieldGet(this, _logApiUrl)) return;
  var logData = {
    type: measData.type,
    bytes: measData.bytes,
    ping: Math.round(measData.ping),
    // round to ms
    ttfb: Math.round(measData.ttfb),
    // round to ms
    payloadDownloadTime: Math.round(measData.payloadDownloadTime),
    duration: Math.round(measData.duration),
    transferSize: Math.round(measData.transferSize),
    serverTime: Math.round(measData.serverTime),
    token: _classPrivateFieldGet(this, _token),
    requestTime: _classPrivateFieldGet(this, _requestTime),
    measId: _classPrivateFieldGet(this, _measurementId$1)
  };
  _classPrivateFieldSet(this, _token, null);
  _classPrivateFieldSet(this, _requestTime, null);

  // eslint-disable-next-line compat/compat
  fetch(_classPrivateFieldGet(this, _logApiUrl), _objectSpread2({
    method: 'POST',
    body: JSON.stringify(logData)
  }, this.fetchOptions));
}
var BandwidthEngine = LoggingBandwidthEngine;

var _running$1 = /*#__PURE__*/new WeakMap();
var _currentPromise = /*#__PURE__*/new WeakMap();
var _promiseFn = /*#__PURE__*/new WeakMap();
var _setRunning$1 = /*#__PURE__*/new WeakSet();
var _next$1 = /*#__PURE__*/new WeakSet();
var _cancelCurrent = /*#__PURE__*/new WeakSet();
var PromiseEngine = /*#__PURE__*/function () {
  function PromiseEngine(promiseFn) {
    _classCallCheck(this, PromiseEngine);
    _classPrivateMethodInitSpec(this, _cancelCurrent);
    _classPrivateMethodInitSpec(this, _next$1);
    // Internal methods
    _classPrivateMethodInitSpec(this, _setRunning$1);
    // Internal state
    _classPrivateFieldInitSpec(this, _running$1, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _currentPromise, {
      writable: true,
      value: undefined
    });
    _classPrivateFieldInitSpec(this, _promiseFn, {
      writable: true,
      value: void 0
    });
    if (!promiseFn) throw new Error("Missing operation to perform");
    _classPrivateFieldSet(this, _promiseFn, promiseFn);
    this.play();
  }

  // Public methods
  _createClass(PromiseEngine, [{
    key: "pause",
    value: function pause() {
      _classPrivateMethodGet(this, _cancelCurrent, _cancelCurrent2).call(this);
      _classPrivateMethodGet(this, _setRunning$1, _setRunning2$1).call(this, false);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.pause();
    }
  }, {
    key: "play",
    value: function play() {
      if (!_classPrivateFieldGet(this, _running$1)) {
        _classPrivateMethodGet(this, _setRunning$1, _setRunning2$1).call(this, true);
        _classPrivateMethodGet(this, _next$1, _next2$1).call(this);
      }
    }
  }]);
  return PromiseEngine;
}();
function _setRunning2$1(running) {
  if (running !== _classPrivateFieldGet(this, _running$1)) {
    _classPrivateFieldSet(this, _running$1, running);
  }
}
function _next2$1() {
  var _this2 = this;
  var curPromise = _classPrivateFieldSet(this, _currentPromise, _classPrivateFieldGet(this, _promiseFn).call(this) // eslint-disable-line compat/compat
  .then(function () {
    !curPromise._cancel && _classPrivateMethodGet(_this2, _next$1, _next2$1).call(_this2);
  }));
}
function _cancelCurrent2() {
  var curPromise = _classPrivateFieldGet(this, _currentPromise);
  curPromise && (curPromise._cancel = true);
}
var _engines = /*#__PURE__*/new WeakMap();
var LoadNetworkEngine = /*#__PURE__*/function () {
  function LoadNetworkEngine() {
    var _this = this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      download = _ref.download,
      upload = _ref.upload;
    _classCallCheck(this, LoadNetworkEngine);
    // Public attributes
    _defineProperty(this, "qsParams", {});
    // additional query string params to include in the requests
    _defineProperty(this, "fetchOptions", {});
    // Internal state
    _classPrivateFieldInitSpec(this, _engines, {
      writable: true,
      value: []
    });
    // Expected attrs for each: { apiUrl, chunkSize }
    if (!download && !upload) throw new Error('Missing at least one of download/upload config');
    [[download, 'download'], [upload, 'upload']].filter(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        cfg = _ref3[0];
      return cfg;
    }).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        cfg = _ref5[0],
        type = _ref5[1];
      var apiUrl = cfg.apiUrl,
        chunkSize = cfg.chunkSize;
      if (!apiUrl) throw new Error("Missing ".concat(type, " apiUrl argument"));
      if (!chunkSize) throw new Error("Missing ".concat(type, " chunkSize argument"));
    });
    var getLoadEngine = function getLoadEngine(_ref6) {
      var apiUrl = _ref6.apiUrl,
        _ref6$qsParams = _ref6.qsParams,
        qsParams = _ref6$qsParams === void 0 ? {} : _ref6$qsParams,
        _ref6$fetchOptions = _ref6.fetchOptions,
        fetchOptions = _ref6$fetchOptions === void 0 ? {} : _ref6$fetchOptions;
      return new PromiseEngine(function () {
        var fetchQsParams = Object.assign({}, qsParams, _this.qsParams);
        var url = "".concat(apiUrl.startsWith('http') || apiUrl.startsWith('//') ? '' : window.location.origin // use abs to match perf timing urls
        ).concat(apiUrl, "?").concat(Object.entries(fetchQsParams).map(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];
          return "".concat(k, "=").concat(v);
        }).join('&'));
        var fetchOpt = Object.assign({}, fetchOptions, _this.fetchOptions);
        return fetch(url, fetchOpt).then(function (r) {
          if (r.ok) return r;
          throw Error(r.statusText);
        }).then(function (r) {
          return r.text();
        });
      });
    };
    download && _classPrivateFieldGet(this, _engines).push(getLoadEngine({
      apiUrl: download.apiUrl,
      qsParams: {
        bytes: "".concat(download.chunkSize)
      }
    }));
    upload && _classPrivateFieldGet(this, _engines).push(getLoadEngine({
      apiUrl: upload.apiUrl,
      fetchOptions: {
        method: 'POST',
        body: '0'.repeat(upload.chunkSize)
      }
    }));
  }
  _createClass(LoadNetworkEngine, [{
    key: "pause",
    value:
    // additional options included in the requests
    // Public methods
    function pause() {
      _classPrivateFieldGet(this, _engines).forEach(function (engine) {
        return engine.pause();
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.pause();
    }
  }, {
    key: "play",
    value: function play() {
      _classPrivateFieldGet(this, _engines).forEach(function (engine) {
        return engine.play();
      });
    }
  }]);
  return LoadNetworkEngine;
}();
var LoadNetworkEngine$1 = LoadNetworkEngine;

var _excluded$3 = ["iceServers", "acceptIceCandidate", "dataChannelCfg"];
var _established = /*#__PURE__*/new WeakMap();
var _sender = /*#__PURE__*/new WeakMap();
var _receiver = /*#__PURE__*/new WeakMap();
var _senderDc = /*#__PURE__*/new WeakMap();
var _receiverDc = /*#__PURE__*/new WeakMap();
var SelfWebRtcDataConnection = /*#__PURE__*/function () {
  function SelfWebRtcDataConnection() {
    var _this = this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$iceServers = _ref.iceServers,
      iceServers = _ref$iceServers === void 0 ? [] : _ref$iceServers,
      _ref$acceptIceCandida = _ref.acceptIceCandidate,
      acceptIceCandidate = _ref$acceptIceCandida === void 0 ? function (candidate) {
        var protocol = candidate.protocol || '';
        // parsed webRTC candidate properties not extracted in Firefox: https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate
        if (!protocol && candidate.candidate) {
          var sdpAttrs = candidate.candidate.split(' ');
          sdpAttrs.length >= 3 && (protocol = sdpAttrs[2]);
        }
        return protocol.toLowerCase() === 'udp';
      } : _ref$acceptIceCandida,
      _ref$dataChannelCfg = _ref.dataChannelCfg,
      dataChannelCfg = _ref$dataChannelCfg === void 0 ? {
        ordered: false,
        maxRetransmits: 0
      } : _ref$dataChannelCfg,
      rtcPeerConnectionCfg = _objectWithoutProperties(_ref, _excluded$3);
    _classCallCheck(this, SelfWebRtcDataConnection);
    // Public attributes
    _defineProperty(this, "onOpen", function () {});
    // callback invoked when WebRTC TURN connection is established
    _defineProperty(this, "onClose", function () {});
    // callback invoked when WebRTC TURN connection is closed
    _defineProperty(this, "onMessageReceived", function () {});
    // Internal state
    _classPrivateFieldInitSpec(this, _established, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _sender, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _receiver, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _senderDc, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _receiverDc, {
      writable: true,
      value: void 0
    });
    var sender = new RTCPeerConnection(_objectSpread2({
      iceServers: iceServers
    }, rtcPeerConnectionCfg));
    var receiver = new RTCPeerConnection(_objectSpread2({
      iceServers: iceServers
    }, rtcPeerConnectionCfg));
    var senderDc = sender.createDataChannel('channel', dataChannelCfg);
    senderDc.onopen = function () {
      _classPrivateFieldSet(_this, _established, true);
      _this.onOpen();
    };
    senderDc.onclose = function () {
      return _this.close();
    };
    // senderDc.onmessage = msg => this.#onMessage(msg.data);

    receiver.ondatachannel = function (e) {
      var dc = e.channel;
      dc.onclose = function () {
        return _this.close();
      };
      dc.onmessage = function (msg) {
        return _this.onMessageReceived(msg.data);
      };
      _classPrivateFieldSet(_this, _receiverDc, dc);
    };

    // sender.onconnectionstatechange = e => console.log('connection state change', e);
    // sender.oniceconnectionstatechange = e => console.log('ice connection state change', e);
    // sender.onicecandidateerror = e => console.log('ice error', e);
    sender.onicecandidate = function (e) {
      // console.log('sender', e.candidate);
      e.candidate && acceptIceCandidate(e.candidate) && receiver.addIceCandidate(e.candidate);
    };
    receiver.onicecandidate = function (e) {
      // console.log('receiver', e.candidate);
      e.candidate && acceptIceCandidate(e.candidate) && sender.addIceCandidate(e.candidate);
    };
    sender.createOffer().then(function (offer) {
      return sender.setLocalDescription(offer);
    }).then(function () {
      return receiver.setRemoteDescription(sender.localDescription);
    }).then(function () {
      return receiver.createAnswer();
    }).then(function (answer) {
      return receiver.setLocalDescription(answer);
    }).then(function () {
      return sender.setRemoteDescription(receiver.localDescription);
    });
    _classPrivateFieldSet(this, _sender, sender);
    _classPrivateFieldSet(this, _receiver, receiver);
    _classPrivateFieldSet(this, _senderDc, senderDc);
    _classPrivateFieldSet(this, _established, false);
  }
  _createClass(SelfWebRtcDataConnection, [{
    key: "send",
    value:
    // callback invoked when a new message is received from the TURN server
    // Public methods
    function send(msg) {
      return _classPrivateFieldGet(this, _senderDc).send(msg);
    }
  }, {
    key: "close",
    value: function close() {
      _classPrivateFieldGet(this, _sender) && _classPrivateFieldGet(this, _sender).close();
      _classPrivateFieldGet(this, _receiver) && _classPrivateFieldGet(this, _receiver).close();
      _classPrivateFieldGet(this, _senderDc) && _classPrivateFieldGet(this, _senderDc).close();
      _classPrivateFieldGet(this, _receiverDc) && _classPrivateFieldGet(this, _receiverDc).close();
      _classPrivateFieldGet(this, _established) && this.onClose();
      _classPrivateFieldSet(this, _established, false);
      return this;
    }
  }]);
  return SelfWebRtcDataConnection;
}();

var _onCredentialsFailure = /*#__PURE__*/new WeakMap();
var _onConnectionError = /*#__PURE__*/new WeakMap();
var _onFinished = /*#__PURE__*/new WeakMap();
var _msgTracker = /*#__PURE__*/new WeakMap();
var _webRtcConnection = /*#__PURE__*/new WeakMap();
var _numMsgs = /*#__PURE__*/new WeakMap();
var PacketLossEngine$1 = /*#__PURE__*/function () {
  function PacketLossEngine() {
    var _this = this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      turnServerUri = _ref.turnServerUri,
      turnServerCredsApi = _ref.turnServerCredsApi,
      _ref$turnServerCredsA = _ref.turnServerCredsApiParser,
      turnServerCredsApiParser = _ref$turnServerCredsA === void 0 ? function (_ref2) {
        var username = _ref2.username,
          credential = _ref2.credential;
        return {
          turnServerUser: username,
          turnServerPass: credential
        };
      } : _ref$turnServerCredsA,
      _ref$turnServerCredsA2 = _ref.turnServerCredsApiIncludeCredentials,
      turnServerCredsApiIncludeCredentials = _ref$turnServerCredsA2 === void 0 ? false : _ref$turnServerCredsA2,
      turnServerUser = _ref.turnServerUser,
      turnServerPass = _ref.turnServerPass,
      _ref$numMsgs = _ref.numMsgs,
      numMsgs = _ref$numMsgs === void 0 ? 100 : _ref$numMsgs,
      _ref$batchSize = _ref.batchSize,
      batchSize = _ref$batchSize === void 0 ? 10 : _ref$batchSize,
      _ref$batchWaitTime = _ref.batchWaitTime,
      batchWaitTime = _ref$batchWaitTime === void 0 ? 10 : _ref$batchWaitTime,
      _ref$responsesWaitTim = _ref.responsesWaitTime,
      responsesWaitTime = _ref$responsesWaitTim === void 0 ? 5000 : _ref$responsesWaitTim,
      _ref$connectionTimeou = _ref.connectionTimeout,
      connectionTimeout = _ref$connectionTimeou === void 0 ? 5000 : _ref$connectionTimeou;
    _classCallCheck(this, PacketLossEngine);
    // Public attributes
    _classPrivateFieldInitSpec(this, _onCredentialsFailure, {
      writable: true,
      value: function value() {}
    });
    _classPrivateFieldInitSpec(this, _onConnectionError, {
      writable: true,
      value: function value() {}
    });
    _classPrivateFieldInitSpec(this, _onFinished, {
      writable: true,
      value: function value() {}
    });
    _defineProperty(this, "onMsgSent", function () {});
    // Invoked when sending a new message to the TURN server
    _defineProperty(this, "onAllMsgsSent", function () {});
    // Invoked when all messages have been sent
    _defineProperty(this, "onMsgReceived", function () {});
    // Public methods
    // Internal state
    _classPrivateFieldInitSpec(this, _msgTracker, {
      writable: true,
      value: {}
    });
    _classPrivateFieldInitSpec(this, _webRtcConnection, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _numMsgs, {
      writable: true,
      value: void 0
    });
    if (!turnServerUri) throw new Error('Missing turnServerUri argument');
    if ((!turnServerUser || !turnServerPass) && !turnServerCredsApi) throw new Error('Missing either turnServerCredsApi or turnServerUser+turnServerPass arguments');
    _classPrivateFieldSet(this, _numMsgs, numMsgs);
    (!turnServerUser || !turnServerPass ?
    // Get TURN credentials from API endpoint if not statically supplied
    fetch(turnServerCredsApi, {
      credentials: turnServerCredsApiIncludeCredentials ? 'include' : undefined
    }).then(function (r) {
      return r.json();
    }).then(function (d) {
      if (d.error) throw d.error;
      return d;
    }).then(turnServerCredsApiParser) : Promise.resolve({
      turnServerUser: turnServerUser,
      turnServerPass: turnServerPass
    }))["catch"](function (e) {
      return _classPrivateFieldGet(_this, _onCredentialsFailure).call(_this, e);
    }).then(function (_ref3) {
      var turnServerUser = _ref3.turnServerUser,
        turnServerPass = _ref3.turnServerPass;
      var c = _classPrivateFieldSet(_this, _webRtcConnection, new SelfWebRtcDataConnection({
        iceServers: [{
          urls: "turn:".concat(turnServerUri, "?transport=udp"),
          username: turnServerUser,
          credential: turnServerPass
        }],
        iceTransportPolicy: 'relay'
      }));
      var connectionSuccess = false;
      setTimeout(function () {
        if (!connectionSuccess) {
          c.close();
          _classPrivateFieldGet(_this, _onConnectionError).call(_this, 'ICE connection timeout!');
        }
      }, connectionTimeout);
      var msgTracker = _classPrivateFieldGet(_this, _msgTracker);
      c.onOpen = function () {
        connectionSuccess = true;
        var self = _this;
        (function sendNum(n) {
          if (n <= numMsgs) {
            var i = n;
            while (i <= Math.min(numMsgs, n + batchSize - 1)) {
              msgTracker[i] = false;
              c.send(i);
              self.onMsgSent(i);
              i++;
            }
            setTimeout(function () {
              return sendNum(i);
            }, batchWaitTime);
          } else {
            self.onAllMsgsSent(Object.keys(msgTracker).length);
            var finishFn = function finishFn() {
              c.close();
              _classPrivateFieldGet(self, _onFinished).call(self, self.results);
            };
            var finishTimeout = setTimeout(finishFn, responsesWaitTime);
            var missingMsgs = Object.values(_classPrivateFieldGet(self, _msgTracker)).filter(function (recv) {
              return !recv;
            }).length;
            c.onMessageReceived = function (msg) {
              clearTimeout(finishTimeout);
              msgTracker[msg] = true;
              self.onMsgReceived(msg);
              missingMsgs--;
              if (missingMsgs <= 0 && Object.values(_classPrivateFieldGet(self, _msgTracker)).every(function (recv) {
                return recv;
              })) {
                // Last msg received, shortcut out
                finishFn();
              } else {
                // restart timeout
                finishTimeout = setTimeout(finishFn, responsesWaitTime);
              }
            };
          }
        })(1);
      };
      c.onMessageReceived = function (msg) {
        msgTracker[msg] = true;
        _this.onMsgReceived(msg);
      };
    })["catch"](function (e) {
      return _classPrivateFieldGet(_this, _onConnectionError).call(_this, e.toString());
    });
  }
  _createClass(PacketLossEngine, [{
    key: "onCredentialsFailure",
    set:
    // Invoked when unable to fetch TURN server credentials
    function set(f) {
      _classPrivateFieldSet(this, _onCredentialsFailure, f);
    }
  }, {
    key: "onConnectionError",
    set:
    // Invoked when unable to establish a connection with TURN server
    function set(f) {
      _classPrivateFieldSet(this, _onConnectionError, f);
    }
  }, {
    key: "onFinished",
    set:
    // Invoked when the packet loss measurement is complete
    function set(f) {
      _classPrivateFieldSet(this, _onFinished, f);
    }
  }, {
    key: "results",
    get:
    // Invoked when receiving a new message from the TURN server

    function get() {
      var totalMessages = _classPrivateFieldGet(this, _numMsgs);
      var numMessagesSent = Object.keys(_classPrivateFieldGet(this, _msgTracker)).length;
      var lostMessages = Object.entries(_classPrivateFieldGet(this, _msgTracker)).filter(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          recv = _ref5[1];
        return !recv;
      }).map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 1),
          n = _ref7[0];
        return +n;
      });
      var packetLoss = lostMessages.length / numMessagesSent;
      return {
        totalMessages: totalMessages,
        numMessagesSent: numMessagesSent,
        packetLoss: packetLoss,
        lostMessages: lostMessages
      };
    }
  }]);
  return PacketLossEngine;
}();

var _excluded$2 = ["downloadChunkSize", "uploadChunkSize", "downloadApiUrl", "uploadApiUrl"];
var _loadEngine = /*#__PURE__*/new WeakMap();
var PacketLossUnderLoadEngine = /*#__PURE__*/function (_PacketLossEngine) {
  _inherits(PacketLossUnderLoadEngine, _PacketLossEngine);
  var _super = _createSuper(PacketLossUnderLoadEngine);
  function PacketLossUnderLoadEngine() {
    var _thisSuper, _thisSuper3, _thisSuper5, _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      downloadChunkSize = _ref.downloadChunkSize,
      uploadChunkSize = _ref.uploadChunkSize,
      downloadApiUrl = _ref.downloadApiUrl,
      uploadApiUrl = _ref.uploadApiUrl,
      ptProps = _objectWithoutProperties(_ref, _excluded$2);
    _classCallCheck(this, PacketLossUnderLoadEngine);
    _this = _super.call(this, ptProps);
    // Internal state
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _loadEngine, {
      writable: true,
      value: void 0
    });
    if (downloadChunkSize || uploadChunkSize) {
      _classPrivateFieldSet(_assertThisInitialized(_this), _loadEngine, new LoadNetworkEngine$1({
        download: downloadChunkSize ? {
          apiUrl: downloadApiUrl,
          chunkSize: downloadChunkSize
        } : null,
        upload: uploadChunkSize ? {
          apiUrl: uploadApiUrl,
          chunkSize: uploadChunkSize
        } : null
      }));
      _set((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(PacketLossUnderLoadEngine.prototype)), "onCredentialsFailure", _set((_thisSuper5 = _assertThisInitialized(_this), _getPrototypeOf(PacketLossUnderLoadEngine.prototype)), "onConnectionError", _set((_thisSuper3 = _assertThisInitialized(_this), _getPrototypeOf(PacketLossUnderLoadEngine.prototype)), "onFinished", function () {
        return _classPrivateFieldGet(_assertThisInitialized(_this), _loadEngine).stop();
      }, _thisSuper3, true), _thisSuper5, true), _thisSuper, true);
    }
    return _this;
  }

  // Overridden attributes
  _createClass(PacketLossUnderLoadEngine, [{
    key: "qsParams",
    set: function set(qsParams) {
      _classPrivateFieldGet(this, _loadEngine) && (_classPrivateFieldGet(this, _loadEngine).qsParams = qsParams);
    }
  }, {
    key: "fetchOptions",
    set: function set(fetchOptions) {
      _classPrivateFieldGet(this, _loadEngine) && (_classPrivateFieldGet(this, _loadEngine).fetchOptions = fetchOptions);
    }
  }, {
    key: "onCredentialsFailure",
    set: function set(onCredentialsFailure) {
      var _this2 = this;
      _set(_getPrototypeOf(PacketLossUnderLoadEngine.prototype), "onCredentialsFailure", function () {
        onCredentialsFailure.apply(void 0, arguments);
        _classPrivateFieldGet(_this2, _loadEngine) && _classPrivateFieldGet(_this2, _loadEngine).stop();
      }, this, true);
    }
  }, {
    key: "onConnectionError",
    set: function set(onConnectionError) {
      var _this3 = this;
      _set(_getPrototypeOf(PacketLossUnderLoadEngine.prototype), "onConnectionError", function () {
        onConnectionError.apply(void 0, arguments);
        _classPrivateFieldGet(_this3, _loadEngine) && _classPrivateFieldGet(_this3, _loadEngine).stop();
      }, this, true);
    }
  }, {
    key: "onFinished",
    set: function set(onFinished) {
      var _this4 = this;
      _set(_getPrototypeOf(PacketLossUnderLoadEngine.prototype), "onFinished", function () {
        onFinished.apply(void 0, arguments);
        _classPrivateFieldGet(_this4, _loadEngine) && _classPrivateFieldGet(_this4, _loadEngine).stop();
      }, this, true);
    }
  }]);
  return PacketLossUnderLoadEngine;
}(PacketLossEngine$1);
var PacketLossEngine = PacketLossUnderLoadEngine;

var _excluded$1 = ["reachable"];
var ReachabilityEngine = /*#__PURE__*/_createClass(function ReachabilityEngine(targetUrl) {
  var _this = this;
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? -1 : _ref$timeout,
    _ref$fetchOptions = _ref.fetchOptions,
    fetchOptions = _ref$fetchOptions === void 0 ? {} : _ref$fetchOptions;
  _classCallCheck(this, ReachabilityEngine);
  // Public attributes
  _defineProperty(this, "onFinished", function () {});
  var finished = false;
  var finish = function finish(_ref2) {
    var reachable = _ref2.reachable,
      rest = _objectWithoutProperties(_ref2, _excluded$1);
    if (finished) return;
    finished = true;
    _this.onFinished(_objectSpread2({
      targetUrl: targetUrl,
      reachable: reachable
    }, rest));
  };
  fetch(targetUrl, fetchOptions).then(function (response) {
    finish({
      reachable: true,
      response: response
    });
  })["catch"](function (error) {
    finish({
      reachable: false,
      error: error
    });
  });
  timeout > 0 && setTimeout(function () {
    return finish({
      reachable: false,
      error: 'Request timeout'
    });
  }, timeout);
});

var sum = function sum(vals) {
  return vals.reduce(function (agg, val) {
    return agg + val;
  }, 0);
};
var percentile = function percentile(vals) {
  var perc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  if (!vals.length) return 0;
  var sortedVals = vals.slice().sort(function (a, b) {
    return a - b;
  });
  var idx = (vals.length - 1) * perc;
  var rem = idx % 1;
  if (rem === 0) return sortedVals[Math.round(idx)];

  // calculate weighted average
  var edges = [Math.floor, Math.ceil].map(function (rndFn) {
    return sortedVals[rndFn(idx)];
  });
  return edges[0] + (edges[1] - edges[0]) * rem;
};

var _config$3 = /*#__PURE__*/new WeakMap();
var _extractLoadedLatencies = /*#__PURE__*/new WeakMap();
var MeasurementCalculations = /*#__PURE__*/function () {
  function MeasurementCalculations(config) {
    var _this = this;
    _classCallCheck(this, MeasurementCalculations);
    // Public methods
    _defineProperty(this, "getLatencyPoints", function (latencyResults) {
      return latencyResults.timings.map(function (d) {
        return d.ping;
      });
    });
    _defineProperty(this, "getLatency", function (latencyResults) {
      return percentile(_this.getLatencyPoints(latencyResults), _classPrivateFieldGet(_this, _config$3).latencyPercentile);
    });
    _defineProperty(this, "getBandwidthPoints", function (bandwidthResults) {
      return Object.entries(bandwidthResults).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          bytes = _ref2[0],
          timings = _ref2[1].timings;
        return timings.map(function (_ref3) {
          var bps = _ref3.bps,
            duration = _ref3.duration,
            ping = _ref3.ping,
            measTime = _ref3.measTime,
            serverTime = _ref3.serverTime,
            transferSize = _ref3.transferSize;
          return {
            bytes: +bytes,
            bps: bps,
            duration: duration,
            ping: ping,
            measTime: measTime,
            serverTime: serverTime,
            transferSize: transferSize
          };
        });
      }).flat();
    });
    _defineProperty(this, "getBandwidth", function (bandwidthResults) {
      return percentile(_this.getBandwidthPoints(bandwidthResults).filter(function (d) {
        return d.duration >= _classPrivateFieldGet(_this, _config$3).bandwidthMinRequestDuration;
      }).map(function (d) {
        return d.bps;
      }).filter(function (bps) {
        return bps;
      }), _classPrivateFieldGet(_this, _config$3).bandwidthPercentile);
    });
    _defineProperty(this, "getLoadedLatency", function (loadedResults) {
      return _this.getLatency({
        timings: _classPrivateFieldGet(_this, _extractLoadedLatencies).call(_this, loadedResults)
      });
    });
    _defineProperty(this, "getLoadedJitter", function (loadedResults) {
      return _this.getJitter({
        timings: _classPrivateFieldGet(_this, _extractLoadedLatencies).call(_this, loadedResults)
      });
    });
    _defineProperty(this, "getLoadedLatencyPoints", function (loadedResults) {
      return _this.getLatencyPoints({
        timings: _classPrivateFieldGet(_this, _extractLoadedLatencies).call(_this, loadedResults)
      });
    });
    _defineProperty(this, "getPacketLoss", function (plResults) {
      return plResults.packetLoss;
    });
    _defineProperty(this, "getPacketLossDetails", function (plResults) {
      return plResults;
    });
    _defineProperty(this, "getReachability", function (reachabilityResults) {
      return !!reachabilityResults.reachable;
    });
    _defineProperty(this, "getReachabilityDetails", function (d) {
      return {
        host: d.host,
        reachable: d.reachable
      };
    });
    // Internal state
    _classPrivateFieldInitSpec(this, _config$3, {
      writable: true,
      value: void 0
    });
    // Internal methods
    _classPrivateFieldInitSpec(this, _extractLoadedLatencies, {
      writable: true,
      value: function value(loadedResults) {
        return Object.values(loadedResults).filter(
        // keep only file sizes that saturated the connection
        function (d) {
          return d.timings.length && Math.min.apply(Math, _toConsumableArray(d.timings.map(function (d) {
            return d.duration;
          }))) >= _classPrivateFieldGet(_this, _config$3).loadedRequestMinDuration;
        }).map(function (d) {
          return d.sideLatency || [];
        }).flat().slice(-_classPrivateFieldGet(_this, _config$3).loadedLatencyMaxPoints);
      }
    });
    _classPrivateFieldSet(this, _config$3, config);
  }
  _createClass(MeasurementCalculations, [{
    key: "getJitter",
    value: function getJitter(latencyResults) {
      // calc jitter as the average latency delta between consecutive samples
      var pings = this.getLatencyPoints(latencyResults);
      return pings.length < 2 ? null : pings.reduce(function (_ref4, latency) {
        var _ref4$sumDeltas = _ref4.sumDeltas,
          sumDeltas = _ref4$sumDeltas === void 0 ? 0 : _ref4$sumDeltas,
          prevLatency = _ref4.prevLatency;
        return {
          sumDeltas: sumDeltas + (prevLatency !== undefined ? Math.abs(prevLatency - latency) : 0),
          prevLatency: latency
        };
      }, {}).sumDeltas / (pings.length - 1);
    }

    // last measurements are most accurate
  }]);
  return MeasurementCalculations;
}();
var MeasurementCalculations$1 = MeasurementCalculations;

var classificationNames = ['bad', 'poor', 'average', 'good', 'great'];
var customResultTypes = {
  loadedLatencyIncrease: function loadedLatencyIncrease(measurements) {
    return measurements.latency && (measurements.downLoadedLatency || measurements.upLoadedLatency) ? Math.max(measurements.downLoadedLatency, measurements.upLoadedLatency) - measurements.latency : undefined;
  }
};
var defaultPoints = {
  packetLoss: 0
};
var _config$2 = /*#__PURE__*/new WeakMap();
var ScoresCalculations = /*#__PURE__*/function () {
  function ScoresCalculations(config) {
    _classCallCheck(this, ScoresCalculations);
    // Internal state
    _classPrivateFieldInitSpec(this, _config$2, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _config$2, config);
  }
  _createClass(ScoresCalculations, [{
    key: "getScores",
    value: function getScores(measurements) {
      var scores = Object.assign.apply(Object, _toConsumableArray(Object.entries(_classPrivateFieldGet(this, _config$2).aimMeasurementScoring).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          type = _ref2[0],
          fn = _ref2[1];
        var val = customResultTypes.hasOwnProperty(type) ? customResultTypes[type](measurements) : measurements[type];
        return val === undefined ? defaultPoints.hasOwnProperty(type) ? _defineProperty({}, type, defaultPoints[type]) : {} : _defineProperty({}, type, val === undefined ? 0 : +fn(val));
      })));
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(_classPrivateFieldGet(this, _config$2).aimExperiencesDefs).filter(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          input = _ref6[1].input;
        return input.every(function (k) {
          return scores.hasOwnProperty(k);
        });
      }).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          k = _ref8[0],
          _ref8$ = _ref8[1],
          input = _ref8$.input,
          pointThresholds = _ref8$.pointThresholds;
        var sumPoints = Math.max(0, sum(input.map(function (k) {
          return scores[k];
        })));
        var classificationIdx = scaleThreshold(pointThresholds, [0, 1, 2, 3, 4])(sumPoints);
        var classificationName = classificationNames[classificationIdx];
        return _defineProperty({}, k, {
          points: sumPoints,
          classificationIdx: classificationIdx,
          classificationName: classificationName
        });
      }))));
    }
  }]);
  return ScoresCalculations;
}();
var ScoresCalculations$1 = ScoresCalculations;

var _config$1 = /*#__PURE__*/new WeakMap();
var _measCalc = /*#__PURE__*/new WeakMap();
var _scoresCalc = /*#__PURE__*/new WeakMap();
var _calcGetter = /*#__PURE__*/new WeakMap();
var _getV4Reachability = /*#__PURE__*/new WeakMap();
var _getV4ReachabilityDetails = /*#__PURE__*/new WeakMap();
var _getV6Reachability = /*#__PURE__*/new WeakMap();
var _getV6ReachabilityDetails = /*#__PURE__*/new WeakMap();
var Results = /*#__PURE__*/function () {
  function Results(config) {
    var _this = this;
    _classCallCheck(this, Results);
    // Public attributes
    _defineProperty(this, "raw", void 0);
    _defineProperty(this, "getUnloadedLatency", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLatency', 'latency');
    });
    _defineProperty(this, "getUnloadedJitter", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getJitter', 'latency');
    });
    _defineProperty(this, "getUnloadedLatencyPoints", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLatencyPoints', 'latency', []);
    });
    _defineProperty(this, "getDownLoadedLatency", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLoadedLatency', 'download');
    });
    _defineProperty(this, "getDownLoadedJitter", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLoadedJitter', 'download');
    });
    _defineProperty(this, "getDownLoadedLatencyPoints", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLoadedLatencyPoints', 'download', []);
    });
    _defineProperty(this, "getUpLoadedLatency", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLoadedLatency', 'upload');
    });
    _defineProperty(this, "getUpLoadedJitter", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLoadedJitter', 'upload');
    });
    _defineProperty(this, "getUpLoadedLatencyPoints", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getLoadedLatencyPoints', 'upload', []);
    });
    _defineProperty(this, "getDownloadBandwidth", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getBandwidth', 'download');
    });
    _defineProperty(this, "getDownloadBandwidthPoints", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getBandwidthPoints', 'download', []);
    });
    _defineProperty(this, "getUploadBandwidth", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getBandwidth', 'upload');
    });
    _defineProperty(this, "getUploadBandwidthPoints", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getBandwidthPoints', 'upload', []);
    });
    _defineProperty(this, "getPacketLoss", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getPacketLoss', 'packetLoss');
    });
    _defineProperty(this, "getPacketLossDetails", function () {
      return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getPacketLossDetails', 'packetLoss', undefined, true);
    });
    _defineProperty(this, "getScores", function () {
      return _classPrivateFieldGet(_this, _scoresCalc).getScores(_this.getSummary());
    });
    // Internal state
    _classPrivateFieldInitSpec(this, _config$1, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _measCalc, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _scoresCalc, {
      writable: true,
      value: void 0
    });
    // Internal methods
    _classPrivateFieldInitSpec(this, _calcGetter, {
      writable: true,
      value: function value(calcFn, resKey) {
        var defaultVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var surfaceError = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return !_this.raw.hasOwnProperty(resKey) || !_this.raw[resKey].started ? defaultVal : surfaceError && _this.raw[resKey].error ? {
          error: _this.raw[resKey].error
        } : _classPrivateFieldGet(_this, _measCalc)[calcFn](_this.raw[resKey].results);
      }
    });
    _classPrivateFieldInitSpec(this, _getV4Reachability, {
      writable: true,
      value: function value() {
        return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getReachability', 'v4Reachability');
      }
    });
    _classPrivateFieldInitSpec(this, _getV4ReachabilityDetails, {
      writable: true,
      value: function value() {
        return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getReachabilityDetails', 'v4Reachability');
      }
    });
    _classPrivateFieldInitSpec(this, _getV6Reachability, {
      writable: true,
      value: function value() {
        return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getReachability', 'v6Reachability');
      }
    });
    _classPrivateFieldInitSpec(this, _getV6ReachabilityDetails, {
      writable: true,
      value: function value() {
        return _classPrivateFieldGet(_this, _calcGetter).call(_this, 'getReachabilityDetails', 'v6Reachability');
      }
    });
    _classPrivateFieldSet(this, _config$1, config);
    this.clear();
    _classPrivateFieldSet(this, _measCalc, new MeasurementCalculations$1(_classPrivateFieldGet(this, _config$1)));
    _classPrivateFieldSet(this, _scoresCalc, new ScoresCalculations$1(_classPrivateFieldGet(this, _config$1)));
  }
  _createClass(Results, [{
    key: "isFinished",
    get: function get() {
      return Object.values(this.raw).every(function (d) {
        return d.finished;
      });
    }

    // Public methods
  }, {
    key: "clear",
    value: function clear() {
      this.raw = Object.assign.apply(Object, [{}].concat(_toConsumableArray(_toConsumableArray(new Set(_classPrivateFieldGet(this, _config$1).measurements.map(function (m) {
        return m.type;
      }))).map(function (m) {
        return _defineProperty({}, m, {
          started: false,
          finished: false,
          results: {}
        });
      }))));
    }
  }, {
    key: "getSummary",
    value: function getSummary() {
      var items = {
        download: this.getDownloadBandwidth,
        upload: this.getUploadBandwidth,
        latency: this.getUnloadedLatency,
        jitter: this.getUnloadedJitter,
        downLoadedLatency: this.getDownLoadedLatency,
        downLoadedJitter: this.getDownLoadedJitter,
        upLoadedLatency: this.getUpLoadedLatency,
        upLoadedJitter: this.getUpLoadedJitter,
        packetLoss: this.getPacketLoss,
        v4Reachability: _classPrivateFieldGet(this, _getV4Reachability),
        v6Reachability: _classPrivateFieldGet(this, _getV6Reachability)
      };
      return Object.assign.apply(Object, _toConsumableArray(Object.entries(items).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          fn = _ref3[1];
        var val = fn();
        return val === undefined ? {} : _defineProperty({}, key, val);
      })));
    }
  }]);
  return Results;
}();
var Results$1 = Results;

var round = function round(num) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return !num ? num : Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
var latencyPointsParser = function latencyPointsParser(durations) {
  return durations.map(function (d) {
    return round(d, 2);
  });
};
var bpsPointsParser = function bpsPointsParser(pnts) {
  return pnts.map(function (d) {
    return {
      bytes: +d.bytes,
      bps: round(d.bps)
    };
  });
};
var packetLossParser = function packetLossParser(d) {
  return d.error ? undefined : {
    numMessages: d.numMessagesSent,
    lossRatio: round(d.packetLoss, 4)
  };
};
var resultsParsers = {
  latencyMs: ['getUnloadedLatencyPoints', latencyPointsParser],
  download: ['getDownloadBandwidthPoints', bpsPointsParser],
  upload: ['getUploadBandwidthPoints', bpsPointsParser],
  downLoadedLatencyMs: ['getDownLoadedLatencyPoints', latencyPointsParser],
  upLoadedLatencyMs: ['getUpLoadedLatencyPoints', latencyPointsParser],
  packetLoss: ['getPacketLossDetails', packetLossParser]
  // v4Reachability: ['getV4ReachabilityDetails'],
  // v6Reachability: ['getV6ReachabilityDetails']
};

var scoreParser = function scoreParser(d) {
  return {
    points: d.points,
    classification: d.classificationName
  };
};
var logAimResults = function logAimResults(results, _ref) {
  var apiUrl = _ref.apiUrl;
  var logData = {};
  Object.entries(resultsParsers).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      logK = _ref3[0],
      _ref3$ = _slicedToArray(_ref3[1], 2),
      fn = _ref3$[0],
      _ref3$$ = _ref3$[1],
      parser = _ref3$$ === void 0 ? function (d) {
        return d;
      } : _ref3$$;
    var val = results[fn]();
    val && (logData[logK] = parser(val));
  });
  var scores = results.getScores();
  scores && (logData.scores = Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(scores).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      k = _ref5[0],
      score = _ref5[1];
    return _defineProperty({}, k, scoreParser(score));
  })))));
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(logData)
  });
};
var logFinalResults = logAimResults;

var _excluded = ["type"],
  _excluded2 = ["numPackets"],
  _excluded3 = ["bytes"];
var DEFAULT_OPTIMAL_DOWNLOAD_SIZE = 1e6;
var DEFAULT_OPTIMAL_UPLOAD_SIZE = 1e6;
var OPTIMAL_SIZE_RATIO = 0.5; // of largest size reached in measurement

var pausableTypes = ['latency', 'latencyUnderLoad', 'download', 'upload'];
var genMeasId = function genMeasId() {
  return "".concat(Math.round(Math.random() * 1e16));
};
var _onFinish = /*#__PURE__*/new WeakMap();
var _onError = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _results = /*#__PURE__*/new WeakMap();
var _measurementId = /*#__PURE__*/new WeakMap();
var _curMsmIdx = /*#__PURE__*/new WeakMap();
var _curEngine = /*#__PURE__*/new WeakMap();
var _optimalDownloadChunkSize = /*#__PURE__*/new WeakMap();
var _optimalUploadChunkSize = /*#__PURE__*/new WeakMap();
var _running = /*#__PURE__*/new WeakMap();
var _finished = /*#__PURE__*/new WeakMap();
var _setRunning = /*#__PURE__*/new WeakSet();
var _setFinished = /*#__PURE__*/new WeakSet();
var _curType = /*#__PURE__*/new WeakSet();
var _curTypeResults = /*#__PURE__*/new WeakSet();
var _clear = /*#__PURE__*/new WeakSet();
var _destroyCurEngine = /*#__PURE__*/new WeakSet();
var _next = /*#__PURE__*/new WeakSet();
var MeasurementEngine = /*#__PURE__*/function () {
  function MeasurementEngine() {
    var userConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MeasurementEngine);
    _classPrivateMethodInitSpec(this, _next);
    _classPrivateMethodInitSpec(this, _destroyCurEngine);
    _classPrivateMethodInitSpec(this, _clear);
    _classPrivateMethodInitSpec(this, _curTypeResults);
    _classPrivateMethodInitSpec(this, _curType);
    _classPrivateMethodInitSpec(this, _setFinished);
    // Internal methods
    _classPrivateMethodInitSpec(this, _setRunning);
    _defineProperty(this, "onRunningChange", function () {});
    _defineProperty(this, "onResultsChange", function () {});
    _classPrivateFieldInitSpec(this, _onFinish, {
      writable: true,
      value: function value() {}
    });
    _classPrivateFieldInitSpec(this, _onError, {
      writable: true,
      value: function value() {}
    });
    // Internal state
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _results, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _measurementId, {
      writable: true,
      value: genMeasId()
    });
    _classPrivateFieldInitSpec(this, _curMsmIdx, {
      writable: true,
      value: -1
    });
    _classPrivateFieldInitSpec(this, _curEngine, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _optimalDownloadChunkSize, {
      writable: true,
      value: DEFAULT_OPTIMAL_DOWNLOAD_SIZE
    });
    _classPrivateFieldInitSpec(this, _optimalUploadChunkSize, {
      writable: true,
      value: DEFAULT_OPTIMAL_UPLOAD_SIZE
    });
    _classPrivateFieldInitSpec(this, _running, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _finished, {
      writable: true,
      value: false
    });
    _classPrivateFieldSet(this, _config, Object.assign({}, defaultConfig, userConfig, internalConfig));
    _classPrivateFieldSet(this, _results, new Results$1(_classPrivateFieldGet(this, _config)));
    _classPrivateFieldGet(this, _config).autoStart && this.play();
  }

  // Public attributes
  _createClass(MeasurementEngine, [{
    key: "results",
    get: function get() {
      // read access to results
      return _classPrivateFieldGet(this, _results);
    }
  }, {
    key: "isRunning",
    get: function get() {
      return _classPrivateFieldGet(this, _running);
    }
  }, {
    key: "isFinished",
    get: function get() {
      return _classPrivateFieldGet(this, _finished);
    }
  }, {
    key: "onFinish",
    set:
    // callback invoked when all the measurements are finished
    function set(f) {
      _classPrivateFieldSet(this, _onFinish, f);
    }
  }, {
    key: "onError",
    set:
    // callback invoked if an error occurs during measurement
    function set(f) {
      _classPrivateFieldSet(this, _onError, f);
    }

    // Public methods
  }, {
    key: "pause",
    value: function pause() {
      pausableTypes.includes(_classPrivateMethodGet(this, _curType, _curType2).call(this)) && _classPrivateFieldGet(this, _curEngine).pause();
      _classPrivateMethodGet(this, _setRunning, _setRunning2).call(this, false);
    }
  }, {
    key: "play",
    value: function play() {
      if (!_classPrivateFieldGet(this, _running)) {
        _classPrivateMethodGet(this, _setRunning, _setRunning2).call(this, true);
        _classPrivateMethodGet(this, _next, _next2).call(this);
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      _classPrivateMethodGet(this, _clear, _clear2).call(this);
      this.play();
    }
  }]);
  return MeasurementEngine;
}();
function _setRunning2(running) {
  if (running !== _classPrivateFieldGet(this, _running)) {
    _classPrivateFieldSet(this, _running, running);
    this.onRunningChange(_classPrivateFieldGet(this, _running));
  }
}
function _setFinished2(finished) {
  var _this3 = this;
  if (finished !== _classPrivateFieldGet(this, _finished)) {
    _classPrivateFieldSet(this, _finished, finished);
    finished && setTimeout(function () {
      return _classPrivateFieldGet(_this3, _onFinish).call(_this3, _this3.results);
    });
  }
}
function _curType2() {
  return _classPrivateFieldGet(this, _curMsmIdx) < 0 || _classPrivateFieldGet(this, _curMsmIdx) >= _classPrivateFieldGet(this, _config).measurements.length ? null : _classPrivateFieldGet(this, _config).measurements[_classPrivateFieldGet(this, _curMsmIdx)].type;
}
function _curTypeResults2() {
  return _classPrivateFieldGet(this, _results).raw[_classPrivateMethodGet(this, _curType, _curType2).call(this)] || undefined;
}
function _clear2() {
  _classPrivateMethodGet(this, _destroyCurEngine, _destroyCurEngine2).call(this);
  _classPrivateFieldSet(this, _measurementId, genMeasId());
  _classPrivateFieldSet(this, _curMsmIdx, -1);
  _classPrivateFieldSet(this, _curEngine, undefined);
  _classPrivateMethodGet(this, _setRunning, _setRunning2).call(this, false);
  _classPrivateMethodGet(this, _setFinished, _setFinished2).call(this, false);
  _classPrivateFieldGet(this, _results).clear();
}
function _destroyCurEngine2() {
  var engine = _classPrivateFieldGet(this, _curEngine);
  if (!engine) return;
  engine.onFinished = engine.onConnectionError = engine.onFail = engine.onMsgReceived = engine.onCredentialsFailure = engine.onMeasurementResult = function () {};
  pausableTypes.includes(_classPrivateMethodGet(this, _curType, _curType2).call(this)) && engine.pause();
}
function _next2() {
  var _this4 = this;
  var _this$curMsmIdx;
  if (pausableTypes.includes(_classPrivateMethodGet(this, _curType, _curType2).call(this)) && _classPrivateMethodGet(this, _curTypeResults, _curTypeResults2).call(this) && _classPrivateMethodGet(this, _curTypeResults, _curTypeResults2).call(this).started && !_classPrivateMethodGet(this, _curTypeResults, _curTypeResults2).call(this).finished && !_classPrivateMethodGet(this, _curTypeResults, _curTypeResults2).call(this).finishedCurrentRound && !_classPrivateMethodGet(this, _curTypeResults, _curTypeResults2).call(this).error) {
    _classPrivateFieldGet(this, _curEngine).play();
    return;
  }

  // advance to next msm
  _classPrivateFieldSet(this, _curMsmIdx, (_this$curMsmIdx = _classPrivateFieldGet(this, _curMsmIdx), _this$curMsmIdx++, _this$curMsmIdx));
  if (_classPrivateFieldGet(this, _curMsmIdx) >= _classPrivateFieldGet(this, _config).measurements.length) {
    // done with measurements
    _classPrivateMethodGet(this, _setRunning, _setRunning2).call(this, false);
    _classPrivateMethodGet(this, _setFinished, _setFinished2).call(this, true);
    return;
  }
  var _classPrivateFieldGet2 = _classPrivateFieldGet(this, _config).measurements[_classPrivateFieldGet(this, _curMsmIdx)],
    type = _classPrivateFieldGet2.type,
    msmConfig = _objectWithoutProperties(_classPrivateFieldGet2, _excluded);
  var msmResults = _classPrivateMethodGet(this, _curTypeResults, _curTypeResults2).call(this);
  var _classPrivateFieldGet3 = _classPrivateFieldGet(this, _config),
    downloadApiUrl = _classPrivateFieldGet3.downloadApiUrl,
    uploadApiUrl = _classPrivateFieldGet3.uploadApiUrl,
    estimatedServerTime = _classPrivateFieldGet3.estimatedServerTime;
  var engine;
  switch (type) {
    case 'v4Reachability':
    case 'v6Reachability':
      engine = new ReachabilityEngine("https://".concat(msmConfig.host), {
        fetchOptions: {
          method: 'GET',
          mode: 'no-cors'
        }
      });
      engine.onFinished = function (result) {
        msmResults.finished = true;
        msmResults.results = _objectSpread2({
          host: msmConfig.host
        }, result);
        _this4.onResultsChange({
          type: type
        });
        _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
      };
      break;
    case 'rpki':
      engine = new ReachabilityEngine("https://".concat(_classPrivateFieldGet(this, _config).rpkiInvalidHost), {
        timeout: 5000
      });
      engine.onFinished = function (result) {
        (result.response ? result.response.json() : Promise.resolve()).then(function (response) {
          msmResults.finished = true;
          msmResults.results = _objectSpread2({
            host: _classPrivateFieldGet(_this4, _config).rpkiInvalidHost,
            filteringInvalids: !result.reachable
          }, response ? {
            asn: response.asn,
            name: response.name
          } : {});
          _this4.onResultsChange({
            type: type
          });
          _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
        });
      };
      break;
    case 'nxdomain':
      engine = new ReachabilityEngine("https://".concat(msmConfig.nxhost), {
        fetchOptions: {
          mode: 'no-cors'
        }
      });
      engine.onFinished = function (result) {
        msmResults.finished = true;
        msmResults.results = {
          host: msmConfig.nxhost,
          reachable: result.reachable
        };
        _this4.onResultsChange({
          type: type
        });
        _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
      };
      break;
    case 'packetLoss':
    case 'packetLossUnderLoad':
      {
        msmResults.finished = false;
        var numMsgs = msmConfig.numPackets,
          ptCfg = _objectWithoutProperties(msmConfig, _excluded2);
        var _classPrivateFieldGet4 = _classPrivateFieldGet(this, _config),
          turnServerUri = _classPrivateFieldGet4.turnServerUri,
          turnServerCredsApi = _classPrivateFieldGet4.turnServerCredsApiUrl,
          turnServerUser = _classPrivateFieldGet4.turnServerUser,
          turnServerPass = _classPrivateFieldGet4.turnServerPass,
          includeCredentials = _classPrivateFieldGet4.includeCredentials;
        engine = new PacketLossEngine(_objectSpread2({
          turnServerUri: turnServerUri,
          turnServerCredsApi: turnServerCredsApi,
          turnServerCredsApiIncludeCredentials: includeCredentials,
          turnServerUser: turnServerUser,
          turnServerPass: turnServerPass,
          numMsgs: numMsgs,
          // if under load
          downloadChunkSize: msmConfig.loadDown ? _classPrivateFieldGet(this, _optimalDownloadChunkSize) : undefined,
          uploadChunkSize: msmConfig.loadUp ? _classPrivateFieldGet(this, _optimalUploadChunkSize) : undefined,
          downloadApiUrl: downloadApiUrl,
          uploadApiUrl: uploadApiUrl
        }, ptCfg));
      }
      engine.onMsgReceived = function () {
        msmResults.results = Object.assign({}, engine.results);
        _this4.onResultsChange({
          type: type
        });
      };
      engine.onFinished = function () {
        msmResults.finished = true;
        _this4.onResultsChange({
          type: type
        });
        _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
      };
      engine.onConnectionError = function (e) {
        msmResults.error = e;
        _this4.onResultsChange({
          type: type
        });
        _classPrivateFieldGet(_this4, _onError).call(_this4, "Connection error while measuring packet loss: ".concat(e));
        _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
      };
      engine.onCredentialsFailure = function () {
        msmResults.error = 'unable to get turn server credentials';
        _this4.onResultsChange({
          type: type
        });
        _classPrivateFieldGet(_this4, _onError).call(_this4, 'Error while measuring packet loss: unable to get turn server credentials.');
        _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
      };
      break;
    case 'latency':
    case 'latencyUnderLoad':
      msmResults.finished = false;
      engine = new BandwidthEngine([{
        dir: 'down',
        bytes: 0,
        count: msmConfig.numPackets,
        bypassMinDuration: true
      }], {
        downloadApiUrl: downloadApiUrl,
        uploadApiUrl: uploadApiUrl,
        estimatedServerTime: estimatedServerTime,
        logApiUrl: _classPrivateFieldGet(this, _config).logMeasurementApiUrl,
        measurementId: _classPrivateFieldGet(this, _measurementId),
        // if under load
        downloadChunkSize: msmConfig.loadDown ? _classPrivateFieldGet(this, _optimalDownloadChunkSize) : undefined,
        uploadChunkSize: msmConfig.loadUp ? _classPrivateFieldGet(this, _optimalUploadChunkSize) : undefined
      });
      engine.fetchOptions = {
        credentials: _classPrivateFieldGet(this, _config).includeCredentials ? 'include' : undefined
      };
      engine.onMeasurementResult = engine.onNewMeasurementStarted = function (meas, results) {
        msmResults.results = Object.assign({}, results.down[0]);
        _this4.onResultsChange({
          type: type
        });
      };
      engine.onFinished = function () {
        msmResults.finished = true;
        _this4.onResultsChange({
          type: type
        });
        _classPrivateFieldGet(_this4, _running) && _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
      };
      engine.onConnectionError = function (e) {
        msmResults.error = e;
        _this4.onResultsChange({
          type: type
        });
        _classPrivateFieldGet(_this4, _onError).call(_this4, "Connection error while measuring latency: ".concat(e));
        _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
      };
      engine.play();
      break;
    case 'download':
    case 'upload':
      if (msmResults.finished || msmResults.error) {
        _classPrivateMethodGet(this, _next, _next2).call(this); // skip, already concluded this bandwidth measurement type
      } else {
        delete msmResults.finishedCurrentRound;
        var measureParallelLatency = _classPrivateFieldGet(this, _config)["measure".concat(type === 'download' ? 'Down' : 'Up', "loadLoadedLatency")];
        engine = new BandwidthEngine([_objectSpread2({
          dir: type === 'download' ? 'down' : 'up'
        }, msmConfig)], {
          downloadApiUrl: downloadApiUrl,
          uploadApiUrl: uploadApiUrl,
          estimatedServerTime: estimatedServerTime,
          logApiUrl: _classPrivateFieldGet(this, _config).logMeasurementApiUrl,
          measurementId: _classPrivateFieldGet(this, _measurementId),
          measureParallelLatency: measureParallelLatency,
          parallelLatencyThrottleMs: _classPrivateFieldGet(this, _config).loadedLatencyThrottle
        });
        engine.fetchOptions = {
          credentials: _classPrivateFieldGet(this, _config).includeCredentials ? 'include' : undefined
        };
        engine.finishRequestDuration = _classPrivateFieldGet(this, _config).bandwidthFinishRequestDuration;
        engine.onNewMeasurementStarted = function (_ref) {
          var count = _ref.count,
            bytes = _ref.bytes;
          var res = msmResults.results = Object.assign({}, msmResults.results);
          !res.hasOwnProperty(bytes) && (res[bytes] = {
            timings: [],
            numMeasurements: 0,
            sideLatency: measureParallelLatency ? [] : undefined
          });

          // check if count hasn't already been added
          if (res[bytes].numMeasurements - res[bytes].timings.length !== count) {
            res[bytes].numMeasurements += count;
            _this4.onResultsChange({
              type: type
            });
          }
        };
        engine.onMeasurementResult = function (_ref2) {
          var bytes = _ref2.bytes,
            timing = _objectWithoutProperties(_ref2, _excluded3);
          // merge in new result
          msmResults.results[bytes].timings.push(timing);
          msmResults.results = Object.assign({}, msmResults.results);
          _this4.onResultsChange({
            type: type
          });
        };
        engine.onParallelLatencyResult = function (res) {
          // merge in new latency result
          msmResults.results[msmConfig.bytes].sideLatency.push(res);
          msmResults.results = Object.assign({}, msmResults.results);
          _this4.onResultsChange({
            type: type
          });
        };
        engine.onFinished = function (results) {
          var isLastMsmOfType = !_classPrivateFieldGet(_this4, _config).measurements.slice(_classPrivateFieldGet(_this4, _curMsmIdx) + 1).map(function (d) {
            return d.type;
          }).includes(type);
          var minDuration = Math.min.apply(Math, _toConsumableArray(Object.values(type === 'download' ? results.down : results.up).slice(-1)[0].timings.map(function (d) {
            return d.duration;
          })));
          var reachedEndOfMsmType = isLastMsmOfType || !msmConfig.bypassMinDuration && minDuration > _classPrivateFieldGet(_this4, _config).bandwidthFinishRequestDuration;
          if (!reachedEndOfMsmType) {
            msmResults.finishedCurrentRound = true;
          } else {
            msmResults.finished = true;
            _this4.onResultsChange({
              type: type
            });

            // record optimal load size
            var largestSize = Object.keys(msmResults.results).map(function (n) {
              return +n;
            }).sort(function (a, b) {
              return b - a;
            })[0];
            var optimalSize = largestSize * OPTIMAL_SIZE_RATIO;
            type === 'download' && _classPrivateFieldSet(_this4, _optimalDownloadChunkSize, optimalSize);
            type === 'upload' && _classPrivateFieldSet(_this4, _optimalUploadChunkSize, optimalSize);
          }
          _classPrivateFieldGet(_this4, _running) && _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
        };
        engine.onConnectionError = function (e) {
          msmResults.error = e;
          _this4.onResultsChange({
            type: type
          });
          _classPrivateFieldGet(_this4, _onError).call(_this4, "Connection error while measuring ".concat(type, ": ").concat(e));
          _classPrivateMethodGet(_this4, _next, _next2).call(_this4);
        };
        engine.play();
      }
      break;
  }
  _classPrivateFieldSet(this, _curEngine, engine);
  msmResults.started = true;
  this.onResultsChange({
    type: type
  });
}
var _logAimApiUrl = /*#__PURE__*/new WeakMap();
var _logFinalResults = /*#__PURE__*/new WeakMap();
var LoggingMeasurementEngine = /*#__PURE__*/function (_MeasurementEngine) {
  _inherits(LoggingMeasurementEngine, _MeasurementEngine);
  var _super = _createSuper(LoggingMeasurementEngine);
  function LoggingMeasurementEngine(userConfig) {
    var _thisSuper, _this;
    _classCallCheck(this, LoggingMeasurementEngine);
    for (var _len = arguments.length, pt = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      pt[_key - 1] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this, userConfig].concat(pt));
    // Internal state
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _logAimApiUrl, {
      writable: true,
      value: void 0
    });
    // Internal methods
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _logFinalResults, {
      writable: true,
      value: function value(results) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _logAimApiUrl) && logFinalResults(results, {
          apiUrl: _classPrivateFieldGet(_assertThisInitialized(_this), _logAimApiUrl)
        });
      }
    });
    _set((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(LoggingMeasurementEngine.prototype)), "onFinish", _classPrivateFieldGet(_assertThisInitialized(_this), _logFinalResults), _thisSuper, true);
    _classPrivateFieldSet(_assertThisInitialized(_this), _logAimApiUrl, Object.assign({}, defaultConfig, userConfig, internalConfig).logAimApiUrl);
    return _this;
  }

  // Public attributes
  _createClass(LoggingMeasurementEngine, [{
    key: "onFinish",
    set: function set(onFinish) {
      var _this2 = this;
      _set(_getPrototypeOf(LoggingMeasurementEngine.prototype), "onFinish", function (results) {
        onFinish(results);
        _classPrivateFieldGet(_this2, _logFinalResults).call(_this2, results);
      }, this, true);
    }
  }]);
  return LoggingMeasurementEngine;
}(MeasurementEngine);

export { LoggingMeasurementEngine as default };
