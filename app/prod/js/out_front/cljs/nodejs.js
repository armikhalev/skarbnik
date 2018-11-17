// Compiled by ClojureScript 1.9.473 {:static-fns true, :optimize-constants true, :elide-asserts true}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
goog.require('cljs.core.constants');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10224__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(args));
};
var G__10224 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10225__i = 0, G__10225__a = new Array(arguments.length -  0);
while (G__10225__i < G__10225__a.length) {G__10225__a[G__10225__i] = arguments[G__10225__i + 0]; ++G__10225__i;}
  args = new cljs.core.IndexedSeq(G__10225__a,0);
} 
return G__10224__delegate.call(this,args);};
G__10224.cljs$lang$maxFixedArity = 0;
G__10224.cljs$lang$applyTo = (function (arglist__10226){
var args = cljs.core.seq(arglist__10226);
return G__10224__delegate(args);
});
G__10224.cljs$core$IFn$_invoke$arity$variadic = G__10224__delegate;
return G__10224;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10227__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(args));
};
var G__10227 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10228__i = 0, G__10228__a = new Array(arguments.length -  0);
while (G__10228__i < G__10228__a.length) {G__10228__a[G__10228__i] = arguments[G__10228__i + 0]; ++G__10228__i;}
  args = new cljs.core.IndexedSeq(G__10228__a,0);
} 
return G__10227__delegate.call(this,args);};
G__10227.cljs$lang$maxFixedArity = 0;
G__10227.cljs$lang$applyTo = (function (arglist__10229){
var args = cljs.core.seq(arglist__10229);
return G__10227__delegate(args);
});
G__10227.cljs$core$IFn$_invoke$arity$variadic = G__10227__delegate;
return G__10227;
})()
;

return null;
});
