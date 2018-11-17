// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('skarbnik_front.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('cljs.nodejs');
goog.require('clojure.string');
skarbnik_front.core.fs = cljs.nodejs.require.call(null,"fs");
skarbnik_front.core.electron = cljs.nodejs.require.call(null,"electron");
skarbnik_front.core.dialog = skarbnik_front.core.electron.remote.dialog;
if(typeof skarbnik_front.core.state !== 'undefined'){
} else {
skarbnik_front.core.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),"Hello there,",new cljs.core.Keyword(null,"data","data",-232669377),""], null));
}
skarbnik_front.core.open_file = (function skarbnik_front$core$open_file(path){
return skarbnik_front.core.dialog.showOpenDialog(path);
});
skarbnik_front.core.read_file = (function skarbnik_front$core$read_file(filepath){
return skarbnik_front.core.fs.readFile(filepath,"utf-8",(function (err,data){
if(cljs.core.truth_(err)){
return cljs.core.prn.call(null,err);
} else {
return cljs.core.swap_BANG_.call(null,skarbnik_front.core.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377)], null),cljs.core.str,data);
}
}));
});
skarbnik_front.core.split = (function skarbnik_front$core$split(sep,s){
return clojure.string.split.call(null,s,sep);
});
skarbnik_front.core.lines = (function skarbnik_front$core$lines(sep,contents){
return cljs.core.map.call(null,cljs.core.partial.call(null,skarbnik_front.core.split,sep),skarbnik_front.core.split.call(null,/\n/,contents));
});
skarbnik_front.core.str__GT_keys = (function skarbnik_front$core$str__GT_keys(s){
return cljs.core.keyword.call(null,clojure.string.join.call(null,clojure.string.split.call(null,s,/\s/)));
});
skarbnik_front.core.maps = (function skarbnik_front$core$maps(sep,contents){
var lines = skarbnik_front.core.lines.call(null,sep,contents);
var cols_ = cljs.core.first.call(null,lines);
var cols = cljs.core.map.call(null,skarbnik_front.core.str__GT_keys,cols_);
var rows = cljs.core.rest.call(null,lines);
return cljs.core.map.call(null,cljs.core.partial.call(null,cljs.core.zipmap,cols),rows);
});
skarbnik_front.core.root_component = (function skarbnik_front$core$root_component(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"main","main",-2117802661),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,skarbnik_front.core.state))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__26280__auto__ = (function skarbnik_front$core$root_component_$_iter__28511(s__28512){
return (new cljs.core.LazySeq(null,(function (){
var s__28512__$1 = s__28512;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__28512__$1);
if(temp__4657__auto__){
var s__28512__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__28512__$2)){
var c__26278__auto__ = cljs.core.chunk_first.call(null,s__28512__$2);
var size__26279__auto__ = cljs.core.count.call(null,c__26278__auto__);
var b__28514 = cljs.core.chunk_buffer.call(null,size__26279__auto__);
if((function (){var i__28513 = (0);
while(true){
if((i__28513 < size__26279__auto__)){
var th = cljs.core._nth.call(null,c__26278__auto__,i__28513);
cljs.core.chunk_append.call(null,b__28514,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),th], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),th], null)));

var G__28519 = (i__28513 + (1));
i__28513 = G__28519;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__28514),skarbnik_front$core$root_component_$_iter__28511.call(null,cljs.core.chunk_rest.call(null,s__28512__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__28514),null);
}
} else {
var th = cljs.core.first.call(null,s__28512__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),th], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),th], null)),skarbnik_front$core$root_component_$_iter__28511.call(null,cljs.core.rest.call(null,s__28512__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__26280__auto__.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Trans.Date","Post.Date","Description","Amount","Category"], null));
})()], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__26280__auto__ = (function skarbnik_front$core$root_component_$_iter__28515(s__28516){
return (new cljs.core.LazySeq(null,(function (){
var s__28516__$1 = s__28516;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__28516__$1);
if(temp__4657__auto__){
var s__28516__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__28516__$2)){
var c__26278__auto__ = cljs.core.chunk_first.call(null,s__28516__$2);
var size__26279__auto__ = cljs.core.count.call(null,c__26278__auto__);
var b__28518 = cljs.core.chunk_buffer.call(null,size__26279__auto__);
if((function (){var i__28517 = (0);
while(true){
if((i__28517 < size__26279__auto__)){
var entry = cljs.core._nth.call(null,c__26278__auto__,i__28517);
cljs.core.chunk_append.call(null,b__28518,cljs.core.with_meta(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Trans.Date","Trans.Date",-1522333359).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"PostDate","PostDate",-876223797).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Description","Description",-679315496).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Amount","Amount",-1417484681).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Category","Category",-250769744).cljs$core$IFn$_invoke$arity$1(entry)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"Trans.Date","Trans.Date",-1522333359).cljs$core$IFn$_invoke$arity$1(entry)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("-"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"Amount","Amount",-1417484681).cljs$core$IFn$_invoke$arity$1(entry))].join('')], null)));

var G__28520 = (i__28517 + (1));
i__28517 = G__28520;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__28518),skarbnik_front$core$root_component_$_iter__28515.call(null,cljs.core.chunk_rest.call(null,s__28516__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__28518),null);
}
} else {
var entry = cljs.core.first.call(null,s__28516__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Trans.Date","Trans.Date",-1522333359).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"PostDate","PostDate",-876223797).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Description","Description",-679315496).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Amount","Amount",-1417484681).cljs$core$IFn$_invoke$arity$1(entry)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"Category","Category",-250769744).cljs$core$IFn$_invoke$arity$1(entry)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"Trans.Date","Trans.Date",-1522333359).cljs$core$IFn$_invoke$arity$1(entry)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("-"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"Amount","Amount",-1417484681).cljs$core$IFn$_invoke$arity$1(entry))].join('')], null)),skarbnik_front$core$root_component_$_iter__28515.call(null,cljs.core.rest.call(null,s__28516__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__26280__auto__.call(null,skarbnik_front.core.maps.call(null,/,/,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,skarbnik_front.core.state))));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return skarbnik_front.core.open_file.call(null,(function (file_names){
if(cljs.core._EQ_.call(null,file_names,null)){
return cljs.core.prn.call(null,"no file selected");
} else {
return skarbnik_front.core.read_file.call(null,cljs.core.first.call(null,file_names));
}
}));
})], null),"Open file"], null)], null);
});
skarbnik_front.core.mount_root = (function skarbnik_front$core$mount_root(setting){
return reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [skarbnik_front.core.root_component], null),document.getElementById("app"));
});
skarbnik_front.core.init_BANG_ = (function skarbnik_front$core$init_BANG_(setting){
return skarbnik_front.core.mount_root.call(null,setting);
});

//# sourceMappingURL=core.js.map