// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var args10087 = [];
var len__7923__auto___10093 = arguments.length;
var i__7924__auto___10094 = (0);
while(true){
if((i__7924__auto___10094 < len__7923__auto___10093)){
args10087.push((arguments[i__7924__auto___10094]));

var G__10095 = (i__7924__auto___10094 + (1));
i__7924__auto___10094 = G__10095;
continue;
} else {
}
break;
}

var G__10089 = args10087.length;
switch (G__10089) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10087.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async10090 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10090 = (function (f,blockable,meta10091){
this.f = f;
this.blockable = blockable;
this.meta10091 = meta10091;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10090.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10092,meta10091__$1){
var self__ = this;
var _10092__$1 = this;
return (new cljs.core.async.t_cljs$core$async10090(self__.f,self__.blockable,meta10091__$1));
});

cljs.core.async.t_cljs$core$async10090.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10092){
var self__ = this;
var _10092__$1 = this;
return self__.meta10091;
});

cljs.core.async.t_cljs$core$async10090.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async10090.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async10090.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async10090.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async10090.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta10091","meta10091",1841450876,null)], null);
});

cljs.core.async.t_cljs$core$async10090.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10090.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10090";

cljs.core.async.t_cljs$core$async10090.cljs$lang$ctorPrWriter = (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async10090");
});

cljs.core.async.__GT_t_cljs$core$async10090 = (function cljs$core$async$__GT_t_cljs$core$async10090(f__$1,blockable__$1,meta10091){
return (new cljs.core.async.t_cljs$core$async10090(f__$1,blockable__$1,meta10091));
});

}

return (new cljs.core.async.t_cljs$core$async10090(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args10099 = [];
var len__7923__auto___10102 = arguments.length;
var i__7924__auto___10103 = (0);
while(true){
if((i__7924__auto___10103 < len__7923__auto___10102)){
args10099.push((arguments[i__7924__auto___10103]));

var G__10104 = (i__7924__auto___10103 + (1));
i__7924__auto___10103 = G__10104;
continue;
} else {
}
break;
}

var G__10101 = args10099.length;
switch (G__10101) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10099.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var args10106 = [];
var len__7923__auto___10109 = arguments.length;
var i__7924__auto___10110 = (0);
while(true){
if((i__7924__auto___10110 < len__7923__auto___10109)){
args10106.push((arguments[i__7924__auto___10110]));

var G__10111 = (i__7924__auto___10110 + (1));
i__7924__auto___10110 = G__10111;
continue;
} else {
}
break;
}

var G__10108 = args10106.length;
switch (G__10108) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10106.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args10113 = [];
var len__7923__auto___10116 = arguments.length;
var i__7924__auto___10117 = (0);
while(true){
if((i__7924__auto___10117 < len__7923__auto___10116)){
args10113.push((arguments[i__7924__auto___10117]));

var G__10118 = (i__7924__auto___10117 + (1));
i__7924__auto___10117 = G__10118;
continue;
} else {
}
break;
}

var G__10115 = args10113.length;
switch (G__10115) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10113.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_10120 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_10120);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_10120,ret){
return (function (){
return fn1.call(null,val_10120);
});})(val_10120,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args10121 = [];
var len__7923__auto___10124 = arguments.length;
var i__7924__auto___10125 = (0);
while(true){
if((i__7924__auto___10125 < len__7923__auto___10124)){
args10121.push((arguments[i__7924__auto___10125]));

var G__10126 = (i__7924__auto___10125 + (1));
i__7924__auto___10125 = G__10126;
continue;
} else {
}
break;
}

var G__10123 = args10121.length;
switch (G__10123) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10121.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4655__auto__)){
var ret = temp__4655__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4655__auto__)){
var retb = temp__4655__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4655__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4655__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__7737__auto___10128 = n;
var x_10129 = (0);
while(true){
if((x_10129 < n__7737__auto___10128)){
(a[x_10129] = (0));

var G__10130 = (x_10129 + (1));
x_10129 = G__10130;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__10131 = (i + (1));
i = G__10131;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async10135 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10135 = (function (flag,meta10136){
this.flag = flag;
this.meta10136 = meta10136;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10135.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_10137,meta10136__$1){
var self__ = this;
var _10137__$1 = this;
return (new cljs.core.async.t_cljs$core$async10135(self__.flag,meta10136__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async10135.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_10137){
var self__ = this;
var _10137__$1 = this;
return self__.meta10136;
});})(flag))
;

cljs.core.async.t_cljs$core$async10135.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async10135.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async10135.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async10135.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async10135.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta10136","meta10136",-1551816245,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async10135.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10135.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10135";

cljs.core.async.t_cljs$core$async10135.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async10135");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async10135 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async10135(flag__$1,meta10136){
return (new cljs.core.async.t_cljs$core$async10135(flag__$1,meta10136));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async10135(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async10141 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10141 = (function (flag,cb,meta10142){
this.flag = flag;
this.cb = cb;
this.meta10142 = meta10142;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10141.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10143,meta10142__$1){
var self__ = this;
var _10143__$1 = this;
return (new cljs.core.async.t_cljs$core$async10141(self__.flag,self__.cb,meta10142__$1));
});

cljs.core.async.t_cljs$core$async10141.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10143){
var self__ = this;
var _10143__$1 = this;
return self__.meta10142;
});

cljs.core.async.t_cljs$core$async10141.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async10141.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async10141.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async10141.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async10141.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta10142","meta10142",-472381917,null)], null);
});

cljs.core.async.t_cljs$core$async10141.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10141.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10141";

cljs.core.async.t_cljs$core$async10141.cljs$lang$ctorPrWriter = (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async10141");
});

cljs.core.async.__GT_t_cljs$core$async10141 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async10141(flag__$1,cb__$1,meta10142){
return (new cljs.core.async.t_cljs$core$async10141(flag__$1,cb__$1,meta10142));
});

}

