// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('figwheel.client.utils');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.object');
goog.require('goog.net.jsloader');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.core.async');
goog.require('goog.async.Deferred');
if(typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined'){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.on_cssload_custom_event = (function figwheel$client$file_reloading$on_cssload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.css-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__6814__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string')) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__6814__auto__){
return or__6814__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return (goog.dependencies_.nameToPath[ns]);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return (goog.dependencies_.written[figwheel.client.file_reloading.name__GT_path.call(null,ns)]);
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__6814__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, ["svgpan.SvgPan",null,"far.out",null,"testDep.bar",null,"someprotopackage.TestPackageTypes",null,"goog",null,"an.existing.path",null,"cljs.core",null,"ns",null,"dup.base",null], null), null).call(null,name);
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return cljs.core.some.call(null,cljs.core.partial.call(null,goog.string.startsWith,name),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["goog.","cljs.","clojure.","fake.","proto2."], null));
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__14684_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__14684_SHARP_));
}),goog.object.getKeys((goog.dependencies_.requires[figwheel.client.file_reloading.name__GT_path.call(null,ns)]))));
});
if(typeof figwheel.client.file_reloading.dependency_data !== 'undefined'){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([name], true));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([parent_ns], true));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__14689 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__14690 = null;
var count__14691 = (0);
var i__14692 = (0);
while(true){
if((i__14692 < count__14691)){
var n = cljs.core._nth.call(null,chunk__14690,i__14692);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__14693 = seq__14689;
var G__14694 = chunk__14690;
var G__14695 = count__14691;
var G__14696 = (i__14692 + (1));
seq__14689 = G__14693;
chunk__14690 = G__14694;
count__14691 = G__14695;
i__14692 = G__14696;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14689);
if(temp__4657__auto__){
var seq__14689__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14689__$1)){
var c__7633__auto__ = cljs.core.chunk_first.call(null,seq__14689__$1);
var G__14697 = cljs.core.chunk_rest.call(null,seq__14689__$1);
var G__14698 = c__7633__auto__;
var G__14699 = cljs.core.count.call(null,c__7633__auto__);
var G__14700 = (0);
seq__14689 = G__14697;
chunk__14690 = G__14698;
count__14691 = G__14699;
i__14692 = G__14700;
continue;
} else {
var n = cljs.core.first.call(null,seq__14689__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__14701 = cljs.core.next.call(null,seq__14689__$1);
var G__14702 = null;
var G__14703 = (0);
var G__14704 = (0);
seq__14689 = G__14701;
chunk__14690 = G__14702;
count__14691 = G__14703;
i__14692 = G__14704;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__14755_14766 = cljs.core.seq.call(null,deps);
var chunk__14756_14767 = null;
var count__14757_14768 = (0);
var i__14758_14769 = (0);
while(true){
if((i__14758_14769 < count__14757_14768)){
var dep_14770 = cljs.core._nth.call(null,chunk__14756_14767,i__14758_14769);
topo_sort_helper_STAR_.call(null,dep_14770,(depth + (1)),state);

var G__14771 = seq__14755_14766;
var G__14772 = chunk__14756_14767;
var G__14773 = count__14757_14768;
var G__14774 = (i__14758_14769 + (1));
seq__14755_14766 = G__14771;
chunk__14756_14767 = G__14772;
count__14757_14768 = G__14773;
i__14758_14769 = G__14774;
continue;
} else {
var temp__4657__auto___14775 = cljs.core.seq.call(null,seq__14755_14766);
if(temp__4657__auto___14775){
var seq__14755_14776__$1 = temp__4657__auto___14775;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14755_14776__$1)){
var c__7633__auto___14777 = cljs.core.chunk_first.call(null,seq__14755_14776__$1);
var G__14778 = cljs.core.chunk_rest.call(null,seq__14755_14776__$1);
var G__14779 = c__7633__auto___14777;
var G__14780 = cljs.core.count.call(null,c__7633__auto___14777);
var G__14781 = (0);
seq__14755_14766 = G__14778;
chunk__14756_14767 = G__14779;
count__14757_14768 = G__14780;
i__14758_14769 = G__14781;
continue;
} else {
var dep_14782 = cljs.core.first.call(null,seq__14755_14776__$1);
topo_sort_helper_STAR_.call(null,dep_14782,(depth + (1)),state);

var G__14783 = cljs.core.next.call(null,seq__14755_14776__$1);
var G__14784 = null;
var G__14785 = (0);
var G__14786 = (0);
seq__14755_14766 = G__14783;
chunk__14756_14767 = G__14784;
count__14757_14768 = G__14785;
i__14758_14769 = G__14786;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__14759){
var vec__14763 = p__14759;
var seq__14764 = cljs.core.seq.call(null,vec__14763);
var first__14765 = cljs.core.first.call(null,seq__14764);
var seq__14764__$1 = cljs.core.next.call(null,seq__14764);
var x = first__14765;
var xs = seq__14764__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__14763,seq__14764,first__14765,seq__14764__$1,x,xs,get_deps__$1){
return (function (p1__14705_SHARP_){
return clojure.set.difference.call(null,p1__14705_SHARP_,x);
});})(vec__14763,seq__14764,first__14765,seq__14764__$1,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__14799 = cljs.core.seq.call(null,provides);
var chunk__14800 = null;
var count__14801 = (0);
var i__14802 = (0);
while(true){
if((i__14802 < count__14801)){
var prov = cljs.core._nth.call(null,chunk__14800,i__14802);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__14803_14811 = cljs.core.seq.call(null,requires);
var chunk__14804_14812 = null;
var count__14805_14813 = (0);
var i__14806_14814 = (0);
while(true){
if((i__14806_14814 < count__14805_14813)){
var req_14815 = cljs.core._nth.call(null,chunk__14804_14812,i__14806_14814);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_14815,prov);

var G__14816 = seq__14803_14811;
var G__14817 = chunk__14804_14812;
var G__14818 = count__14805_14813;
var G__14819 = (i__14806_14814 + (1));
seq__14803_14811 = G__14816;
chunk__14804_14812 = G__14817;
count__14805_14813 = G__14818;
i__14806_14814 = G__14819;
continue;
} else {
var temp__4657__auto___14820 = cljs.core.seq.call(null,seq__14803_14811);
if(temp__4657__auto___14820){
var seq__14803_14821__$1 = temp__4657__auto___14820;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14803_14821__$1)){
var c__7633__auto___14822 = cljs.core.chunk_first.call(null,seq__14803_14821__$1);
var G__14823 = cljs.core.chunk_rest.call(null,seq__14803_14821__$1);
var G__14824 = c__7633__auto___14822;
var G__14825 = cljs.core.count.call(null,c__7633__auto___14822);
var G__14826 = (0);
seq__14803_14811 = G__14823;
chunk__14804_14812 = G__14824;
count__14805_14813 = G__14825;
i__14806_14814 = G__14826;
continue;
} else {
var req_14827 = cljs.core.first.call(null,seq__14803_14821__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_14827,prov);

var G__14828 = cljs.core.next.call(null,seq__14803_14821__$1);
var G__14829 = null;
var G__14830 = (0);
var G__14831 = (0);
seq__14803_14811 = G__14828;
chunk__14804_14812 = G__14829;
count__14805_14813 = G__14830;
i__14806_14814 = G__14831;
continue;
}
} else {
}
}
break;
}

var G__14832 = seq__14799;
var G__14833 = chunk__14800;
var G__14834 = count__14801;
var G__14835 = (i__14802 + (1));
seq__14799 = G__14832;
chunk__14800 = G__14833;
count__14801 = G__14834;
i__14802 = G__14835;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14799);
if(temp__4657__auto__){
var seq__14799__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14799__$1)){
var c__7633__auto__ = cljs.core.chunk_first.call(null,seq__14799__$1);
var G__14836 = cljs.core.chunk_rest.call(null,seq__14799__$1);
var G__14837 = c__7633__auto__;
var G__14838 = cljs.core.count.call(null,c__7633__auto__);
var G__14839 = (0);
seq__14799 = G__14836;
chunk__14800 = G__14837;
count__14801 = G__14838;
i__14802 = G__14839;
continue;
} else {
var prov = cljs.core.first.call(null,seq__14799__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__14807_14840 = cljs.core.seq.call(null,requires);
var chunk__14808_14841 = null;
var count__14809_14842 = (0);
var i__14810_14843 = (0);
while(true){
if((i__14810_14843 < count__14809_14842)){
var req_14844 = cljs.core._nth.call(null,chunk__14808_14841,i__14810_14843);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_14844,prov);

var G__14845 = seq__14807_14840;
var G__14846 = chunk__14808_14841;
var G__14847 = count__14809_14842;
var G__14848 = (i__14810_14843 + (1));
seq__14807_14840 = G__14845;
chunk__14808_14841 = G__14846;
count__14809_14842 = G__14847;
i__14810_14843 = G__14848;
continue;
} else {
var temp__4657__auto___14849__$1 = cljs.core.seq.call(null,seq__14807_14840);
if(temp__4657__auto___14849__$1){
var seq__14807_14850__$1 = temp__4657__auto___14849__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14807_14850__$1)){
var c__7633__auto___14851 = cljs.core.chunk_first.call(null,seq__14807_14850__$1);
var G__14852 = cljs.core.chunk_rest.call(null,seq__14807_14850__$1);
var G__14853 = c__7633__auto___14851;
var G__14854 = cljs.core.count.call(null,c__7633__auto___14851);
var G__14855 = (0);
seq__14807_14840 = G__14852;
chunk__14808_14841 = G__14853;
count__14809_14842 = G__14854;
i__14810_14843 = G__14855;
continue;
} else {
var req_14856 = cljs.core.first.call(null,seq__14807_14850__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_14856,prov);

var G__14857 = cljs.core.next.call(null,seq__14807_14850__$1);
var G__14858 = null;
var G__14859 = (0);
var G__14860 = (0);
seq__14807_14840 = G__14857;
chunk__14808_14841 = G__14858;
count__14809_14842 = G__14859;
i__14810_14843 = G__14860;
continue;
}
} else {
}
}
break;
}

