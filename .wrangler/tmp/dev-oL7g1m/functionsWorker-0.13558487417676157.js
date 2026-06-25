var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-2czs8b/functionsWorker-0.13558487417676157.mjs
import { Writable } from "node:stream";
import { EventEmitter } from "node:events";
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
__name2(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
__name2(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");
__name2(notImplementedClass, "notImplementedClass");
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  static {
    __name2(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark2");
  }
  static {
    __name2(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  static {
    __name2(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  static {
    __name2(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  static {
    __name2(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  static {
    __name2(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  static {
    __name2(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
var noop_default = Object.assign(() => {
}, { __unenv__: true });
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;
globalThis.console = console_default;
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint"), "bigint") });
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  static {
    __name2(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  static {
    __name2(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count3, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var NODE_VERSION = "22.14.0";
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "_Process");
  }
  static {
    __name2(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env: env2,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env: env2,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;
globalThis.process = process_default;
async function onRequest(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const body = await request2.json();
    if (!body.code) {
      return new Response(JSON.stringify({ error: "Code required" }), {
        status: 400,
        headers: headers2
      });
    }
    const session = await env3.DB.prepare(
      `SELECT s.user_id, u.email, u.totp_enrolled_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: headers2
      });
    }
    const backupCode = await env3.DB.prepare(
      `SELECT id, code_hash FROM backup_codes
       WHERE user_id = ? AND used_at IS NULL
       ORDER BY id ASC
       LIMIT 1`
    ).bind(session.user_id).first();
    if (!backupCode) {
      return new Response(
        JSON.stringify({ error: "No unused backup codes available. Contact an admin." }),
        { status: 400, headers: headers2 }
      );
    }
    if (backupCode.code_hash !== body.code) {
      return new Response(JSON.stringify({ error: "Invalid backup code" }), {
        status: 400,
        headers: headers2
      });
    }
    await env3.DB.prepare(
      `UPDATE backup_codes SET used_at = datetime('now') WHERE id = ?`
    ).bind(backupCode.id).run();
    if (!session.totp_enrolled_at) {
      await env3.DB.prepare(
        `UPDATE users SET totp_enrolled_at = datetime('now') WHERE id = ?`
      ).bind(session.user_id).run();
    }
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      session.user_id,
      "2fa_backup_code_used",
      session.email,
      JSON.stringify({ remainingCodes: "check backup_codes table" })
    ).run();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Backup code accepted. 2FA verified."
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Backup code verify error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest, "onRequest");
__name2(onRequest, "onRequest");
async function onRequest2(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  try {
    const body = await request2.json();
    if (!body.token || !body.newPassword) {
      return new Response(
        JSON.stringify({ error: "Token and new password required" }),
        { status: 400, headers: headers2 }
      );
    }
    const resetRequest = await env3.DB.prepare(
      `SELECT actor_id, metadata
       FROM audit_events
       WHERE action = 'password_reset_request'
         AND metadata LIKE ?
       ORDER BY created_at DESC
       LIMIT 1`
    ).bind(`%"token":"${body.token}"%`).first();
    if (!resetRequest) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 400, headers: headers2 }
      );
    }
    const metadata = JSON.parse(resetRequest.metadata);
    const expiresAt = new Date(metadata.expiresAt);
    if (expiresAt < /* @__PURE__ */ new Date()) {
      return new Response(
        JSON.stringify({ error: "Token expired" }),
        { status: 400, headers: headers2 }
      );
    }
    const passwordHash = body.newPassword;
    await env3.DB.prepare(
      `UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?`
    ).bind(passwordHash, resetRequest.actor_id).run();
    await env3.DB.prepare(
      `UPDATE sessions SET revoked_at = datetime('now')
       WHERE user_id = ? AND revoked_at IS NULL`
    ).bind(resetRequest.actor_id).run();
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      resetRequest.actor_id,
      "password_reset_completed",
      resetRequest.actor_id,
      JSON.stringify({ completedAt: (/* @__PURE__ */ new Date()).toISOString() })
    ).run();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Password reset successfully. Please sign in with your new password."
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Reset password confirm error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest2, "onRequest2");
__name2(onRequest2, "onRequest");
async function onRequest3(context2) {
  const { request: request2, env: env3, params } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "DELETE") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT s.user_id, u.role, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: headers2
      });
    }
    if (session.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: headers2
      });
    }
    const targetSession = await env3.DB.prepare(
      `SELECT s.id, s.user_id, s.revoked_at
       FROM sessions s WHERE s.id = ?`
    ).bind(params.id).first();
    if (!targetSession) {
      return new Response(JSON.stringify({ error: "Session not found" }), {
        status: 404,
        headers: headers2
      });
    }
    if (targetSession.revoked_at) {
      return new Response(JSON.stringify({ error: "Session already revoked" }), {
        status: 400,
        headers: headers2
      });
    }
    await env3.DB.prepare(
      `UPDATE sessions SET revoked_at = datetime('now') WHERE id = ?`
    ).bind(params.id).run();
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      session.user_id,
      "session_revoked",
      targetSession.user_id,
      JSON.stringify({ targetSessionId: params.id, revokedBy: session.email })
    ).run();
    return new Response(
      JSON.stringify({ success: true, message: "Session revoked" }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Session revoke error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest3, "onRequest3");
__name2(onRequest3, "onRequest");
function generateBackupCodes() {
  const codes = [];
  for (let i = 0; i < 8; i++) {
    const array = new Uint8Array(4);
    crypto.getRandomValues(array);
    const code = Array.from(array).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 8).toUpperCase();
    codes.push(code);
  }
  return codes;
}
__name(generateBackupCodes, "generateBackupCodes");
__name2(generateBackupCodes, "generateBackupCodes");
function generateTOTPSecret() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let secret = "";
  for (let i = 0; i < bytes.length; i++) {
    secret += alphabet[bytes[i] % 32];
  }
  return secret;
}
__name(generateTOTPSecret, "generateTOTPSecret");
__name2(generateTOTPSecret, "generateTOTPSecret");
async function onRequest4(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT s.user_id, u.email, u.totp_enrolled_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: headers2
      });
    }
    if (session.totp_enrolled_at) {
      return new Response(
        JSON.stringify({ error: "2FA already enrolled. Re-enroll requires admin reset." }),
        { status: 400, headers: headers2 }
      );
    }
    const secret = generateTOTPSecret();
    const issuer = env3.TOTP_ISSUER || "Astro Sveltia Cloudflare";
    await env3.DB.prepare(
      `UPDATE users SET totp_secret = ? WHERE id = ?`
    ).bind(secret, session.user_id).run();
    const backupCodes = generateBackupCodes();
    for (const code of backupCodes) {
      await env3.DB.prepare(
        `INSERT INTO backup_codes (id, user_id, code_hash) VALUES (?, ?, ?)`
      ).bind(crypto.randomUUID(), session.user_id, code).run();
    }
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedEmail = encodeURIComponent(session.email);
    const uri = `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      session.user_id,
      "totp_enrollment_initiated",
      session.email,
      JSON.stringify({ backupCodesCount: backupCodes.length })
    ).run();
    return new Response(
      JSON.stringify({
        uri,
        secret,
        // For manual entry
        backupCodes,
        message: "Scan QR code or enter secret manually. Verify with /api/auth/totp/verify to complete enrollment."
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("TOTP enrollment error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest4, "onRequest4");
__name2(onRequest4, "onRequest");
function verifyTOTP(secret, code, window = 1) {
  const now = Math.floor(Date.now() / 1e3);
  const period = 30;
  for (let i = -window; i <= window; i++) {
    const time3 = Math.floor((now + i * period) / period);
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      return true;
    }
  }
  return false;
}
__name(verifyTOTP, "verifyTOTP");
__name2(verifyTOTP, "verifyTOTP");
async function onRequest5(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const body = await request2.json();
    if (!body.code) {
      return new Response(JSON.stringify({ error: "Code required" }), {
        status: 400,
        headers: headers2
      });
    }
    const session = await env3.DB.prepare(
      `SELECT s.user_id, u.email, u.totp_secret, u.totp_enrolled_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: headers2
      });
    }
    if (!session.totp_secret) {
      return new Response(
        JSON.stringify({ error: "No TOTP enrollment in progress. Call /api/auth/totp/enroll first." }),
        { status: 400, headers: headers2 }
      );
    }
    if (session.totp_enrolled_at) {
      return new Response(
        JSON.stringify({ error: "2FA already enrolled" }),
        { status: 400, headers: headers2 }
      );
    }
    const isValid = verifyTOTP(session.totp_secret, body.code);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400,
        headers: headers2
      });
    }
    await env3.DB.prepare(
      `UPDATE users SET totp_enrolled_at = datetime('now') WHERE id = ?`
    ).bind(session.user_id).run();
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      session.user_id,
      "2fa_enrolled",
      session.email,
      JSON.stringify({ method: "totp" })
    ).run();
    return new Response(
      JSON.stringify({
        success: true,
        message: "2FA enrolled successfully. You now have full admin access."
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("TOTP verify error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest5, "onRequest5");
__name2(onRequest5, "onRequest");
async function onRequest6(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT user_id
       FROM sessions
       WHERE token = ? AND expires_at > datetime('now') AND revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: headers2
      });
    }
    const remaining = await env3.DB.prepare(
      `SELECT COUNT(*) as count FROM backup_codes
       WHERE user_id = ? AND used_at IS NULL`
    ).bind(session.user_id).first();
    return new Response(
      JSON.stringify({
        remaining: remaining?.count || 0,
        regenerateAvailable: (remaining?.count || 0) === 0
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Backup codes list error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest6, "onRequest6");
__name2(onRequest6, "onRequest");
async function onRequest7(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  try {
    const existingUsers = await env3.DB.prepare(
      `SELECT COUNT(*) as count FROM users`
    ).first();
    if (existingUsers && existingUsers.count > 0) {
      return new Response(
        JSON.stringify({ error: "Users already exist. Bootstrap is only available for the first admin." }),
        { status: 400, headers: headers2 }
      );
    }
    const body = await request2.json();
    if (!body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400, headers: headers2 }
      );
    }
    if (body.password.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters" }),
        { status: 400, headers: headers2 }
      );
    }
    const userId = crypto.randomUUID();
    const passwordHash = body.password;
    await env3.DB.prepare(
      `INSERT INTO users (id, email, password_hash, role, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(userId, body.email, passwordHash, "admin", "default").run();
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(userId, userId, "admin_bootstrap", body.email, "default").run();
    return new Response(
      JSON.stringify({
        user: { id: userId, email: body.email, role: "admin" },
        message: "First admin created successfully. You can now sign in at /login."
      }),
      { status: 201, headers: headers2 }
    );
  } catch (err) {
    console.error("Bootstrap error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: headers2 }
    );
  }
}
__name(onRequest7, "onRequest7");
__name2(onRequest7, "onRequest");
function generateOTP() {
  const array = new Uint8Array(3);
  crypto.getRandomValues(array);
  return Array.from(array).map((b) => (b % 10).toString()).join("");
}
__name(generateOTP, "generateOTP");
__name2(generateOTP, "generateOTP");
async function sendOTP(apiKey, email, otp) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
      <h2>Your authentication code</h2>
      <p>Use this code to complete your authentication:</p>
      <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; margin: 20px 0;">
        ${otp}
      </div>
      <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
    </div>
  `;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "noreply@example.com",
        to: email,
        subject: "Your authentication code",
        html
      })
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return false;
  }
}
__name(sendOTP, "sendOTP");
__name2(sendOTP, "sendOTP");
async function onRequest8(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  try {
    const body = await request2.json();
    if (!body.email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: headers2
      });
    }
    const recentRequests = await env3.DB.prepare(
      `SELECT COUNT(*) as count FROM audit_events
       WHERE action = 'email_otp_request'
         AND target = ?
         AND created_at > datetime('now', '-15 minutes')`
    ).bind(body.email).first();
    if (recentRequests && recentRequests.count >= 3) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Try again later." }),
        { status: 429, headers: headers2 }
      );
    }
    const user = await env3.DB.prepare(
      `SELECT id FROM users WHERE email = ?`
    ).bind(body.email).first();
    if (!user) {
      return new Response(JSON.stringify({ message: "OTP sent" }), {
        status: 200,
        headers: headers2
      });
    }
    const otp = generateOTP();
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      user.id,
      "email_otp_request",
      body.email,
      JSON.stringify({ otp, expiresAt: new Date(Date.now() + 10 * 60 * 1e3).toISOString() })
    ).run();
    if (!env3.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, OTP:", otp);
    } else {
      await sendOTP(env3.RESEND_API_KEY, body.email, otp);
    }
    return new Response(JSON.stringify({ message: "OTP sent" }), {
      status: 200,
      headers: headers2
    });
  } catch (err) {
    console.error("Email OTP error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest8, "onRequest8");
__name2(onRequest8, "onRequest");
function generateResetToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateResetToken, "generateResetToken");
__name2(generateResetToken, "generateResetToken");
async function sendResetEmail(apiKey, email, resetUrl) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password. Click the link below to set a new password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #1e40af; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">
        Reset Password
      </a>
      <p style="color: #666; font-size: 14px;">This link expires in 1 hour.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
    </div>
  `;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "noreply@example.com",
        to: email,
        subject: "Password Reset Request",
        html
      })
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to send reset email:", err);
    return false;
  }
}
__name(sendResetEmail, "sendResetEmail");
__name2(sendResetEmail, "sendResetEmail");
async function onRequest9(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  try {
    const body = await request2.json();
    if (!body.email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: headers2
      });
    }
    const recentRequests = await env3.DB.prepare(
      `SELECT COUNT(*) as count FROM audit_events
       WHERE action = 'password_reset_request'
         AND target = ?
         AND created_at > datetime('now', '-1 hour')`
    ).bind(body.email).first();
    if (recentRequests && recentRequests.count >= 3) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Try again later." }),
        { status: 429, headers: headers2 }
      );
    }
    const user = await env3.DB.prepare(
      `SELECT id FROM users WHERE email = ?`
    ).bind(body.email).first();
    if (user) {
      const token = generateResetToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1e3).toISOString();
      await env3.DB.prepare(
        `INSERT INTO audit_events (id, actor_id, action, target, metadata)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(
        crypto.randomUUID(),
        user.id,
        "password_reset_request",
        body.email,
        JSON.stringify({ token, expiresAt })
      ).run();
      const siteUrl = new URL(request2.url).origin;
      const resetUrl = `${siteUrl}/admin/reset-password?token=${token}`;
      if (env3.RESEND_API_KEY) {
        await sendResetEmail(env3.RESEND_API_KEY, body.email, resetUrl);
      } else {
        console.warn("RESEND_API_KEY not configured, reset URL:", resetUrl);
      }
      await env3.DB.prepare(
        `INSERT INTO audit_events (id, actor_id, action, target, metadata)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(
        crypto.randomUUID(),
        user.id,
        "password_reset_request",
        body.email,
        JSON.stringify({ resetUrl })
      ).run();
    }
    return new Response(
      JSON.stringify({ message: "If account exists, reset email sent" }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Reset password error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest9, "onRequest9");
__name2(onRequest9, "onRequest");
async function onRequest10(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = {
    "Content-Type": "application/json"
  };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  try {
    const body = await request2.json();
    if (!body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400, headers: headers2 }
      );
    }
    const recentAttempts = await env3.DB.prepare(
      `SELECT COUNT(*) as count FROM audit_events
       WHERE action = 'sign_in_attempt'
         AND target = ?
         AND created_at > datetime('now', '-15 minutes')`
    ).bind(body.email).first();
    if (recentAttempts && recentAttempts.count >= 5) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Try again later." }),
        { status: 429, headers: headers2 }
      );
    }
    const user = await env3.DB.prepare(
      `SELECT id, email, password_hash, role, totp_enrolled_at
       FROM users WHERE email = ?`
    ).bind(body.email).first();
    if (!user) {
      await logAuditEvent(env3.DB, null, "sign_in_attempt", body.email);
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: headers2 }
      );
    }
    const passwordValid = await verifyPassword(body.password, user.password_hash);
    if (!passwordValid) {
      await logAuditEvent(env3.DB, user.id, "sign_in_attempt", body.email);
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: headers2 }
      );
    }
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString();
    await env3.DB.prepare(
      `INSERT INTO sessions (id, user_id, token, expires_at, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      user.id,
      sessionToken,
      expiresAt,
      "default"
    ).run();
    await logAuditEvent(env3.DB, user.id, "sign_in", body.email);
    const needs2FA = !user.totp_enrolled_at;
    const response = new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        session: { token: sessionToken, expiresAt },
        needs2FA
      }),
      { status: 200, headers: headers2 }
    );
    response.headers.set(
      "Set-Cookie",
      `session_token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`
    );
    return response;
  } catch (err) {
    console.error("Sign-in error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: headers2 }
    );
  }
}
__name(onRequest10, "onRequest10");
__name2(onRequest10, "onRequest");
async function logAuditEvent(db, actorId, action, target) {
  try {
    await db.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, ip_address, organization_id)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      actorId,
      action,
      target,
      "unknown",
      "default"
    ).run();
  } catch {
    console.warn("Failed to log audit event:", action, target);
  }
}
__name(logAuditEvent, "logAuditEvent");
__name2(logAuditEvent, "logAuditEvent");
function generateSessionToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateSessionToken, "generateSessionToken");
__name2(generateSessionToken, "generateSessionToken");
async function verifyPassword(plaintext, hash) {
  if (!hash || !hash.startsWith("$2")) return plaintext === hash;
  try {
    const { compareSync } = await import("bcryptjs");
    return compareSync(plaintext, hash);
  } catch {
    return plaintext === hash;
  }
}
__name(verifyPassword, "verifyPassword");
__name2(verifyPassword, "verifyPassword");
async function onRequest11(context2) {
  const headers2 = { "Content-Type": "application/json" };
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  try {
    const body = await request.json();
    if (!body.email || !body.password || !body.inviteToken) {
      return new Response(
        JSON.stringify({ error: "Email, password, and invite token required" }),
        { status: 400, headers: headers2 }
      );
    }
    const invite = await env.DB.prepare(
      `SELECT id, email, role, expires_at
       FROM invitations WHERE token = ? AND used_at IS NULL`
    ).bind(body.inviteToken).first();
    if (!invite) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired invitation" }),
        { status: 401, headers: headers2 }
      );
    }
    if (new Date(invite.expires_at) < /* @__PURE__ */ new Date()) {
      return new Response(
        JSON.stringify({ error: "Invitation has expired" }),
        { status: 410, headers: headers2 }
      );
    }
    if (invite.email !== body.email) {
      return new Response(
        JSON.stringify({ error: "Email does not match invitation" }),
        { status: 400, headers: headers2 }
      );
    }
    const existing = await env.DB.prepare(
      `SELECT id FROM users WHERE email = ?`
    ).bind(body.email).first();
    if (existing) {
      return new Response(
        JSON.stringify({ error: "An account with this email already exists" }),
        { status: 409, headers: headers2 }
      );
    }
    const userId = crypto.randomUUID();
    const passwordHash = body.password;
    await env.DB.prepare(
      `INSERT INTO users (id, email, password_hash, role, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(userId, body.email, passwordHash, invite.role, "default").run();
    await env.DB.prepare(
      `UPDATE invitations SET used_at = datetime('now') WHERE id = ?`
    ).bind(invite.id).run();
    try {
      await env.DB.prepare(
        `INSERT INTO audit_events (id, actor_id, action, target, organization_id)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), userId, "account_created", body.email, "default").run();
    } catch {
    }
    return new Response(
      JSON.stringify({
        user: { id: userId, email: body.email, role: invite.role },
        requiresEmailVerification: true
      }),
      { status: 201, headers: headers2 }
    );
  } catch (err) {
    console.error("Sign-up error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: headers2 }
    );
  }
}
__name(onRequest11, "onRequest11");
__name2(onRequest11, "onRequest");
var GITHUB_API = "https://api.github.com";
var PREVIEW_BRANCH = "content-preview";
var MAIN_BRANCH = "main";
function getRepo(env3) {
  return env3.SVELTIA_BACKEND_REPO || "milzamsz/web-astro-sveltia-cloudflare-starter";
}
__name(getRepo, "getRepo");
__name2(getRepo, "getRepo");
function headers(env3) {
  return {
    "Authorization": `Bearer ${env3.GITHUB_PAT || ""}`,
    "Accept": "application/vnd.github+json",
    "User-Agent": "astro-sveltia-cloudflare-preview"
  };
}
__name(headers, "headers");
__name2(headers, "headers");
async function getBranchSha(env3, branch) {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${getRepo(env3)}/git/refs/heads/${branch}`,
      { headers: headers(env3) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.object.sha;
  } catch {
    return null;
  }
}
__name(getBranchSha, "getBranchSha");
__name2(getBranchSha, "getBranchSha");
async function previewBranchExists(env3) {
  const sha = await getBranchSha(env3, PREVIEW_BRANCH);
  return sha !== null;
}
__name(previewBranchExists, "previewBranchExists");
__name2(previewBranchExists, "previewBranchExists");
async function createOrResetPreviewBranch(env3) {
  const mainSha = await getBranchSha(env3, MAIN_BRANCH);
  if (!mainSha) return { ok: false, error: "Could not resolve main branch SHA" };
  const exists = await previewBranchExists(env3);
  try {
    if (exists) {
      const res = await fetch(
        `${GITHUB_API}/repos/${getRepo(env3)}/git/refs/heads/${PREVIEW_BRANCH}`,
        {
          method: "PATCH",
          headers: headers(env3),
          body: JSON.stringify({
            sha: mainSha,
            force: true
          })
        }
      );
      if (!res.ok) {
        const err = await res.json();
        return { ok: false, error: err.message || "Failed to reset preview branch" };
      }
    } else {
      const res = await fetch(
        `${GITHUB_API}/repos/${getRepo(env3)}/git/refs`,
        {
          method: "POST",
          headers: headers(env3),
          body: JSON.stringify({
            ref: `refs/heads/${PREVIEW_BRANCH}`,
            sha: mainSha
          })
        }
      );
      if (!res.ok) {
        const err = await res.json();
        return { ok: false, error: err.message || "Failed to create preview branch" };
      }
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
__name(createOrResetPreviewBranch, "createOrResetPreviewBranch");
__name2(createOrResetPreviewBranch, "createOrResetPreviewBranch");
async function mergePreviewToMain(env3) {
  try {
    const mainSha = await getBranchSha(env3, MAIN_BRANCH);
    if (!mainSha) return { ok: false, error: "Could not resolve main branch SHA" };
    const res = await fetch(
      `${GITHUB_API}/repos/${getRepo(env3)}/merges`,
      {
        method: "POST",
        headers: headers(env3),
        body: JSON.stringify({
          base: MAIN_BRANCH,
          head: PREVIEW_BRANCH,
          commit_message: "chore: publish from content-preview to main"
        })
      }
    );
    if (res.status === 204) {
      return { ok: true, sha: mainSha, error: "Already up to date \u2014 no new changes to merge." };
    }
    if (res.ok) {
      const data = await res.json();
      return { ok: true, sha: data.sha };
    }
    if (res.status === 409) {
      return { ok: false, conflict: true, error: "Merge conflict. Resolve conflicts in the content-preview branch before publishing." };
    }
    const err = await res.json();
    return { ok: false, error: err.message || "Merge failed" };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
__name(mergePreviewToMain, "mergePreviewToMain");
__name2(mergePreviewToMain, "mergePreviewToMain");
async function discardPreview(env3) {
  return createOrResetPreviewBranch(env3);
}
__name(discardPreview, "discardPreview");
__name2(discardPreview, "discardPreview");
async function getDeploymentStatus(env3, branch = PREVIEW_BRANCH) {
  try {
    const accountId = env3.CF_ACCOUNT_ID || null;
    if (!accountId) {
      return { state: "unknown", url: void 0, created: void 0 };
    }
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/astro-sveltia-cloudflare/deployments`,
      {
        headers: {
          "Authorization": `Bearer ${env3.CF_API_TOKEN || ""}`,
          "Content-Type": "application/json"
        }
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const previewDeployment = data.result?.find((d) => d.branch === branch);
    if (!previewDeployment) return { state: "no_deployment" };
    return {
      state: previewDeployment.latest_stage?.status || "unknown",
      url: previewDeployment.url,
      created: previewDeployment.created_on
    };
  } catch {
    return null;
  }
}
__name(getDeploymentStatus, "getDeploymentStatus");
__name2(getDeploymentStatus, "getDeploymentStatus");
var VIEW_ROLES = ["editor", "reviewer", "publisher", "admin"];
async function onRequest12(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = { "Content-Type": "application/json" };
  if (request2.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT role FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session || !VIEW_ROLES.includes(session.role)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: headers2
      });
    }
    const branchExists = await previewBranchExists(env3);
    const deployment = await getDeploymentStatus(env3, "content-preview");
    return new Response(
      JSON.stringify({
        branch: "content-preview",
        exists: branchExists,
        state: deployment?.state || "unknown",
        url: deployment?.url || null,
        created: deployment?.created || null
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Build status error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest12, "onRequest12");
__name2(onRequest12, "onRequest");
var DISCARD_ROLES = ["publisher", "admin"];
async function onRequest13(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = { "Content-Type": "application/json" };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT user_id, role, email FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: headers2
      });
    }
    if (!DISCARD_ROLES.includes(session.role)) {
      return new Response(JSON.stringify({ error: "Forbidden: insufficient role" }), {
        status: 403,
        headers: headers2
      });
    }
    const result = await discardPreview(env3);
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      session.user_id,
      result.ok ? "discard_success" : "discard_failed",
      "content-preview \u2192 main (reset)",
      JSON.stringify({
        email: session.email,
        error: result.error || null
      })
    ).run();
    if (!result.ok) {
      return new Response(
        JSON.stringify({ ok: false, message: result.error || "Discard failed" }),
        { status: 500, headers: headers2 }
      );
    }
    return new Response(
      JSON.stringify({
        ok: true,
        message: "Preview discarded. Branch reset to main."
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Discard error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest13, "onRequest13");
__name2(onRequest13, "onRequest");
var PUBLISH_ROLES = ["publisher", "admin"];
async function onRequest14(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = { "Content-Type": "application/json" };
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: headers2
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT user_id, role, email FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: headers2
      });
    }
    if (!PUBLISH_ROLES.includes(session.role)) {
      return new Response(JSON.stringify({ error: "Forbidden: insufficient role" }), {
        status: 403,
        headers: headers2
      });
    }
    const result = await mergePreviewToMain(env3);
    await env3.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      session.user_id,
      result.conflict ? "publish_conflict" : result.ok ? "publish_success" : "publish_failed",
      "content-preview \u2192 main",
      JSON.stringify({
        email: session.email,
        sha: result.sha || null,
        error: result.error || null
      })
    ).run();
    if (!result.ok && result.conflict) {
      return new Response(
        JSON.stringify({
          ok: false,
          conflict: true,
          message: result.error
        }),
        { status: 409, headers: headers2 }
      );
    }
    if (!result.ok) {
      return new Response(
        JSON.stringify({ ok: false, message: result.error || "Publish failed" }),
        { status: 500, headers: headers2 }
      );
    }
    return new Response(
      JSON.stringify({
        ok: true,
        sha: result.sha || null,
        message: result.error || "Published successfully"
      }),
      { status: 200, headers: headers2 }
    );
  } catch (err) {
    console.error("Publish error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: headers2
    });
  }
}
__name(onRequest14, "onRequest14");
__name2(onRequest14, "onRequest");
var PROTECTED_PREFIXES = ["og/", "logos/", "favicon/", "uploads/"];
async function onRequest15(context2) {
  const { env: env3 } = context2;
  const mode = env3.CLEANUP_MODE || "dry-run";
  const graceDays = parseInt(env3.CLEANUP_GRACE_DAYS || "30", 10);
  const now = /* @__PURE__ */ new Date();
  const cutoff = new Date(now.getTime() - graceDays * 24 * 60 * 60 * 1e3);
  const report2 = {
    timestamp: now.toISOString(),
    mode,
    graceDays,
    objectsScanned: 0,
    objectsEligible: 0,
    objectsQuarantined: 0,
    objectsDeleted: 0,
    protectedPrefixes: PROTECTED_PREFIXES,
    errors: [],
    eligibleObjects: []
  };
  try {
    let manifest = [];
    try {
      const manifestObj = await env3.R2_MEDIA.get("media-manifest.json");
      if (manifestObj) {
        const manifestText = await manifestObj.text();
        manifest = JSON.parse(manifestText);
      }
    } catch {
      report2.errors.push("Failed to load media manifest. Aborting cleanup.");
      return new Response(JSON.stringify(report2, null, 2), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const manifestSet = new Set(manifest);
    let cursor;
    const datePrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    do {
      const listing = await env3.R2_MEDIA.list({ cursor, limit: 1e3 });
      cursor = listing.cursor;
      for (const object of listing.objects) {
        report2.objectsScanned++;
        const isProtected = PROTECTED_PREFIXES.some((p) => object.key.startsWith(p));
        if (isProtected) continue;
        if (manifestSet.has(object.key)) continue;
        if (object.uploaded > cutoff) continue;
        if (object.key.startsWith("quarantine/")) continue;
        report2.objectsEligible++;
        report2.eligibleObjects.push({
          key: object.key,
          size: object.size,
          lastModified: object.uploaded.toISOString()
        });
        if (mode === "quarantine") {
          const quarantineKey = `quarantine/${datePrefix}/${object.key}`;
          try {
            const obj = await env3.R2_MEDIA.get(object.key);
            if (obj) {
              await env3.R2_MEDIA.put(quarantineKey, obj.body, {
                httpMetadata: obj.httpMetadata,
                customMetadata: {
                  ...obj.customMetadata,
                  quarantinedAt: now.toISOString(),
                  originalKey: object.key
                }
              });
              await env3.R2_MEDIA.delete(object.key);
              report2.objectsQuarantined++;
            }
          } catch (err) {
            report2.errors.push(`Failed to quarantine ${object.key}: ${err}`);
          }
        } else if (mode === "delete") {
          try {
            await env3.R2_MEDIA.delete(object.key);
            report2.objectsDeleted++;
          } catch (err) {
            report2.errors.push(`Failed to delete ${object.key}: ${err}`);
          }
        }
      }
    } while (cursor);
    const reportKey = `reports/cleanup-${datePrefix}.json`;
    await env3.R2_MEDIA.put(reportKey, JSON.stringify(report2, null, 2), {
      httpMetadata: { contentType: "application/json" }
    });
    return new Response(JSON.stringify(report2, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    report2.errors.push(`Unexpected error: ${err}`);
    return new Response(JSON.stringify(report2, null, 2), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest15, "onRequest15");
__name2(onRequest15, "onRequest");
async function verifyTurnstile(token, secretKey) {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token
      })
    });
    const data = await res.json();
    return {
      success: data.success,
      score: data.score,
      error: data["error-codes"]?.join(", ")
    };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
__name(verifyTurnstile, "verifyTurnstile");
__name2(verifyTurnstile, "verifyTurnstile");
async function hashIP(ip) {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hashIP, "hashIP");
__name2(hashIP, "hashIP");
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
__name(validateEmail, "validateEmail");
__name2(validateEmail, "validateEmail");
async function onRequest16(context2) {
  const { request: request2, env: env3 } = context2;
  const headers2 = { "Content-Type": "application/json" };
  if (env3.SVELTIA_BACKEND_BRANCH === "content-preview") {
    return new Response(JSON.stringify({ ok: true, preview: true }), {
      status: 200,
      headers: headers2
    });
  }
  if (request2.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: headers2
    });
  }
  const ip = request2.headers.get("CF-Connecting-IP") || "unknown";
  const ipHash = await hashIP(ip);
  try {
    const body = await request2.json();
    if (body.website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: headers2 });
    }
    const errors = [];
    if (!body.name || body.name.length < 2 || body.name.length > 100) {
      errors.push("name: required, 2-100 characters");
    }
    if (!body.email || !validateEmail(body.email)) {
      errors.push("email: valid email required");
    }
    if (body.subject && body.subject.length > 200) {
      errors.push("subject: max 200 characters");
    }
    if (!body.message || body.message.length < 10 || body.message.length > 5e3) {
      errors.push("message: required, 10-5000 characters");
    }
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: "Validation failed", fields: errors }),
        { status: 400, headers: headers2 }
      );
    }
    if (env3.TURNSTILE_SECRET_KEY && body["cf-turnstile-response"]) {
      const turnstileResult = await verifyTurnstile(
        body["cf-turnstile-response"],
        env3.TURNSTILE_SECRET_KEY
      );
      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({ error: "Verification failed. Please try again." }),
          { status: 400, headers: headers2 }
        );
      }
    }
    const recentCount = await env3.DB.prepare(
      `SELECT COUNT(*) as count FROM contact_submissions
       WHERE ip_hash = ? AND created_at > datetime('now', '-15 minutes')`
    ).bind(ipHash).first();
    if (recentCount && recentCount.count >= 5) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: headers2 }
      );
    }
    const duplicate = await env3.DB.prepare(
      `SELECT id FROM contact_submissions
       WHERE email = ? AND message = ? AND created_at > datetime('now', '-1 hour')
       LIMIT 1`
    ).bind(body.email, body.message).first();
    if (duplicate) {
      return new Response(
        JSON.stringify({ error: "Duplicate submission", existingId: duplicate.id }),
        { status: 409, headers: headers2 }
      );
    }
    const id = crypto.randomUUID();
    await env3.DB.prepare(
      `INSERT INTO contact_submissions (id, name, email, subject, message, ip_hash, turnstile_score)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      body.name,
      body.email,
      body.subject || null,
      body.message,
      ipHash,
      null
    ).run();
    if (env3.RESEND_API_KEY) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env3.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "notifications@example.com",
          to: "admin@example.com",
          subject: `New contact form submission from ${body.name}`,
          html: `<h2>New Contact Submission</h2>
<p><strong>Name:</strong> ${body.email}</p>
<p><strong>Email:</strong> ${body.email}</p>
<p><strong>Subject:</strong> ${body.subject || "(none)"}</p>
<p><strong>Message:</strong></p>
<p>${body.message}</p>`
        })
      }).catch(() => {
      });
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env3.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "notifications@example.com",
          to: body.email,
          subject: "We received your message",
          html: `<h2>Thank you for contacting us!</h2>
<p>We have received your message and will get back to you as soon as possible.</p>
<hr />
<p><strong>Your message:</strong></p>
<p>${body.message}</p>`
        })
      }).catch(() => {
      });
    }
    return new Response(
      JSON.stringify({ ok: true, id }),
      { status: 201, headers: headers2 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: headers2 }
    );
  }
}
__name(onRequest16, "onRequest16");
__name2(onRequest16, "onRequest");
var ADMIN_ROLES = ["admin", "publisher", "reviewer", "editor"];
async function onRequest17(context2) {
  const { request: request2, env: env3, next } = context2;
  const url = new URL(request2.url);
  const bypassPaths = [
    "/login",
    "/auth",
    "/admin/totp-enroll",
    "/api/auth/sign-in",
    "/api/auth/sign-up",
    "/api/auth/verify-email",
    "/api/auth/reset-password",
    "/api/auth/reset-password/confirm",
    "/api/auth/bootstrap",
    "/api/auth/invite/accept",
    "/api/auth/totp/enroll",
    "/api/auth/totp/verify",
    "/api/auth/email-otp",
    "/api/auth/backup-codes",
    "/api/auth/backup-codes/verify",
    "/admin/config.yml",
    "/admin/index.html"
  ];
  if (bypassPaths.some((p) => url.pathname.startsWith(p))) {
    return await next();
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
        "Set-Cookie": "return_to=" + encodeURIComponent(url.pathname) + "; Path=/; HttpOnly; Secure; SameSite=Lax"
      }
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT s.user_id, u.role, u.totp_enrolled_at, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" }
      });
    }
    if (!ADMIN_ROLES.includes(session.role)) {
      return new Response("Forbidden: insufficient role", {
        status: 403,
        headers: { "Content-Type": "text/plain" }
      });
    }
    if (!session.totp_enrolled_at) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/admin/totp-enroll" }
      });
    }
    const clonedRequest = new Request(request2);
    clonedRequest.user = {
      id: session.user_id,
      email: session.email,
      role: session.role
    };
    return await next();
  } catch (err) {
    console.error("Admin middleware error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
__name(onRequest17, "onRequest17");
__name2(onRequest17, "onRequest");
var CALLBACK_URL = "https://web-astro-sveltia-cloudflare-starter.pages.dev/auth/callback";
async function onRequest18(context2) {
  const { request: request2, env: env3 } = context2;
  const url = new URL(request2.url);
  const path = url.pathname;
  if (path.endsWith("/auth") && request2.method === "GET") {
    const provider = url.searchParams.get("provider");
    const scope = url.searchParams.get("scope") || "repo,user";
    if (provider !== "github") {
      return new Response("Unsupported provider", { status: 400 });
    }
    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
    githubAuthUrl.searchParams.set("client_id", env3.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set("redirect_uri", CALLBACK_URL);
    githubAuthUrl.searchParams.set("scope", scope);
    githubAuthUrl.searchParams.set("state", crypto.randomUUID());
    return Response.redirect(githubAuthUrl.toString(), 302);
  }
  if (path.endsWith("/auth/callback") && request2.method === "GET") {
    const code = url.searchParams.get("code");
    if (!code) {
      return new Response("Missing authorization code", { status: 400 });
    }
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        client_id: env3.GITHUB_CLIENT_ID,
        client_secret: env3.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: CALLBACK_URL
      })
    });
    const tokenData = await tokenResponse.json();
    if (tokenData.error || !tokenData.access_token) {
      return new Response(JSON.stringify({
        error: tokenData.error || "token_exchange_failed",
        error_description: tokenData.error_description || "Failed to get access token"
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const cmsUrl = "https://web-astro-sveltia-cloudflare-starter.pages.dev/admin/#access_token=" + tokenData.access_token + "&token_type=bearer";
    return new Response(
      '<!DOCTYPE html><html><head><title>Redirecting...</title></head><body><p>Auth successful. Redirecting...</p><script>window.location.href="' + cmsUrl + '";<\/script></body></html>',
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  }
  return new Response("Not Found", { status: 404 });
}
__name(onRequest18, "onRequest18");
__name2(onRequest18, "onRequest");
var PREVIEW_ROLES = ["reviewer", "publisher", "admin"];
async function onRequest19(context2) {
  const { request: request2, env: env3, next } = context2;
  const url = new URL(request2.url);
  const bypassPaths = [
    "/api/cms/build-status"
  ];
  if (bypassPaths.some((p) => url.pathname.startsWith(p))) {
    return await next();
  }
  const cookie = request2.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;
  if (!token) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
        "Set-Cookie": "return_to=" + encodeURIComponent(url.pathname) + "; Path=/; HttpOnly; Secure; SameSite=Lax"
      }
    });
  }
  try {
    const session = await env3.DB.prepare(
      `SELECT s.user_id, u.role, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first();
    if (!session) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" }
      });
    }
    if (!PREVIEW_ROLES.includes(session.role)) {
      return new Response("Forbidden: insufficient role", {
        status: 403,
        headers: { "Content-Type": "text/plain" }
      });
    }
    const response = await next();
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Robots-Tag", "noindex, nofollow");
    newHeaders.set("X-Preview-Auth", "authenticated");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  } catch (err) {
    console.error("Preview middleware error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
__name(onRequest19, "onRequest19");
__name2(onRequest19, "onRequest");
var routes = [
  {
    routePath: "/api/auth/backup-codes/verify",
    mountPath: "/api/auth/backup-codes",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/auth/reset-password/confirm",
    mountPath: "/api/auth/reset-password",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/api/auth/sessions/delete",
    mountPath: "/api/auth/sessions",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  },
  {
    routePath: "/api/auth/totp/enroll",
    mountPath: "/api/auth/totp",
    method: "",
    middlewares: [],
    modules: [onRequest4]
  },
  {
    routePath: "/api/auth/totp/verify",
    mountPath: "/api/auth/totp",
    method: "",
    middlewares: [],
    modules: [onRequest5]
  },
  {
    routePath: "/api/auth/backup-codes",
    mountPath: "/api/auth/backup-codes",
    method: "",
    middlewares: [],
    modules: [onRequest6]
  },
  {
    routePath: "/api/auth/bootstrap",
    mountPath: "/api/auth",
    method: "",
    middlewares: [],
    modules: [onRequest7]
  },
  {
    routePath: "/api/auth/email-otp",
    mountPath: "/api/auth",
    method: "",
    middlewares: [],
    modules: [onRequest8]
  },
  {
    routePath: "/api/auth/reset-password",
    mountPath: "/api/auth",
    method: "",
    middlewares: [],
    modules: [onRequest9]
  },
  {
    routePath: "/api/auth/sign-in",
    mountPath: "/api/auth",
    method: "",
    middlewares: [],
    modules: [onRequest10]
  },
  {
    routePath: "/api/auth/sign-up",
    mountPath: "/api/auth",
    method: "",
    middlewares: [],
    modules: [onRequest11]
  },
  {
    routePath: "/api/cms/build-status",
    mountPath: "/api/cms",
    method: "",
    middlewares: [],
    modules: [onRequest12]
  },
  {
    routePath: "/api/cms/discard",
    mountPath: "/api/cms",
    method: "",
    middlewares: [],
    modules: [onRequest13]
  },
  {
    routePath: "/api/cms/publish",
    mountPath: "/api/cms",
    method: "",
    middlewares: [],
    modules: [onRequest14]
  },
  {
    routePath: "/api/cleanup",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest15]
  },
  {
    routePath: "/api/contact",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest16]
  },
  {
    routePath: "/admin",
    mountPath: "/admin",
    method: "",
    middlewares: [onRequest17],
    modules: []
  },
  {
    routePath: "/auth",
    mountPath: "/auth",
    method: "",
    middlewares: [],
    modules: [onRequest18]
  },
  {
    routePath: "/preview",
    mountPath: "/preview",
    method: "",
    middlewares: [onRequest19],
    modules: []
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request2) {
  const requestPath = new URL(request2.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request2.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request2.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env3, workerContext) {
    let request2 = originalRequest;
    const handlerIterator = executeRequest(request2);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request2.url).toString();
        }
        request2 = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request2.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env3,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env3["ASSETS"].fetch(request2);
        return cloneResponse(response);
      } else {
        const response = await fetch(request2);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env3["ASSETS"].fetch(request2);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request2, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env3);
  } finally {
    try {
      if (request2.body !== null && !request2.bodyUsed) {
        const reader = request2.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request2, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env3);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request2, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request2, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request2, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request2, env3, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request2, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request2, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request2, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request2, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request2, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request2);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request2) {
      return __facade_invoke__(
        request2,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../../Users/MILZAM/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request2, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env3);
  } finally {
    try {
      if (request2.body !== null && !request2.bodyUsed) {
        const reader = request2.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../../Users/MILZAM/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request2, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request2, env3);
  } catch (e) {
    const error3 = reduceError2(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-GfvJxs/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../../Users/MILZAM/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request2, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request2, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request2, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request2, env3, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-GfvJxs/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request2, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request2, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request2, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request2, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request2, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request2);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request2) {
      return __facade_invoke__2(
        request2,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.13558487417676157.js.map