return (new cljs.core.async.t_cljs$core$async10141(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10144_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10144_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10145_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10145_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__6814__auto__ = wport;
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return port;
}
})()], null));
} else {
var G__10146 = (i + (1));
i = G__10146;
continue;
}
} else {
return null;
}
break;
}
})();
var or__6814__auto__ = ret;
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4657__auto__ = (function (){var and__6802__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__6802__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__6802__auto__;
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var got = temp__4657__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__7930__auto__ = [];
var len__7923__auto___10152 = arguments.length;
var i__7924__auto___10153 = (0);
while(true){
if((i__7924__auto___10153 < len__7923__auto___10152)){
args__7930__auto__.push((arguments[i__7924__auto___10153]));

var G__10154 = (i__7924__auto___10153 + (1));
i__7924__auto___10153 = G__10154;
continue;
} else {
}
break;
}

var argseq__7931__auto__ = ((((1) < args__7930__auto__.length))?(new cljs.core.IndexedSeq(args__7930__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7931__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__10149){
var map__10150 = p__10149;
var map__10150__$1 = ((((!((map__10150 == null)))?((((map__10150.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__10150.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10150):map__10150);
var opts = map__10150__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq10147){
var G__10148 = cljs.core.first.call(null,seq10147);
var seq10147__$1 = cljs.core.next.call(null,seq10147);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__10148,seq10147__$1);
});

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args10155 = [];
var len__7923__auto___10205 = arguments.length;
var i__7924__auto___10206 = (0);
while(true){
if((i__7924__auto___10206 < len__7923__auto___10205)){
args10155.push((arguments[i__7924__auto___10206]));

var G__10207 = (i__7924__auto___10206 + (1));
i__7924__auto___10206 = G__10207;
continue;
} else {
}
break;
}

var G__10157 = args10155.length;
switch (G__10157) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10155.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__10042__auto___10209 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___10209){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___10209){
return (function (state_10181){
var state_val_10182 = (state_10181[(1)]);
if((state_val_10182 === (7))){
var inst_10177 = (state_10181[(2)]);
var state_10181__$1 = state_10181;
var statearr_10183_10210 = state_10181__$1;
(statearr_10183_10210[(2)] = inst_10177);

(statearr_10183_10210[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (1))){
var state_10181__$1 = state_10181;
var statearr_10184_10211 = state_10181__$1;
(statearr_10184_10211[(2)] = null);

(statearr_10184_10211[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (4))){
var inst_10160 = (state_10181[(7)]);
var inst_10160__$1 = (state_10181[(2)]);
var inst_10161 = (inst_10160__$1 == null);
var state_10181__$1 = (function (){var statearr_10185 = state_10181;
(statearr_10185[(7)] = inst_10160__$1);

return statearr_10185;
})();
if(cljs.core.truth_(inst_10161)){
var statearr_10186_10212 = state_10181__$1;
(statearr_10186_10212[(1)] = (5));

} else {
var statearr_10187_10213 = state_10181__$1;
(statearr_10187_10213[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (13))){
var state_10181__$1 = state_10181;
var statearr_10188_10214 = state_10181__$1;
(statearr_10188_10214[(2)] = null);

(statearr_10188_10214[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (6))){
var inst_10160 = (state_10181[(7)]);
var state_10181__$1 = state_10181;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10181__$1,(11),to,inst_10160);
} else {
if((state_val_10182 === (3))){
var inst_10179 = (state_10181[(2)]);
var state_10181__$1 = state_10181;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10181__$1,inst_10179);
} else {
if((state_val_10182 === (12))){
var state_10181__$1 = state_10181;
var statearr_10189_10215 = state_10181__$1;
(statearr_10189_10215[(2)] = null);

(statearr_10189_10215[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (2))){
var state_10181__$1 = state_10181;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10181__$1,(4),from);
} else {
if((state_val_10182 === (11))){
var inst_10170 = (state_10181[(2)]);
var state_10181__$1 = state_10181;
if(cljs.core.truth_(inst_10170)){
var statearr_10190_10216 = state_10181__$1;
(statearr_10190_10216[(1)] = (12));

} else {
var statearr_10191_10217 = state_10181__$1;
(statearr_10191_10217[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (9))){
var state_10181__$1 = state_10181;
var statearr_10192_10218 = state_10181__$1;
(statearr_10192_10218[(2)] = null);

(statearr_10192_10218[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (5))){
var state_10181__$1 = state_10181;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10193_10219 = state_10181__$1;
(statearr_10193_10219[(1)] = (8));

} else {
var statearr_10194_10220 = state_10181__$1;
(statearr_10194_10220[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (14))){
var inst_10175 = (state_10181[(2)]);
var state_10181__$1 = state_10181;
var statearr_10195_10221 = state_10181__$1;
(statearr_10195_10221[(2)] = inst_10175);

(statearr_10195_10221[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (10))){
var inst_10167 = (state_10181[(2)]);
var state_10181__$1 = state_10181;
var statearr_10196_10222 = state_10181__$1;
(statearr_10196_10222[(2)] = inst_10167);

(statearr_10196_10222[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10182 === (8))){
var inst_10164 = cljs.core.async.close_BANG_.call(null,to);
var state_10181__$1 = state_10181;
var statearr_10197_10223 = state_10181__$1;
(statearr_10197_10223[(2)] = inst_10164);

(statearr_10197_10223[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___10209))
;
return ((function (switch__9930__auto__,c__10042__auto___10209){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_10201 = [null,null,null,null,null,null,null,null];
(statearr_10201[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_10201[(1)] = (1));

return statearr_10201;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_10181){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10181);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10202){if((e10202 instanceof Object)){
var ex__9934__auto__ = e10202;
var statearr_10203_10224 = state_10181;
(statearr_10203_10224[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10181);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10202;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10225 = state_10181;
state_10181 = G__10225;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_10181){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_10181);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___10209))
})();
var state__10044__auto__ = (function (){var statearr_10204 = f__10043__auto__.call(null);
(statearr_10204[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___10209);

return statearr_10204;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___10209))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__10413){
var vec__10414 = p__10413;
var v = cljs.core.nth.call(null,vec__10414,(0),null);
var p = cljs.core.nth.call(null,vec__10414,(1),null);
var job = vec__10414;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__10042__auto___10600 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___10600,res,vec__10414,v,p,job,jobs,results){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___10600,res,vec__10414,v,p,job,jobs,results){
return (function (state_10421){
var state_val_10422 = (state_10421[(1)]);
if((state_val_10422 === (1))){
var state_10421__$1 = state_10421;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10421__$1,(2),res,v);
} else {
if((state_val_10422 === (2))){
var inst_10418 = (state_10421[(2)]);
var inst_10419 = cljs.core.async.close_BANG_.call(null,res);
var state_10421__$1 = (function (){var statearr_10423 = state_10421;
(statearr_10423[(7)] = inst_10418);

return statearr_10423;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10421__$1,inst_10419);
} else {
return null;
}
}
});})(c__10042__auto___10600,res,vec__10414,v,p,job,jobs,results))
;
return ((function (switch__9930__auto__,c__10042__auto___10600,res,vec__10414,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0 = (function (){
var statearr_10427 = [null,null,null,null,null,null,null,null];
(statearr_10427[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__);

(statearr_10427[(1)] = (1));

return statearr_10427;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1 = (function (state_10421){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10421);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10428){if((e10428 instanceof Object)){
var ex__9934__auto__ = e10428;
var statearr_10429_10601 = state_10421;
(statearr_10429_10601[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10421);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10428;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10602 = state_10421;
state_10421 = G__10602;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = function(state_10421){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1.call(this,state_10421);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___10600,res,vec__10414,v,p,job,jobs,results))
})();
var state__10044__auto__ = (function (){var statearr_10430 = f__10043__auto__.call(null);
(statearr_10430[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___10600);

return statearr_10430;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___10600,res,vec__10414,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__10431){
var vec__10432 = p__10431;
var v = cljs.core.nth.call(null,vec__10432,(0),null);
var p = cljs.core.nth.call(null,vec__10432,(1),null);
var job = vec__10432;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__7737__auto___10603 = n;
var __10604 = (0);
while(true){
if((__10604 < n__7737__auto___10603)){
var G__10435_10605 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__10435_10605) {
case "compute":
var c__10042__auto___10607 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__10604,c__10042__auto___10607,G__10435_10605,n__7737__auto___10603,jobs,results,process,async){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (__10604,c__10042__auto___10607,G__10435_10605,n__7737__auto___10603,jobs,results,process,async){
return (function (state_10448){
var state_val_10449 = (state_10448[(1)]);
if((state_val_10449 === (1))){
var state_10448__$1 = state_10448;
var statearr_10450_10608 = state_10448__$1;
(statearr_10450_10608[(2)] = null);

(statearr_10450_10608[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10449 === (2))){
var state_10448__$1 = state_10448;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10448__$1,(4),jobs);
} else {
if((state_val_10449 === (3))){
var inst_10446 = (state_10448[(2)]);
var state_10448__$1 = state_10448;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10448__$1,inst_10446);
} else {
if((state_val_10449 === (4))){
var inst_10438 = (state_10448[(2)]);
var inst_10439 = process.call(null,inst_10438);
var state_10448__$1 = state_10448;
if(cljs.core.truth_(inst_10439)){
var statearr_10451_10609 = state_10448__$1;
(statearr_10451_10609[(1)] = (5));

} else {
var statearr_10452_10610 = state_10448__$1;
(statearr_10452_10610[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10449 === (5))){
var state_10448__$1 = state_10448;
var statearr_10453_10611 = state_10448__$1;
(statearr_10453_10611[(2)] = null);

(statearr_10453_10611[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10449 === (6))){
var state_10448__$1 = state_10448;
var statearr_10454_10612 = state_10448__$1;
(statearr_10454_10612[(2)] = null);

(statearr_10454_10612[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10449 === (7))){
var inst_10444 = (state_10448[(2)]);
var state_10448__$1 = state_10448;
var statearr_10455_10613 = state_10448__$1;
(statearr_10455_10613[(2)] = inst_10444);

(statearr_10455_10613[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__10604,c__10042__auto___10607,G__10435_10605,n__7737__auto___10603,jobs,results,process,async))
;
return ((function (__10604,switch__9930__auto__,c__10042__auto___10607,G__10435_10605,n__7737__auto___10603,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0 = (function (){
var statearr_10459 = [null,null,null,null,null,null,null];
(statearr_10459[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__);

(statearr_10459[(1)] = (1));

return statearr_10459;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1 = (function (state_10448){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10448);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10460){if((e10460 instanceof Object)){
var ex__9934__auto__ = e10460;
var statearr_10461_10614 = state_10448;
(statearr_10461_10614[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10448);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10460;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10615 = state_10448;
state_10448 = G__10615;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = function(state_10448){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1.call(this,state_10448);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__;
})()
;})(__10604,switch__9930__auto__,c__10042__auto___10607,G__10435_10605,n__7737__auto___10603,jobs,results,process,async))
})();
var state__10044__auto__ = (function (){var statearr_10462 = f__10043__auto__.call(null);
(statearr_10462[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___10607);

return statearr_10462;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(__10604,c__10042__auto___10607,G__10435_10605,n__7737__auto___10603,jobs,results,process,async))
);


break;
case "async":
var c__10042__auto___10616 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__10604,c__10042__auto___10616,G__10435_10605,n__7737__auto___10603,jobs,results,process,async){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (__10604,c__10042__auto___10616,G__10435_10605,n__7737__auto___10603,jobs,results,process,async){
return (function (state_10475){
var state_val_10476 = (state_10475[(1)]);
if((state_val_10476 === (1))){
var state_10475__$1 = state_10475;
var statearr_10477_10617 = state_10475__$1;
(statearr_10477_10617[(2)] = null);

(statearr_10477_10617[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10476 === (2))){
var state_10475__$1 = state_10475;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10475__$1,(4),jobs);
} else {
if((state_val_10476 === (3))){
var inst_10473 = (state_10475[(2)]);
var state_10475__$1 = state_10475;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10475__$1,inst_10473);
} else {
if((state_val_10476 === (4))){
var inst_10465 = (state_10475[(2)]);
var inst_10466 = async.call(null,inst_10465);
var state_10475__$1 = state_10475;
if(cljs.core.truth_(inst_10466)){
var statearr_10478_10618 = state_10475__$1;
(statearr_10478_10618[(1)] = (5));

} else {
var statearr_10479_10619 = state_10475__$1;
(statearr_10479_10619[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10476 === (5))){
var state_10475__$1 = state_10475;
var statearr_10480_10620 = state_10475__$1;
(statearr_10480_10620[(2)] = null);

(statearr_10480_10620[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10476 === (6))){
var state_10475__$1 = state_10475;
var statearr_10481_10621 = state_10475__$1;
(statearr_10481_10621[(2)] = null);

(statearr_10481_10621[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10476 === (7))){
var inst_10471 = (state_10475[(2)]);
var state_10475__$1 = state_10475;
var statearr_10482_10622 = state_10475__$1;
(statearr_10482_10622[(2)] = inst_10471);

(statearr_10482_10622[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__10604,c__10042__auto___10616,G__10435_10605,n__7737__auto___10603,jobs,results,process,async))
;
return ((function (__10604,switch__9930__auto__,c__10042__auto___10616,G__10435_10605,n__7737__auto___10603,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0 = (function (){
var statearr_10486 = [null,null,null,null,null,null,null];
(statearr_10486[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__);

(statearr_10486[(1)] = (1));

return statearr_10486;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1 = (function (state_10475){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10475);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10487){if((e10487 instanceof Object)){
var ex__9934__auto__ = e10487;
var statearr_10488_10623 = state_10475;
(statearr_10488_10623[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10475);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10487;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10624 = state_10475;
state_10475 = G__10624;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = function(state_10475){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1.call(this,state_10475);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__;
})()
;})(__10604,switch__9930__auto__,c__10042__auto___10616,G__10435_10605,n__7737__auto___10603,jobs,results,process,async))
})();
var state__10044__auto__ = (function (){var statearr_10489 = f__10043__auto__.call(null);
(statearr_10489[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___10616);

return statearr_10489;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(__10604,c__10042__auto___10616,G__10435_10605,n__7737__auto___10603,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("No matching clause: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(type)].join('')));

}

var G__10625 = (__10604 + (1));
__10604 = G__10625;
continue;
} else {
}
break;
}

var c__10042__auto___10626 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___10626,jobs,results,process,async){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___10626,jobs,results,process,async){
return (function (state_10511){
var state_val_10512 = (state_10511[(1)]);
if((state_val_10512 === (1))){
var state_10511__$1 = state_10511;
var statearr_10513_10627 = state_10511__$1;
(statearr_10513_10627[(2)] = null);

(statearr_10513_10627[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10512 === (2))){
var state_10511__$1 = state_10511;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10511__$1,(4),from);
} else {
if((state_val_10512 === (3))){
var inst_10509 = (state_10511[(2)]);
var state_10511__$1 = state_10511;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10511__$1,inst_10509);
} else {
if((state_val_10512 === (4))){
var inst_10492 = (state_10511[(7)]);
var inst_10492__$1 = (state_10511[(2)]);
var inst_10493 = (inst_10492__$1 == null);
var state_10511__$1 = (function (){var statearr_10514 = state_10511;
(statearr_10514[(7)] = inst_10492__$1);

return statearr_10514;
})();
if(cljs.core.truth_(inst_10493)){
var statearr_10515_10628 = state_10511__$1;
(statearr_10515_10628[(1)] = (5));

} else {
var statearr_10516_10629 = state_10511__$1;
(statearr_10516_10629[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10512 === (5))){
var inst_10495 = cljs.core.async.close_BANG_.call(null,jobs);
var state_10511__$1 = state_10511;
var statearr_10517_10630 = state_10511__$1;
(statearr_10517_10630[(2)] = inst_10495);

(statearr_10517_10630[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10512 === (6))){
var inst_10497 = (state_10511[(8)]);
var inst_10492 = (state_10511[(7)]);
var inst_10497__$1 = cljs.core.async.chan.call(null,(1));
var inst_10498 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_10499 = [inst_10492,inst_10497__$1];
var inst_10500 = (new cljs.core.PersistentVector(null,2,(5),inst_10498,inst_10499,null));
var state_10511__$1 = (function (){var statearr_10518 = state_10511;
(statearr_10518[(8)] = inst_10497__$1);

return statearr_10518;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10511__$1,(8),jobs,inst_10500);
} else {
if((state_val_10512 === (7))){
var inst_10507 = (state_10511[(2)]);
var state_10511__$1 = state_10511;
var statearr_10519_10631 = state_10511__$1;
(statearr_10519_10631[(2)] = inst_10507);

(statearr_10519_10631[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10512 === (8))){
var inst_10497 = (state_10511[(8)]);
var inst_10502 = (state_10511[(2)]);
var state_10511__$1 = (function (){var statearr_10520 = state_10511;
(statearr_10520[(9)] = inst_10502);

return statearr_10520;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10511__$1,(9),results,inst_10497);
} else {
if((state_val_10512 === (9))){
var inst_10504 = (state_10511[(2)]);
var state_10511__$1 = (function (){var statearr_10521 = state_10511;
(statearr_10521[(10)] = inst_10504);

return statearr_10521;
})();
var statearr_10522_10632 = state_10511__$1;
(statearr_10522_10632[(2)] = null);

(statearr_10522_10632[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___10626,jobs,results,process,async))
;
return ((function (switch__9930__auto__,c__10042__auto___10626,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0 = (function (){
var statearr_10526 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_10526[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__);

(statearr_10526[(1)] = (1));

return statearr_10526;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1 = (function (state_10511){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10511);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10527){if((e10527 instanceof Object)){
var ex__9934__auto__ = e10527;
var statearr_10528_10633 = state_10511;
(statearr_10528_10633[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10511);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10527;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10634 = state_10511;
state_10511 = G__10634;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = function(state_10511){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1.call(this,state_10511);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___10626,jobs,results,process,async))
})();
var state__10044__auto__ = (function (){var statearr_10529 = f__10043__auto__.call(null);
(statearr_10529[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___10626);

return statearr_10529;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___10626,jobs,results,process,async))
);


var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__,jobs,results,process,async){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__,jobs,results,process,async){
return (function (state_10567){
var state_val_10568 = (state_10567[(1)]);
if((state_val_10568 === (7))){
var inst_10563 = (state_10567[(2)]);
var state_10567__$1 = state_10567;
var statearr_10569_10635 = state_10567__$1;
(statearr_10569_10635[(2)] = inst_10563);

(statearr_10569_10635[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (20))){
var state_10567__$1 = state_10567;
var statearr_10570_10636 = state_10567__$1;
(statearr_10570_10636[(2)] = null);

(statearr_10570_10636[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (1))){
var state_10567__$1 = state_10567;
var statearr_10571_10637 = state_10567__$1;
(statearr_10571_10637[(2)] = null);

(statearr_10571_10637[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (4))){
var inst_10532 = (state_10567[(7)]);
var inst_10532__$1 = (state_10567[(2)]);
var inst_10533 = (inst_10532__$1 == null);
var state_10567__$1 = (function (){var statearr_10572 = state_10567;
(statearr_10572[(7)] = inst_10532__$1);

return statearr_10572;
})();
if(cljs.core.truth_(inst_10533)){
var statearr_10573_10638 = state_10567__$1;
(statearr_10573_10638[(1)] = (5));

} else {
var statearr_10574_10639 = state_10567__$1;
(statearr_10574_10639[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (15))){
var inst_10545 = (state_10567[(8)]);
var state_10567__$1 = state_10567;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10567__$1,(18),to,inst_10545);
} else {
if((state_val_10568 === (21))){
var inst_10558 = (state_10567[(2)]);
var state_10567__$1 = state_10567;
var statearr_10575_10640 = state_10567__$1;
(statearr_10575_10640[(2)] = inst_10558);

(statearr_10575_10640[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (13))){
var inst_10560 = (state_10567[(2)]);
var state_10567__$1 = (function (){var statearr_10576 = state_10567;
(statearr_10576[(9)] = inst_10560);

return statearr_10576;
})();
var statearr_10577_10641 = state_10567__$1;
(statearr_10577_10641[(2)] = null);

(statearr_10577_10641[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (6))){
var inst_10532 = (state_10567[(7)]);
var state_10567__$1 = state_10567;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10567__$1,(11),inst_10532);
} else {
if((state_val_10568 === (17))){
var inst_10553 = (state_10567[(2)]);
var state_10567__$1 = state_10567;
if(cljs.core.truth_(inst_10553)){
var statearr_10578_10642 = state_10567__$1;
(statearr_10578_10642[(1)] = (19));

} else {
var statearr_10579_10643 = state_10567__$1;
(statearr_10579_10643[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (3))){
var inst_10565 = (state_10567[(2)]);
var state_10567__$1 = state_10567;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10567__$1,inst_10565);
} else {
if((state_val_10568 === (12))){
var inst_10542 = (state_10567[(10)]);
var state_10567__$1 = state_10567;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10567__$1,(14),inst_10542);
} else {
if((state_val_10568 === (2))){
var state_10567__$1 = state_10567;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10567__$1,(4),results);
} else {
if((state_val_10568 === (19))){
var state_10567__$1 = state_10567;
var statearr_10580_10644 = state_10567__$1;
(statearr_10580_10644[(2)] = null);

(statearr_10580_10644[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (11))){
var inst_10542 = (state_10567[(2)]);
var state_10567__$1 = (function (){var statearr_10581 = state_10567;
(statearr_10581[(10)] = inst_10542);

return statearr_10581;
})();
var statearr_10582_10645 = state_10567__$1;
(statearr_10582_10645[(2)] = null);

(statearr_10582_10645[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (9))){
var state_10567__$1 = state_10567;
var statearr_10583_10646 = state_10567__$1;
(statearr_10583_10646[(2)] = null);

(statearr_10583_10646[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (5))){
var state_10567__$1 = state_10567;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10584_10647 = state_10567__$1;
(statearr_10584_10647[(1)] = (8));

} else {
var statearr_10585_10648 = state_10567__$1;
(statearr_10585_10648[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (14))){
var inst_10545 = (state_10567[(8)]);
var inst_10547 = (state_10567[(11)]);
var inst_10545__$1 = (state_10567[(2)]);
var inst_10546 = (inst_10545__$1 == null);
var inst_10547__$1 = cljs.core.not.call(null,inst_10546);
var state_10567__$1 = (function (){var statearr_10586 = state_10567;
(statearr_10586[(8)] = inst_10545__$1);

(statearr_10586[(11)] = inst_10547__$1);

return statearr_10586;
})();
if(inst_10547__$1){
var statearr_10587_10649 = state_10567__$1;
(statearr_10587_10649[(1)] = (15));

} else {
var statearr_10588_10650 = state_10567__$1;
(statearr_10588_10650[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (16))){
var inst_10547 = (state_10567[(11)]);
var state_10567__$1 = state_10567;
var statearr_10589_10651 = state_10567__$1;
(statearr_10589_10651[(2)] = inst_10547);

(statearr_10589_10651[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (10))){
var inst_10539 = (state_10567[(2)]);
var state_10567__$1 = state_10567;
var statearr_10590_10652 = state_10567__$1;
(statearr_10590_10652[(2)] = inst_10539);

(statearr_10590_10652[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (18))){
var inst_10550 = (state_10567[(2)]);
var state_10567__$1 = state_10567;
var statearr_10591_10653 = state_10567__$1;
(statearr_10591_10653[(2)] = inst_10550);

(statearr_10591_10653[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10568 === (8))){
var inst_10536 = cljs.core.async.close_BANG_.call(null,to);
var state_10567__$1 = state_10567;
var statearr_10592_10654 = state_10567__$1;
(statearr_10592_10654[(2)] = inst_10536);

(statearr_10592_10654[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto__,jobs,results,process,async))
;
return ((function (switch__9930__auto__,c__10042__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0 = (function (){
var statearr_10596 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10596[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__);

(statearr_10596[(1)] = (1));

return statearr_10596;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1 = (function (state_10567){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10567);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10597){if((e10597 instanceof Object)){
var ex__9934__auto__ = e10597;
var statearr_10598_10655 = state_10567;
(statearr_10598_10655[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10567);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10597;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10656 = state_10567;
state_10567 = G__10656;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__ = function(state_10567){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1.call(this,state_10567);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9931__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__,jobs,results,process,async))
})();
var state__10044__auto__ = (function (){var statearr_10599 = f__10043__auto__.call(null);
(statearr_10599[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_10599;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__,jobs,results,process,async))
);

return c__10042__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args10657 = [];
var len__7923__auto___10660 = arguments.length;
var i__7924__auto___10661 = (0);
while(true){
if((i__7924__auto___10661 < len__7923__auto___10660)){
args10657.push((arguments[i__7924__auto___10661]));

var G__10662 = (i__7924__auto___10661 + (1));
i__7924__auto___10661 = G__10662;
continue;
} else {
}
break;
}

var G__10659 = args10657.length;
switch (G__10659) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10657.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args10664 = [];
var len__7923__auto___10667 = arguments.length;
var i__7924__auto___10668 = (0);
while(true){
if((i__7924__auto___10668 < len__7923__auto___10667)){
args10664.push((arguments[i__7924__auto___10668]));

var G__10669 = (i__7924__auto___10668 + (1));
i__7924__auto___10668 = G__10669;
continue;
} else {
}
break;
}

var G__10666 = args10664.length;
switch (G__10666) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10664.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args10671 = [];
var len__7923__auto___10724 = arguments.length;
var i__7924__auto___10725 = (0);
while(true){
if((i__7924__auto___10725 < len__7923__auto___10724)){
args10671.push((arguments[i__7924__auto___10725]));

var G__10726 = (i__7924__auto___10725 + (1));
i__7924__auto___10725 = G__10726;
continue;
} else {
}
break;
}

var G__10673 = args10671.length;
switch (G__10673) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10671.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__10042__auto___10728 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___10728,tc,fc){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___10728,tc,fc){
return (function (state_10699){
var state_val_10700 = (state_10699[(1)]);
if((state_val_10700 === (7))){
var inst_10695 = (state_10699[(2)]);
var state_10699__$1 = state_10699;
var statearr_10701_10729 = state_10699__$1;
(statearr_10701_10729[(2)] = inst_10695);

(statearr_10701_10729[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (1))){
var state_10699__$1 = state_10699;
var statearr_10702_10730 = state_10699__$1;
(statearr_10702_10730[(2)] = null);

(statearr_10702_10730[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (4))){
var inst_10676 = (state_10699[(7)]);
var inst_10676__$1 = (state_10699[(2)]);
var inst_10677 = (inst_10676__$1 == null);
var state_10699__$1 = (function (){var statearr_10703 = state_10699;
(statearr_10703[(7)] = inst_10676__$1);

return statearr_10703;
})();
if(cljs.core.truth_(inst_10677)){
var statearr_10704_10731 = state_10699__$1;
(statearr_10704_10731[(1)] = (5));

} else {
var statearr_10705_10732 = state_10699__$1;
(statearr_10705_10732[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (13))){
var state_10699__$1 = state_10699;
var statearr_10706_10733 = state_10699__$1;
(statearr_10706_10733[(2)] = null);

(statearr_10706_10733[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (6))){
var inst_10676 = (state_10699[(7)]);
var inst_10682 = p.call(null,inst_10676);
var state_10699__$1 = state_10699;
if(cljs.core.truth_(inst_10682)){
var statearr_10707_10734 = state_10699__$1;
(statearr_10707_10734[(1)] = (9));

} else {
var statearr_10708_10735 = state_10699__$1;
(statearr_10708_10735[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (3))){
var inst_10697 = (state_10699[(2)]);
var state_10699__$1 = state_10699;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10699__$1,inst_10697);
} else {
if((state_val_10700 === (12))){
var state_10699__$1 = state_10699;
var statearr_10709_10736 = state_10699__$1;
(statearr_10709_10736[(2)] = null);

(statearr_10709_10736[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (2))){
var state_10699__$1 = state_10699;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10699__$1,(4),ch);
} else {
if((state_val_10700 === (11))){
var inst_10676 = (state_10699[(7)]);
var inst_10686 = (state_10699[(2)]);
var state_10699__$1 = state_10699;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10699__$1,(8),inst_10686,inst_10676);
} else {
if((state_val_10700 === (9))){
var state_10699__$1 = state_10699;
var statearr_10710_10737 = state_10699__$1;
(statearr_10710_10737[(2)] = tc);

(statearr_10710_10737[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (5))){
var inst_10679 = cljs.core.async.close_BANG_.call(null,tc);
var inst_10680 = cljs.core.async.close_BANG_.call(null,fc);
var state_10699__$1 = (function (){var statearr_10711 = state_10699;
(statearr_10711[(8)] = inst_10679);

return statearr_10711;
})();
var statearr_10712_10738 = state_10699__$1;
(statearr_10712_10738[(2)] = inst_10680);

(statearr_10712_10738[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (14))){
var inst_10693 = (state_10699[(2)]);
var state_10699__$1 = state_10699;
var statearr_10713_10739 = state_10699__$1;
(statearr_10713_10739[(2)] = inst_10693);

(statearr_10713_10739[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (10))){
var state_10699__$1 = state_10699;
var statearr_10714_10740 = state_10699__$1;
(statearr_10714_10740[(2)] = fc);

(statearr_10714_10740[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10700 === (8))){
var inst_10688 = (state_10699[(2)]);
var state_10699__$1 = state_10699;
if(cljs.core.truth_(inst_10688)){
var statearr_10715_10741 = state_10699__$1;
(statearr_10715_10741[(1)] = (12));

} else {
var statearr_10716_10742 = state_10699__$1;
(statearr_10716_10742[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___10728,tc,fc))
;
return ((function (switch__9930__auto__,c__10042__auto___10728,tc,fc){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_10720 = [null,null,null,null,null,null,null,null,null];
(statearr_10720[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_10720[(1)] = (1));

return statearr_10720;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_10699){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10699);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10721){if((e10721 instanceof Object)){
var ex__9934__auto__ = e10721;
var statearr_10722_10743 = state_10699;
(statearr_10722_10743[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10699);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10721;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10744 = state_10699;
state_10699 = G__10744;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_10699){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_10699);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___10728,tc,fc))
})();
var state__10044__auto__ = (function (){var statearr_10723 = f__10043__auto__.call(null);
(statearr_10723[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___10728);

return statearr_10723;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___10728,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__){
return (function (state_10808){
var state_val_10809 = (state_10808[(1)]);
if((state_val_10809 === (7))){
var inst_10804 = (state_10808[(2)]);
var state_10808__$1 = state_10808;
var statearr_10810_10831 = state_10808__$1;
(statearr_10810_10831[(2)] = inst_10804);

(statearr_10810_10831[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10809 === (1))){
var inst_10788 = init;
var state_10808__$1 = (function (){var statearr_10811 = state_10808;
(statearr_10811[(7)] = inst_10788);

return statearr_10811;
})();
var statearr_10812_10832 = state_10808__$1;
(statearr_10812_10832[(2)] = null);

(statearr_10812_10832[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10809 === (4))){
var inst_10791 = (state_10808[(8)]);
var inst_10791__$1 = (state_10808[(2)]);
var inst_10792 = (inst_10791__$1 == null);
var state_10808__$1 = (function (){var statearr_10813 = state_10808;
(statearr_10813[(8)] = inst_10791__$1);

return statearr_10813;
})();
if(cljs.core.truth_(inst_10792)){
var statearr_10814_10833 = state_10808__$1;
(statearr_10814_10833[(1)] = (5));

} else {
var statearr_10815_10834 = state_10808__$1;
(statearr_10815_10834[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10809 === (6))){
var inst_10788 = (state_10808[(7)]);
var inst_10791 = (state_10808[(8)]);
var inst_10795 = (state_10808[(9)]);
var inst_10795__$1 = f.call(null,inst_10788,inst_10791);
var inst_10796 = cljs.core.reduced_QMARK_.call(null,inst_10795__$1);
var state_10808__$1 = (function (){var statearr_10816 = state_10808;
(statearr_10816[(9)] = inst_10795__$1);

return statearr_10816;
})();
if(inst_10796){
var statearr_10817_10835 = state_10808__$1;
(statearr_10817_10835[(1)] = (8));

} else {
var statearr_10818_10836 = state_10808__$1;
(statearr_10818_10836[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10809 === (3))){
var inst_10806 = (state_10808[(2)]);
var state_10808__$1 = state_10808;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10808__$1,inst_10806);
} else {
if((state_val_10809 === (2))){
var state_10808__$1 = state_10808;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10808__$1,(4),ch);
} else {
if((state_val_10809 === (9))){
var inst_10795 = (state_10808[(9)]);
var inst_10788 = inst_10795;
var state_10808__$1 = (function (){var statearr_10819 = state_10808;
(statearr_10819[(7)] = inst_10788);

return statearr_10819;
})();
var statearr_10820_10837 = state_10808__$1;
(statearr_10820_10837[(2)] = null);

(statearr_10820_10837[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10809 === (5))){
var inst_10788 = (state_10808[(7)]);
var state_10808__$1 = state_10808;
var statearr_10821_10838 = state_10808__$1;
(statearr_10821_10838[(2)] = inst_10788);

(statearr_10821_10838[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10809 === (10))){
var inst_10802 = (state_10808[(2)]);
var state_10808__$1 = state_10808;
var statearr_10822_10839 = state_10808__$1;
(statearr_10822_10839[(2)] = inst_10802);

(statearr_10822_10839[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10809 === (8))){
var inst_10795 = (state_10808[(9)]);
var inst_10798 = cljs.core.deref.call(null,inst_10795);
var state_10808__$1 = state_10808;
var statearr_10823_10840 = state_10808__$1;
(statearr_10823_10840[(2)] = inst_10798);

(statearr_10823_10840[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto__))
;
return ((function (switch__9930__auto__,c__10042__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__9931__auto__ = null;
var cljs$core$async$reduce_$_state_machine__9931__auto____0 = (function (){
var statearr_10827 = [null,null,null,null,null,null,null,null,null,null];
(statearr_10827[(0)] = cljs$core$async$reduce_$_state_machine__9931__auto__);

(statearr_10827[(1)] = (1));

return statearr_10827;
});
var cljs$core$async$reduce_$_state_machine__9931__auto____1 = (function (state_10808){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10808);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10828){if((e10828 instanceof Object)){
var ex__9934__auto__ = e10828;
var statearr_10829_10841 = state_10808;
(statearr_10829_10841[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10808);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10828;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10842 = state_10808;
state_10808 = G__10842;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__9931__auto__ = function(state_10808){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__9931__auto____1.call(this,state_10808);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__9931__auto____0;
cljs$core$async$reduce_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__9931__auto____1;
return cljs$core$async$reduce_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__))
})();
var state__10044__auto__ = (function (){var statearr_10830 = f__10043__auto__.call(null);
(statearr_10830[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_10830;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__))
);

return c__10042__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__,f__$1){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__,f__$1){
return (function (state_10862){
var state_val_10863 = (state_10862[(1)]);
if((state_val_10863 === (1))){
var inst_10857 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_10862__$1 = state_10862;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10862__$1,(2),inst_10857);
} else {
if((state_val_10863 === (2))){
var inst_10859 = (state_10862[(2)]);
var inst_10860 = f__$1.call(null,inst_10859);
var state_10862__$1 = state_10862;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10862__$1,inst_10860);
} else {
return null;
}
}
});})(c__10042__auto__,f__$1))
;
return ((function (switch__9930__auto__,c__10042__auto__,f__$1){
return (function() {
var cljs$core$async$transduce_$_state_machine__9931__auto__ = null;
var cljs$core$async$transduce_$_state_machine__9931__auto____0 = (function (){
var statearr_10867 = [null,null,null,null,null,null,null];
(statearr_10867[(0)] = cljs$core$async$transduce_$_state_machine__9931__auto__);

(statearr_10867[(1)] = (1));

return statearr_10867;
});
var cljs$core$async$transduce_$_state_machine__9931__auto____1 = (function (state_10862){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10862);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10868){if((e10868 instanceof Object)){
var ex__9934__auto__ = e10868;
var statearr_10869_10871 = state_10862;
(statearr_10869_10871[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10862);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10868;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10872 = state_10862;
state_10862 = G__10872;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__9931__auto__ = function(state_10862){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__9931__auto____1.call(this,state_10862);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__9931__auto____0;
cljs$core$async$transduce_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__9931__auto____1;
return cljs$core$async$transduce_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__,f__$1))
})();
var state__10044__auto__ = (function (){var statearr_10870 = f__10043__auto__.call(null);
(statearr_10870[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_10870;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__,f__$1))
);

return c__10042__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args10873 = [];
var len__7923__auto___10925 = arguments.length;
var i__7924__auto___10926 = (0);
while(true){
if((i__7924__auto___10926 < len__7923__auto___10925)){
args10873.push((arguments[i__7924__auto___10926]));

var G__10927 = (i__7924__auto___10926 + (1));
i__7924__auto___10926 = G__10927;
continue;
} else {
}
break;
}

var G__10875 = args10873.length;
switch (G__10875) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10873.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__){
return (function (state_10900){
var state_val_10901 = (state_10900[(1)]);
if((state_val_10901 === (7))){
var inst_10882 = (state_10900[(2)]);
var state_10900__$1 = state_10900;
var statearr_10902_10929 = state_10900__$1;
(statearr_10902_10929[(2)] = inst_10882);

(statearr_10902_10929[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (1))){
var inst_10876 = cljs.core.seq.call(null,coll);
var inst_10877 = inst_10876;
var state_10900__$1 = (function (){var statearr_10903 = state_10900;
(statearr_10903[(7)] = inst_10877);

return statearr_10903;
})();
var statearr_10904_10930 = state_10900__$1;
(statearr_10904_10930[(2)] = null);

(statearr_10904_10930[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (4))){
var inst_10877 = (state_10900[(7)]);
var inst_10880 = cljs.core.first.call(null,inst_10877);
var state_10900__$1 = state_10900;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10900__$1,(7),ch,inst_10880);
} else {
if((state_val_10901 === (13))){
var inst_10894 = (state_10900[(2)]);
var state_10900__$1 = state_10900;
var statearr_10905_10931 = state_10900__$1;
(statearr_10905_10931[(2)] = inst_10894);

(statearr_10905_10931[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (6))){
var inst_10885 = (state_10900[(2)]);
var state_10900__$1 = state_10900;
if(cljs.core.truth_(inst_10885)){
var statearr_10906_10932 = state_10900__$1;
(statearr_10906_10932[(1)] = (8));

} else {
var statearr_10907_10933 = state_10900__$1;
(statearr_10907_10933[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (3))){
var inst_10898 = (state_10900[(2)]);
var state_10900__$1 = state_10900;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10900__$1,inst_10898);
} else {
if((state_val_10901 === (12))){
var state_10900__$1 = state_10900;
var statearr_10908_10934 = state_10900__$1;
(statearr_10908_10934[(2)] = null);

(statearr_10908_10934[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (2))){
var inst_10877 = (state_10900[(7)]);
var state_10900__$1 = state_10900;
if(cljs.core.truth_(inst_10877)){
var statearr_10909_10935 = state_10900__$1;
(statearr_10909_10935[(1)] = (4));

} else {
var statearr_10910_10936 = state_10900__$1;
(statearr_10910_10936[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (11))){
var inst_10891 = cljs.core.async.close_BANG_.call(null,ch);
var state_10900__$1 = state_10900;
var statearr_10911_10937 = state_10900__$1;
(statearr_10911_10937[(2)] = inst_10891);

(statearr_10911_10937[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (9))){
var state_10900__$1 = state_10900;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10912_10938 = state_10900__$1;
(statearr_10912_10938[(1)] = (11));

} else {
var statearr_10913_10939 = state_10900__$1;
(statearr_10913_10939[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (5))){
var inst_10877 = (state_10900[(7)]);
var state_10900__$1 = state_10900;
var statearr_10914_10940 = state_10900__$1;
(statearr_10914_10940[(2)] = inst_10877);

(statearr_10914_10940[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (10))){
var inst_10896 = (state_10900[(2)]);
var state_10900__$1 = state_10900;
var statearr_10915_10941 = state_10900__$1;
(statearr_10915_10941[(2)] = inst_10896);

(statearr_10915_10941[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10901 === (8))){
var inst_10877 = (state_10900[(7)]);
var inst_10887 = cljs.core.next.call(null,inst_10877);
var inst_10877__$1 = inst_10887;
var state_10900__$1 = (function (){var statearr_10916 = state_10900;
(statearr_10916[(7)] = inst_10877__$1);

return statearr_10916;
})();
var statearr_10917_10942 = state_10900__$1;
(statearr_10917_10942[(2)] = null);

(statearr_10917_10942[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto__))
;
return ((function (switch__9930__auto__,c__10042__auto__){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_10921 = [null,null,null,null,null,null,null,null];
(statearr_10921[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_10921[(1)] = (1));

return statearr_10921;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_10900){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_10900);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e10922){if((e10922 instanceof Object)){
var ex__9934__auto__ = e10922;
var statearr_10923_10943 = state_10900;
(statearr_10923_10943[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10900);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10922;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10944 = state_10900;
state_10900 = G__10944;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_10900){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_10900);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__))
})();
var state__10044__auto__ = (function (){var statearr_10924 = f__10043__auto__.call(null);
(statearr_10924[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_10924;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__))
);

return c__10042__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__7482__auto__ = (((_ == null))?null:_);
var m__7483__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,_);
} else {
var m__7483__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__7483__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m,ch);
} else {
var m__7483__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m);
} else {
var m__7483__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async11170 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11170 = (function (ch,cs,meta11171){
this.ch = ch;
this.cs = cs;
this.meta11171 = meta11171;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_11172,meta11171__$1){
var self__ = this;
var _11172__$1 = this;
return (new cljs.core.async.t_cljs$core$async11170(self__.ch,self__.cs,meta11171__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_11172){
var self__ = this;
var _11172__$1 = this;
return self__.meta11171;
});})(cs))
;

cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async11170.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async11170.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta11171","meta11171",-1779890264,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async11170.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async11170.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11170";

cljs.core.async.t_cljs$core$async11170.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async11170");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async11170 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async11170(ch__$1,cs__$1,meta11171){
return (new cljs.core.async.t_cljs$core$async11170(ch__$1,cs__$1,meta11171));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async11170(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__10042__auto___11395 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___11395,cs,m,dchan,dctr,done){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___11395,cs,m,dchan,dctr,done){
return (function (state_11307){
var state_val_11308 = (state_11307[(1)]);
if((state_val_11308 === (7))){
var inst_11303 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11309_11396 = state_11307__$1;
(statearr_11309_11396[(2)] = inst_11303);

(statearr_11309_11396[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (20))){
var inst_11206 = (state_11307[(7)]);
var inst_11218 = cljs.core.first.call(null,inst_11206);
var inst_11219 = cljs.core.nth.call(null,inst_11218,(0),null);
var inst_11220 = cljs.core.nth.call(null,inst_11218,(1),null);
var state_11307__$1 = (function (){var statearr_11310 = state_11307;
(statearr_11310[(8)] = inst_11219);

return statearr_11310;
})();
if(cljs.core.truth_(inst_11220)){
var statearr_11311_11397 = state_11307__$1;
(statearr_11311_11397[(1)] = (22));

} else {
var statearr_11312_11398 = state_11307__$1;
(statearr_11312_11398[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (27))){
var inst_11255 = (state_11307[(9)]);
var inst_11175 = (state_11307[(10)]);
var inst_11248 = (state_11307[(11)]);
var inst_11250 = (state_11307[(12)]);
var inst_11255__$1 = cljs.core._nth.call(null,inst_11248,inst_11250);
var inst_11256 = cljs.core.async.put_BANG_.call(null,inst_11255__$1,inst_11175,done);
var state_11307__$1 = (function (){var statearr_11313 = state_11307;
(statearr_11313[(9)] = inst_11255__$1);

return statearr_11313;
})();
if(cljs.core.truth_(inst_11256)){
var statearr_11314_11399 = state_11307__$1;
(statearr_11314_11399[(1)] = (30));

} else {
var statearr_11315_11400 = state_11307__$1;
(statearr_11315_11400[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (1))){
var state_11307__$1 = state_11307;
var statearr_11316_11401 = state_11307__$1;
(statearr_11316_11401[(2)] = null);

(statearr_11316_11401[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (24))){
var inst_11206 = (state_11307[(7)]);
var inst_11225 = (state_11307[(2)]);
var inst_11226 = cljs.core.next.call(null,inst_11206);
var inst_11184 = inst_11226;
var inst_11185 = null;
var inst_11186 = (0);
var inst_11187 = (0);
var state_11307__$1 = (function (){var statearr_11317 = state_11307;
(statearr_11317[(13)] = inst_11186);

(statearr_11317[(14)] = inst_11225);

(statearr_11317[(15)] = inst_11187);

(statearr_11317[(16)] = inst_11184);

(statearr_11317[(17)] = inst_11185);

return statearr_11317;
})();
var statearr_11318_11402 = state_11307__$1;
(statearr_11318_11402[(2)] = null);

(statearr_11318_11402[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (39))){
var state_11307__$1 = state_11307;
var statearr_11322_11403 = state_11307__$1;
(statearr_11322_11403[(2)] = null);

(statearr_11322_11403[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (4))){
var inst_11175 = (state_11307[(10)]);
var inst_11175__$1 = (state_11307[(2)]);
var inst_11176 = (inst_11175__$1 == null);
var state_11307__$1 = (function (){var statearr_11323 = state_11307;
(statearr_11323[(10)] = inst_11175__$1);

return statearr_11323;
})();
if(cljs.core.truth_(inst_11176)){
var statearr_11324_11404 = state_11307__$1;
(statearr_11324_11404[(1)] = (5));

} else {
var statearr_11325_11405 = state_11307__$1;
(statearr_11325_11405[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (15))){
var inst_11186 = (state_11307[(13)]);
var inst_11187 = (state_11307[(15)]);
var inst_11184 = (state_11307[(16)]);
var inst_11185 = (state_11307[(17)]);
var inst_11202 = (state_11307[(2)]);
var inst_11203 = (inst_11187 + (1));
var tmp11319 = inst_11186;
var tmp11320 = inst_11184;
var tmp11321 = inst_11185;
var inst_11184__$1 = tmp11320;
var inst_11185__$1 = tmp11321;
var inst_11186__$1 = tmp11319;
var inst_11187__$1 = inst_11203;
var state_11307__$1 = (function (){var statearr_11326 = state_11307;
(statearr_11326[(13)] = inst_11186__$1);

(statearr_11326[(15)] = inst_11187__$1);

(statearr_11326[(16)] = inst_11184__$1);

(statearr_11326[(18)] = inst_11202);

(statearr_11326[(17)] = inst_11185__$1);

return statearr_11326;
})();
var statearr_11327_11406 = state_11307__$1;
(statearr_11327_11406[(2)] = null);

(statearr_11327_11406[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (21))){
var inst_11229 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11331_11407 = state_11307__$1;
(statearr_11331_11407[(2)] = inst_11229);

(statearr_11331_11407[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (31))){
var inst_11255 = (state_11307[(9)]);
var inst_11259 = done.call(null,null);
var inst_11260 = cljs.core.async.untap_STAR_.call(null,m,inst_11255);
var state_11307__$1 = (function (){var statearr_11332 = state_11307;
(statearr_11332[(19)] = inst_11259);

return statearr_11332;
})();
var statearr_11333_11408 = state_11307__$1;
(statearr_11333_11408[(2)] = inst_11260);

(statearr_11333_11408[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (32))){
var inst_11247 = (state_11307[(20)]);
var inst_11248 = (state_11307[(11)]);
var inst_11249 = (state_11307[(21)]);
var inst_11250 = (state_11307[(12)]);
var inst_11262 = (state_11307[(2)]);
var inst_11263 = (inst_11250 + (1));
var tmp11328 = inst_11247;
var tmp11329 = inst_11248;
var tmp11330 = inst_11249;
var inst_11247__$1 = tmp11328;
var inst_11248__$1 = tmp11329;
var inst_11249__$1 = tmp11330;
var inst_11250__$1 = inst_11263;
var state_11307__$1 = (function (){var statearr_11334 = state_11307;
(statearr_11334[(22)] = inst_11262);

(statearr_11334[(20)] = inst_11247__$1);

(statearr_11334[(11)] = inst_11248__$1);

(statearr_11334[(21)] = inst_11249__$1);

(statearr_11334[(12)] = inst_11250__$1);

return statearr_11334;
})();
var statearr_11335_11409 = state_11307__$1;
(statearr_11335_11409[(2)] = null);

(statearr_11335_11409[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (40))){
var inst_11275 = (state_11307[(23)]);
var inst_11279 = done.call(null,null);
var inst_11280 = cljs.core.async.untap_STAR_.call(null,m,inst_11275);
var state_11307__$1 = (function (){var statearr_11336 = state_11307;
(statearr_11336[(24)] = inst_11279);

return statearr_11336;
})();
var statearr_11337_11410 = state_11307__$1;
(statearr_11337_11410[(2)] = inst_11280);

(statearr_11337_11410[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (33))){
var inst_11266 = (state_11307[(25)]);
var inst_11268 = cljs.core.chunked_seq_QMARK_.call(null,inst_11266);
var state_11307__$1 = state_11307;
if(inst_11268){
var statearr_11338_11411 = state_11307__$1;
(statearr_11338_11411[(1)] = (36));

} else {
var statearr_11339_11412 = state_11307__$1;
(statearr_11339_11412[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (13))){
var inst_11196 = (state_11307[(26)]);
var inst_11199 = cljs.core.async.close_BANG_.call(null,inst_11196);
var state_11307__$1 = state_11307;
var statearr_11340_11413 = state_11307__$1;
(statearr_11340_11413[(2)] = inst_11199);

(statearr_11340_11413[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (22))){
var inst_11219 = (state_11307[(8)]);
var inst_11222 = cljs.core.async.close_BANG_.call(null,inst_11219);
var state_11307__$1 = state_11307;
var statearr_11341_11414 = state_11307__$1;
(statearr_11341_11414[(2)] = inst_11222);

(statearr_11341_11414[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (36))){
var inst_11266 = (state_11307[(25)]);
var inst_11270 = cljs.core.chunk_first.call(null,inst_11266);
var inst_11271 = cljs.core.chunk_rest.call(null,inst_11266);
var inst_11272 = cljs.core.count.call(null,inst_11270);
var inst_11247 = inst_11271;
var inst_11248 = inst_11270;
var inst_11249 = inst_11272;
var inst_11250 = (0);
var state_11307__$1 = (function (){var statearr_11342 = state_11307;
(statearr_11342[(20)] = inst_11247);

(statearr_11342[(11)] = inst_11248);

(statearr_11342[(21)] = inst_11249);

(statearr_11342[(12)] = inst_11250);

return statearr_11342;
})();
var statearr_11343_11415 = state_11307__$1;
(statearr_11343_11415[(2)] = null);

(statearr_11343_11415[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (41))){
var inst_11266 = (state_11307[(25)]);
var inst_11282 = (state_11307[(2)]);
var inst_11283 = cljs.core.next.call(null,inst_11266);
var inst_11247 = inst_11283;
var inst_11248 = null;
var inst_11249 = (0);
var inst_11250 = (0);
var state_11307__$1 = (function (){var statearr_11344 = state_11307;
(statearr_11344[(20)] = inst_11247);

(statearr_11344[(11)] = inst_11248);

(statearr_11344[(21)] = inst_11249);

(statearr_11344[(27)] = inst_11282);

(statearr_11344[(12)] = inst_11250);

return statearr_11344;
})();
var statearr_11345_11416 = state_11307__$1;
(statearr_11345_11416[(2)] = null);

(statearr_11345_11416[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (43))){
var state_11307__$1 = state_11307;
var statearr_11346_11417 = state_11307__$1;
(statearr_11346_11417[(2)] = null);

(statearr_11346_11417[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (29))){
var inst_11291 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11347_11418 = state_11307__$1;
(statearr_11347_11418[(2)] = inst_11291);

(statearr_11347_11418[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (44))){
var inst_11300 = (state_11307[(2)]);
var state_11307__$1 = (function (){var statearr_11348 = state_11307;
(statearr_11348[(28)] = inst_11300);

return statearr_11348;
})();
var statearr_11349_11419 = state_11307__$1;
(statearr_11349_11419[(2)] = null);

(statearr_11349_11419[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (6))){
var inst_11239 = (state_11307[(29)]);
var inst_11238 = cljs.core.deref.call(null,cs);
var inst_11239__$1 = cljs.core.keys.call(null,inst_11238);
var inst_11240 = cljs.core.count.call(null,inst_11239__$1);
var inst_11241 = cljs.core.reset_BANG_.call(null,dctr,inst_11240);
var inst_11246 = cljs.core.seq.call(null,inst_11239__$1);
var inst_11247 = inst_11246;
var inst_11248 = null;
var inst_11249 = (0);
var inst_11250 = (0);
var state_11307__$1 = (function (){var statearr_11350 = state_11307;
(statearr_11350[(30)] = inst_11241);

(statearr_11350[(29)] = inst_11239__$1);

(statearr_11350[(20)] = inst_11247);

(statearr_11350[(11)] = inst_11248);

(statearr_11350[(21)] = inst_11249);

(statearr_11350[(12)] = inst_11250);

return statearr_11350;
})();
var statearr_11351_11420 = state_11307__$1;
(statearr_11351_11420[(2)] = null);

(statearr_11351_11420[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (28))){
var inst_11266 = (state_11307[(25)]);
var inst_11247 = (state_11307[(20)]);
var inst_11266__$1 = cljs.core.seq.call(null,inst_11247);
var state_11307__$1 = (function (){var statearr_11352 = state_11307;
(statearr_11352[(25)] = inst_11266__$1);

return statearr_11352;
})();
if(inst_11266__$1){
var statearr_11353_11421 = state_11307__$1;
(statearr_11353_11421[(1)] = (33));

} else {
var statearr_11354_11422 = state_11307__$1;
(statearr_11354_11422[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (25))){
var inst_11249 = (state_11307[(21)]);
var inst_11250 = (state_11307[(12)]);
var inst_11252 = (inst_11250 < inst_11249);
var inst_11253 = inst_11252;
var state_11307__$1 = state_11307;
if(cljs.core.truth_(inst_11253)){
var statearr_11355_11423 = state_11307__$1;
(statearr_11355_11423[(1)] = (27));

} else {
var statearr_11356_11424 = state_11307__$1;
(statearr_11356_11424[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (34))){
var state_11307__$1 = state_11307;
var statearr_11357_11425 = state_11307__$1;
(statearr_11357_11425[(2)] = null);

(statearr_11357_11425[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (17))){
var state_11307__$1 = state_11307;
var statearr_11358_11426 = state_11307__$1;
(statearr_11358_11426[(2)] = null);

(statearr_11358_11426[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (3))){
var inst_11305 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11307__$1,inst_11305);
} else {
if((state_val_11308 === (12))){
var inst_11234 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11359_11427 = state_11307__$1;
(statearr_11359_11427[(2)] = inst_11234);

(statearr_11359_11427[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (2))){
var state_11307__$1 = state_11307;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11307__$1,(4),ch);
} else {
if((state_val_11308 === (23))){
var state_11307__$1 = state_11307;
var statearr_11360_11428 = state_11307__$1;
(statearr_11360_11428[(2)] = null);

(statearr_11360_11428[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (35))){
var inst_11289 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11361_11429 = state_11307__$1;
(statearr_11361_11429[(2)] = inst_11289);

(statearr_11361_11429[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (19))){
var inst_11206 = (state_11307[(7)]);
var inst_11210 = cljs.core.chunk_first.call(null,inst_11206);
var inst_11211 = cljs.core.chunk_rest.call(null,inst_11206);
var inst_11212 = cljs.core.count.call(null,inst_11210);
var inst_11184 = inst_11211;
var inst_11185 = inst_11210;
var inst_11186 = inst_11212;
var inst_11187 = (0);
var state_11307__$1 = (function (){var statearr_11362 = state_11307;
(statearr_11362[(13)] = inst_11186);

(statearr_11362[(15)] = inst_11187);

(statearr_11362[(16)] = inst_11184);

(statearr_11362[(17)] = inst_11185);

return statearr_11362;
})();
var statearr_11363_11430 = state_11307__$1;
(statearr_11363_11430[(2)] = null);

(statearr_11363_11430[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (11))){
var inst_11206 = (state_11307[(7)]);
var inst_11184 = (state_11307[(16)]);
var inst_11206__$1 = cljs.core.seq.call(null,inst_11184);
var state_11307__$1 = (function (){var statearr_11364 = state_11307;
(statearr_11364[(7)] = inst_11206__$1);

return statearr_11364;
})();
if(inst_11206__$1){
var statearr_11365_11431 = state_11307__$1;
(statearr_11365_11431[(1)] = (16));

} else {
var statearr_11366_11432 = state_11307__$1;
(statearr_11366_11432[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (9))){
var inst_11236 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11367_11433 = state_11307__$1;
(statearr_11367_11433[(2)] = inst_11236);

(statearr_11367_11433[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (5))){
var inst_11182 = cljs.core.deref.call(null,cs);
var inst_11183 = cljs.core.seq.call(null,inst_11182);
var inst_11184 = inst_11183;
var inst_11185 = null;
var inst_11186 = (0);
var inst_11187 = (0);
var state_11307__$1 = (function (){var statearr_11368 = state_11307;
(statearr_11368[(13)] = inst_11186);

(statearr_11368[(15)] = inst_11187);

(statearr_11368[(16)] = inst_11184);

(statearr_11368[(17)] = inst_11185);

return statearr_11368;
})();
var statearr_11369_11434 = state_11307__$1;
(statearr_11369_11434[(2)] = null);

(statearr_11369_11434[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (14))){
var state_11307__$1 = state_11307;
var statearr_11370_11435 = state_11307__$1;
(statearr_11370_11435[(2)] = null);

(statearr_11370_11435[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (45))){
var inst_11297 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11371_11436 = state_11307__$1;
(statearr_11371_11436[(2)] = inst_11297);

(statearr_11371_11436[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (26))){
var inst_11239 = (state_11307[(29)]);
var inst_11293 = (state_11307[(2)]);
var inst_11294 = cljs.core.seq.call(null,inst_11239);
var state_11307__$1 = (function (){var statearr_11372 = state_11307;
(statearr_11372[(31)] = inst_11293);

return statearr_11372;
})();
if(inst_11294){
var statearr_11373_11437 = state_11307__$1;
(statearr_11373_11437[(1)] = (42));

} else {
var statearr_11374_11438 = state_11307__$1;
(statearr_11374_11438[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (16))){
var inst_11206 = (state_11307[(7)]);
var inst_11208 = cljs.core.chunked_seq_QMARK_.call(null,inst_11206);
var state_11307__$1 = state_11307;
if(inst_11208){
var statearr_11375_11439 = state_11307__$1;
(statearr_11375_11439[(1)] = (19));

} else {
var statearr_11376_11440 = state_11307__$1;
(statearr_11376_11440[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (38))){
var inst_11286 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11377_11441 = state_11307__$1;
(statearr_11377_11441[(2)] = inst_11286);

(statearr_11377_11441[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (30))){
var state_11307__$1 = state_11307;
var statearr_11378_11442 = state_11307__$1;
(statearr_11378_11442[(2)] = null);

(statearr_11378_11442[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (10))){
var inst_11187 = (state_11307[(15)]);
var inst_11185 = (state_11307[(17)]);
var inst_11195 = cljs.core._nth.call(null,inst_11185,inst_11187);
var inst_11196 = cljs.core.nth.call(null,inst_11195,(0),null);
var inst_11197 = cljs.core.nth.call(null,inst_11195,(1),null);
var state_11307__$1 = (function (){var statearr_11379 = state_11307;
(statearr_11379[(26)] = inst_11196);

return statearr_11379;
})();
if(cljs.core.truth_(inst_11197)){
var statearr_11380_11443 = state_11307__$1;
(statearr_11380_11443[(1)] = (13));

} else {
var statearr_11381_11444 = state_11307__$1;
(statearr_11381_11444[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (18))){
var inst_11232 = (state_11307[(2)]);
var state_11307__$1 = state_11307;
var statearr_11382_11445 = state_11307__$1;
(statearr_11382_11445[(2)] = inst_11232);

(statearr_11382_11445[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (42))){
var state_11307__$1 = state_11307;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11307__$1,(45),dchan);
} else {
if((state_val_11308 === (37))){
var inst_11275 = (state_11307[(23)]);
var inst_11266 = (state_11307[(25)]);
var inst_11175 = (state_11307[(10)]);
var inst_11275__$1 = cljs.core.first.call(null,inst_11266);
var inst_11276 = cljs.core.async.put_BANG_.call(null,inst_11275__$1,inst_11175,done);
var state_11307__$1 = (function (){var statearr_11383 = state_11307;
(statearr_11383[(23)] = inst_11275__$1);

return statearr_11383;
})();
if(cljs.core.truth_(inst_11276)){
var statearr_11384_11446 = state_11307__$1;
(statearr_11384_11446[(1)] = (39));

} else {
var statearr_11385_11447 = state_11307__$1;
(statearr_11385_11447[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11308 === (8))){
var inst_11186 = (state_11307[(13)]);
var inst_11187 = (state_11307[(15)]);
var inst_11189 = (inst_11187 < inst_11186);
var inst_11190 = inst_11189;
var state_11307__$1 = state_11307;
if(cljs.core.truth_(inst_11190)){
var statearr_11386_11448 = state_11307__$1;
(statearr_11386_11448[(1)] = (10));

} else {
var statearr_11387_11449 = state_11307__$1;
(statearr_11387_11449[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___11395,cs,m,dchan,dctr,done))
;
return ((function (switch__9930__auto__,c__10042__auto___11395,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__9931__auto__ = null;
var cljs$core$async$mult_$_state_machine__9931__auto____0 = (function (){
var statearr_11391 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11391[(0)] = cljs$core$async$mult_$_state_machine__9931__auto__);

(statearr_11391[(1)] = (1));

return statearr_11391;
});
var cljs$core$async$mult_$_state_machine__9931__auto____1 = (function (state_11307){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_11307);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e11392){if((e11392 instanceof Object)){
var ex__9934__auto__ = e11392;
var statearr_11393_11450 = state_11307;
(statearr_11393_11450[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11307);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11392;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11451 = state_11307;
state_11307 = G__11451;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__9931__auto__ = function(state_11307){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__9931__auto____1.call(this,state_11307);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__9931__auto____0;
cljs$core$async$mult_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__9931__auto____1;
return cljs$core$async$mult_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___11395,cs,m,dchan,dctr,done))
})();
var state__10044__auto__ = (function (){var statearr_11394 = f__10043__auto__.call(null);
(statearr_11394[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___11395);

return statearr_11394;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___11395,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args11452 = [];
var len__7923__auto___11455 = arguments.length;
var i__7924__auto___11456 = (0);
while(true){
if((i__7924__auto___11456 < len__7923__auto___11455)){
args11452.push((arguments[i__7924__auto___11456]));

var G__11457 = (i__7924__auto___11456 + (1));
i__7924__auto___11456 = G__11457;
continue;
} else {
}
break;
}

var G__11454 = args11452.length;
switch (G__11454) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args11452.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m,ch);
} else {
var m__7483__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m,ch);
} else {
var m__7483__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m);
} else {
var m__7483__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m,state_map);
} else {
var m__7483__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__7482__auto__ = (((m == null))?null:m);
var m__7483__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,m,mode);
} else {
var m__7483__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__7930__auto__ = [];
var len__7923__auto___11469 = arguments.length;
var i__7924__auto___11470 = (0);
while(true){
if((i__7924__auto___11470 < len__7923__auto___11469)){
args__7930__auto__.push((arguments[i__7924__auto___11470]));

var G__11471 = (i__7924__auto___11470 + (1));
i__7924__auto___11470 = G__11471;
continue;
} else {
}
break;
}

var argseq__7931__auto__ = ((((3) < args__7930__auto__.length))?(new cljs.core.IndexedSeq(args__7930__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7931__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__11463){
var map__11464 = p__11463;
var map__11464__$1 = ((((!((map__11464 == null)))?((((map__11464.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__11464.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11464):map__11464);
var opts = map__11464__$1;
var statearr_11466_11472 = state;
(statearr_11466_11472[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4657__auto__ = cljs.core.async.do_alts.call(null,((function (map__11464,map__11464__$1,opts){
return (function (val){
var statearr_11467_11473 = state;
(statearr_11467_11473[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__11464,map__11464__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4657__auto__)){
var cb = temp__4657__auto__;
var statearr_11468_11474 = state;
(statearr_11468_11474[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq11459){
var G__11460 = cljs.core.first.call(null,seq11459);
var seq11459__$1 = cljs.core.next.call(null,seq11459);
var G__11461 = cljs.core.first.call(null,seq11459__$1);
var seq11459__$2 = cljs.core.next.call(null,seq11459__$1);
var G__11462 = cljs.core.first.call(null,seq11459__$2);
var seq11459__$3 = cljs.core.next.call(null,seq11459__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__11460,G__11461,G__11462,seq11459__$3);
});

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async11642 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11642 = (function (out,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,meta11643){
this.out = out;
this.cs = cs;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.solo_mode = solo_mode;
this.change = change;
this.changed = changed;
this.pick = pick;
this.calc_state = calc_state;
this.meta11643 = meta11643;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11644,meta11643__$1){
var self__ = this;
var _11644__$1 = this;
return (new cljs.core.async.t_cljs$core$async11642(self__.out,self__.cs,self__.solo_modes,self__.attrs,self__.solo_mode,self__.change,self__.changed,self__.pick,self__.calc_state,meta11643__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11644){
var self__ = this;
var _11644__$1 = this;
return self__.meta11643;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"meta11643","meta11643",-1977931142,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11642.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async11642.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11642";

cljs.core.async.t_cljs$core$async11642.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async11642");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async11642 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async11642(out__$1,cs__$1,solo_modes__$1,attrs__$1,solo_mode__$1,change__$1,changed__$1,pick__$1,calc_state__$1,meta11643){
return (new cljs.core.async.t_cljs$core$async11642(out__$1,cs__$1,solo_modes__$1,attrs__$1,solo_mode__$1,change__$1,changed__$1,pick__$1,calc_state__$1,meta11643));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async11642(out,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__10042__auto___11809 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___11809,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___11809,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_11746){
var state_val_11747 = (state_11746[(1)]);
if((state_val_11747 === (7))){
var inst_11661 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
var statearr_11748_11810 = state_11746__$1;
(statearr_11748_11810[(2)] = inst_11661);

(statearr_11748_11810[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (20))){
var inst_11673 = (state_11746[(7)]);
var state_11746__$1 = state_11746;
var statearr_11749_11811 = state_11746__$1;
(statearr_11749_11811[(2)] = inst_11673);

(statearr_11749_11811[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (27))){
var state_11746__$1 = state_11746;
var statearr_11750_11812 = state_11746__$1;
(statearr_11750_11812[(2)] = null);

(statearr_11750_11812[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (1))){
var inst_11648 = (state_11746[(8)]);
var inst_11648__$1 = calc_state.call(null);
var inst_11650 = (inst_11648__$1 == null);
var inst_11651 = cljs.core.not.call(null,inst_11650);
var state_11746__$1 = (function (){var statearr_11751 = state_11746;
(statearr_11751[(8)] = inst_11648__$1);

return statearr_11751;
})();
if(inst_11651){
var statearr_11752_11813 = state_11746__$1;
(statearr_11752_11813[(1)] = (2));

} else {
var statearr_11753_11814 = state_11746__$1;
(statearr_11753_11814[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (24))){
var inst_11706 = (state_11746[(9)]);
var inst_11720 = (state_11746[(10)]);
var inst_11697 = (state_11746[(11)]);
var inst_11720__$1 = inst_11697.call(null,inst_11706);
var state_11746__$1 = (function (){var statearr_11754 = state_11746;
(statearr_11754[(10)] = inst_11720__$1);

return statearr_11754;
})();
if(cljs.core.truth_(inst_11720__$1)){
var statearr_11755_11815 = state_11746__$1;
(statearr_11755_11815[(1)] = (29));

} else {
var statearr_11756_11816 = state_11746__$1;
(statearr_11756_11816[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (4))){
var inst_11664 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
if(cljs.core.truth_(inst_11664)){
var statearr_11757_11817 = state_11746__$1;
(statearr_11757_11817[(1)] = (8));

} else {
var statearr_11758_11818 = state_11746__$1;
(statearr_11758_11818[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (15))){
var inst_11691 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
if(cljs.core.truth_(inst_11691)){
var statearr_11759_11819 = state_11746__$1;
(statearr_11759_11819[(1)] = (19));

} else {
var statearr_11760_11820 = state_11746__$1;
(statearr_11760_11820[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (21))){
var inst_11696 = (state_11746[(12)]);
var inst_11696__$1 = (state_11746[(2)]);
var inst_11697 = cljs.core.get.call(null,inst_11696__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11698 = cljs.core.get.call(null,inst_11696__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11699 = cljs.core.get.call(null,inst_11696__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_11746__$1 = (function (){var statearr_11761 = state_11746;
(statearr_11761[(13)] = inst_11698);

(statearr_11761[(12)] = inst_11696__$1);

(statearr_11761[(11)] = inst_11697);

return statearr_11761;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_11746__$1,(22),inst_11699);
} else {
if((state_val_11747 === (31))){
var inst_11728 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
if(cljs.core.truth_(inst_11728)){
var statearr_11762_11821 = state_11746__$1;
(statearr_11762_11821[(1)] = (32));

} else {
var statearr_11763_11822 = state_11746__$1;
(statearr_11763_11822[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (32))){
var inst_11705 = (state_11746[(14)]);
var state_11746__$1 = state_11746;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11746__$1,(35),out,inst_11705);
} else {
if((state_val_11747 === (33))){
var inst_11696 = (state_11746[(12)]);
var inst_11673 = inst_11696;
var state_11746__$1 = (function (){var statearr_11764 = state_11746;
(statearr_11764[(7)] = inst_11673);

return statearr_11764;
})();
var statearr_11765_11823 = state_11746__$1;
(statearr_11765_11823[(2)] = null);

(statearr_11765_11823[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (13))){
var inst_11673 = (state_11746[(7)]);
var inst_11680 = inst_11673.cljs$lang$protocol_mask$partition0$;
var inst_11681 = (inst_11680 & (64));
var inst_11682 = inst_11673.cljs$core$ISeq$;
var inst_11683 = (cljs.core.PROTOCOL_SENTINEL === inst_11682);
var inst_11684 = (inst_11681) || (inst_11683);
var state_11746__$1 = state_11746;
if(cljs.core.truth_(inst_11684)){
var statearr_11766_11824 = state_11746__$1;
(statearr_11766_11824[(1)] = (16));

} else {
var statearr_11767_11825 = state_11746__$1;
(statearr_11767_11825[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (22))){
var inst_11706 = (state_11746[(9)]);
var inst_11705 = (state_11746[(14)]);
var inst_11704 = (state_11746[(2)]);
var inst_11705__$1 = cljs.core.nth.call(null,inst_11704,(0),null);
var inst_11706__$1 = cljs.core.nth.call(null,inst_11704,(1),null);
var inst_11707 = (inst_11705__$1 == null);
var inst_11708 = cljs.core._EQ_.call(null,inst_11706__$1,change);
var inst_11709 = (inst_11707) || (inst_11708);
var state_11746__$1 = (function (){var statearr_11768 = state_11746;
(statearr_11768[(9)] = inst_11706__$1);

(statearr_11768[(14)] = inst_11705__$1);

return statearr_11768;
})();
if(cljs.core.truth_(inst_11709)){
var statearr_11769_11826 = state_11746__$1;
(statearr_11769_11826[(1)] = (23));

} else {
var statearr_11770_11827 = state_11746__$1;
(statearr_11770_11827[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (36))){
var inst_11696 = (state_11746[(12)]);
var inst_11673 = inst_11696;
var state_11746__$1 = (function (){var statearr_11771 = state_11746;
(statearr_11771[(7)] = inst_11673);

return statearr_11771;
})();
var statearr_11772_11828 = state_11746__$1;
(statearr_11772_11828[(2)] = null);

(statearr_11772_11828[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (29))){
var inst_11720 = (state_11746[(10)]);
var state_11746__$1 = state_11746;
var statearr_11773_11829 = state_11746__$1;
(statearr_11773_11829[(2)] = inst_11720);

(statearr_11773_11829[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (6))){
var state_11746__$1 = state_11746;
var statearr_11774_11830 = state_11746__$1;
(statearr_11774_11830[(2)] = false);

(statearr_11774_11830[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (28))){
var inst_11716 = (state_11746[(2)]);
var inst_11717 = calc_state.call(null);
var inst_11673 = inst_11717;
var state_11746__$1 = (function (){var statearr_11775 = state_11746;
(statearr_11775[(7)] = inst_11673);

(statearr_11775[(15)] = inst_11716);

return statearr_11775;
})();
var statearr_11776_11831 = state_11746__$1;
(statearr_11776_11831[(2)] = null);

(statearr_11776_11831[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (25))){
var inst_11742 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
var statearr_11777_11832 = state_11746__$1;
(statearr_11777_11832[(2)] = inst_11742);

(statearr_11777_11832[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (34))){
var inst_11740 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
var statearr_11778_11833 = state_11746__$1;
(statearr_11778_11833[(2)] = inst_11740);

(statearr_11778_11833[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (17))){
var state_11746__$1 = state_11746;
var statearr_11779_11834 = state_11746__$1;
(statearr_11779_11834[(2)] = false);

(statearr_11779_11834[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (3))){
var state_11746__$1 = state_11746;
var statearr_11780_11835 = state_11746__$1;
(statearr_11780_11835[(2)] = false);

(statearr_11780_11835[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (12))){
var inst_11744 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11746__$1,inst_11744);
} else {
if((state_val_11747 === (2))){
var inst_11648 = (state_11746[(8)]);
var inst_11653 = inst_11648.cljs$lang$protocol_mask$partition0$;
var inst_11654 = (inst_11653 & (64));
var inst_11655 = inst_11648.cljs$core$ISeq$;
var inst_11656 = (cljs.core.PROTOCOL_SENTINEL === inst_11655);
var inst_11657 = (inst_11654) || (inst_11656);
var state_11746__$1 = state_11746;
if(cljs.core.truth_(inst_11657)){
var statearr_11781_11836 = state_11746__$1;
(statearr_11781_11836[(1)] = (5));

} else {
var statearr_11782_11837 = state_11746__$1;
(statearr_11782_11837[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (23))){
var inst_11705 = (state_11746[(14)]);
var inst_11711 = (inst_11705 == null);
var state_11746__$1 = state_11746;
if(cljs.core.truth_(inst_11711)){
var statearr_11783_11838 = state_11746__$1;
(statearr_11783_11838[(1)] = (26));

} else {
var statearr_11784_11839 = state_11746__$1;
(statearr_11784_11839[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (35))){
var inst_11731 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
if(cljs.core.truth_(inst_11731)){
var statearr_11785_11840 = state_11746__$1;
(statearr_11785_11840[(1)] = (36));

} else {
var statearr_11786_11841 = state_11746__$1;
(statearr_11786_11841[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (19))){
var inst_11673 = (state_11746[(7)]);
var inst_11693 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11673);
var state_11746__$1 = state_11746;
var statearr_11787_11842 = state_11746__$1;
(statearr_11787_11842[(2)] = inst_11693);

(statearr_11787_11842[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (11))){
var inst_11673 = (state_11746[(7)]);
var inst_11677 = (inst_11673 == null);
var inst_11678 = cljs.core.not.call(null,inst_11677);
var state_11746__$1 = state_11746;
if(inst_11678){
var statearr_11788_11843 = state_11746__$1;
(statearr_11788_11843[(1)] = (13));

} else {
var statearr_11789_11844 = state_11746__$1;
(statearr_11789_11844[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (9))){
var inst_11648 = (state_11746[(8)]);
var state_11746__$1 = state_11746;
var statearr_11790_11845 = state_11746__$1;
(statearr_11790_11845[(2)] = inst_11648);

(statearr_11790_11845[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (5))){
var state_11746__$1 = state_11746;
var statearr_11791_11846 = state_11746__$1;
(statearr_11791_11846[(2)] = true);

(statearr_11791_11846[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (14))){
var state_11746__$1 = state_11746;
var statearr_11792_11847 = state_11746__$1;
(statearr_11792_11847[(2)] = false);

(statearr_11792_11847[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (26))){
var inst_11706 = (state_11746[(9)]);
var inst_11713 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_11706);
var state_11746__$1 = state_11746;
var statearr_11793_11848 = state_11746__$1;
(statearr_11793_11848[(2)] = inst_11713);

(statearr_11793_11848[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (16))){
var state_11746__$1 = state_11746;
var statearr_11794_11849 = state_11746__$1;
(statearr_11794_11849[(2)] = true);

(statearr_11794_11849[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (38))){
var inst_11736 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
var statearr_11795_11850 = state_11746__$1;
(statearr_11795_11850[(2)] = inst_11736);

(statearr_11795_11850[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (30))){
var inst_11698 = (state_11746[(13)]);
var inst_11706 = (state_11746[(9)]);
var inst_11697 = (state_11746[(11)]);
var inst_11723 = cljs.core.empty_QMARK_.call(null,inst_11697);
var inst_11724 = inst_11698.call(null,inst_11706);
var inst_11725 = cljs.core.not.call(null,inst_11724);
var inst_11726 = (inst_11723) && (inst_11725);
var state_11746__$1 = state_11746;
var statearr_11796_11851 = state_11746__$1;
(statearr_11796_11851[(2)] = inst_11726);

(statearr_11796_11851[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (10))){
var inst_11648 = (state_11746[(8)]);
var inst_11669 = (state_11746[(2)]);
var inst_11670 = cljs.core.get.call(null,inst_11669,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11671 = cljs.core.get.call(null,inst_11669,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11672 = cljs.core.get.call(null,inst_11669,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_11673 = inst_11648;
var state_11746__$1 = (function (){var statearr_11797 = state_11746;
(statearr_11797[(7)] = inst_11673);

(statearr_11797[(16)] = inst_11670);

(statearr_11797[(17)] = inst_11672);

(statearr_11797[(18)] = inst_11671);

return statearr_11797;
})();
var statearr_11798_11852 = state_11746__$1;
(statearr_11798_11852[(2)] = null);

(statearr_11798_11852[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (18))){
var inst_11688 = (state_11746[(2)]);
var state_11746__$1 = state_11746;
var statearr_11799_11853 = state_11746__$1;
(statearr_11799_11853[(2)] = inst_11688);

(statearr_11799_11853[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (37))){
var state_11746__$1 = state_11746;
var statearr_11800_11854 = state_11746__$1;
(statearr_11800_11854[(2)] = null);

(statearr_11800_11854[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11747 === (8))){
var inst_11648 = (state_11746[(8)]);
var inst_11666 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11648);
var state_11746__$1 = state_11746;
var statearr_11801_11855 = state_11746__$1;
(statearr_11801_11855[(2)] = inst_11666);

(statearr_11801_11855[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___11809,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__9930__auto__,c__10042__auto___11809,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__9931__auto__ = null;
var cljs$core$async$mix_$_state_machine__9931__auto____0 = (function (){
var statearr_11805 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11805[(0)] = cljs$core$async$mix_$_state_machine__9931__auto__);

(statearr_11805[(1)] = (1));

return statearr_11805;
});
var cljs$core$async$mix_$_state_machine__9931__auto____1 = (function (state_11746){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_11746);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e11806){if((e11806 instanceof Object)){
var ex__9934__auto__ = e11806;
var statearr_11807_11856 = state_11746;
(statearr_11807_11856[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11746);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11806;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11857 = state_11746;
state_11746 = G__11857;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__9931__auto__ = function(state_11746){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__9931__auto____1.call(this,state_11746);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__9931__auto____0;
cljs$core$async$mix_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__9931__auto____1;
return cljs$core$async$mix_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___11809,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__10044__auto__ = (function (){var statearr_11808 = f__10043__auto__.call(null);
(statearr_11808[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___11809);

return statearr_11808;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___11809,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__7482__auto__ = (((p == null))?null:p);
var m__7483__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__7483__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__7482__auto__ = (((p == null))?null:p);
var m__7483__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,p,v,ch);
} else {
var m__7483__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args11858 = [];
var len__7923__auto___11861 = arguments.length;
var i__7924__auto___11862 = (0);
while(true){
if((i__7924__auto___11862 < len__7923__auto___11861)){
args11858.push((arguments[i__7924__auto___11862]));

var G__11863 = (i__7924__auto___11862 + (1));
i__7924__auto___11862 = G__11863;
continue;
} else {
}
break;
}

var G__11860 = args11858.length;
switch (G__11860) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args11858.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__7482__auto__ = (((p == null))?null:p);
var m__7483__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,p);
} else {
var m__7483__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__7482__auto__ = (((p == null))?null:p);
var m__7483__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__7482__auto__)]);
if(!((m__7483__auto__ == null))){
return m__7483__auto__.call(null,p,v);
} else {
var m__7483__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__7483__auto____$1 == null))){
return m__7483__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args11866 = [];
var len__7923__auto___11991 = arguments.length;
var i__7924__auto___11992 = (0);
while(true){
if((i__7924__auto___11992 < len__7923__auto___11991)){
args11866.push((arguments[i__7924__auto___11992]));

var G__11993 = (i__7924__auto___11992 + (1));
i__7924__auto___11992 = G__11993;
continue;
} else {
}
break;
}

var G__11868 = args11866.length;
switch (G__11868) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args11866.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__6814__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__6814__auto__,mults){
return (function (p1__11865_SHARP_){
if(cljs.core.truth_(p1__11865_SHARP_.call(null,topic))){
return p1__11865_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__11865_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__6814__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async11869 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11869 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta11870){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta11870 = meta11870;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_11871,meta11870__$1){
var self__ = this;
var _11871__$1 = this;
return (new cljs.core.async.t_cljs$core$async11869(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta11870__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_11871){
var self__ = this;
var _11871__$1 = this;
return self__.meta11870;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4657__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4657__auto__)){
var m = temp__4657__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta11870","meta11870",1915924477,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async11869.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async11869.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11869";

cljs.core.async.t_cljs$core$async11869.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async11869");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async11869 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async11869(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta11870){
return (new cljs.core.async.t_cljs$core$async11869(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta11870));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async11869(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__10042__auto___11995 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___11995,mults,ensure_mult,p){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___11995,mults,ensure_mult,p){
return (function (state_11943){
var state_val_11944 = (state_11943[(1)]);
if((state_val_11944 === (7))){
var inst_11939 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
var statearr_11945_11996 = state_11943__$1;
(statearr_11945_11996[(2)] = inst_11939);

(statearr_11945_11996[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (20))){
var state_11943__$1 = state_11943;
var statearr_11946_11997 = state_11943__$1;
(statearr_11946_11997[(2)] = null);

(statearr_11946_11997[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (1))){
var state_11943__$1 = state_11943;
var statearr_11947_11998 = state_11943__$1;
(statearr_11947_11998[(2)] = null);

(statearr_11947_11998[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (24))){
var inst_11922 = (state_11943[(7)]);
var inst_11931 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_11922);
var state_11943__$1 = state_11943;
var statearr_11948_11999 = state_11943__$1;
(statearr_11948_11999[(2)] = inst_11931);

(statearr_11948_11999[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (4))){
var inst_11874 = (state_11943[(8)]);
var inst_11874__$1 = (state_11943[(2)]);
var inst_11875 = (inst_11874__$1 == null);
var state_11943__$1 = (function (){var statearr_11949 = state_11943;
(statearr_11949[(8)] = inst_11874__$1);

return statearr_11949;
})();
if(cljs.core.truth_(inst_11875)){
var statearr_11950_12000 = state_11943__$1;
(statearr_11950_12000[(1)] = (5));

} else {
var statearr_11951_12001 = state_11943__$1;
(statearr_11951_12001[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (15))){
var inst_11916 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
var statearr_11952_12002 = state_11943__$1;
(statearr_11952_12002[(2)] = inst_11916);

(statearr_11952_12002[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (21))){
var inst_11936 = (state_11943[(2)]);
var state_11943__$1 = (function (){var statearr_11953 = state_11943;
(statearr_11953[(9)] = inst_11936);

return statearr_11953;
})();
var statearr_11954_12003 = state_11943__$1;
(statearr_11954_12003[(2)] = null);

(statearr_11954_12003[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (13))){
var inst_11898 = (state_11943[(10)]);
var inst_11900 = cljs.core.chunked_seq_QMARK_.call(null,inst_11898);
var state_11943__$1 = state_11943;
if(inst_11900){
var statearr_11955_12004 = state_11943__$1;
(statearr_11955_12004[(1)] = (16));

} else {
var statearr_11956_12005 = state_11943__$1;
(statearr_11956_12005[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (22))){
var inst_11928 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
if(cljs.core.truth_(inst_11928)){
var statearr_11957_12006 = state_11943__$1;
(statearr_11957_12006[(1)] = (23));

} else {
var statearr_11958_12007 = state_11943__$1;
(statearr_11958_12007[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (6))){
var inst_11874 = (state_11943[(8)]);
var inst_11922 = (state_11943[(7)]);
var inst_11924 = (state_11943[(11)]);
var inst_11922__$1 = topic_fn.call(null,inst_11874);
var inst_11923 = cljs.core.deref.call(null,mults);
var inst_11924__$1 = cljs.core.get.call(null,inst_11923,inst_11922__$1);
var state_11943__$1 = (function (){var statearr_11959 = state_11943;
(statearr_11959[(7)] = inst_11922__$1);

(statearr_11959[(11)] = inst_11924__$1);

return statearr_11959;
})();
if(cljs.core.truth_(inst_11924__$1)){
var statearr_11960_12008 = state_11943__$1;
(statearr_11960_12008[(1)] = (19));

} else {
var statearr_11961_12009 = state_11943__$1;
(statearr_11961_12009[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (25))){
var inst_11933 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
var statearr_11962_12010 = state_11943__$1;
(statearr_11962_12010[(2)] = inst_11933);

(statearr_11962_12010[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (17))){
var inst_11898 = (state_11943[(10)]);
var inst_11907 = cljs.core.first.call(null,inst_11898);
var inst_11908 = cljs.core.async.muxch_STAR_.call(null,inst_11907);
var inst_11909 = cljs.core.async.close_BANG_.call(null,inst_11908);
var inst_11910 = cljs.core.next.call(null,inst_11898);
var inst_11884 = inst_11910;
var inst_11885 = null;
var inst_11886 = (0);
var inst_11887 = (0);
var state_11943__$1 = (function (){var statearr_11963 = state_11943;
(statearr_11963[(12)] = inst_11884);

(statearr_11963[(13)] = inst_11909);

(statearr_11963[(14)] = inst_11887);

(statearr_11963[(15)] = inst_11885);

(statearr_11963[(16)] = inst_11886);

return statearr_11963;
})();
var statearr_11964_12011 = state_11943__$1;
(statearr_11964_12011[(2)] = null);

(statearr_11964_12011[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (3))){
var inst_11941 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11943__$1,inst_11941);
} else {
if((state_val_11944 === (12))){
var inst_11918 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
var statearr_11965_12012 = state_11943__$1;
(statearr_11965_12012[(2)] = inst_11918);

(statearr_11965_12012[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (2))){
var state_11943__$1 = state_11943;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11943__$1,(4),ch);
} else {
if((state_val_11944 === (23))){
var state_11943__$1 = state_11943;
var statearr_11966_12013 = state_11943__$1;
(statearr_11966_12013[(2)] = null);

(statearr_11966_12013[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (19))){
var inst_11874 = (state_11943[(8)]);
var inst_11924 = (state_11943[(11)]);
var inst_11926 = cljs.core.async.muxch_STAR_.call(null,inst_11924);
var state_11943__$1 = state_11943;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11943__$1,(22),inst_11926,inst_11874);
} else {
if((state_val_11944 === (11))){
var inst_11884 = (state_11943[(12)]);
var inst_11898 = (state_11943[(10)]);
var inst_11898__$1 = cljs.core.seq.call(null,inst_11884);
var state_11943__$1 = (function (){var statearr_11967 = state_11943;
(statearr_11967[(10)] = inst_11898__$1);

return statearr_11967;
})();
if(inst_11898__$1){
var statearr_11968_12014 = state_11943__$1;
(statearr_11968_12014[(1)] = (13));

} else {
var statearr_11969_12015 = state_11943__$1;
(statearr_11969_12015[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (9))){
var inst_11920 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
var statearr_11970_12016 = state_11943__$1;
(statearr_11970_12016[(2)] = inst_11920);

(statearr_11970_12016[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (5))){
var inst_11881 = cljs.core.deref.call(null,mults);
var inst_11882 = cljs.core.vals.call(null,inst_11881);
var inst_11883 = cljs.core.seq.call(null,inst_11882);
var inst_11884 = inst_11883;
var inst_11885 = null;
var inst_11886 = (0);
var inst_11887 = (0);
var state_11943__$1 = (function (){var statearr_11971 = state_11943;
(statearr_11971[(12)] = inst_11884);

(statearr_11971[(14)] = inst_11887);

(statearr_11971[(15)] = inst_11885);

(statearr_11971[(16)] = inst_11886);

return statearr_11971;
})();
var statearr_11972_12017 = state_11943__$1;
(statearr_11972_12017[(2)] = null);

(statearr_11972_12017[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (14))){
var state_11943__$1 = state_11943;
var statearr_11976_12018 = state_11943__$1;
(statearr_11976_12018[(2)] = null);

(statearr_11976_12018[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (16))){
var inst_11898 = (state_11943[(10)]);
var inst_11902 = cljs.core.chunk_first.call(null,inst_11898);
var inst_11903 = cljs.core.chunk_rest.call(null,inst_11898);
var inst_11904 = cljs.core.count.call(null,inst_11902);
var inst_11884 = inst_11903;
var inst_11885 = inst_11902;
var inst_11886 = inst_11904;
var inst_11887 = (0);
var state_11943__$1 = (function (){var statearr_11977 = state_11943;
(statearr_11977[(12)] = inst_11884);

(statearr_11977[(14)] = inst_11887);

(statearr_11977[(15)] = inst_11885);

(statearr_11977[(16)] = inst_11886);

return statearr_11977;
})();
var statearr_11978_12019 = state_11943__$1;
(statearr_11978_12019[(2)] = null);

(statearr_11978_12019[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (10))){
var inst_11884 = (state_11943[(12)]);
var inst_11887 = (state_11943[(14)]);
var inst_11885 = (state_11943[(15)]);
var inst_11886 = (state_11943[(16)]);
var inst_11892 = cljs.core._nth.call(null,inst_11885,inst_11887);
var inst_11893 = cljs.core.async.muxch_STAR_.call(null,inst_11892);
var inst_11894 = cljs.core.async.close_BANG_.call(null,inst_11893);
var inst_11895 = (inst_11887 + (1));
var tmp11973 = inst_11884;
var tmp11974 = inst_11885;
var tmp11975 = inst_11886;
var inst_11884__$1 = tmp11973;
var inst_11885__$1 = tmp11974;
var inst_11886__$1 = tmp11975;
var inst_11887__$1 = inst_11895;
var state_11943__$1 = (function (){var statearr_11979 = state_11943;
(statearr_11979[(12)] = inst_11884__$1);

(statearr_11979[(14)] = inst_11887__$1);

(statearr_11979[(15)] = inst_11885__$1);

(statearr_11979[(16)] = inst_11886__$1);

(statearr_11979[(17)] = inst_11894);

return statearr_11979;
})();
var statearr_11980_12020 = state_11943__$1;
(statearr_11980_12020[(2)] = null);

(statearr_11980_12020[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (18))){
var inst_11913 = (state_11943[(2)]);
var state_11943__$1 = state_11943;
var statearr_11981_12021 = state_11943__$1;
(statearr_11981_12021[(2)] = inst_11913);

(statearr_11981_12021[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11944 === (8))){
var inst_11887 = (state_11943[(14)]);
var inst_11886 = (state_11943[(16)]);
var inst_11889 = (inst_11887 < inst_11886);
var inst_11890 = inst_11889;
var state_11943__$1 = state_11943;
if(cljs.core.truth_(inst_11890)){
var statearr_11982_12022 = state_11943__$1;
(statearr_11982_12022[(1)] = (10));

} else {
var statearr_11983_12023 = state_11943__$1;
(statearr_11983_12023[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___11995,mults,ensure_mult,p))
;
return ((function (switch__9930__auto__,c__10042__auto___11995,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_11987 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11987[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_11987[(1)] = (1));

return statearr_11987;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_11943){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_11943);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e11988){if((e11988 instanceof Object)){
var ex__9934__auto__ = e11988;
var statearr_11989_12024 = state_11943;
(statearr_11989_12024[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11943);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11988;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12025 = state_11943;
state_11943 = G__12025;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_11943){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_11943);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___11995,mults,ensure_mult,p))
})();
var state__10044__auto__ = (function (){var statearr_11990 = f__10043__auto__.call(null);
(statearr_11990[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___11995);

return statearr_11990;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___11995,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args12026 = [];
var len__7923__auto___12029 = arguments.length;
var i__7924__auto___12030 = (0);
while(true){
if((i__7924__auto___12030 < len__7923__auto___12029)){
args12026.push((arguments[i__7924__auto___12030]));

var G__12031 = (i__7924__auto___12030 + (1));
i__7924__auto___12030 = G__12031;
continue;
} else {
}
break;
}

var G__12028 = args12026.length;
switch (G__12028) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12026.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args12033 = [];
var len__7923__auto___12036 = arguments.length;
var i__7924__auto___12037 = (0);
while(true){
if((i__7924__auto___12037 < len__7923__auto___12036)){
args12033.push((arguments[i__7924__auto___12037]));

var G__12038 = (i__7924__auto___12037 + (1));
i__7924__auto___12037 = G__12038;
continue;
} else {
}
break;
}

var G__12035 = args12033.length;
switch (G__12035) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12033.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args12040 = [];
var len__7923__auto___12111 = arguments.length;
var i__7924__auto___12112 = (0);
while(true){
if((i__7924__auto___12112 < len__7923__auto___12111)){
args12040.push((arguments[i__7924__auto___12112]));

var G__12113 = (i__7924__auto___12112 + (1));
i__7924__auto___12112 = G__12113;
continue;
} else {
}
break;
}

var G__12042 = args12040.length;
switch (G__12042) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12040.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__10042__auto___12115 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___12115,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___12115,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_12081){
var state_val_12082 = (state_12081[(1)]);
if((state_val_12082 === (7))){
var state_12081__$1 = state_12081;
var statearr_12083_12116 = state_12081__$1;
(statearr_12083_12116[(2)] = null);

(statearr_12083_12116[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (1))){
var state_12081__$1 = state_12081;
var statearr_12084_12117 = state_12081__$1;
(statearr_12084_12117[(2)] = null);

(statearr_12084_12117[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (4))){
var inst_12045 = (state_12081[(7)]);
var inst_12047 = (inst_12045 < cnt);
var state_12081__$1 = state_12081;
if(cljs.core.truth_(inst_12047)){
var statearr_12085_12118 = state_12081__$1;
(statearr_12085_12118[(1)] = (6));

} else {
var statearr_12086_12119 = state_12081__$1;
(statearr_12086_12119[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (15))){
var inst_12077 = (state_12081[(2)]);
var state_12081__$1 = state_12081;
var statearr_12087_12120 = state_12081__$1;
(statearr_12087_12120[(2)] = inst_12077);

(statearr_12087_12120[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (13))){
var inst_12070 = cljs.core.async.close_BANG_.call(null,out);
var state_12081__$1 = state_12081;
var statearr_12088_12121 = state_12081__$1;
(statearr_12088_12121[(2)] = inst_12070);

(statearr_12088_12121[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (6))){
var state_12081__$1 = state_12081;
var statearr_12089_12122 = state_12081__$1;
(statearr_12089_12122[(2)] = null);

(statearr_12089_12122[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (3))){
var inst_12079 = (state_12081[(2)]);
var state_12081__$1 = state_12081;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12081__$1,inst_12079);
} else {
if((state_val_12082 === (12))){
var inst_12067 = (state_12081[(8)]);
var inst_12067__$1 = (state_12081[(2)]);
var inst_12068 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_12067__$1);
var state_12081__$1 = (function (){var statearr_12090 = state_12081;
(statearr_12090[(8)] = inst_12067__$1);

return statearr_12090;
})();
if(cljs.core.truth_(inst_12068)){
var statearr_12091_12123 = state_12081__$1;
(statearr_12091_12123[(1)] = (13));

} else {
var statearr_12092_12124 = state_12081__$1;
(statearr_12092_12124[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (2))){
var inst_12044 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_12045 = (0);
var state_12081__$1 = (function (){var statearr_12093 = state_12081;
(statearr_12093[(9)] = inst_12044);

(statearr_12093[(7)] = inst_12045);

return statearr_12093;
})();
var statearr_12094_12125 = state_12081__$1;
(statearr_12094_12125[(2)] = null);

(statearr_12094_12125[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (11))){
var inst_12045 = (state_12081[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12081,(10),Object,null,(9));
var inst_12054 = chs__$1.call(null,inst_12045);
var inst_12055 = done.call(null,inst_12045);
var inst_12056 = cljs.core.async.take_BANG_.call(null,inst_12054,inst_12055);
var state_12081__$1 = state_12081;
var statearr_12095_12126 = state_12081__$1;
(statearr_12095_12126[(2)] = inst_12056);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12081__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (9))){
var inst_12045 = (state_12081[(7)]);
var inst_12058 = (state_12081[(2)]);
var inst_12059 = (inst_12045 + (1));
var inst_12045__$1 = inst_12059;
var state_12081__$1 = (function (){var statearr_12096 = state_12081;
(statearr_12096[(10)] = inst_12058);

(statearr_12096[(7)] = inst_12045__$1);

return statearr_12096;
})();
var statearr_12097_12127 = state_12081__$1;
(statearr_12097_12127[(2)] = null);

(statearr_12097_12127[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (5))){
var inst_12065 = (state_12081[(2)]);
var state_12081__$1 = (function (){var statearr_12098 = state_12081;
(statearr_12098[(11)] = inst_12065);

return statearr_12098;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12081__$1,(12),dchan);
} else {
if((state_val_12082 === (14))){
var inst_12067 = (state_12081[(8)]);
var inst_12072 = cljs.core.apply.call(null,f,inst_12067);
var state_12081__$1 = state_12081;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12081__$1,(16),out,inst_12072);
} else {
if((state_val_12082 === (16))){
var inst_12074 = (state_12081[(2)]);
var state_12081__$1 = (function (){var statearr_12099 = state_12081;
(statearr_12099[(12)] = inst_12074);

return statearr_12099;
})();
var statearr_12100_12128 = state_12081__$1;
(statearr_12100_12128[(2)] = null);

(statearr_12100_12128[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (10))){
var inst_12049 = (state_12081[(2)]);
var inst_12050 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_12081__$1 = (function (){var statearr_12101 = state_12081;
(statearr_12101[(13)] = inst_12049);

return statearr_12101;
})();
var statearr_12102_12129 = state_12081__$1;
(statearr_12102_12129[(2)] = inst_12050);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12081__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12082 === (8))){
var inst_12063 = (state_12081[(2)]);
var state_12081__$1 = state_12081;
var statearr_12103_12130 = state_12081__$1;
(statearr_12103_12130[(2)] = inst_12063);

(statearr_12103_12130[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___12115,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__9930__auto__,c__10042__auto___12115,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_12107 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12107[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_12107[(1)] = (1));

return statearr_12107;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_12081){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12081);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12108){if((e12108 instanceof Object)){
var ex__9934__auto__ = e12108;
var statearr_12109_12131 = state_12081;
(statearr_12109_12131[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12081);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12108;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12132 = state_12081;
state_12081 = G__12132;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_12081){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_12081);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___12115,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__10044__auto__ = (function (){var statearr_12110 = f__10043__auto__.call(null);
(statearr_12110[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___12115);

return statearr_12110;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___12115,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args12134 = [];
var len__7923__auto___12192 = arguments.length;
var i__7924__auto___12193 = (0);
while(true){
if((i__7924__auto___12193 < len__7923__auto___12192)){
args12134.push((arguments[i__7924__auto___12193]));

var G__12194 = (i__7924__auto___12193 + (1));
i__7924__auto___12193 = G__12194;
continue;
} else {
}
break;
}

var G__12136 = args12134.length;
switch (G__12136) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12134.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10042__auto___12196 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___12196,out){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___12196,out){
return (function (state_12168){
var state_val_12169 = (state_12168[(1)]);
if((state_val_12169 === (7))){
var inst_12147 = (state_12168[(7)]);
var inst_12148 = (state_12168[(8)]);
var inst_12147__$1 = (state_12168[(2)]);
var inst_12148__$1 = cljs.core.nth.call(null,inst_12147__$1,(0),null);
var inst_12149 = cljs.core.nth.call(null,inst_12147__$1,(1),null);
var inst_12150 = (inst_12148__$1 == null);
var state_12168__$1 = (function (){var statearr_12170 = state_12168;
(statearr_12170[(7)] = inst_12147__$1);

(statearr_12170[(8)] = inst_12148__$1);

(statearr_12170[(9)] = inst_12149);

return statearr_12170;
})();
if(cljs.core.truth_(inst_12150)){
var statearr_12171_12197 = state_12168__$1;
(statearr_12171_12197[(1)] = (8));

} else {
var statearr_12172_12198 = state_12168__$1;
(statearr_12172_12198[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12169 === (1))){
var inst_12137 = cljs.core.vec.call(null,chs);
var inst_12138 = inst_12137;
var state_12168__$1 = (function (){var statearr_12173 = state_12168;
(statearr_12173[(10)] = inst_12138);

return statearr_12173;
})();
var statearr_12174_12199 = state_12168__$1;
(statearr_12174_12199[(2)] = null);

(statearr_12174_12199[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12169 === (4))){
var inst_12138 = (state_12168[(10)]);
var state_12168__$1 = state_12168;
return cljs.core.async.ioc_alts_BANG_.call(null,state_12168__$1,(7),inst_12138);
} else {
if((state_val_12169 === (6))){
var inst_12164 = (state_12168[(2)]);
var state_12168__$1 = state_12168;
var statearr_12175_12200 = state_12168__$1;
(statearr_12175_12200[(2)] = inst_12164);

(statearr_12175_12200[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12169 === (3))){
var inst_12166 = (state_12168[(2)]);
var state_12168__$1 = state_12168;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12168__$1,inst_12166);
} else {
if((state_val_12169 === (2))){
var inst_12138 = (state_12168[(10)]);
var inst_12140 = cljs.core.count.call(null,inst_12138);
var inst_12141 = (inst_12140 > (0));
var state_12168__$1 = state_12168;
if(cljs.core.truth_(inst_12141)){
var statearr_12177_12201 = state_12168__$1;
(statearr_12177_12201[(1)] = (4));

} else {
var statearr_12178_12202 = state_12168__$1;
(statearr_12178_12202[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12169 === (11))){
var inst_12138 = (state_12168[(10)]);
var inst_12157 = (state_12168[(2)]);
var tmp12176 = inst_12138;
var inst_12138__$1 = tmp12176;
var state_12168__$1 = (function (){var statearr_12179 = state_12168;
(statearr_12179[(10)] = inst_12138__$1);

(statearr_12179[(11)] = inst_12157);

return statearr_12179;
})();
var statearr_12180_12203 = state_12168__$1;
(statearr_12180_12203[(2)] = null);

(statearr_12180_12203[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12169 === (9))){
var inst_12148 = (state_12168[(8)]);
var state_12168__$1 = state_12168;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12168__$1,(11),out,inst_12148);
} else {
if((state_val_12169 === (5))){
var inst_12162 = cljs.core.async.close_BANG_.call(null,out);
var state_12168__$1 = state_12168;
var statearr_12181_12204 = state_12168__$1;
(statearr_12181_12204[(2)] = inst_12162);

(statearr_12181_12204[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12169 === (10))){
var inst_12160 = (state_12168[(2)]);
var state_12168__$1 = state_12168;
var statearr_12182_12205 = state_12168__$1;
(statearr_12182_12205[(2)] = inst_12160);

(statearr_12182_12205[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12169 === (8))){
var inst_12147 = (state_12168[(7)]);
var inst_12138 = (state_12168[(10)]);
var inst_12148 = (state_12168[(8)]);
var inst_12149 = (state_12168[(9)]);
var inst_12152 = (function (){var cs = inst_12138;
var vec__12143 = inst_12147;
var v = inst_12148;
var c = inst_12149;
return ((function (cs,vec__12143,v,c,inst_12147,inst_12138,inst_12148,inst_12149,state_val_12169,c__10042__auto___12196,out){
return (function (p1__12133_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__12133_SHARP_);
});
;})(cs,vec__12143,v,c,inst_12147,inst_12138,inst_12148,inst_12149,state_val_12169,c__10042__auto___12196,out))
})();
var inst_12153 = cljs.core.filterv.call(null,inst_12152,inst_12138);
var inst_12138__$1 = inst_12153;
var state_12168__$1 = (function (){var statearr_12183 = state_12168;
(statearr_12183[(10)] = inst_12138__$1);

return statearr_12183;
})();
var statearr_12184_12206 = state_12168__$1;
(statearr_12184_12206[(2)] = null);

(statearr_12184_12206[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___12196,out))
;
return ((function (switch__9930__auto__,c__10042__auto___12196,out){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_12188 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12188[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_12188[(1)] = (1));

return statearr_12188;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_12168){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12168);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12189){if((e12189 instanceof Object)){
var ex__9934__auto__ = e12189;
var statearr_12190_12207 = state_12168;
(statearr_12190_12207[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12168);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12189;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12208 = state_12168;
state_12168 = G__12208;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_12168){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_12168);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___12196,out))
})();
var state__10044__auto__ = (function (){var statearr_12191 = f__10043__auto__.call(null);
(statearr_12191[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___12196);

return statearr_12191;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___12196,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args12209 = [];
var len__7923__auto___12258 = arguments.length;
var i__7924__auto___12259 = (0);
while(true){
if((i__7924__auto___12259 < len__7923__auto___12258)){
args12209.push((arguments[i__7924__auto___12259]));

var G__12260 = (i__7924__auto___12259 + (1));
i__7924__auto___12259 = G__12260;
continue;
} else {
}
break;
}

var G__12211 = args12209.length;
switch (G__12211) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12209.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10042__auto___12262 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___12262,out){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___12262,out){
return (function (state_12235){
var state_val_12236 = (state_12235[(1)]);
if((state_val_12236 === (7))){
var inst_12217 = (state_12235[(7)]);
var inst_12217__$1 = (state_12235[(2)]);
var inst_12218 = (inst_12217__$1 == null);
var inst_12219 = cljs.core.not.call(null,inst_12218);
var state_12235__$1 = (function (){var statearr_12237 = state_12235;
(statearr_12237[(7)] = inst_12217__$1);

return statearr_12237;
})();
if(inst_12219){
var statearr_12238_12263 = state_12235__$1;
(statearr_12238_12263[(1)] = (8));

} else {
var statearr_12239_12264 = state_12235__$1;
(statearr_12239_12264[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (1))){
var inst_12212 = (0);
var state_12235__$1 = (function (){var statearr_12240 = state_12235;
(statearr_12240[(8)] = inst_12212);

return statearr_12240;
})();
var statearr_12241_12265 = state_12235__$1;
(statearr_12241_12265[(2)] = null);

(statearr_12241_12265[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (4))){
var state_12235__$1 = state_12235;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12235__$1,(7),ch);
} else {
if((state_val_12236 === (6))){
var inst_12230 = (state_12235[(2)]);
var state_12235__$1 = state_12235;
var statearr_12242_12266 = state_12235__$1;
(statearr_12242_12266[(2)] = inst_12230);

(statearr_12242_12266[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (3))){
var inst_12232 = (state_12235[(2)]);
var inst_12233 = cljs.core.async.close_BANG_.call(null,out);
var state_12235__$1 = (function (){var statearr_12243 = state_12235;
(statearr_12243[(9)] = inst_12232);

return statearr_12243;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12235__$1,inst_12233);
} else {
if((state_val_12236 === (2))){
var inst_12212 = (state_12235[(8)]);
var inst_12214 = (inst_12212 < n);
var state_12235__$1 = state_12235;
if(cljs.core.truth_(inst_12214)){
var statearr_12244_12267 = state_12235__$1;
(statearr_12244_12267[(1)] = (4));

} else {
var statearr_12245_12268 = state_12235__$1;
(statearr_12245_12268[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (11))){
var inst_12212 = (state_12235[(8)]);
var inst_12222 = (state_12235[(2)]);
var inst_12223 = (inst_12212 + (1));
var inst_12212__$1 = inst_12223;
var state_12235__$1 = (function (){var statearr_12246 = state_12235;
(statearr_12246[(8)] = inst_12212__$1);

(statearr_12246[(10)] = inst_12222);

return statearr_12246;
})();
var statearr_12247_12269 = state_12235__$1;
(statearr_12247_12269[(2)] = null);

(statearr_12247_12269[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (9))){
var state_12235__$1 = state_12235;
var statearr_12248_12270 = state_12235__$1;
(statearr_12248_12270[(2)] = null);

(statearr_12248_12270[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (5))){
var state_12235__$1 = state_12235;
var statearr_12249_12271 = state_12235__$1;
(statearr_12249_12271[(2)] = null);

(statearr_12249_12271[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (10))){
var inst_12227 = (state_12235[(2)]);
var state_12235__$1 = state_12235;
var statearr_12250_12272 = state_12235__$1;
(statearr_12250_12272[(2)] = inst_12227);

(statearr_12250_12272[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12236 === (8))){
var inst_12217 = (state_12235[(7)]);
var state_12235__$1 = state_12235;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12235__$1,(11),out,inst_12217);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___12262,out))
;
return ((function (switch__9930__auto__,c__10042__auto___12262,out){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_12254 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12254[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_12254[(1)] = (1));

return statearr_12254;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_12235){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12235);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12255){if((e12255 instanceof Object)){
var ex__9934__auto__ = e12255;
var statearr_12256_12273 = state_12235;
(statearr_12256_12273[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12235);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12255;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12274 = state_12235;
state_12235 = G__12274;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_12235){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_12235);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___12262,out))
})();
var state__10044__auto__ = (function (){var statearr_12257 = f__10043__auto__.call(null);
(statearr_12257[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___12262);

return statearr_12257;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___12262,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async12282 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12282 = (function (f,ch,meta12283){
this.f = f;
this.ch = ch;
this.meta12283 = meta12283;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12284,meta12283__$1){
var self__ = this;
var _12284__$1 = this;
return (new cljs.core.async.t_cljs$core$async12282(self__.f,self__.ch,meta12283__$1));
});

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12284){
var self__ = this;
var _12284__$1 = this;
return self__.meta12283;
});

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async12285 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12285 = (function (f,ch,meta12283,_,fn1,meta12286){
this.f = f;
this.ch = ch;
this.meta12283 = meta12283;
this._ = _;
this.fn1 = fn1;
this.meta12286 = meta12286;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12285.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_12287,meta12286__$1){
var self__ = this;
var _12287__$1 = this;
return (new cljs.core.async.t_cljs$core$async12285(self__.f,self__.ch,self__.meta12283,self__._,self__.fn1,meta12286__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async12285.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_12287){
var self__ = this;
var _12287__$1 = this;
return self__.meta12286;
});})(___$1))
;

cljs.core.async.t_cljs$core$async12285.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12285.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async12285.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async12285.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__12275_SHARP_){
return f1.call(null,(((p1__12275_SHARP_ == null))?null:self__.f.call(null,p1__12275_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async12285.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12283","meta12283",825524963,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async12282","cljs.core.async/t_cljs$core$async12282",1202622639,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta12286","meta12286",1809019504,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async12285.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12285.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12285";

cljs.core.async.t_cljs$core$async12285.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async12285");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async12285 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async12285(f__$1,ch__$1,meta12283__$1,___$2,fn1__$1,meta12286){
return (new cljs.core.async.t_cljs$core$async12285(f__$1,ch__$1,meta12283__$1,___$2,fn1__$1,meta12286));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async12285(self__.f,self__.ch,self__.meta12283,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__6802__auto__ = ret;
if(cljs.core.truth_(and__6802__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__6802__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12282.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async12282.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12283","meta12283",825524963,null)], null);
});

cljs.core.async.t_cljs$core$async12282.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12282.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12282";

cljs.core.async.t_cljs$core$async12282.cljs$lang$ctorPrWriter = (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async12282");
});

cljs.core.async.__GT_t_cljs$core$async12282 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async12282(f__$1,ch__$1,meta12283){
return (new cljs.core.async.t_cljs$core$async12282(f__$1,ch__$1,meta12283));
});

}

return (new cljs.core.async.t_cljs$core$async12282(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async12291 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12291 = (function (f,ch,meta12292){
this.f = f;
this.ch = ch;
this.meta12292 = meta12292;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12293,meta12292__$1){
var self__ = this;
var _12293__$1 = this;
return (new cljs.core.async.t_cljs$core$async12291(self__.f,self__.ch,meta12292__$1));
});

cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12293){
var self__ = this;
var _12293__$1 = this;
return self__.meta12292;
});

cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12291.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async12291.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12292","meta12292",-1107924770,null)], null);
});

cljs.core.async.t_cljs$core$async12291.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12291.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12291";

cljs.core.async.t_cljs$core$async12291.cljs$lang$ctorPrWriter = (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async12291");
});

cljs.core.async.__GT_t_cljs$core$async12291 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async12291(f__$1,ch__$1,meta12292){
return (new cljs.core.async.t_cljs$core$async12291(f__$1,ch__$1,meta12292));
});

}

return (new cljs.core.async.t_cljs$core$async12291(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async12297 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12297 = (function (p,ch,meta12298){
this.p = p;
this.ch = ch;
this.meta12298 = meta12298;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12299,meta12298__$1){
var self__ = this;
var _12299__$1 = this;
return (new cljs.core.async.t_cljs$core$async12297(self__.p,self__.ch,meta12298__$1));
});

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12299){
var self__ = this;
var _12299__$1 = this;
return self__.meta12298;
});

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async12297.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async12297.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12298","meta12298",1865107701,null)], null);
});

cljs.core.async.t_cljs$core$async12297.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12297.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12297";

cljs.core.async.t_cljs$core$async12297.cljs$lang$ctorPrWriter = (function (this__7425__auto__,writer__7426__auto__,opt__7427__auto__){
return cljs.core._write.call(null,writer__7426__auto__,"cljs.core.async/t_cljs$core$async12297");
});

cljs.core.async.__GT_t_cljs$core$async12297 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async12297(p__$1,ch__$1,meta12298){
return (new cljs.core.async.t_cljs$core$async12297(p__$1,ch__$1,meta12298));
});

}

return (new cljs.core.async.t_cljs$core$async12297(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args12300 = [];
var len__7923__auto___12344 = arguments.length;
var i__7924__auto___12345 = (0);
while(true){
if((i__7924__auto___12345 < len__7923__auto___12344)){
args12300.push((arguments[i__7924__auto___12345]));

var G__12346 = (i__7924__auto___12345 + (1));
i__7924__auto___12345 = G__12346;
continue;
} else {
}
break;
}

var G__12302 = args12300.length;
switch (G__12302) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12300.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10042__auto___12348 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___12348,out){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___12348,out){
return (function (state_12323){
var state_val_12324 = (state_12323[(1)]);
if((state_val_12324 === (7))){
var inst_12319 = (state_12323[(2)]);
var state_12323__$1 = state_12323;
var statearr_12325_12349 = state_12323__$1;
(statearr_12325_12349[(2)] = inst_12319);

(statearr_12325_12349[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (1))){
var state_12323__$1 = state_12323;
var statearr_12326_12350 = state_12323__$1;
(statearr_12326_12350[(2)] = null);

(statearr_12326_12350[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (4))){
var inst_12305 = (state_12323[(7)]);
var inst_12305__$1 = (state_12323[(2)]);
var inst_12306 = (inst_12305__$1 == null);
var state_12323__$1 = (function (){var statearr_12327 = state_12323;
(statearr_12327[(7)] = inst_12305__$1);

return statearr_12327;
})();
if(cljs.core.truth_(inst_12306)){
var statearr_12328_12351 = state_12323__$1;
(statearr_12328_12351[(1)] = (5));

} else {
var statearr_12329_12352 = state_12323__$1;
(statearr_12329_12352[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (6))){
var inst_12305 = (state_12323[(7)]);
var inst_12310 = p.call(null,inst_12305);
var state_12323__$1 = state_12323;
if(cljs.core.truth_(inst_12310)){
var statearr_12330_12353 = state_12323__$1;
(statearr_12330_12353[(1)] = (8));

} else {
var statearr_12331_12354 = state_12323__$1;
(statearr_12331_12354[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (3))){
var inst_12321 = (state_12323[(2)]);
var state_12323__$1 = state_12323;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12323__$1,inst_12321);
} else {
if((state_val_12324 === (2))){
var state_12323__$1 = state_12323;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12323__$1,(4),ch);
} else {
if((state_val_12324 === (11))){
var inst_12313 = (state_12323[(2)]);
var state_12323__$1 = state_12323;
var statearr_12332_12355 = state_12323__$1;
(statearr_12332_12355[(2)] = inst_12313);

(statearr_12332_12355[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (9))){
var state_12323__$1 = state_12323;
var statearr_12333_12356 = state_12323__$1;
(statearr_12333_12356[(2)] = null);

(statearr_12333_12356[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (5))){
var inst_12308 = cljs.core.async.close_BANG_.call(null,out);
var state_12323__$1 = state_12323;
var statearr_12334_12357 = state_12323__$1;
(statearr_12334_12357[(2)] = inst_12308);

(statearr_12334_12357[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (10))){
var inst_12316 = (state_12323[(2)]);
var state_12323__$1 = (function (){var statearr_12335 = state_12323;
(statearr_12335[(8)] = inst_12316);

return statearr_12335;
})();
var statearr_12336_12358 = state_12323__$1;
(statearr_12336_12358[(2)] = null);

(statearr_12336_12358[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12324 === (8))){
var inst_12305 = (state_12323[(7)]);
var state_12323__$1 = state_12323;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12323__$1,(11),out,inst_12305);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___12348,out))
;
return ((function (switch__9930__auto__,c__10042__auto___12348,out){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_12340 = [null,null,null,null,null,null,null,null,null];
(statearr_12340[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_12340[(1)] = (1));

return statearr_12340;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_12323){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12323);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12341){if((e12341 instanceof Object)){
var ex__9934__auto__ = e12341;
var statearr_12342_12359 = state_12323;
(statearr_12342_12359[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12323);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12341;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12360 = state_12323;
state_12323 = G__12360;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_12323){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_12323);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___12348,out))
})();
var state__10044__auto__ = (function (){var statearr_12343 = f__10043__auto__.call(null);
(statearr_12343[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___12348);

return statearr_12343;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___12348,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args12361 = [];
var len__7923__auto___12364 = arguments.length;
var i__7924__auto___12365 = (0);
while(true){
if((i__7924__auto___12365 < len__7923__auto___12364)){
args12361.push((arguments[i__7924__auto___12365]));

var G__12366 = (i__7924__auto___12365 + (1));
i__7924__auto___12365 = G__12366;
continue;
} else {
}
break;
}

var G__12363 = args12361.length;
switch (G__12363) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12361.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__){
return (function (state_12533){
var state_val_12534 = (state_12533[(1)]);
if((state_val_12534 === (7))){
var inst_12529 = (state_12533[(2)]);
var state_12533__$1 = state_12533;
var statearr_12535_12576 = state_12533__$1;
(statearr_12535_12576[(2)] = inst_12529);

(statearr_12535_12576[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (20))){
var inst_12499 = (state_12533[(7)]);
var inst_12510 = (state_12533[(2)]);
var inst_12511 = cljs.core.next.call(null,inst_12499);
var inst_12485 = inst_12511;
var inst_12486 = null;
var inst_12487 = (0);
var inst_12488 = (0);
var state_12533__$1 = (function (){var statearr_12536 = state_12533;
(statearr_12536[(8)] = inst_12510);

(statearr_12536[(9)] = inst_12485);

(statearr_12536[(10)] = inst_12488);

(statearr_12536[(11)] = inst_12487);

(statearr_12536[(12)] = inst_12486);

return statearr_12536;
})();
var statearr_12537_12577 = state_12533__$1;
(statearr_12537_12577[(2)] = null);

(statearr_12537_12577[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (1))){
var state_12533__$1 = state_12533;
var statearr_12538_12578 = state_12533__$1;
(statearr_12538_12578[(2)] = null);

(statearr_12538_12578[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (4))){
var inst_12474 = (state_12533[(13)]);
var inst_12474__$1 = (state_12533[(2)]);
var inst_12475 = (inst_12474__$1 == null);
var state_12533__$1 = (function (){var statearr_12539 = state_12533;
(statearr_12539[(13)] = inst_12474__$1);

return statearr_12539;
})();
if(cljs.core.truth_(inst_12475)){
var statearr_12540_12579 = state_12533__$1;
(statearr_12540_12579[(1)] = (5));

} else {
var statearr_12541_12580 = state_12533__$1;
(statearr_12541_12580[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (15))){
var state_12533__$1 = state_12533;
var statearr_12545_12581 = state_12533__$1;
(statearr_12545_12581[(2)] = null);

(statearr_12545_12581[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (21))){
var state_12533__$1 = state_12533;
var statearr_12546_12582 = state_12533__$1;
(statearr_12546_12582[(2)] = null);

(statearr_12546_12582[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (13))){
var inst_12485 = (state_12533[(9)]);
var inst_12488 = (state_12533[(10)]);
var inst_12487 = (state_12533[(11)]);
var inst_12486 = (state_12533[(12)]);
var inst_12495 = (state_12533[(2)]);
var inst_12496 = (inst_12488 + (1));
var tmp12542 = inst_12485;
var tmp12543 = inst_12487;
var tmp12544 = inst_12486;
var inst_12485__$1 = tmp12542;
var inst_12486__$1 = tmp12544;
var inst_12487__$1 = tmp12543;
var inst_12488__$1 = inst_12496;
var state_12533__$1 = (function (){var statearr_12547 = state_12533;
(statearr_12547[(14)] = inst_12495);

(statearr_12547[(9)] = inst_12485__$1);

(statearr_12547[(10)] = inst_12488__$1);

(statearr_12547[(11)] = inst_12487__$1);

(statearr_12547[(12)] = inst_12486__$1);

return statearr_12547;
})();
var statearr_12548_12583 = state_12533__$1;
(statearr_12548_12583[(2)] = null);

(statearr_12548_12583[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (22))){
var state_12533__$1 = state_12533;
var statearr_12549_12584 = state_12533__$1;
(statearr_12549_12584[(2)] = null);

(statearr_12549_12584[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (6))){
var inst_12474 = (state_12533[(13)]);
var inst_12483 = f.call(null,inst_12474);
var inst_12484 = cljs.core.seq.call(null,inst_12483);
var inst_12485 = inst_12484;
var inst_12486 = null;
var inst_12487 = (0);
var inst_12488 = (0);
var state_12533__$1 = (function (){var statearr_12550 = state_12533;
(statearr_12550[(9)] = inst_12485);

(statearr_12550[(10)] = inst_12488);

(statearr_12550[(11)] = inst_12487);

(statearr_12550[(12)] = inst_12486);

return statearr_12550;
})();
var statearr_12551_12585 = state_12533__$1;
(statearr_12551_12585[(2)] = null);

(statearr_12551_12585[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (17))){
var inst_12499 = (state_12533[(7)]);
var inst_12503 = cljs.core.chunk_first.call(null,inst_12499);
var inst_12504 = cljs.core.chunk_rest.call(null,inst_12499);
var inst_12505 = cljs.core.count.call(null,inst_12503);
var inst_12485 = inst_12504;
var inst_12486 = inst_12503;
var inst_12487 = inst_12505;
var inst_12488 = (0);
var state_12533__$1 = (function (){var statearr_12552 = state_12533;
(statearr_12552[(9)] = inst_12485);

(statearr_12552[(10)] = inst_12488);

(statearr_12552[(11)] = inst_12487);

(statearr_12552[(12)] = inst_12486);

return statearr_12552;
})();
var statearr_12553_12586 = state_12533__$1;
(statearr_12553_12586[(2)] = null);

(statearr_12553_12586[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (3))){
var inst_12531 = (state_12533[(2)]);
var state_12533__$1 = state_12533;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12533__$1,inst_12531);
} else {
if((state_val_12534 === (12))){
var inst_12519 = (state_12533[(2)]);
var state_12533__$1 = state_12533;
var statearr_12554_12587 = state_12533__$1;
(statearr_12554_12587[(2)] = inst_12519);

(statearr_12554_12587[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (2))){
var state_12533__$1 = state_12533;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12533__$1,(4),in$);
} else {
if((state_val_12534 === (23))){
var inst_12527 = (state_12533[(2)]);
var state_12533__$1 = state_12533;
var statearr_12555_12588 = state_12533__$1;
(statearr_12555_12588[(2)] = inst_12527);

(statearr_12555_12588[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (19))){
var inst_12514 = (state_12533[(2)]);
var state_12533__$1 = state_12533;
var statearr_12556_12589 = state_12533__$1;
(statearr_12556_12589[(2)] = inst_12514);

(statearr_12556_12589[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (11))){
var inst_12485 = (state_12533[(9)]);
var inst_12499 = (state_12533[(7)]);
var inst_12499__$1 = cljs.core.seq.call(null,inst_12485);
var state_12533__$1 = (function (){var statearr_12557 = state_12533;
(statearr_12557[(7)] = inst_12499__$1);

return statearr_12557;
})();
if(inst_12499__$1){
var statearr_12558_12590 = state_12533__$1;
(statearr_12558_12590[(1)] = (14));

} else {
var statearr_12559_12591 = state_12533__$1;
(statearr_12559_12591[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (9))){
var inst_12521 = (state_12533[(2)]);
var inst_12522 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_12533__$1 = (function (){var statearr_12560 = state_12533;
(statearr_12560[(15)] = inst_12521);

return statearr_12560;
})();
if(cljs.core.truth_(inst_12522)){
var statearr_12561_12592 = state_12533__$1;
(statearr_12561_12592[(1)] = (21));

} else {
var statearr_12562_12593 = state_12533__$1;
(statearr_12562_12593[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (5))){
var inst_12477 = cljs.core.async.close_BANG_.call(null,out);
var state_12533__$1 = state_12533;
var statearr_12563_12594 = state_12533__$1;
(statearr_12563_12594[(2)] = inst_12477);

(statearr_12563_12594[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (14))){
var inst_12499 = (state_12533[(7)]);
var inst_12501 = cljs.core.chunked_seq_QMARK_.call(null,inst_12499);
var state_12533__$1 = state_12533;
if(inst_12501){
var statearr_12564_12595 = state_12533__$1;
(statearr_12564_12595[(1)] = (17));

} else {
var statearr_12565_12596 = state_12533__$1;
(statearr_12565_12596[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (16))){
var inst_12517 = (state_12533[(2)]);
var state_12533__$1 = state_12533;
var statearr_12566_12597 = state_12533__$1;
(statearr_12566_12597[(2)] = inst_12517);

(statearr_12566_12597[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12534 === (10))){
var inst_12488 = (state_12533[(10)]);
var inst_12486 = (state_12533[(12)]);
var inst_12493 = cljs.core._nth.call(null,inst_12486,inst_12488);
var state_12533__$1 = state_12533;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12533__$1,(13),out,inst_12493);
} else {
if((state_val_12534 === (18))){
var inst_12499 = (state_12533[(7)]);
var inst_12508 = cljs.core.first.call(null,inst_12499);
var state_12533__$1 = state_12533;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12533__$1,(20),out,inst_12508);
} else {
if((state_val_12534 === (8))){
var inst_12488 = (state_12533[(10)]);
var inst_12487 = (state_12533[(11)]);
var inst_12490 = (inst_12488 < inst_12487);
var inst_12491 = inst_12490;
var state_12533__$1 = state_12533;
if(cljs.core.truth_(inst_12491)){
var statearr_12567_12598 = state_12533__$1;
(statearr_12567_12598[(1)] = (10));

} else {
var statearr_12568_12599 = state_12533__$1;
(statearr_12568_12599[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto__))
;
return ((function (switch__9930__auto__,c__10042__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__9931__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__9931__auto____0 = (function (){
var statearr_12572 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12572[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__9931__auto__);

(statearr_12572[(1)] = (1));

return statearr_12572;
});
var cljs$core$async$mapcat_STAR__$_state_machine__9931__auto____1 = (function (state_12533){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12533);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12573){if((e12573 instanceof Object)){
var ex__9934__auto__ = e12573;
var statearr_12574_12600 = state_12533;
(statearr_12574_12600[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12533);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12573;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12601 = state_12533;
state_12533 = G__12601;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__9931__auto__ = function(state_12533){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__9931__auto____1.call(this,state_12533);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__9931__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__9931__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__))
})();
var state__10044__auto__ = (function (){var statearr_12575 = f__10043__auto__.call(null);
(statearr_12575[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_12575;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__))
);

return c__10042__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args12602 = [];
var len__7923__auto___12605 = arguments.length;
var i__7924__auto___12606 = (0);
while(true){
if((i__7924__auto___12606 < len__7923__auto___12605)){
args12602.push((arguments[i__7924__auto___12606]));

var G__12607 = (i__7924__auto___12606 + (1));
i__7924__auto___12606 = G__12607;
continue;
} else {
}
break;
}

var G__12604 = args12602.length;
switch (G__12604) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12602.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args12609 = [];
var len__7923__auto___12612 = arguments.length;
var i__7924__auto___12613 = (0);
while(true){
if((i__7924__auto___12613 < len__7923__auto___12612)){
args12609.push((arguments[i__7924__auto___12613]));

var G__12614 = (i__7924__auto___12613 + (1));
i__7924__auto___12613 = G__12614;
continue;
} else {
}
break;
}

var G__12611 = args12609.length;
switch (G__12611) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12609.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args12616 = [];
var len__7923__auto___12667 = arguments.length;
var i__7924__auto___12668 = (0);
while(true){
if((i__7924__auto___12668 < len__7923__auto___12667)){
args12616.push((arguments[i__7924__auto___12668]));

var G__12669 = (i__7924__auto___12668 + (1));
i__7924__auto___12668 = G__12669;
continue;
} else {
}
break;
}

var G__12618 = args12616.length;
switch (G__12618) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12616.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10042__auto___12671 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___12671,out){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___12671,out){
return (function (state_12642){
var state_val_12643 = (state_12642[(1)]);
if((state_val_12643 === (7))){
var inst_12637 = (state_12642[(2)]);
var state_12642__$1 = state_12642;
var statearr_12644_12672 = state_12642__$1;
(statearr_12644_12672[(2)] = inst_12637);

(statearr_12644_12672[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12643 === (1))){
var inst_12619 = null;
var state_12642__$1 = (function (){var statearr_12645 = state_12642;
(statearr_12645[(7)] = inst_12619);

return statearr_12645;
})();
var statearr_12646_12673 = state_12642__$1;
(statearr_12646_12673[(2)] = null);

(statearr_12646_12673[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12643 === (4))){
var inst_12622 = (state_12642[(8)]);
var inst_12622__$1 = (state_12642[(2)]);
var inst_12623 = (inst_12622__$1 == null);
var inst_12624 = cljs.core.not.call(null,inst_12623);
var state_12642__$1 = (function (){var statearr_12647 = state_12642;
(statearr_12647[(8)] = inst_12622__$1);

return statearr_12647;
})();
if(inst_12624){
var statearr_12648_12674 = state_12642__$1;
(statearr_12648_12674[(1)] = (5));

} else {
var statearr_12649_12675 = state_12642__$1;
(statearr_12649_12675[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12643 === (6))){
var state_12642__$1 = state_12642;
var statearr_12650_12676 = state_12642__$1;
(statearr_12650_12676[(2)] = null);

(statearr_12650_12676[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12643 === (3))){
var inst_12639 = (state_12642[(2)]);
var inst_12640 = cljs.core.async.close_BANG_.call(null,out);
var state_12642__$1 = (function (){var statearr_12651 = state_12642;
(statearr_12651[(9)] = inst_12639);

return statearr_12651;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12642__$1,inst_12640);
} else {
if((state_val_12643 === (2))){
var state_12642__$1 = state_12642;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12642__$1,(4),ch);
} else {
if((state_val_12643 === (11))){
var inst_12622 = (state_12642[(8)]);
var inst_12631 = (state_12642[(2)]);
var inst_12619 = inst_12622;
var state_12642__$1 = (function (){var statearr_12652 = state_12642;
(statearr_12652[(7)] = inst_12619);

(statearr_12652[(10)] = inst_12631);

return statearr_12652;
})();
var statearr_12653_12677 = state_12642__$1;
(statearr_12653_12677[(2)] = null);

(statearr_12653_12677[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12643 === (9))){
var inst_12622 = (state_12642[(8)]);
var state_12642__$1 = state_12642;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12642__$1,(11),out,inst_12622);
} else {
if((state_val_12643 === (5))){
var inst_12619 = (state_12642[(7)]);
var inst_12622 = (state_12642[(8)]);
var inst_12626 = cljs.core._EQ_.call(null,inst_12622,inst_12619);
var state_12642__$1 = state_12642;
if(inst_12626){
var statearr_12655_12678 = state_12642__$1;
(statearr_12655_12678[(1)] = (8));

} else {
var statearr_12656_12679 = state_12642__$1;
(statearr_12656_12679[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12643 === (10))){
var inst_12634 = (state_12642[(2)]);
var state_12642__$1 = state_12642;
var statearr_12657_12680 = state_12642__$1;
(statearr_12657_12680[(2)] = inst_12634);

(statearr_12657_12680[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12643 === (8))){
var inst_12619 = (state_12642[(7)]);
var tmp12654 = inst_12619;
var inst_12619__$1 = tmp12654;
var state_12642__$1 = (function (){var statearr_12658 = state_12642;
(statearr_12658[(7)] = inst_12619__$1);

return statearr_12658;
})();
var statearr_12659_12681 = state_12642__$1;
(statearr_12659_12681[(2)] = null);

(statearr_12659_12681[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___12671,out))
;
return ((function (switch__9930__auto__,c__10042__auto___12671,out){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_12663 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12663[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_12663[(1)] = (1));

return statearr_12663;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_12642){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12642);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12664){if((e12664 instanceof Object)){
var ex__9934__auto__ = e12664;
var statearr_12665_12682 = state_12642;
(statearr_12665_12682[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12642);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12664;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12683 = state_12642;
state_12642 = G__12683;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_12642){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_12642);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___12671,out))
})();
var state__10044__auto__ = (function (){var statearr_12666 = f__10043__auto__.call(null);
(statearr_12666[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___12671);

return statearr_12666;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___12671,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args12684 = [];
var len__7923__auto___12754 = arguments.length;
var i__7924__auto___12755 = (0);
while(true){
if((i__7924__auto___12755 < len__7923__auto___12754)){
args12684.push((arguments[i__7924__auto___12755]));

var G__12756 = (i__7924__auto___12755 + (1));
i__7924__auto___12755 = G__12756;
continue;
} else {
}
break;
}

var G__12686 = args12684.length;
switch (G__12686) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12684.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10042__auto___12758 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___12758,out){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___12758,out){
return (function (state_12724){
var state_val_12725 = (state_12724[(1)]);
if((state_val_12725 === (7))){
var inst_12720 = (state_12724[(2)]);
var state_12724__$1 = state_12724;
var statearr_12726_12759 = state_12724__$1;
(statearr_12726_12759[(2)] = inst_12720);

(statearr_12726_12759[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (1))){
var inst_12687 = (new Array(n));
var inst_12688 = inst_12687;
var inst_12689 = (0);
var state_12724__$1 = (function (){var statearr_12727 = state_12724;
(statearr_12727[(7)] = inst_12688);

(statearr_12727[(8)] = inst_12689);

return statearr_12727;
})();
var statearr_12728_12760 = state_12724__$1;
(statearr_12728_12760[(2)] = null);

(statearr_12728_12760[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (4))){
var inst_12692 = (state_12724[(9)]);
var inst_12692__$1 = (state_12724[(2)]);
var inst_12693 = (inst_12692__$1 == null);
var inst_12694 = cljs.core.not.call(null,inst_12693);
var state_12724__$1 = (function (){var statearr_12729 = state_12724;
(statearr_12729[(9)] = inst_12692__$1);

return statearr_12729;
})();
if(inst_12694){
var statearr_12730_12761 = state_12724__$1;
(statearr_12730_12761[(1)] = (5));

} else {
var statearr_12731_12762 = state_12724__$1;
(statearr_12731_12762[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (15))){
var inst_12714 = (state_12724[(2)]);
var state_12724__$1 = state_12724;
var statearr_12732_12763 = state_12724__$1;
(statearr_12732_12763[(2)] = inst_12714);

(statearr_12732_12763[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (13))){
var state_12724__$1 = state_12724;
var statearr_12733_12764 = state_12724__$1;
(statearr_12733_12764[(2)] = null);

(statearr_12733_12764[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (6))){
var inst_12689 = (state_12724[(8)]);
var inst_12710 = (inst_12689 > (0));
var state_12724__$1 = state_12724;
if(cljs.core.truth_(inst_12710)){
var statearr_12734_12765 = state_12724__$1;
(statearr_12734_12765[(1)] = (12));

} else {
var statearr_12735_12766 = state_12724__$1;
(statearr_12735_12766[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (3))){
var inst_12722 = (state_12724[(2)]);
var state_12724__$1 = state_12724;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12724__$1,inst_12722);
} else {
if((state_val_12725 === (12))){
var inst_12688 = (state_12724[(7)]);
var inst_12712 = cljs.core.vec.call(null,inst_12688);
var state_12724__$1 = state_12724;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12724__$1,(15),out,inst_12712);
} else {
if((state_val_12725 === (2))){
var state_12724__$1 = state_12724;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12724__$1,(4),ch);
} else {
if((state_val_12725 === (11))){
var inst_12704 = (state_12724[(2)]);
var inst_12705 = (new Array(n));
var inst_12688 = inst_12705;
var inst_12689 = (0);
var state_12724__$1 = (function (){var statearr_12736 = state_12724;
(statearr_12736[(7)] = inst_12688);

(statearr_12736[(8)] = inst_12689);

(statearr_12736[(10)] = inst_12704);

return statearr_12736;
})();
var statearr_12737_12767 = state_12724__$1;
(statearr_12737_12767[(2)] = null);

(statearr_12737_12767[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (9))){
var inst_12688 = (state_12724[(7)]);
var inst_12702 = cljs.core.vec.call(null,inst_12688);
var state_12724__$1 = state_12724;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12724__$1,(11),out,inst_12702);
} else {
if((state_val_12725 === (5))){
var inst_12688 = (state_12724[(7)]);
var inst_12689 = (state_12724[(8)]);
var inst_12697 = (state_12724[(11)]);
var inst_12692 = (state_12724[(9)]);
var inst_12696 = (inst_12688[inst_12689] = inst_12692);
var inst_12697__$1 = (inst_12689 + (1));
var inst_12698 = (inst_12697__$1 < n);
var state_12724__$1 = (function (){var statearr_12738 = state_12724;
(statearr_12738[(11)] = inst_12697__$1);

(statearr_12738[(12)] = inst_12696);

return statearr_12738;
})();
if(cljs.core.truth_(inst_12698)){
var statearr_12739_12768 = state_12724__$1;
(statearr_12739_12768[(1)] = (8));

} else {
var statearr_12740_12769 = state_12724__$1;
(statearr_12740_12769[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (14))){
var inst_12717 = (state_12724[(2)]);
var inst_12718 = cljs.core.async.close_BANG_.call(null,out);
var state_12724__$1 = (function (){var statearr_12742 = state_12724;
(statearr_12742[(13)] = inst_12717);

return statearr_12742;
})();
var statearr_12743_12770 = state_12724__$1;
(statearr_12743_12770[(2)] = inst_12718);

(statearr_12743_12770[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (10))){
var inst_12708 = (state_12724[(2)]);
var state_12724__$1 = state_12724;
var statearr_12744_12771 = state_12724__$1;
(statearr_12744_12771[(2)] = inst_12708);

(statearr_12744_12771[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12725 === (8))){
var inst_12688 = (state_12724[(7)]);
var inst_12697 = (state_12724[(11)]);
var tmp12741 = inst_12688;
var inst_12688__$1 = tmp12741;
var inst_12689 = inst_12697;
var state_12724__$1 = (function (){var statearr_12745 = state_12724;
(statearr_12745[(7)] = inst_12688__$1);

(statearr_12745[(8)] = inst_12689);

return statearr_12745;
})();
var statearr_12746_12772 = state_12724__$1;
(statearr_12746_12772[(2)] = null);

(statearr_12746_12772[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___12758,out))
;
return ((function (switch__9930__auto__,c__10042__auto___12758,out){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_12750 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12750[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_12750[(1)] = (1));

return statearr_12750;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_12724){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12724);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12751){if((e12751 instanceof Object)){
var ex__9934__auto__ = e12751;
var statearr_12752_12773 = state_12724;
(statearr_12752_12773[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12724);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12751;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12774 = state_12724;
state_12724 = G__12774;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_12724){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_12724);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___12758,out))
})();
var state__10044__auto__ = (function (){var statearr_12753 = f__10043__auto__.call(null);
(statearr_12753[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___12758);

return statearr_12753;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___12758,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args12775 = [];
var len__7923__auto___12849 = arguments.length;
var i__7924__auto___12850 = (0);
while(true){
if((i__7924__auto___12850 < len__7923__auto___12849)){
args12775.push((arguments[i__7924__auto___12850]));

var G__12851 = (i__7924__auto___12850 + (1));
i__7924__auto___12850 = G__12851;
continue;
} else {
}
break;
}

var G__12777 = args12775.length;
switch (G__12777) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args12775.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10042__auto___12853 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___12853,out){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___12853,out){
return (function (state_12819){
var state_val_12820 = (state_12819[(1)]);
if((state_val_12820 === (7))){
var inst_12815 = (state_12819[(2)]);
var state_12819__$1 = state_12819;
var statearr_12821_12854 = state_12819__$1;
(statearr_12821_12854[(2)] = inst_12815);

(statearr_12821_12854[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (1))){
var inst_12778 = [];
var inst_12779 = inst_12778;
var inst_12780 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_12819__$1 = (function (){var statearr_12822 = state_12819;
(statearr_12822[(7)] = inst_12779);

(statearr_12822[(8)] = inst_12780);

return statearr_12822;
})();
var statearr_12823_12855 = state_12819__$1;
(statearr_12823_12855[(2)] = null);

(statearr_12823_12855[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (4))){
var inst_12783 = (state_12819[(9)]);
var inst_12783__$1 = (state_12819[(2)]);
var inst_12784 = (inst_12783__$1 == null);
var inst_12785 = cljs.core.not.call(null,inst_12784);
var state_12819__$1 = (function (){var statearr_12824 = state_12819;
(statearr_12824[(9)] = inst_12783__$1);

return statearr_12824;
})();
if(inst_12785){
var statearr_12825_12856 = state_12819__$1;
(statearr_12825_12856[(1)] = (5));

} else {
var statearr_12826_12857 = state_12819__$1;
(statearr_12826_12857[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (15))){
var inst_12809 = (state_12819[(2)]);
var state_12819__$1 = state_12819;
var statearr_12827_12858 = state_12819__$1;
(statearr_12827_12858[(2)] = inst_12809);

(statearr_12827_12858[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (13))){
var state_12819__$1 = state_12819;
var statearr_12828_12859 = state_12819__$1;
(statearr_12828_12859[(2)] = null);

(statearr_12828_12859[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (6))){
var inst_12779 = (state_12819[(7)]);
var inst_12804 = inst_12779.length;
var inst_12805 = (inst_12804 > (0));
var state_12819__$1 = state_12819;
if(cljs.core.truth_(inst_12805)){
var statearr_12829_12860 = state_12819__$1;
(statearr_12829_12860[(1)] = (12));

} else {
var statearr_12830_12861 = state_12819__$1;
(statearr_12830_12861[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (3))){
var inst_12817 = (state_12819[(2)]);
var state_12819__$1 = state_12819;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12819__$1,inst_12817);
} else {
if((state_val_12820 === (12))){
var inst_12779 = (state_12819[(7)]);
var inst_12807 = cljs.core.vec.call(null,inst_12779);
var state_12819__$1 = state_12819;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12819__$1,(15),out,inst_12807);
} else {
if((state_val_12820 === (2))){
var state_12819__$1 = state_12819;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12819__$1,(4),ch);
} else {
if((state_val_12820 === (11))){
var inst_12787 = (state_12819[(10)]);
var inst_12783 = (state_12819[(9)]);
var inst_12797 = (state_12819[(2)]);
var inst_12798 = [];
var inst_12799 = inst_12798.push(inst_12783);
var inst_12779 = inst_12798;
var inst_12780 = inst_12787;
var state_12819__$1 = (function (){var statearr_12831 = state_12819;
(statearr_12831[(11)] = inst_12799);

(statearr_12831[(12)] = inst_12797);

(statearr_12831[(7)] = inst_12779);

(statearr_12831[(8)] = inst_12780);

return statearr_12831;
})();
var statearr_12832_12862 = state_12819__$1;
(statearr_12832_12862[(2)] = null);

(statearr_12832_12862[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (9))){
var inst_12779 = (state_12819[(7)]);
var inst_12795 = cljs.core.vec.call(null,inst_12779);
var state_12819__$1 = state_12819;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12819__$1,(11),out,inst_12795);
} else {
if((state_val_12820 === (5))){
var inst_12787 = (state_12819[(10)]);
var inst_12783 = (state_12819[(9)]);
var inst_12780 = (state_12819[(8)]);
var inst_12787__$1 = f.call(null,inst_12783);
var inst_12788 = cljs.core._EQ_.call(null,inst_12787__$1,inst_12780);
var inst_12789 = cljs.core.keyword_identical_QMARK_.call(null,inst_12780,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_12790 = (inst_12788) || (inst_12789);
var state_12819__$1 = (function (){var statearr_12833 = state_12819;
(statearr_12833[(10)] = inst_12787__$1);

return statearr_12833;
})();
if(cljs.core.truth_(inst_12790)){
var statearr_12834_12863 = state_12819__$1;
(statearr_12834_12863[(1)] = (8));

} else {
var statearr_12835_12864 = state_12819__$1;
(statearr_12835_12864[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (14))){
var inst_12812 = (state_12819[(2)]);
var inst_12813 = cljs.core.async.close_BANG_.call(null,out);
var state_12819__$1 = (function (){var statearr_12837 = state_12819;
(statearr_12837[(13)] = inst_12812);

return statearr_12837;
})();
var statearr_12838_12865 = state_12819__$1;
(statearr_12838_12865[(2)] = inst_12813);

(statearr_12838_12865[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (10))){
var inst_12802 = (state_12819[(2)]);
var state_12819__$1 = state_12819;
var statearr_12839_12866 = state_12819__$1;
(statearr_12839_12866[(2)] = inst_12802);

(statearr_12839_12866[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12820 === (8))){
var inst_12787 = (state_12819[(10)]);
var inst_12783 = (state_12819[(9)]);
var inst_12779 = (state_12819[(7)]);
var inst_12792 = inst_12779.push(inst_12783);
var tmp12836 = inst_12779;
var inst_12779__$1 = tmp12836;
var inst_12780 = inst_12787;
var state_12819__$1 = (function (){var statearr_12840 = state_12819;
(statearr_12840[(14)] = inst_12792);

(statearr_12840[(7)] = inst_12779__$1);

(statearr_12840[(8)] = inst_12780);

return statearr_12840;
})();
var statearr_12841_12867 = state_12819__$1;
(statearr_12841_12867[(2)] = null);

(statearr_12841_12867[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__10042__auto___12853,out))
;
return ((function (switch__9930__auto__,c__10042__auto___12853,out){
return (function() {
var cljs$core$async$state_machine__9931__auto__ = null;
var cljs$core$async$state_machine__9931__auto____0 = (function (){
var statearr_12845 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12845[(0)] = cljs$core$async$state_machine__9931__auto__);

(statearr_12845[(1)] = (1));

return statearr_12845;
});
var cljs$core$async$state_machine__9931__auto____1 = (function (state_12819){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_12819);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e12846){if((e12846 instanceof Object)){
var ex__9934__auto__ = e12846;
var statearr_12847_12868 = state_12819;
(statearr_12847_12868[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12819);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12846;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12869 = state_12819;
state_12819 = G__12869;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
cljs$core$async$state_machine__9931__auto__ = function(state_12819){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9931__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9931__auto____1.call(this,state_12819);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9931__auto____0;
cljs$core$async$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9931__auto____1;
return cljs$core$async$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___12853,out))
})();
var state__10044__auto__ = (function (){var statearr_12848 = f__10043__auto__.call(null);
(statearr_12848[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___12853);

return statearr_12848;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___12853,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=async.js.map