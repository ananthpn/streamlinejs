/*** Generated by streamline 0.1.36-stack - DO NOT EDIT ***/
var __global = typeof global !== 'undefined' ? global : window;var __srcName='node_modules/streamline/examples/misc/require_error_.js';
function __func(_, __this, __arguments, fn, index, frame, body) { if (!_) { return __future.call(__this, fn, __arguments, index); } frame.file = __srcName; frame.prev = __global.__frame; __global.__frame = frame; try { body(); } catch (e) { e.__frame = e.__frame || frame.prev; __propagate(_, e); } finally { __global.__frame = __frame.prev; } }
function __cb(_, frame, offset, col, fn){ frame.offset = offset; frame.col = col; var ctx = __global.__context; return function ___(err, result){ var oldFrame = __global.__frame; __global.__frame = frame; __global.__context = ctx; try { if (err) { err.__frame = err.__frame || frame; return _(err); } return fn(null, result); } catch (ex) { ex.__frame = ex.__frame || frame; return __propagate(_, ex); } finally { __global.__frame = oldFrame; } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function ___(e, r){ cb(e, r); }; fn.apply(this, args); return function ___(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
            (function main(_wait) {
              var __frame = {
                name: "main",
                line: 2
              };
              return __func(_wait, this, arguments, main, 0, __frame, function __$main() {
/*    16 */     return setTimeout(__cb(_wait, __frame, 14, 0, function __$main() {
/*    24 */       console.log("the next error should be reported from line 25!");
/*    25 */       undefined.true;
                  _wait();
/*    16 */     }), 1000);
              });
            }).call(this, __trap);