var G__14861 = cljs.core.next.call(null,seq__14799__$1);
var G__14862 = null;
var G__14863 = (0);
var G__14864 = (0);
seq__14799 = G__14861;
chunk__14800 = G__14862;
count__14801 = G__14863;
i__14802 = G__14864;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel.client.file_reloading.figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__14869_14873 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__14870_14874 = null;
var count__14871_14875 = (0);
var i__14872_14876 = (0);
while(true){
if((i__14872_14876 < count__14871_14875)){
var ns_14877 = cljs.core._nth.call(null,chunk__14870_14874,i__14872_14876);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_14877);

var G__14878 = seq__14869_14873;
var G__14879 = chunk__14870_14874;
var G__14880 = count__14871_14875;
var G__14881 = (i__14872_14876 + (1));
seq__14869_14873 = G__14878;
chunk__14870_14874 = G__14879;
count__14871_14875 = G__14880;
i__14872_14876 = G__14881;
continue;
} else {
var temp__4657__auto___14882 = cljs.core.seq.call(null,seq__14869_14873);
if(temp__4657__auto___14882){
var seq__14869_14883__$1 = temp__4657__auto___14882;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14869_14883__$1)){
var c__7633__auto___14884 = cljs.core.chunk_first.call(null,seq__14869_14883__$1);
var G__14885 = cljs.core.chunk_rest.call(null,seq__14869_14883__$1);
var G__14886 = c__7633__auto___14884;
var G__14887 = cljs.core.count.call(null,c__7633__auto___14884);
var G__14888 = (0);
seq__14869_14873 = G__14885;
chunk__14870_14874 = G__14886;
count__14871_14875 = G__14887;
i__14872_14876 = G__14888;
continue;
} else {
var ns_14889 = cljs.core.first.call(null,seq__14869_14883__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_14889);

var G__14890 = cljs.core.next.call(null,seq__14869_14883__$1);
var G__14891 = null;
var G__14892 = (0);
var G__14893 = (0);
seq__14869_14873 = G__14890;
chunk__14870_14874 = G__14891;
count__14871_14875 = G__14892;
i__14872_14876 = G__14893;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__6814__auto__ = goog.require__;
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__14894__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__14894 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14895__i = 0, G__14895__a = new Array(arguments.length -  0);
while (G__14895__i < G__14895__a.length) {G__14895__a[G__14895__i] = arguments[G__14895__i + 0]; ++G__14895__i;}
  args = new cljs.core.IndexedSeq(G__14895__a,0);
} 
return G__14894__delegate.call(this,args);};
G__14894.cljs$lang$maxFixedArity = 0;
G__14894.cljs$lang$applyTo = (function (arglist__14896){
var args = cljs.core.seq(arglist__14896);
return G__14894__delegate(args);
});
G__14894.cljs$core$IFn$_invoke$arity$variadic = G__14894__delegate;
return G__14894;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if(typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined'){
return null;
} else {
return (
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
)
;
}
});
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__14897 = cljs.core._EQ_;
var expr__14898 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__14897.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__14898))){
var node_path_lib = require("path");
var util_pattern = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.sep),cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.join("goog","bootstrap","nodejs.js"))].join('');
var util_path = goog.object.findKey(require.cache,((function (node_path_lib,util_pattern,pred__14897,expr__14898){
return (function (v,k,o){
return goog.string.endsWith(k,util_pattern);
});})(node_path_lib,util_pattern,pred__14897,expr__14898))
);
var parts = cljs.core.pop.call(null,cljs.core.pop.call(null,clojure.string.split.call(null,util_path,/[\/\\]/)));
var root_path = clojure.string.join.call(null,node_path_lib.sep,parts);
return ((function (node_path_lib,util_pattern,util_path,parts,root_path,pred__14897,expr__14898){
return (function (request_url,callback){

var cache_path = node_path_lib.resolve(root_path,request_url);
goog.object.remove(require.cache,cache_path);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e14900){if((e14900 instanceof Error)){
var e = e14900;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Error loading file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e14900;

}
}})());
});
;})(node_path_lib,util_pattern,util_path,parts,root_path,pred__14897,expr__14898))
} else {
if(cljs.core.truth_(pred__14897.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__14898))){
return ((function (pred__14897,expr__14898){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),({"cleanupWhenDone": true}));
deferred.addCallback(((function (deferred,pred__14897,expr__14898){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__14897,expr__14898))
);

return deferred.addErrback(((function (deferred,pred__14897,expr__14898){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__14897,expr__14898))
);
});
;})(pred__14897,expr__14898))
} else {
if(cljs.core.truth_(pred__14897.call(null,new cljs.core.Keyword(null,"worker","worker",938239996),expr__14898))){
return ((function (pred__14897,expr__14898){
return (function (request_url,callback){

return callback.call(null,(function (){try{self.importScripts(figwheel.client.file_reloading.add_cache_buster.call(null,request_url));

return true;
}catch (e14901){if((e14901 instanceof Error)){
var e = e14901;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Error loading file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e14901;

}
}})());
});
;})(pred__14897,expr__14898))
} else {
return ((function (pred__14897,expr__14898){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__14897,expr__14898))
}
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__14902,callback){
var map__14905 = p__14902;
var map__14905__$1 = ((((!((map__14905 == null)))?((((map__14905.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14905.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14905):map__14905);
var file_msg = map__14905__$1;
var request_url = cljs.core.get.call(null,map__14905__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("FigWheel: Attempting to load "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__14905,map__14905__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("FigWheel: Successfully loaded "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Error loading file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__14905,map__14905__$1,file_msg,request_url))
);
});
if(typeof figwheel.client.file_reloading.reload_chan !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if(typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined'){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if(typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined'){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if(typeof figwheel.client.file_reloading.reloader_loop !== 'undefined'){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__){
return (function (state_14929){
var state_val_14930 = (state_14929[(1)]);
if((state_val_14930 === (7))){
var inst_14925 = (state_14929[(2)]);
var state_14929__$1 = state_14929;
var statearr_14931_14951 = state_14929__$1;
(statearr_14931_14951[(2)] = inst_14925);

(statearr_14931_14951[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14930 === (1))){
var state_14929__$1 = state_14929;
var statearr_14932_14952 = state_14929__$1;
(statearr_14932_14952[(2)] = null);

(statearr_14932_14952[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14930 === (4))){
var inst_14909 = (state_14929[(7)]);
var inst_14909__$1 = (state_14929[(2)]);
var state_14929__$1 = (function (){var statearr_14933 = state_14929;
(statearr_14933[(7)] = inst_14909__$1);

return statearr_14933;
})();
if(cljs.core.truth_(inst_14909__$1)){
var statearr_14934_14953 = state_14929__$1;
(statearr_14934_14953[(1)] = (5));

} else {
var statearr_14935_14954 = state_14929__$1;
(statearr_14935_14954[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14930 === (6))){
var state_14929__$1 = state_14929;
var statearr_14936_14955 = state_14929__$1;
(statearr_14936_14955[(2)] = null);

(statearr_14936_14955[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14930 === (3))){
var inst_14927 = (state_14929[(2)]);
var state_14929__$1 = state_14929;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14929__$1,inst_14927);
} else {
if((state_val_14930 === (2))){
var state_14929__$1 = state_14929;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14929__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_14930 === (11))){
var inst_14921 = (state_14929[(2)]);
var state_14929__$1 = (function (){var statearr_14937 = state_14929;
(statearr_14937[(8)] = inst_14921);

return statearr_14937;
})();
var statearr_14938_14956 = state_14929__$1;
(statearr_14938_14956[(2)] = null);

(statearr_14938_14956[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14930 === (9))){
var inst_14913 = (state_14929[(9)]);
var inst_14915 = (state_14929[(10)]);
var inst_14917 = inst_14915.call(null,inst_14913);
var state_14929__$1 = state_14929;
var statearr_14939_14957 = state_14929__$1;
(statearr_14939_14957[(2)] = inst_14917);

(statearr_14939_14957[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14930 === (5))){
var inst_14909 = (state_14929[(7)]);
var inst_14911 = figwheel.client.file_reloading.blocking_load.call(null,inst_14909);
var state_14929__$1 = state_14929;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14929__$1,(8),inst_14911);
} else {
if((state_val_14930 === (10))){
var inst_14913 = (state_14929[(9)]);
var inst_14919 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_14913);
var state_14929__$1 = state_14929;
var statearr_14940_14958 = state_14929__$1;
(statearr_14940_14958[(2)] = inst_14919);

(statearr_14940_14958[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14930 === (8))){
var inst_14915 = (state_14929[(10)]);
var inst_14909 = (state_14929[(7)]);
var inst_14913 = (state_14929[(2)]);
var inst_14914 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_14915__$1 = cljs.core.get.call(null,inst_14914,inst_14909);
var state_14929__$1 = (function (){var statearr_14941 = state_14929;
(statearr_14941[(9)] = inst_14913);

(statearr_14941[(10)] = inst_14915__$1);

return statearr_14941;
})();
if(cljs.core.truth_(inst_14915__$1)){
var statearr_14942_14959 = state_14929__$1;
(statearr_14942_14959[(1)] = (9));

} else {
var statearr_14943_14960 = state_14929__$1;
(statearr_14943_14960[(1)] = (10));

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
});})(c__10042__auto__))
;
return ((function (switch__9930__auto__,c__10042__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__9931__auto__ = null;
var figwheel$client$file_reloading$state_machine__9931__auto____0 = (function (){
var statearr_14947 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_14947[(0)] = figwheel$client$file_reloading$state_machine__9931__auto__);

(statearr_14947[(1)] = (1));

return statearr_14947;
});
var figwheel$client$file_reloading$state_machine__9931__auto____1 = (function (state_14929){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_14929);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e14948){if((e14948 instanceof Object)){
var ex__9934__auto__ = e14948;
var statearr_14949_14961 = state_14929;
(statearr_14949_14961[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14929);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14948;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__14962 = state_14929;
state_14929 = G__14962;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__9931__auto__ = function(state_14929){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__9931__auto____1.call(this,state_14929);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__9931__auto____0;
figwheel$client$file_reloading$state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__9931__auto____1;
return figwheel$client$file_reloading$state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__))
})();
var state__10044__auto__ = (function (){var statearr_14950 = f__10043__auto__.call(null);
(statearr_14950[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_14950;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__))
);

return c__10042__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__14963,callback){
var map__14966 = p__14963;
var map__14966__$1 = ((((!((map__14966 == null)))?((((map__14966.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14966.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14966):map__14966);
var file_msg = map__14966__$1;
var namespace = cljs.core.get.call(null,map__14966__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__14966,map__14966__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__14966,map__14966__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.figwheel_no_load_QMARK_ = (function figwheel$client$file_reloading$figwheel_no_load_QMARK_(p__14968){
var map__14971 = p__14968;
var map__14971__$1 = ((((!((map__14971 == null)))?((((map__14971.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14971.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14971):map__14971);
var file_msg = map__14971__$1;
var namespace = cljs.core.get.call(null,map__14971__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__14973){
var map__14976 = p__14973;
var map__14976__$1 = ((((!((map__14976 == null)))?((((map__14976.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14976.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14976):map__14976);
var file_msg = map__14976__$1;
var namespace = cljs.core.get.call(null,map__14976__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__6802__auto__ = cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,file_msg));
if(and__6802__auto__){
var or__6814__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
var or__6814__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__6814__auto____$1)){
return or__6814__auto____$1;
} else {
return figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
}
}
} else {
return and__6802__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__14978,callback){
var map__14981 = p__14978;
var map__14981__$1 = ((((!((map__14981 == null)))?((((map__14981.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14981.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14981):map__14981);
var file_msg = map__14981__$1;
var request_url = cljs.core.get.call(null,map__14981__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__14981__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Not trying to load file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__10042__auto___15085 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___15085,out){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___15085,out){
return (function (state_15067){
var state_val_15068 = (state_15067[(1)]);
if((state_val_15068 === (1))){
var inst_15041 = cljs.core.seq.call(null,files);
var inst_15042 = cljs.core.first.call(null,inst_15041);
var inst_15043 = cljs.core.next.call(null,inst_15041);
var inst_15044 = files;
var state_15067__$1 = (function (){var statearr_15069 = state_15067;
(statearr_15069[(7)] = inst_15042);

(statearr_15069[(8)] = inst_15044);

(statearr_15069[(9)] = inst_15043);

return statearr_15069;
})();
var statearr_15070_15086 = state_15067__$1;
(statearr_15070_15086[(2)] = null);

(statearr_15070_15086[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15068 === (2))){
var inst_15050 = (state_15067[(10)]);
var inst_15044 = (state_15067[(8)]);
var inst_15049 = cljs.core.seq.call(null,inst_15044);
var inst_15050__$1 = cljs.core.first.call(null,inst_15049);
var inst_15051 = cljs.core.next.call(null,inst_15049);
var inst_15052 = (inst_15050__$1 == null);
var inst_15053 = cljs.core.not.call(null,inst_15052);
var state_15067__$1 = (function (){var statearr_15071 = state_15067;
(statearr_15071[(11)] = inst_15051);

(statearr_15071[(10)] = inst_15050__$1);

return statearr_15071;
})();
if(inst_15053){
var statearr_15072_15087 = state_15067__$1;
(statearr_15072_15087[(1)] = (4));

} else {
var statearr_15073_15088 = state_15067__$1;
(statearr_15073_15088[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15068 === (3))){
var inst_15065 = (state_15067[(2)]);
var state_15067__$1 = state_15067;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15067__$1,inst_15065);
} else {
if((state_val_15068 === (4))){
var inst_15050 = (state_15067[(10)]);
var inst_15055 = figwheel.client.file_reloading.reload_js_file.call(null,inst_15050);
var state_15067__$1 = state_15067;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15067__$1,(7),inst_15055);
} else {
if((state_val_15068 === (5))){
var inst_15061 = cljs.core.async.close_BANG_.call(null,out);
var state_15067__$1 = state_15067;
var statearr_15074_15089 = state_15067__$1;
(statearr_15074_15089[(2)] = inst_15061);

(statearr_15074_15089[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15068 === (6))){
var inst_15063 = (state_15067[(2)]);
var state_15067__$1 = state_15067;
var statearr_15075_15090 = state_15067__$1;
(statearr_15075_15090[(2)] = inst_15063);

(statearr_15075_15090[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15068 === (7))){
var inst_15051 = (state_15067[(11)]);
var inst_15057 = (state_15067[(2)]);
var inst_15058 = cljs.core.async.put_BANG_.call(null,out,inst_15057);
var inst_15044 = inst_15051;
var state_15067__$1 = (function (){var statearr_15076 = state_15067;
(statearr_15076[(12)] = inst_15058);

(statearr_15076[(8)] = inst_15044);

return statearr_15076;
})();
var statearr_15077_15091 = state_15067__$1;
(statearr_15077_15091[(2)] = null);

(statearr_15077_15091[(1)] = (2));


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
});})(c__10042__auto___15085,out))
;
return ((function (switch__9930__auto__,c__10042__auto___15085,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto____0 = (function (){
var statearr_15081 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15081[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto__);

(statearr_15081[(1)] = (1));

return statearr_15081;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto____1 = (function (state_15067){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_15067);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e15082){if((e15082 instanceof Object)){
var ex__9934__auto__ = e15082;
var statearr_15083_15092 = state_15067;
(statearr_15083_15092[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15067);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15082;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15093 = state_15067;
state_15067 = G__15093;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto__ = function(state_15067){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto____1.call(this,state_15067);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___15085,out))
})();
var state__10044__auto__ = (function (){var statearr_15084 = f__10043__auto__.call(null);
(statearr_15084[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___15085);

return statearr_15084;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___15085,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__15094,opts){
var map__15098 = p__15094;
var map__15098__$1 = ((((!((map__15098 == null)))?((((map__15098.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15098.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15098):map__15098);
var eval_body = cljs.core.get.call(null,map__15098__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__15098__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__6802__auto__ = eval_body;
if(cljs.core.truth_(and__6802__auto__)){
return typeof eval_body === 'string';
} else {
return and__6802__auto__;
}
})())){
var code = eval_body;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Evaling file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e15100){var e = e15100;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Unable to evaluate "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.partial.call(null,cljs.core.re_matches,/figwheel\.connect.*/),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__4655__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__15101_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__15101_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__4655__auto__)){
var file_msg = temp__4655__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__15110){
var vec__15111 = p__15110;
var k = cljs.core.nth.call(null,vec__15111,(0),null);
var v = cljs.core.nth.call(null,vec__15111,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__15114){
var vec__15115 = p__15114;
var k = cljs.core.nth.call(null,vec__15115,(0),null);
var v = cljs.core.nth.call(null,vec__15115,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__15121,p__15122){
var map__15370 = p__15121;
var map__15370__$1 = ((((!((map__15370 == null)))?((((map__15370.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15370.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15370):map__15370);
var opts = map__15370__$1;
var before_jsload = cljs.core.get.call(null,map__15370__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__15370__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__15370__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__15371 = p__15122;
var map__15371__$1 = ((((!((map__15371 == null)))?((((map__15371.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15371.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15371):map__15371);
var msg = map__15371__$1;
var files = cljs.core.get.call(null,map__15371__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__15371__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__15371__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_15525){
var state_val_15526 = (state_15525[(1)]);
if((state_val_15526 === (7))){
var inst_15386 = (state_15525[(7)]);
var inst_15388 = (state_15525[(8)]);
var inst_15387 = (state_15525[(9)]);
var inst_15385 = (state_15525[(10)]);
var inst_15393 = cljs.core._nth.call(null,inst_15386,inst_15388);
var inst_15394 = figwheel.client.file_reloading.eval_body.call(null,inst_15393,opts);
var inst_15395 = (inst_15388 + (1));
var tmp15527 = inst_15386;
var tmp15528 = inst_15387;
var tmp15529 = inst_15385;
var inst_15385__$1 = tmp15529;
var inst_15386__$1 = tmp15527;
var inst_15387__$1 = tmp15528;
var inst_15388__$1 = inst_15395;
var state_15525__$1 = (function (){var statearr_15530 = state_15525;
(statearr_15530[(11)] = inst_15394);

(statearr_15530[(7)] = inst_15386__$1);

(statearr_15530[(8)] = inst_15388__$1);

(statearr_15530[(9)] = inst_15387__$1);

(statearr_15530[(10)] = inst_15385__$1);

return statearr_15530;
})();
var statearr_15531_15617 = state_15525__$1;
(statearr_15531_15617[(2)] = null);

(statearr_15531_15617[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (20))){
var inst_15428 = (state_15525[(12)]);
var inst_15436 = figwheel.client.file_reloading.sort_files.call(null,inst_15428);
var state_15525__$1 = state_15525;
var statearr_15532_15618 = state_15525__$1;
(statearr_15532_15618[(2)] = inst_15436);

(statearr_15532_15618[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (27))){
var state_15525__$1 = state_15525;
var statearr_15533_15619 = state_15525__$1;
(statearr_15533_15619[(2)] = null);

(statearr_15533_15619[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (1))){
var inst_15377 = (state_15525[(13)]);
var inst_15374 = before_jsload.call(null,files);
var inst_15375 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_15376 = (function (){return ((function (inst_15377,inst_15374,inst_15375,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__15118_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__15118_SHARP_);
});
;})(inst_15377,inst_15374,inst_15375,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_15377__$1 = cljs.core.filter.call(null,inst_15376,files);
var inst_15378 = cljs.core.not_empty.call(null,inst_15377__$1);
var state_15525__$1 = (function (){var statearr_15534 = state_15525;
(statearr_15534[(14)] = inst_15375);

(statearr_15534[(13)] = inst_15377__$1);

(statearr_15534[(15)] = inst_15374);

return statearr_15534;
})();
if(cljs.core.truth_(inst_15378)){
var statearr_15535_15620 = state_15525__$1;
(statearr_15535_15620[(1)] = (2));

} else {
var statearr_15536_15621 = state_15525__$1;
(statearr_15536_15621[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (24))){
var state_15525__$1 = state_15525;
var statearr_15537_15622 = state_15525__$1;
(statearr_15537_15622[(2)] = null);

(statearr_15537_15622[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (39))){
var inst_15478 = (state_15525[(16)]);
var state_15525__$1 = state_15525;
var statearr_15538_15623 = state_15525__$1;
(statearr_15538_15623[(2)] = inst_15478);

(statearr_15538_15623[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (46))){
var inst_15520 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
var statearr_15539_15624 = state_15525__$1;
(statearr_15539_15624[(2)] = inst_15520);

(statearr_15539_15624[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (4))){
var inst_15422 = (state_15525[(2)]);
var inst_15423 = cljs.core.List.EMPTY;
var inst_15424 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_15423);
var inst_15425 = (function (){return ((function (inst_15422,inst_15423,inst_15424,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__15119_SHARP_){
var and__6802__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__15119_SHARP_);
if(cljs.core.truth_(and__6802__auto__)){
return (cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__15119_SHARP_))) && (cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,p1__15119_SHARP_)));
} else {
return and__6802__auto__;
}
});
;})(inst_15422,inst_15423,inst_15424,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_15426 = cljs.core.filter.call(null,inst_15425,files);
var inst_15427 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_15428 = cljs.core.concat.call(null,inst_15426,inst_15427);
var state_15525__$1 = (function (){var statearr_15540 = state_15525;
(statearr_15540[(17)] = inst_15422);

(statearr_15540[(12)] = inst_15428);

(statearr_15540[(18)] = inst_15424);

return statearr_15540;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_15541_15625 = state_15525__$1;
(statearr_15541_15625[(1)] = (16));

} else {
var statearr_15542_15626 = state_15525__$1;
(statearr_15542_15626[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (15))){
var inst_15412 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
var statearr_15543_15627 = state_15525__$1;
(statearr_15543_15627[(2)] = inst_15412);

(statearr_15543_15627[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (21))){
var inst_15438 = (state_15525[(19)]);
var inst_15438__$1 = (state_15525[(2)]);
var inst_15439 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_15438__$1);
var state_15525__$1 = (function (){var statearr_15544 = state_15525;
(statearr_15544[(19)] = inst_15438__$1);

return statearr_15544;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15525__$1,(22),inst_15439);
} else {
if((state_val_15526 === (31))){
var inst_15523 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15525__$1,inst_15523);
} else {
if((state_val_15526 === (32))){
var inst_15478 = (state_15525[(16)]);
var inst_15483 = inst_15478.cljs$lang$protocol_mask$partition0$;
var inst_15484 = (inst_15483 & (64));
var inst_15485 = inst_15478.cljs$core$ISeq$;
var inst_15486 = (cljs.core.PROTOCOL_SENTINEL === inst_15485);
var inst_15487 = (inst_15484) || (inst_15486);
var state_15525__$1 = state_15525;
if(cljs.core.truth_(inst_15487)){
var statearr_15545_15628 = state_15525__$1;
(statearr_15545_15628[(1)] = (35));

} else {
var statearr_15546_15629 = state_15525__$1;
(statearr_15546_15629[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (40))){
var inst_15500 = (state_15525[(20)]);
var inst_15499 = (state_15525[(2)]);
var inst_15500__$1 = cljs.core.get.call(null,inst_15499,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_15501 = cljs.core.get.call(null,inst_15499,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_15502 = cljs.core.not_empty.call(null,inst_15500__$1);
var state_15525__$1 = (function (){var statearr_15547 = state_15525;
(statearr_15547[(20)] = inst_15500__$1);

(statearr_15547[(21)] = inst_15501);

return statearr_15547;
})();
if(cljs.core.truth_(inst_15502)){
var statearr_15548_15630 = state_15525__$1;
(statearr_15548_15630[(1)] = (41));

} else {
var statearr_15549_15631 = state_15525__$1;
(statearr_15549_15631[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (33))){
var state_15525__$1 = state_15525;
var statearr_15550_15632 = state_15525__$1;
(statearr_15550_15632[(2)] = false);

(statearr_15550_15632[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (13))){
var inst_15398 = (state_15525[(22)]);
var inst_15402 = cljs.core.chunk_first.call(null,inst_15398);
var inst_15403 = cljs.core.chunk_rest.call(null,inst_15398);
var inst_15404 = cljs.core.count.call(null,inst_15402);
var inst_15385 = inst_15403;
var inst_15386 = inst_15402;
var inst_15387 = inst_15404;
var inst_15388 = (0);
var state_15525__$1 = (function (){var statearr_15551 = state_15525;
(statearr_15551[(7)] = inst_15386);

(statearr_15551[(8)] = inst_15388);

(statearr_15551[(9)] = inst_15387);

(statearr_15551[(10)] = inst_15385);

return statearr_15551;
})();
var statearr_15552_15633 = state_15525__$1;
(statearr_15552_15633[(2)] = null);

(statearr_15552_15633[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (22))){
var inst_15442 = (state_15525[(23)]);
var inst_15446 = (state_15525[(24)]);
var inst_15438 = (state_15525[(19)]);
var inst_15441 = (state_15525[(25)]);
var inst_15441__$1 = (state_15525[(2)]);
var inst_15442__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_15441__$1);
var inst_15443 = (function (){var all_files = inst_15438;
var res_SINGLEQUOTE_ = inst_15441__$1;
var res = inst_15442__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_15442,inst_15446,inst_15438,inst_15441,inst_15441__$1,inst_15442__$1,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__15120_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__15120_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_15442,inst_15446,inst_15438,inst_15441,inst_15441__$1,inst_15442__$1,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_15444 = cljs.core.filter.call(null,inst_15443,inst_15441__$1);
var inst_15445 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_15446__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_15445);
var inst_15447 = cljs.core.not_empty.call(null,inst_15446__$1);
var state_15525__$1 = (function (){var statearr_15553 = state_15525;
(statearr_15553[(23)] = inst_15442__$1);

(statearr_15553[(26)] = inst_15444);

(statearr_15553[(24)] = inst_15446__$1);

(statearr_15553[(25)] = inst_15441__$1);

return statearr_15553;
})();
if(cljs.core.truth_(inst_15447)){
var statearr_15554_15634 = state_15525__$1;
(statearr_15554_15634[(1)] = (23));

} else {
var statearr_15555_15635 = state_15525__$1;
(statearr_15555_15635[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (36))){
var state_15525__$1 = state_15525;
var statearr_15556_15636 = state_15525__$1;
(statearr_15556_15636[(2)] = false);

(statearr_15556_15636[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (41))){
var inst_15500 = (state_15525[(20)]);
var inst_15504 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_15505 = cljs.core.map.call(null,inst_15504,inst_15500);
var inst_15506 = cljs.core.pr_str.call(null,inst_15505);
var inst_15507 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("figwheel-no-load meta-data: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_15506)].join('');
var inst_15508 = figwheel.client.utils.log.call(null,inst_15507);
var state_15525__$1 = state_15525;
var statearr_15557_15637 = state_15525__$1;
(statearr_15557_15637[(2)] = inst_15508);

(statearr_15557_15637[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (43))){
var inst_15501 = (state_15525[(21)]);
var inst_15511 = (state_15525[(2)]);
var inst_15512 = cljs.core.not_empty.call(null,inst_15501);
var state_15525__$1 = (function (){var statearr_15558 = state_15525;
(statearr_15558[(27)] = inst_15511);

return statearr_15558;
})();
if(cljs.core.truth_(inst_15512)){
var statearr_15559_15638 = state_15525__$1;
(statearr_15559_15638[(1)] = (44));

} else {
var statearr_15560_15639 = state_15525__$1;
(statearr_15560_15639[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (29))){
var inst_15442 = (state_15525[(23)]);
var inst_15478 = (state_15525[(16)]);
var inst_15444 = (state_15525[(26)]);
var inst_15446 = (state_15525[(24)]);
var inst_15438 = (state_15525[(19)]);
var inst_15441 = (state_15525[(25)]);
var inst_15474 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_15477 = (function (){var all_files = inst_15438;
var res_SINGLEQUOTE_ = inst_15441;
var res = inst_15442;
var files_not_loaded = inst_15444;
var dependencies_that_loaded = inst_15446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15478,inst_15444,inst_15446,inst_15438,inst_15441,inst_15474,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__15476){
var map__15561 = p__15476;
var map__15561__$1 = ((((!((map__15561 == null)))?((((map__15561.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15561.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15561):map__15561);
var namespace = cljs.core.get.call(null,map__15561__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15478,inst_15444,inst_15446,inst_15438,inst_15441,inst_15474,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_15478__$1 = cljs.core.group_by.call(null,inst_15477,inst_15444);
var inst_15480 = (inst_15478__$1 == null);
var inst_15481 = cljs.core.not.call(null,inst_15480);
var state_15525__$1 = (function (){var statearr_15563 = state_15525;
(statearr_15563[(16)] = inst_15478__$1);

(statearr_15563[(28)] = inst_15474);

return statearr_15563;
})();
if(inst_15481){
var statearr_15564_15640 = state_15525__$1;
(statearr_15564_15640[(1)] = (32));

} else {
var statearr_15565_15641 = state_15525__$1;
(statearr_15565_15641[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (44))){
var inst_15501 = (state_15525[(21)]);
var inst_15514 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_15501);
var inst_15515 = cljs.core.pr_str.call(null,inst_15514);
var inst_15516 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("not required: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_15515)].join('');
var inst_15517 = figwheel.client.utils.log.call(null,inst_15516);
var state_15525__$1 = state_15525;
var statearr_15566_15642 = state_15525__$1;
(statearr_15566_15642[(2)] = inst_15517);

(statearr_15566_15642[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (6))){
var inst_15419 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
var statearr_15567_15643 = state_15525__$1;
(statearr_15567_15643[(2)] = inst_15419);

(statearr_15567_15643[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (28))){
var inst_15444 = (state_15525[(26)]);
var inst_15471 = (state_15525[(2)]);
var inst_15472 = cljs.core.not_empty.call(null,inst_15444);
var state_15525__$1 = (function (){var statearr_15568 = state_15525;
(statearr_15568[(29)] = inst_15471);

return statearr_15568;
})();
if(cljs.core.truth_(inst_15472)){
var statearr_15569_15644 = state_15525__$1;
(statearr_15569_15644[(1)] = (29));

} else {
var statearr_15570_15645 = state_15525__$1;
(statearr_15570_15645[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (25))){
var inst_15442 = (state_15525[(23)]);
var inst_15458 = (state_15525[(2)]);
var inst_15459 = cljs.core.not_empty.call(null,inst_15442);
var state_15525__$1 = (function (){var statearr_15571 = state_15525;
(statearr_15571[(30)] = inst_15458);

return statearr_15571;
})();
if(cljs.core.truth_(inst_15459)){
var statearr_15572_15646 = state_15525__$1;
(statearr_15572_15646[(1)] = (26));

} else {
var statearr_15573_15647 = state_15525__$1;
(statearr_15573_15647[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (34))){
var inst_15494 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
if(cljs.core.truth_(inst_15494)){
var statearr_15574_15648 = state_15525__$1;
(statearr_15574_15648[(1)] = (38));

} else {
var statearr_15575_15649 = state_15525__$1;
(statearr_15575_15649[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (17))){
var state_15525__$1 = state_15525;
var statearr_15576_15650 = state_15525__$1;
(statearr_15576_15650[(2)] = recompile_dependents);

(statearr_15576_15650[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (3))){
var state_15525__$1 = state_15525;
var statearr_15577_15651 = state_15525__$1;
(statearr_15577_15651[(2)] = null);

(statearr_15577_15651[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (12))){
var inst_15415 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
var statearr_15578_15652 = state_15525__$1;
(statearr_15578_15652[(2)] = inst_15415);

(statearr_15578_15652[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (2))){
var inst_15377 = (state_15525[(13)]);
var inst_15384 = cljs.core.seq.call(null,inst_15377);
var inst_15385 = inst_15384;
var inst_15386 = null;
var inst_15387 = (0);
var inst_15388 = (0);
var state_15525__$1 = (function (){var statearr_15579 = state_15525;
(statearr_15579[(7)] = inst_15386);

(statearr_15579[(8)] = inst_15388);

(statearr_15579[(9)] = inst_15387);

(statearr_15579[(10)] = inst_15385);

return statearr_15579;
})();
var statearr_15580_15653 = state_15525__$1;
(statearr_15580_15653[(2)] = null);

(statearr_15580_15653[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (23))){
var inst_15442 = (state_15525[(23)]);
var inst_15444 = (state_15525[(26)]);
var inst_15446 = (state_15525[(24)]);
var inst_15438 = (state_15525[(19)]);
var inst_15441 = (state_15525[(25)]);
var inst_15449 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_15451 = (function (){var all_files = inst_15438;
var res_SINGLEQUOTE_ = inst_15441;
var res = inst_15442;
var files_not_loaded = inst_15444;
var dependencies_that_loaded = inst_15446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15444,inst_15446,inst_15438,inst_15441,inst_15449,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__15450){
var map__15581 = p__15450;
var map__15581__$1 = ((((!((map__15581 == null)))?((((map__15581.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15581.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15581):map__15581);
var request_url = cljs.core.get.call(null,map__15581__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15444,inst_15446,inst_15438,inst_15441,inst_15449,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_15452 = cljs.core.reverse.call(null,inst_15446);
var inst_15453 = cljs.core.map.call(null,inst_15451,inst_15452);
var inst_15454 = cljs.core.pr_str.call(null,inst_15453);
var inst_15455 = figwheel.client.utils.log.call(null,inst_15454);
var state_15525__$1 = (function (){var statearr_15583 = state_15525;
(statearr_15583[(31)] = inst_15449);

return statearr_15583;
})();
var statearr_15584_15654 = state_15525__$1;
(statearr_15584_15654[(2)] = inst_15455);

(statearr_15584_15654[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (35))){
var state_15525__$1 = state_15525;
var statearr_15585_15655 = state_15525__$1;
(statearr_15585_15655[(2)] = true);

(statearr_15585_15655[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (19))){
var inst_15428 = (state_15525[(12)]);
var inst_15434 = figwheel.client.file_reloading.expand_files.call(null,inst_15428);
var state_15525__$1 = state_15525;
var statearr_15586_15656 = state_15525__$1;
(statearr_15586_15656[(2)] = inst_15434);

(statearr_15586_15656[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (11))){
var state_15525__$1 = state_15525;
var statearr_15587_15657 = state_15525__$1;
(statearr_15587_15657[(2)] = null);

(statearr_15587_15657[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (9))){
var inst_15417 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
var statearr_15588_15658 = state_15525__$1;
(statearr_15588_15658[(2)] = inst_15417);

(statearr_15588_15658[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (5))){
var inst_15388 = (state_15525[(8)]);
var inst_15387 = (state_15525[(9)]);
var inst_15390 = (inst_15388 < inst_15387);
var inst_15391 = inst_15390;
var state_15525__$1 = state_15525;
if(cljs.core.truth_(inst_15391)){
var statearr_15589_15659 = state_15525__$1;
(statearr_15589_15659[(1)] = (7));

} else {
var statearr_15590_15660 = state_15525__$1;
(statearr_15590_15660[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (14))){
var inst_15398 = (state_15525[(22)]);
var inst_15407 = cljs.core.first.call(null,inst_15398);
var inst_15408 = figwheel.client.file_reloading.eval_body.call(null,inst_15407,opts);
var inst_15409 = cljs.core.next.call(null,inst_15398);
var inst_15385 = inst_15409;
var inst_15386 = null;
var inst_15387 = (0);
var inst_15388 = (0);
var state_15525__$1 = (function (){var statearr_15591 = state_15525;
(statearr_15591[(7)] = inst_15386);

(statearr_15591[(32)] = inst_15408);

(statearr_15591[(8)] = inst_15388);

(statearr_15591[(9)] = inst_15387);

(statearr_15591[(10)] = inst_15385);

return statearr_15591;
})();
var statearr_15592_15661 = state_15525__$1;
(statearr_15592_15661[(2)] = null);

(statearr_15592_15661[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (45))){
var state_15525__$1 = state_15525;
var statearr_15593_15662 = state_15525__$1;
(statearr_15593_15662[(2)] = null);

(statearr_15593_15662[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (26))){
var inst_15442 = (state_15525[(23)]);
var inst_15444 = (state_15525[(26)]);
var inst_15446 = (state_15525[(24)]);
var inst_15438 = (state_15525[(19)]);
var inst_15441 = (state_15525[(25)]);
var inst_15461 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_15463 = (function (){var all_files = inst_15438;
var res_SINGLEQUOTE_ = inst_15441;
var res = inst_15442;
var files_not_loaded = inst_15444;
var dependencies_that_loaded = inst_15446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15444,inst_15446,inst_15438,inst_15441,inst_15461,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__15462){
var map__15594 = p__15462;
var map__15594__$1 = ((((!((map__15594 == null)))?((((map__15594.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15594.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15594):map__15594);
var namespace = cljs.core.get.call(null,map__15594__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__15594__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15444,inst_15446,inst_15438,inst_15441,inst_15461,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_15464 = cljs.core.map.call(null,inst_15463,inst_15442);
var inst_15465 = cljs.core.pr_str.call(null,inst_15464);
var inst_15466 = figwheel.client.utils.log.call(null,inst_15465);
var inst_15467 = (function (){var all_files = inst_15438;
var res_SINGLEQUOTE_ = inst_15441;
var res = inst_15442;
var files_not_loaded = inst_15444;
var dependencies_that_loaded = inst_15446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15444,inst_15446,inst_15438,inst_15441,inst_15461,inst_15463,inst_15464,inst_15465,inst_15466,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_15442,inst_15444,inst_15446,inst_15438,inst_15441,inst_15461,inst_15463,inst_15464,inst_15465,inst_15466,state_val_15526,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_15468 = setTimeout(inst_15467,(10));
var state_15525__$1 = (function (){var statearr_15596 = state_15525;
(statearr_15596[(33)] = inst_15466);

(statearr_15596[(34)] = inst_15461);

return statearr_15596;
})();
var statearr_15597_15663 = state_15525__$1;
(statearr_15597_15663[(2)] = inst_15468);

(statearr_15597_15663[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (16))){
var state_15525__$1 = state_15525;
var statearr_15598_15664 = state_15525__$1;
(statearr_15598_15664[(2)] = reload_dependents);

(statearr_15598_15664[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (38))){
var inst_15478 = (state_15525[(16)]);
var inst_15496 = cljs.core.apply.call(null,cljs.core.hash_map,inst_15478);
var state_15525__$1 = state_15525;
var statearr_15599_15665 = state_15525__$1;
(statearr_15599_15665[(2)] = inst_15496);

(statearr_15599_15665[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (30))){
var state_15525__$1 = state_15525;
var statearr_15600_15666 = state_15525__$1;
(statearr_15600_15666[(2)] = null);

(statearr_15600_15666[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (10))){
var inst_15398 = (state_15525[(22)]);
var inst_15400 = cljs.core.chunked_seq_QMARK_.call(null,inst_15398);
var state_15525__$1 = state_15525;
if(inst_15400){
var statearr_15601_15667 = state_15525__$1;
(statearr_15601_15667[(1)] = (13));

} else {
var statearr_15602_15668 = state_15525__$1;
(statearr_15602_15668[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (18))){
var inst_15432 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
if(cljs.core.truth_(inst_15432)){
var statearr_15603_15669 = state_15525__$1;
(statearr_15603_15669[(1)] = (19));

} else {
var statearr_15604_15670 = state_15525__$1;
(statearr_15604_15670[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (42))){
var state_15525__$1 = state_15525;
var statearr_15605_15671 = state_15525__$1;
(statearr_15605_15671[(2)] = null);

(statearr_15605_15671[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (37))){
var inst_15491 = (state_15525[(2)]);
var state_15525__$1 = state_15525;
var statearr_15606_15672 = state_15525__$1;
(statearr_15606_15672[(2)] = inst_15491);

(statearr_15606_15672[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15526 === (8))){
var inst_15398 = (state_15525[(22)]);
var inst_15385 = (state_15525[(10)]);
var inst_15398__$1 = cljs.core.seq.call(null,inst_15385);
var state_15525__$1 = (function (){var statearr_15607 = state_15525;
(statearr_15607[(22)] = inst_15398__$1);

return statearr_15607;
})();
if(inst_15398__$1){
var statearr_15608_15673 = state_15525__$1;
(statearr_15608_15673[(1)] = (10));

} else {
var statearr_15609_15674 = state_15525__$1;
(statearr_15609_15674[(1)] = (11));

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
}
});})(c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__9930__auto__,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto____0 = (function (){
var statearr_15613 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15613[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto__);

(statearr_15613[(1)] = (1));

return statearr_15613;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto____1 = (function (state_15525){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_15525);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e15614){if((e15614 instanceof Object)){
var ex__9934__auto__ = e15614;
var statearr_15615_15675 = state_15525;
(statearr_15615_15675[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15525);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15614;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15676 = state_15525;
state_15525 = G__15676;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto__ = function(state_15525){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto____1.call(this,state_15525);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__10044__auto__ = (function (){var statearr_15616 = f__10043__auto__.call(null);
(statearr_15616[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_15616;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__,map__15370,map__15370__$1,opts,before_jsload,on_jsload,reload_dependents,map__15371,map__15371__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__10042__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.protocol),cljs.core.str.cljs$core$IFn$_invoke$arity$1("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__15679,link){
var map__15682 = p__15679;
var map__15682__$1 = ((((!((map__15682 == null)))?((((map__15682.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15682.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15682):map__15682);
var file = cljs.core.get.call(null,map__15682__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = link.href;
if(cljs.core.truth_(temp__4657__auto__)){
var link_href = temp__4657__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4657__auto__,map__15682,map__15682__$1,file){
return (function (p1__15677_SHARP_,p2__15678_SHARP_){
if(cljs.core._EQ_.call(null,p1__15677_SHARP_,p2__15678_SHARP_)){
return p1__15677_SHARP_;
} else {
return false;
}
});})(link_href,temp__4657__auto__,map__15682,map__15682__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4657__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__15688){
var map__15689 = p__15688;
var map__15689__$1 = ((((!((map__15689 == null)))?((((map__15689.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15689.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15689):map__15689);
var match_length = cljs.core.get.call(null,map__15689__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__15689__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__15684_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__15684_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4657__auto__)){
var res = temp__4657__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.distinctify = (function figwheel$client$file_reloading$distinctify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__15691_SHARP_,p2__15692_SHARP_){
return cljs.core.assoc.call(null,p1__15691_SHARP_,cljs.core.get.call(null,p2__15692_SHARP_,key),p2__15692_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.add_link_to_document = (function figwheel$client$file_reloading$add_link_to_document(orig_link,klone,finished_fn){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
parent.removeChild(orig_link);

return finished_fn.call(null);
});})(parent))
,(300));
});
if(typeof figwheel.client.file_reloading.reload_css_deferred_chain !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_css_deferred_chain = cljs.core.atom.call(null,goog.async.Deferred.succeed());
}
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(f_data,fin){
var temp__4655__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4655__auto__)){
var link = temp__4655__auto__;
return figwheel.client.file_reloading.add_link_to_document.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href),((function (link,temp__4655__auto__){
return (function (){
return fin.call(null,cljs.core.assoc.call(null,f_data,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),true));
});})(link,temp__4655__auto__))
);
} else {
return fin.call(null,f_data);
}
});
figwheel.client.file_reloading.reload_css_files_STAR_ = (function figwheel$client$file_reloading$reload_css_files_STAR_(deferred,f_datas,on_cssload){
return figwheel.client.utils.liftContD.call(null,figwheel.client.utils.mapConcatD.call(null,deferred,figwheel.client.file_reloading.reload_css_file,f_datas),(function (f_datas_SINGLEQUOTE_,fin){
var loaded_f_datas_15693 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),f_datas_SINGLEQUOTE_);
figwheel.client.file_reloading.on_cssload_custom_event.call(null,loaded_f_datas_15693);

if(cljs.core.fn_QMARK_.call(null,on_cssload)){
on_cssload.call(null,loaded_f_datas_15693);
} else {
}

return fin.call(null);
}));
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__15694,p__15695){
var map__15700 = p__15694;
var map__15700__$1 = ((((!((map__15700 == null)))?((((map__15700.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15700.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15700):map__15700);
var on_cssload = cljs.core.get.call(null,map__15700__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
var map__15701 = p__15695;
var map__15701__$1 = ((((!((map__15701 == null)))?((((map__15701.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15701.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15701):map__15701);
var files_msg = map__15701__$1;
var files = cljs.core.get.call(null,map__15701__$1,new cljs.core.Keyword(null,"files","files",-472457450));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var temp__4657__auto__ = cljs.core.not_empty.call(null,figwheel.client.file_reloading.distinctify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files));
if(cljs.core.truth_(temp__4657__auto__)){
var f_datas = temp__4657__auto__;
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.reload_css_deferred_chain,figwheel.client.file_reloading.reload_css_files_STAR_,f_datas,on_cssload);
} else {
return null;
}
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map