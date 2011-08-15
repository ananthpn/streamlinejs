/*** Generated by streamline 0.1.36-stack - DO NOT EDIT ***/ var __global = typeof global !== 'undefined' ? global : window;var __srcName='./test/common/stack-test_.js'; function __cb(_, frame, line, col, fn){ var ctx = __global.__context; frame.line = line; frame.col = col; return function ___(err, result){ __global.__frame = frame; __global.__context = ctx; if (err) { err.__frame = err.__frame || frame; return _(err); } try { return fn(null, result); } catch (ex) { ex.__frame = ex.__frame || frame; return __propagate(_, ex); } } } function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function ___(e, r){ cb(e, r); }; fn.apply(this, args); return function ___(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); } function __nt(_, frame, fn){ var i = 0; var cb = __cb(_, frame, 0, 0, fn); var safeCb = function ___(){ try { cb(); } catch (ex) { __propagate(cb, ex); } }; if (typeof process != "undefined" && typeof process.nextTick == "function") return function ___(){ if (++i % 20 == 0) process.nextTick(safeCb); else cb(); }; else return function ___(){ if (++i % 20 == 0) setTimeout(safeCb); else cb(); }; } function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } } function __trap(err){ if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } } function __tryCatch(_, fn){ try { fn(); } catch (e) { try { _(e); } catch (ex) { __trap(ex); } } } var module = QUnit.module;




var flows = require("streamline/lib/util/flows");

function nextTick(cb) {
 setTimeout(function() {
 cb();
 }, 0);};


