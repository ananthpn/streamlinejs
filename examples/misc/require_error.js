/*** Generated by streamline 0.1.27new3 - DO NOT EDIT ***/

var __global = typeof global !== 'undefined' ? global : window;
function __cb(_, fn){ var ctx = __global.__context; return function(err, result){ __global.__context = ctx; if (err) return _(err); try { return fn(null, result); } catch (ex) { return __propagate(_, ex); } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function(e, r){ cb(e, r); }; fn.apply(this, args); return function(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
            (function __1(_wait) {
              if (!_wait) {
                return __future(__1, arguments, 0);
              }
            ;
/*    16 */   return setTimeout(__cb(_wait, function() {
/*    24 */     console.log("the next error should be reported from line 25!");
/*    25 */     undefined.true;
                _wait();
/*    16 */   }), 1000);
            }).call(this, __trap);
