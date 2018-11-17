// Compiled by ClojureScript 1.9.473 {:static-fns true, :optimize-constants true, :elide-asserts true}
goog.provide('reagent.debug');
goog.require('cljs.core');
goog.require('cljs.core.constants');
reagent.debug.has_console = typeof console !== 'undefined';
reagent.debug.tracking = false;
if(typeof reagent.debug.warnings !== 'undefined'){
} else {
reagent.debug.warnings = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
}
if(typeof reagent.debug.track_console !== 'undefined'){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__9843__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__9843 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9844__i = 0, G__9844__a = new Array(arguments.length -  0);
while (G__9844__i < G__9844__a.length) {G__9844__a[G__9844__i] = arguments[G__9844__i + 0]; ++G__9844__i;}
  args = new cljs.core.IndexedSeq(G__9844__a,0);
} 
return G__9843__delegate.call(this,args);};
G__9843.cljs$lang$maxFixedArity = 0;
G__9843.cljs$lang$applyTo = (function (arglist__9845){
var args = cljs.core.seq(arglist__9845);
return G__9843__delegate(args);
});
G__9843.cljs$core$IFn$_invoke$arity$variadic = G__9843__delegate;
return G__9843;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__9846__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__9846 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9847__i = 0, G__9847__a = new Array(arguments.length -  0);
while (G__9847__i < G__9847__a.length) {G__9847__a[G__9847__i] = arguments[G__9847__i + 0]; ++G__9847__i;}
  args = new cljs.core.IndexedSeq(G__9847__a,0);
} 
return G__9846__delegate.call(this,args);};
G__9846.cljs$lang$maxFixedArity = 0;
G__9846.cljs$lang$applyTo = (function (arglist__9848){
var args = cljs.core.seq(arglist__9848);
return G__9846__delegate(args);
});
G__9846.cljs$core$IFn$_invoke$arity$variadic = G__9846__delegate;
return G__9846;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.debug.warnings,null) : cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null));

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(reagent.debug.warnings) : cljs.core.deref.call(null,reagent.debug.warnings));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.debug.warnings,null) : cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null));

reagent.debug.tracking = false;

return warns;
});