function failAsync(_, code) { if (!_) { return __future(failAsync, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "failAsync", prev: __global.__frame }; try {
 return _(new Error(code)); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};


function failSync(_, code) { if (!_) { return __future(failSync, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "failSync", prev: __global.__frame }; try {
 (function fail(dummy) {
 throw new Error(code);
 })(0); _(); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};


var fail;

function A(_, code) { if (!_) { return __future(A, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "A", prev: __global.__frame }; try { var i; return (function __$A(__then) {
 if ((code == 1)) {
 return fail(__cb(_, __frame, 28, 1, __then), code); } else { __then(); } ; })(function __$A() { return (function __$A(__then) {
 if ((code == 2)) {
 return fail(__cb(_, __frame, 30, 1, __then), code); } else { __then(); } ; })(function __$A() {
 return nextTick(__cb(_, __frame, 31, 1, function __$A() { return (function __$A(__then) {
 if ((code == 3)) {
 return fail(__cb(_, __frame, 33, 1, __then), code); } else { __then(); } ; })(function __$A() {
 i = 0; var __6 = false; return (function ___(__break) { var __loop = __nt(_, __frame, function __$A() { if (__6) { i++; } else { __6 = true; } ; var __5 = (i < 6); if (__5) { return (function __$A(__then) {
 if ((code == i)) {
 return fail(__cb(_, __frame, 36, 1, __then), code); } else { __then(); } ; })(function __$A() {
 return nextTick(__cb(_, __frame, 37, 1, __loop)); }); } else { __break(); } ; }); __loop(); })(function __$A() { return (function __$A(__then) {

 if ((code == 6)) {
 return fail(__cb(_, __frame, 40, 1, __then), code); } else { __then(); } ; })(function __$A() {
 return nextTick(__cb(_, __frame, 41, 1, function __$A() {
 return B(__cb(_, __frame, 42, 1, function __$A() {
 return nextTick(__cb(_, __frame, 43, 1, function __$A() {
 return _(null, "END"); })); }), code); })); }); }); }); })); }); }); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};


function B(_, code) { if (!_) { return __future(B, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "B", prev: __global.__frame }; try { return (function __$B(__then) {
 if ((code == 7)) {
 return fail(__cb(_, __frame, 49, 1, __then), code); } else { __then(); } ; })(function __$B() {
 return C(__cb(_, __frame, 50, 1, function __$B() {
 return nextTick(__cb(_, __frame, 51, 1, function __$B() {
 return C(__cb(_, __frame, 52, 1, function __$B() {
 return D(__cb(_, __frame, 53, 1, _), code); }), code); })); }), code); }); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};


function C(_, code) { if (!_) { return __future(C, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "C", prev: __global.__frame }; try { return (function __$C(__then) {
 if ((code == 8)) {
 return fail(__cb(_, __frame, 58, 1, __then), code); } else { __then(); } ; })(_); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};


function D(_, code) { if (!_) { return __future(D, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "D", prev: __global.__frame }; try { return (function __$D(__then) {
 if ((code == 9)) {
 return fail(__cb(_, __frame, 63, 1, __then), code); } else { __then(); } ; })(_); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};


function T(_, code, failFn) { if (!_) { return __future(T, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "T", prev: __global.__frame }; try { var s, ff, end;
 fail = failFn;
 s = "{"; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$T() {

 return A(__cb(_, __frame, 70, 1, _), code); }); })(function ___(ex, __result) { __tryCatch(_, function __$T() { if (ex) {


 s = flows.stackTrace(ex);

 s = s.split("\n").map(function(l) {
 var m = /^\s+at (\w+)\s\(.*:(\d+)\:.*\)/.exec(l);
 if (m) {
 return ((m[1] + ":") + m[2]) };
 return l;
 }).join("/");
 end = s.indexOf("/T:");
 return _(null, ((end < 0) ? (s + "-- end frame missing") : s.substring(0, end))); } else { _(null, __result); } ; }); }); })(function ___() { __tryCatch(_, _); }); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };};



module("flows");

asyncTest("stacks", 20, function __1(_) { if (!_) { return __future(__1, arguments, 0); }; var __frame = __global.__frame = { file: __srcName, name: "__1", prev: __global.__frame }; try {
 return T(__cb(_, __frame, 89, 1, function ___(__0, __1) { strictEqual(__1, "Error: 1/failAsync:15/A:28");
 return T(__cb(_, __frame, 90, 1, function ___(__0, __2) { strictEqual(__2, "Error: 1/fail:20/failSync:21/A:28");
 return T(__cb(_, __frame, 91, 1, function ___(__0, __3) { strictEqual(__3, "Error: 2/failAsync:15/A:30");
 return T(__cb(_, __frame, 92, 1, function ___(__0, __4) { strictEqual(__4, "Error: 2/fail:20/failSync:21/A:30");
 return T(__cb(_, __frame, 93, 1, function ___(__0, __5) { strictEqual(__5, "Error: 3/failAsync:15/A:33");
 return T(__cb(_, __frame, 94, 1, function ___(__0, __6) { strictEqual(__6, "Error: 3/fail:20/failSync:21/A:33");
 return T(__cb(_, __frame, 95, 1, function ___(__0, __7) { strictEqual(__7, "Error: 4/failAsync:15/A:36");
 return T(__cb(_, __frame, 96, 1, function ___(__0, __8) { strictEqual(__8, "Error: 4/fail:20/failSync:21/A:36");
 return T(__cb(_, __frame, 97, 1, function ___(__0, __9) { strictEqual(__9, "Error: 5/failAsync:15/A:36");
 return T(__cb(_, __frame, 98, 1, function ___(__0, __10) { strictEqual(__10, "Error: 5/fail:20/failSync:21/A:36");
 return T(__cb(_, __frame, 99, 1, function ___(__0, __11) { strictEqual(__11, "Error: 6/failAsync:15/A:40");
 return T(__cb(_, __frame, 100, 1, function ___(__0, __12) { strictEqual(__12, "Error: 6/fail:20/failSync:21/A:40");
 return T(__cb(_, __frame, 101, 1, function ___(__0, __13) { strictEqual(__13, "Error: 7/failAsync:15/B:49/A:42");
 return T(__cb(_, __frame, 102, 1, function ___(__0, __14) { strictEqual(__14, "Error: 7/fail:20/failSync:21/B:49/A:42");
 return T(__cb(_, __frame, 103, 1, function ___(__0, __15) { strictEqual(__15, "Error: 8/failAsync:15/C:58/B:50/A:42");
 return T(__cb(_, __frame, 104, 1, function ___(__0, __16) { strictEqual(__16, "Error: 8/fail:20/failSync:21/C:58/B:50/A:42");
 return T(__cb(_, __frame, 105, 1, function ___(__0, __17) { strictEqual(__17, "Error: 9/failAsync:15/D:63/B:53/A:42");
 return T(__cb(_, __frame, 106, 1, function ___(__0, __18) { strictEqual(__18, "Error: 9/fail:20/failSync:21/D:63/B:53/A:42");
 return T(__cb(_, __frame, 107, 1, function ___(__0, __19) { strictEqual(__19, "END");
 return T(__cb(_, __frame, 108, 1, function ___(__0, __20) { strictEqual(__20, "END");
 start(); _(); }), 10, failSync); }), 10, failAsync); }), 9, failSync); }), 9, failAsync); }), 8, failSync); }), 8, failAsync); }), 7, failSync); }), 7, failAsync); }), 6, failSync); }), 6, failAsync); }), 5, failSync); }), 5, failAsync); }), 4, failSync); }), 4, failAsync); }), 3, failSync); }), 3, failAsync); }), 2, failSync); }), 2, failAsync); }), 1, failSync); }), 1, failAsync); } catch (e) { e.__frame = (e.__frame || __frame.prev); __global.__frame = __frame; return __propagate(_, e); };});