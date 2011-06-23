/*** Generated by streamline 0.1.27new3 - DO NOT EDIT ***/

var __global = typeof global !== 'undefined' ? global : window;
function __cb(_, fn){ var ctx = __global.__context; return function(err, result){ __global.__context = ctx; if (err) return _(err); try { return fn(null, result); } catch (ex) { return __propagate(_, ex); } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function(e, r){ cb(e, r); }; fn.apply(this, args); return function(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
            (function __1(_) {
              if (!_) {
                return __future(__1, arguments, 0);
              }
            ;
              var fs, flows, fileFunnel, p, t0;
/*    27 */   function du(_, path) {
                if (!_) {
                  return __future(du, arguments, 0);
                }
              ;
                var total, stat, files, futures;
/*    28 */     total = 0;
/*    29 */     return fs.stat(path, __cb(_, function(__0, __3) {
                  stat = __3;
                  return (function(__then) {
/*    30 */         if (stat.isFile()) {
/*    31 */           return fileFunnel(__cb(_, __then), function __1(_) {
                        if (!_) {
                          return __future(__1, arguments, 0);
                        }
                      ;
/*    32 */             return fs.readFile(path, __cb(_, function(__0, __1) {
/*    32 */               total += __1.length;
                          _();
                        }));
                      });
                    }
                     else {
                      return (function(__then) {
/*    36 */             if (stat.isDirectory()) {
/*    37 */               return fs.readdir(path, __cb(_, function(__0, __4) {
                            files = __4;
/*    38 */                 futures = files.map(function(file) {
/*    39 */                   return du(null, ((path + "/") + file));
                            });
/*    41 */                 return flows.reduce(__cb(_, function(__0, __5) {
/*    41 */                   total += __5;
/*    44 */                   console.log(((path + ": ") + total));
                              __then();
/*    41 */                 }), futures, function __2(_, val, future) {
                              if (!_) {
                                return __future(__2, arguments, 0);
                              }
                            ;
/*    42 */                   return future(__cb(_, function(__0, __2) {
/*    42 */                     var __1 = (val + __2);
                                return _(null, __1);
                              }));
/*    43 */                 }, 0);
                          }));
                        }
                         else {
/*    47 */               console.log((path + ": odd file"));
                          __then();
                        }
                      ;
                      })(__then);
                    }
                  ;
                  })(function() {
/*    49 */         return _(null, total);
                  });
                }));
              };
/*    22 */   fs = require("fs");
/*    23 */   flows = require("streamline/lib/util/flows");
/*    25 */   fileFunnel = flows.funnel(20);
/*    52 */   p = ((process.argv.length > 2) ? process.argv[2] : ".");
/*    54 */   t0 = Date.now();
/*    55 */   return du(__cb(_, function() {
/*    56 */     console.log((("completed in " + ((Date.now() - t0))) + " ms"));
                _();
/*    55 */   }), p);
            }).call(this, __trap);
