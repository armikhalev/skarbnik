// Compiled by ClojureScript 1.9.473 {:static-fns true, :optimize-constants true, :elide-asserts true}
goog.provide('skarbnik_front.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
goog.require('cljs.nodejs');
skarbnik_front.core.electron = (cljs.nodejs.require.cljs$core$IFn$_invoke$arity$1 ? cljs.nodejs.require.cljs$core$IFn$_invoke$arity$1("electron") : cljs.nodejs.require.call(null,"electron"));
skarbnik_front.core.dialog = skarbnik_front.core.electron.shell;
if(typeof skarbnik_front.core.state !== 'undefined'){
} else {
skarbnik_front.core.state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$message,"Hello there,"], null));
}
skarbnik_front.core.open_file = (function skarbnik_front$core$open_file(path){
return skarbnik_front.core.dialog.openItem(path);
});
skarbnik_front.core.root_component = (function skarbnik_front$core$root_component(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$main,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h1,cljs.core.cst$kw$message.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(skarbnik_front.core.state) : cljs.core.deref.call(null,skarbnik_front.core.state)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"we run with figwheel!"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (){
return skarbnik_front.core.open_file(".");
})], null),"Open file"], null)], null);
});
skarbnik_front.core.mount_root = (function skarbnik_front$core$mount_root(setting){
return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [skarbnik_front.core.root_component], null),document.getElementById("app"));
});
skarbnik_front.core.init_BANG_ = (function skarbnik_front$core$init_BANG_(setting){
return skarbnik_front.core.mount_root(setting);
});
