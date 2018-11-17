// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__17736){
var map__17761 = p__17736;
var map__17761__$1 = ((((!((map__17761 == null)))?((((map__17761.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17761.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17761):map__17761);
var m = map__17761__$1;
var n = cljs.core.get.call(null,map__17761__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__17761__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var temp__4657__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4657__auto__)){
var ns = temp__4657__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.str.cljs$core$IFn$_invoke$arity$1("/")].join('');
} else {
return null;
}
})()),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__17763_17785 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__17764_17786 = null;
var count__17765_17787 = (0);
var i__17766_17788 = (0);
while(true){
if((i__17766_17788 < count__17765_17787)){
var f_17789 = cljs.core._nth.call(null,chunk__17764_17786,i__17766_17788);
cljs.core.println.call(null,"  ",f_17789);

var G__17790 = seq__17763_17785;
var G__17791 = chunk__17764_17786;
var G__17792 = count__17765_17787;
var G__17793 = (i__17766_17788 + (1));
seq__17763_17785 = G__17790;
chunk__17764_17786 = G__17791;
count__17765_17787 = G__17792;
i__17766_17788 = G__17793;
continue;
} else {
var temp__4657__auto___17794 = cljs.core.seq.call(null,seq__17763_17785);
if(temp__4657__auto___17794){
var seq__17763_17795__$1 = temp__4657__auto___17794;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17763_17795__$1)){
var c__7633__auto___17796 = cljs.core.chunk_first.call(null,seq__17763_17795__$1);
var G__17797 = cljs.core.chunk_rest.call(null,seq__17763_17795__$1);
var G__17798 = c__7633__auto___17796;
var G__17799 = cljs.core.count.call(null,c__7633__auto___17796);
var G__17800 = (0);
seq__17763_17785 = G__17797;
chunk__17764_17786 = G__17798;
count__17765_17787 = G__17799;
i__17766_17788 = G__17800;
continue;
} else {
var f_17801 = cljs.core.first.call(null,seq__17763_17795__$1);
cljs.core.println.call(null,"  ",f_17801);

var G__17802 = cljs.core.next.call(null,seq__17763_17795__$1);
var G__17803 = null;
var G__17804 = (0);
var G__17805 = (0);
seq__17763_17785 = G__17802;
chunk__17764_17786 = G__17803;
count__17765_17787 = G__17804;
i__17766_17788 = G__17805;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_17806 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6814__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_17806);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_17806)))?cljs.core.second.call(null,arglists_17806):arglists_17806));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n  Please see http://clojure.org/"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n  Please see http://clojure.org/special_forms#"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__17767_17807 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__17768_17808 = null;
var count__17769_17809 = (0);
var i__17770_17810 = (0);
while(true){
if((i__17770_17810 < count__17769_17809)){
var vec__17771_17811 = cljs.core._nth.call(null,chunk__17768_17808,i__17770_17810);
var name_17812 = cljs.core.nth.call(null,vec__17771_17811,(0),null);
var map__17774_17813 = cljs.core.nth.call(null,vec__17771_17811,(1),null);
var map__17774_17814__$1 = ((((!((map__17774_17813 == null)))?((((map__17774_17813.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17774_17813.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17774_17813):map__17774_17813);
var doc_17815 = cljs.core.get.call(null,map__17774_17814__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_17816 = cljs.core.get.call(null,map__17774_17814__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_17812);

cljs.core.println.call(null," ",arglists_17816);

if(cljs.core.truth_(doc_17815)){
cljs.core.println.call(null," ",doc_17815);
} else {
}

var G__17817 = seq__17767_17807;
var G__17818 = chunk__17768_17808;
var G__17819 = count__17769_17809;
var G__17820 = (i__17770_17810 + (1));
seq__17767_17807 = G__17817;
chunk__17768_17808 = G__17818;
count__17769_17809 = G__17819;
i__17770_17810 = G__17820;
continue;
} else {
var temp__4657__auto___17821 = cljs.core.seq.call(null,seq__17767_17807);
if(temp__4657__auto___17821){
var seq__17767_17822__$1 = temp__4657__auto___17821;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17767_17822__$1)){
var c__7633__auto___17823 = cljs.core.chunk_first.call(null,seq__17767_17822__$1);
var G__17824 = cljs.core.chunk_rest.call(null,seq__17767_17822__$1);
var G__17825 = c__7633__auto___17823;
var G__17826 = cljs.core.count.call(null,c__7633__auto___17823);
var G__17827 = (0);
seq__17767_17807 = G__17824;
chunk__17768_17808 = G__17825;
count__17769_17809 = G__17826;
i__17770_17810 = G__17827;
continue;
} else {
var vec__17776_17828 = cljs.core.first.call(null,seq__17767_17822__$1);
var name_17829 = cljs.core.nth.call(null,vec__17776_17828,(0),null);
var map__17779_17830 = cljs.core.nth.call(null,vec__17776_17828,(1),null);
var map__17779_17831__$1 = ((((!((map__17779_17830 == null)))?((((map__17779_17830.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17779_17830.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17779_17830):map__17779_17830);
var doc_17832 = cljs.core.get.call(null,map__17779_17831__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_17833 = cljs.core.get.call(null,map__17779_17831__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_17829);

cljs.core.println.call(null," ",arglists_17833);

if(cljs.core.truth_(doc_17832)){
cljs.core.println.call(null," ",doc_17832);
} else {
}

var G__17834 = cljs.core.next.call(null,seq__17767_17822__$1);
var G__17835 = null;
var G__17836 = (0);
var G__17837 = (0);
seq__17767_17807 = G__17834;
chunk__17768_17808 = G__17835;
count__17769_17809 = G__17836;
i__17770_17810 = G__17837;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__4657__auto__ = cljs.spec.get_spec.call(null,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n))].join(''),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__4657__auto__)){
var fnspec = temp__4657__auto__;
cljs.core.print.call(null,"Spec");

var seq__17781 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__17782 = null;
var count__17783 = (0);
var i__17784 = (0);
while(true){
if((i__17784 < count__17783)){
var role = cljs.core._nth.call(null,chunk__17782,i__17784);
var temp__4657__auto___17838__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___17838__$1)){
var spec_17839 = temp__4657__auto___17838__$1;
cljs.core.print.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,role)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(":")].join(''),cljs.spec.describe.call(null,spec_17839));
} else {
}

var G__17840 = seq__17781;
var G__17841 = chunk__17782;
var G__17842 = count__17783;
var G__17843 = (i__17784 + (1));
seq__17781 = G__17840;
chunk__17782 = G__17841;
count__17783 = G__17842;
i__17784 = G__17843;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__17781);
if(temp__4657__auto____$1){
var seq__17781__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17781__$1)){
var c__7633__auto__ = cljs.core.chunk_first.call(null,seq__17781__$1);
var G__17844 = cljs.core.chunk_rest.call(null,seq__17781__$1);
var G__17845 = c__7633__auto__;
var G__17846 = cljs.core.count.call(null,c__7633__auto__);
var G__17847 = (0);
seq__17781 = G__17844;
chunk__17782 = G__17845;
count__17783 = G__17846;
i__17784 = G__17847;
continue;
} else {
var role = cljs.core.first.call(null,seq__17781__$1);
var temp__4657__auto___17848__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___17848__$2)){
var spec_17849 = temp__4657__auto___17848__$2;
cljs.core.print.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("\n "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,role)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(":")].join(''),cljs.spec.describe.call(null,spec_17849));
} else {
}

var G__17850 = cljs.core.next.call(null,seq__17781__$1);
var G__17851 = null;
var G__17852 = (0);
var G__17853 = (0);
seq__17781 = G__17850;
chunk__17782 = G__17851;
count__17783 = G__17852;
i__17784 = G__17853;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map