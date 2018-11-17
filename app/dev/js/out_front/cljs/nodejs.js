// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__28216__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__28216 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28217__i = 0, G__28217__a = new Array(arguments.length -  0);
while (G__28217__i < G__28217__a.length) {G__28217__a[G__28217__i] = arguments[G__28217__i + 0]; ++G__28217__i;}
  args = new cljs.core.IndexedSeq(G__28217__a,0);
} 
return G__28216__delegate.call(this,args);};
G__28216.cljs$lang$maxFixedArity = 0;
G__28216.cljs$lang$applyTo = (function (arglist__28218){
var args = cljs.core.seq(arglist__28218);
return G__28216__delegate(args);
});
G__28216.cljs$core$IFn$_invoke$arity$variadic = G__28216__delegate;
return G__28216;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__28219__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__28219 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28220__i = 0, G__28220__a = new Array(arguments.length -  0);
while (G__28220__i < G__28220__a.length) {G__28220__a[G__28220__i] = arguments[G__28220__i + 0]; ++G__28220__i;}
  args = new cljs.core.IndexedSeq(G__28220__a,0);
} 
return G__28219__delegate.call(this,args);};
G__28219.cljs$lang$maxFixedArity = 0;
G__28219.cljs$lang$applyTo = (function (arglist__28221){
var args = cljs.core.seq(arglist__28221);
return G__28219__delegate(args);
});
G__28219.cljs$core$IFn$_invoke$arity$variadic = G__28219__delegate;
return G__28219;
})()
;

return null;
});

//# sourceMappingURL=nodejs.js.map