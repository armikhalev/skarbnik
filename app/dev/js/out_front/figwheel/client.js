// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.userAgent.product');
goog.require('goog.object');
goog.require('cljs.reader');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.utils');
goog.require('figwheel.client.heads_up');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('cljs.repl');
figwheel.client._figwheel_version_ = "0.5.9";
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(var_args){
var args18175 = [];
var len__7923__auto___18178 = arguments.length;
var i__7924__auto___18179 = (0);
while(true){
if((i__7924__auto___18179 < len__7923__auto___18178)){
args18175.push((arguments[i__7924__auto___18179]));

var G__18180 = (i__7924__auto___18179 + (1));
i__7924__auto___18179 = G__18180;
continue;
} else {
}
break;
}

var G__18177 = args18175.length;
switch (G__18177) {
case 2:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args18175.length)].join('')));

}
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2 = (function (stream,args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),stream,new cljs.core.Keyword(null,"args","args",1315556576),args], null)], null));

return null;
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1 = (function (args){
return figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);
});

figwheel.client.figwheel_repl_print.cljs$lang$maxFixedArity = 2;

figwheel.client.console_out_print = (function figwheel$client$console_out_print(args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.console_err_print = (function figwheel$client$console_err_print(args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.repl_out_print_fn = (function figwheel$client$repl_out_print_fn(var_args){
var args__7930__auto__ = [];
var len__7923__auto___18183 = arguments.length;
var i__7924__auto___18184 = (0);
while(true){
if((i__7924__auto___18184 < len__7923__auto___18183)){
args__7930__auto__.push((arguments[i__7924__auto___18184]));

var G__18185 = (i__7924__auto___18184 + (1));
i__7924__auto___18184 = G__18185;
continue;
} else {
}
break;
}

var argseq__7931__auto__ = ((((0) < args__7930__auto__.length))?(new cljs.core.IndexedSeq(args__7930__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__7931__auto__);
});

figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_out_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);

return null;
});

figwheel.client.repl_out_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_out_print_fn.cljs$lang$applyTo = (function (seq18182){
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq18182));
});

figwheel.client.repl_err_print_fn = (function figwheel$client$repl_err_print_fn(var_args){
var args__7930__auto__ = [];
var len__7923__auto___18187 = arguments.length;
var i__7924__auto___18188 = (0);
while(true){
if((i__7924__auto___18188 < len__7923__auto___18187)){
args__7930__auto__.push((arguments[i__7924__auto___18188]));

var G__18189 = (i__7924__auto___18188 + (1));
i__7924__auto___18188 = G__18189;
continue;
} else {
}
break;
}

var argseq__7931__auto__ = ((((0) < args__7930__auto__.length))?(new cljs.core.IndexedSeq(args__7930__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__7931__auto__);
});

figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_err_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"err","err",-2089457205),args);

return null;
});

figwheel.client.repl_err_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_err_print_fn.cljs$lang$applyTo = (function (seq18186){
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq18186));
});

figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core.set_print_fn_BANG_.call(null,figwheel.client.repl_out_print_fn);

cljs.core.set_print_err_fn_BANG_.call(null,figwheel.client.repl_err_print_fn);

return null;
});
figwheel.client.autoload_QMARK_ = (function figwheel$client$autoload_QMARK_(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),true);
});
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
var res = figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),cljs.core.not.call(null,figwheel.client.autoload_QMARK_.call(null)));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Toggle autoload deprecated! Use (figwheel.client/set-autoload! false)")].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel autoloading "),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(figwheel.client.autoload_QMARK_.call(null))?"ON":"OFF"))].join(''));

return res;
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
/**
 * Figwheel by default loads code changes as you work. Sometimes you
 *   just want to work on your code without the ramifications of
 *   autoloading and simply load your code piecemeal in the REPL. You can
 *   turn autoloading on and of with this method. 
 * 
 *   (figwheel.client/set-autoload false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_autoload = (function figwheel$client$set_autoload(b){

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),b);
});
goog.exportSymbol('figwheel.client.set_autoload', figwheel.client.set_autoload);
figwheel.client.repl_pprint = (function figwheel$client$repl_pprint(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),true);
});
goog.exportSymbol('figwheel.client.repl_pprint', figwheel.client.repl_pprint);
/**
 * This method gives you the ability to turn the pretty printing of
 *   the REPL's return value on and off.
 *   
 *   (figwheel.client/set-repl-pprint false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_repl_pprint = (function figwheel$client$set_repl_pprint(b){

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),b);
});
goog.exportSymbol('figwheel.client.set_repl_pprint', figwheel.client.set_repl_pprint);
figwheel.client.repl_result_pr_str = (function figwheel$client$repl_result_pr_str(v){
if(cljs.core.truth_(figwheel.client.repl_pprint.call(null))){
return figwheel.client.utils.pprint_to_string.call(null,v);
} else {
return cljs.core.pr_str.call(null,v);
}
});
goog.exportSymbol('figwheel.client.repl_result_pr_str', figwheel.client.repl_result_pr_str);
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel.client.get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__18190){
var map__18193 = p__18190;
var map__18193__$1 = ((((!((map__18193 == null)))?((((map__18193.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18193.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18193):map__18193);
var message = cljs.core.get.call(null,map__18193__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__18193__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(class$),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" : "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__6814__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__6802__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__6802__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__6802__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__10042__auto___18355 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___18355,ch){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___18355,ch){
return (function (state_18324){
var state_val_18325 = (state_18324[(1)]);
if((state_val_18325 === (7))){
var inst_18320 = (state_18324[(2)]);
var state_18324__$1 = state_18324;
var statearr_18326_18356 = state_18324__$1;
(statearr_18326_18356[(2)] = inst_18320);

(statearr_18326_18356[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (1))){
var state_18324__$1 = state_18324;
var statearr_18327_18357 = state_18324__$1;
(statearr_18327_18357[(2)] = null);

(statearr_18327_18357[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (4))){
var inst_18277 = (state_18324[(7)]);
var inst_18277__$1 = (state_18324[(2)]);
var state_18324__$1 = (function (){var statearr_18328 = state_18324;
(statearr_18328[(7)] = inst_18277__$1);

return statearr_18328;
})();
if(cljs.core.truth_(inst_18277__$1)){
var statearr_18329_18358 = state_18324__$1;
(statearr_18329_18358[(1)] = (5));

} else {
var statearr_18330_18359 = state_18324__$1;
(statearr_18330_18359[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (15))){
var inst_18284 = (state_18324[(8)]);
var inst_18299 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_18284);
var inst_18300 = cljs.core.first.call(null,inst_18299);
var inst_18301 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_18300);
var inst_18302 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Not loading code with warnings - "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_18301)].join('');
var inst_18303 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_18302);
var state_18324__$1 = state_18324;
var statearr_18331_18360 = state_18324__$1;
(statearr_18331_18360[(2)] = inst_18303);

(statearr_18331_18360[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (13))){
var inst_18308 = (state_18324[(2)]);
var state_18324__$1 = state_18324;
var statearr_18332_18361 = state_18324__$1;
(statearr_18332_18361[(2)] = inst_18308);

(statearr_18332_18361[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (6))){
var state_18324__$1 = state_18324;
var statearr_18333_18362 = state_18324__$1;
(statearr_18333_18362[(2)] = null);

(statearr_18333_18362[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (17))){
var inst_18306 = (state_18324[(2)]);
var state_18324__$1 = state_18324;
var statearr_18334_18363 = state_18324__$1;
(statearr_18334_18363[(2)] = inst_18306);

(statearr_18334_18363[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (3))){
var inst_18322 = (state_18324[(2)]);
var state_18324__$1 = state_18324;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18324__$1,inst_18322);
} else {
if((state_val_18325 === (12))){
var inst_18283 = (state_18324[(9)]);
var inst_18297 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_18283,opts);
var state_18324__$1 = state_18324;
if(cljs.core.truth_(inst_18297)){
var statearr_18335_18364 = state_18324__$1;
(statearr_18335_18364[(1)] = (15));

} else {
var statearr_18336_18365 = state_18324__$1;
(statearr_18336_18365[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (2))){
var state_18324__$1 = state_18324;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18324__$1,(4),ch);
} else {
if((state_val_18325 === (11))){
var inst_18284 = (state_18324[(8)]);
var inst_18289 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_18290 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_18284);
var inst_18291 = cljs.core.async.timeout.call(null,(1000));
var inst_18292 = [inst_18290,inst_18291];
var inst_18293 = (new cljs.core.PersistentVector(null,2,(5),inst_18289,inst_18292,null));
var state_18324__$1 = state_18324;
return cljs.core.async.ioc_alts_BANG_.call(null,state_18324__$1,(14),inst_18293);
} else {
if((state_val_18325 === (9))){
var inst_18284 = (state_18324[(8)]);
var inst_18310 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_18311 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_18284);
var inst_18312 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_18311);
var inst_18313 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("Not loading: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_18312)].join('');
var inst_18314 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_18313);
var state_18324__$1 = (function (){var statearr_18337 = state_18324;
(statearr_18337[(10)] = inst_18310);

return statearr_18337;
})();
var statearr_18338_18366 = state_18324__$1;
(statearr_18338_18366[(2)] = inst_18314);

(statearr_18338_18366[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (5))){
var inst_18277 = (state_18324[(7)]);
var inst_18279 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_18280 = (new cljs.core.PersistentArrayMap(null,2,inst_18279,null));
var inst_18281 = (new cljs.core.PersistentHashSet(null,inst_18280,null));
var inst_18282 = figwheel.client.focus_msgs.call(null,inst_18281,inst_18277);
var inst_18283 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_18282);
var inst_18284 = cljs.core.first.call(null,inst_18282);
var inst_18285 = figwheel.client.autoload_QMARK_.call(null);
var state_18324__$1 = (function (){var statearr_18339 = state_18324;
(statearr_18339[(9)] = inst_18283);

(statearr_18339[(8)] = inst_18284);

return statearr_18339;
})();
if(cljs.core.truth_(inst_18285)){
var statearr_18340_18367 = state_18324__$1;
(statearr_18340_18367[(1)] = (8));

} else {
var statearr_18341_18368 = state_18324__$1;
(statearr_18341_18368[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (14))){
var inst_18295 = (state_18324[(2)]);
var state_18324__$1 = state_18324;
var statearr_18342_18369 = state_18324__$1;
(statearr_18342_18369[(2)] = inst_18295);

(statearr_18342_18369[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (16))){
var state_18324__$1 = state_18324;
var statearr_18343_18370 = state_18324__$1;
(statearr_18343_18370[(2)] = null);

(statearr_18343_18370[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (10))){
var inst_18316 = (state_18324[(2)]);
var state_18324__$1 = (function (){var statearr_18344 = state_18324;
(statearr_18344[(11)] = inst_18316);

return statearr_18344;
})();
var statearr_18345_18371 = state_18324__$1;
(statearr_18345_18371[(2)] = null);

(statearr_18345_18371[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18325 === (8))){
var inst_18283 = (state_18324[(9)]);
var inst_18287 = figwheel.client.reload_file_state_QMARK_.call(null,inst_18283,opts);
var state_18324__$1 = state_18324;
if(cljs.core.truth_(inst_18287)){
var statearr_18346_18372 = state_18324__$1;
(statearr_18346_18372[(1)] = (11));

} else {
var statearr_18347_18373 = state_18324__$1;
(statearr_18347_18373[(1)] = (12));

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
});})(c__10042__auto___18355,ch))
;
return ((function (switch__9930__auto__,c__10042__auto___18355,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__9931__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__9931__auto____0 = (function (){
var statearr_18351 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18351[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__9931__auto__);

(statearr_18351[(1)] = (1));

return statearr_18351;
});
var figwheel$client$file_reloader_plugin_$_state_machine__9931__auto____1 = (function (state_18324){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_18324);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e18352){if((e18352 instanceof Object)){
var ex__9934__auto__ = e18352;
var statearr_18353_18374 = state_18324;
(statearr_18353_18374[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18324);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18352;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18375 = state_18324;
state_18324 = G__18375;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__9931__auto__ = function(state_18324){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__9931__auto____1.call(this,state_18324);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__9931__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__9931__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___18355,ch))
})();
var state__10044__auto__ = (function (){var statearr_18354 = f__10043__auto__.call(null);
(statearr_18354[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___18355);

return statearr_18354;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___18355,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__18376_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__18376_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_18379 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_18379){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{figwheel.client.enable_repl_print_BANG_.call(null);

var result_value = figwheel.client.utils.eval_helper.call(null,code,opts);
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),result_value], null));
}catch (e18378){if((e18378 instanceof Error)){
var e = e18378;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_18379], null));
} else {
var e = e18378;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}finally {figwheel.client.enable_repl_print_BANG_.call(null);
}});})(base_path_18379))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = ({});
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__18380){
var map__18389 = p__18380;
var map__18389__$1 = ((((!((map__18389 == null)))?((((map__18389.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18389.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18389):map__18389);
var opts = map__18389__$1;
var build_id = cljs.core.get.call(null,map__18389__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__18389,map__18389__$1,opts,build_id){
return (function (p__18391){
var vec__18392 = p__18391;
var seq__18393 = cljs.core.seq.call(null,vec__18392);
var first__18394 = cljs.core.first.call(null,seq__18393);
var seq__18393__$1 = cljs.core.next.call(null,seq__18393);
var map__18395 = first__18394;
var map__18395__$1 = ((((!((map__18395 == null)))?((((map__18395.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18395.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18395):map__18395);
var msg = map__18395__$1;
var msg_name = cljs.core.get.call(null,map__18395__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__18393__$1;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__18392,seq__18393,first__18394,seq__18393__$1,map__18395,map__18395__$1,msg,msg_name,_,map__18389,map__18389__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__18392,seq__18393,first__18394,seq__18393__$1,map__18395,map__18395__$1,msg,msg_name,_,map__18389,map__18389__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__18389,map__18389__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__18403){
var vec__18404 = p__18403;
var seq__18405 = cljs.core.seq.call(null,vec__18404);
var first__18406 = cljs.core.first.call(null,seq__18405);
var seq__18405__$1 = cljs.core.next.call(null,seq__18405);
var map__18407 = first__18406;
var map__18407__$1 = ((((!((map__18407 == null)))?((((map__18407.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18407.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18407):map__18407);
var msg = map__18407__$1;
var msg_name = cljs.core.get.call(null,map__18407__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__18405__$1;
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__18409){
var map__18421 = p__18409;
var map__18421__$1 = ((((!((map__18421 == null)))?((((map__18421.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18421.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18421):map__18421);
var on_compile_warning = cljs.core.get.call(null,map__18421__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__18421__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__18421,map__18421__$1,on_compile_warning,on_compile_fail){
return (function (p__18423){
var vec__18424 = p__18423;
var seq__18425 = cljs.core.seq.call(null,vec__18424);
var first__18426 = cljs.core.first.call(null,seq__18425);
var seq__18425__$1 = cljs.core.next.call(null,seq__18425);
var map__18427 = first__18426;
var map__18427__$1 = ((((!((map__18427 == null)))?((((map__18427.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18427.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18427):map__18427);
var msg = map__18427__$1;
var msg_name = cljs.core.get.call(null,map__18427__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__18425__$1;
var pred__18429 = cljs.core._EQ_;
var expr__18430 = msg_name;
if(cljs.core.truth_(pred__18429.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__18430))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__18429.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__18430))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__18421,map__18421__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.auto_jump_to_error = (function figwheel$client$auto_jump_to_error(opts,error){
if(cljs.core.truth_(new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920).cljs$core$IFn$_invoke$arity$1(opts))){
return figwheel.client.heads_up.auto_notify_source_file_line.call(null,error);
} else {
return null;
}
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__,msg_hist,msg_names,msg){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__,msg_hist,msg_names,msg){
return (function (state_18658){
var state_val_18659 = (state_18658[(1)]);
if((state_val_18659 === (7))){
var inst_18578 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18578)){
var statearr_18660_18710 = state_18658__$1;
(statearr_18660_18710[(1)] = (8));

} else {
var statearr_18661_18711 = state_18658__$1;
(statearr_18661_18711[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (20))){
var inst_18652 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18662_18712 = state_18658__$1;
(statearr_18662_18712[(2)] = inst_18652);

(statearr_18662_18712[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (27))){
var inst_18648 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18663_18713 = state_18658__$1;
(statearr_18663_18713[(2)] = inst_18648);

(statearr_18663_18713[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (1))){
var inst_18571 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18571)){
var statearr_18664_18714 = state_18658__$1;
(statearr_18664_18714[(1)] = (2));

} else {
var statearr_18665_18715 = state_18658__$1;
(statearr_18665_18715[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (24))){
var inst_18650 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18666_18716 = state_18658__$1;
(statearr_18666_18716[(2)] = inst_18650);

(statearr_18666_18716[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (4))){
var inst_18656 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18658__$1,inst_18656);
} else {
if((state_val_18659 === (15))){
var inst_18654 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18667_18717 = state_18658__$1;
(statearr_18667_18717[(2)] = inst_18654);

(statearr_18667_18717[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (21))){
var inst_18607 = (state_18658[(2)]);
var inst_18608 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18609 = figwheel.client.auto_jump_to_error.call(null,opts,inst_18608);
var state_18658__$1 = (function (){var statearr_18668 = state_18658;
(statearr_18668[(7)] = inst_18607);

return statearr_18668;
})();
var statearr_18669_18718 = state_18658__$1;
(statearr_18669_18718[(2)] = inst_18609);

(statearr_18669_18718[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (31))){
var inst_18637 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18637)){
var statearr_18670_18719 = state_18658__$1;
(statearr_18670_18719[(1)] = (34));

} else {
var statearr_18671_18720 = state_18658__$1;
(statearr_18671_18720[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (32))){
var inst_18646 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18672_18721 = state_18658__$1;
(statearr_18672_18721[(2)] = inst_18646);

(statearr_18672_18721[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (33))){
var inst_18633 = (state_18658[(2)]);
var inst_18634 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18635 = figwheel.client.auto_jump_to_error.call(null,opts,inst_18634);
var state_18658__$1 = (function (){var statearr_18673 = state_18658;
(statearr_18673[(8)] = inst_18633);

return statearr_18673;
})();
var statearr_18674_18722 = state_18658__$1;
(statearr_18674_18722[(2)] = inst_18635);

(statearr_18674_18722[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (13))){
var inst_18592 = figwheel.client.heads_up.clear.call(null);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(16),inst_18592);
} else {
if((state_val_18659 === (22))){
var inst_18613 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18614 = figwheel.client.heads_up.append_warning_message.call(null,inst_18613);
var state_18658__$1 = state_18658;
var statearr_18675_18723 = state_18658__$1;
(statearr_18675_18723[(2)] = inst_18614);

(statearr_18675_18723[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (36))){
var inst_18644 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18676_18724 = state_18658__$1;
(statearr_18676_18724[(2)] = inst_18644);

(statearr_18676_18724[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (29))){
var inst_18624 = (state_18658[(2)]);
var inst_18625 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18626 = figwheel.client.auto_jump_to_error.call(null,opts,inst_18625);
var state_18658__$1 = (function (){var statearr_18677 = state_18658;
(statearr_18677[(9)] = inst_18624);

return statearr_18677;
})();
var statearr_18678_18725 = state_18658__$1;
(statearr_18678_18725[(2)] = inst_18626);

(statearr_18678_18725[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (6))){
var inst_18573 = (state_18658[(10)]);
var state_18658__$1 = state_18658;
var statearr_18679_18726 = state_18658__$1;
(statearr_18679_18726[(2)] = inst_18573);

(statearr_18679_18726[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (28))){
var inst_18620 = (state_18658[(2)]);
var inst_18621 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18622 = figwheel.client.heads_up.display_warning.call(null,inst_18621);
var state_18658__$1 = (function (){var statearr_18680 = state_18658;
(statearr_18680[(11)] = inst_18620);

return statearr_18680;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(29),inst_18622);
} else {
if((state_val_18659 === (25))){
var inst_18618 = figwheel.client.heads_up.clear.call(null);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(28),inst_18618);
} else {
if((state_val_18659 === (34))){
var inst_18639 = figwheel.client.heads_up.flash_loaded.call(null);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(37),inst_18639);
} else {
if((state_val_18659 === (17))){
var inst_18598 = (state_18658[(2)]);
var inst_18599 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18600 = figwheel.client.auto_jump_to_error.call(null,opts,inst_18599);
var state_18658__$1 = (function (){var statearr_18681 = state_18658;
(statearr_18681[(12)] = inst_18598);

return statearr_18681;
})();
var statearr_18682_18727 = state_18658__$1;
(statearr_18682_18727[(2)] = inst_18600);

(statearr_18682_18727[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (3))){
var inst_18590 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18590)){
var statearr_18683_18728 = state_18658__$1;
(statearr_18683_18728[(1)] = (13));

} else {
var statearr_18684_18729 = state_18658__$1;
(statearr_18684_18729[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (12))){
var inst_18586 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18685_18730 = state_18658__$1;
(statearr_18685_18730[(2)] = inst_18586);

(statearr_18685_18730[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (2))){
var inst_18573 = (state_18658[(10)]);
var inst_18573__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_18658__$1 = (function (){var statearr_18686 = state_18658;
(statearr_18686[(10)] = inst_18573__$1);

return statearr_18686;
})();
if(cljs.core.truth_(inst_18573__$1)){
var statearr_18687_18731 = state_18658__$1;
(statearr_18687_18731[(1)] = (5));

} else {
var statearr_18688_18732 = state_18658__$1;
(statearr_18688_18732[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (23))){
var inst_18616 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18616)){
var statearr_18689_18733 = state_18658__$1;
(statearr_18689_18733[(1)] = (25));

} else {
var statearr_18690_18734 = state_18658__$1;
(statearr_18690_18734[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (35))){
var state_18658__$1 = state_18658;
var statearr_18691_18735 = state_18658__$1;
(statearr_18691_18735[(2)] = null);

(statearr_18691_18735[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (19))){
var inst_18611 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18611)){
var statearr_18692_18736 = state_18658__$1;
(statearr_18692_18736[(1)] = (22));

} else {
var statearr_18693_18737 = state_18658__$1;
(statearr_18693_18737[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (11))){
var inst_18582 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18694_18738 = state_18658__$1;
(statearr_18694_18738[(2)] = inst_18582);

(statearr_18694_18738[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (9))){
var inst_18584 = figwheel.client.heads_up.clear.call(null);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(12),inst_18584);
} else {
if((state_val_18659 === (5))){
var inst_18575 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_18658__$1 = state_18658;
var statearr_18695_18739 = state_18658__$1;
(statearr_18695_18739[(2)] = inst_18575);

(statearr_18695_18739[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (14))){
var inst_18602 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18602)){
var statearr_18696_18740 = state_18658__$1;
(statearr_18696_18740[(1)] = (18));

} else {
var statearr_18697_18741 = state_18658__$1;
(statearr_18697_18741[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (26))){
var inst_18628 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_18658__$1 = state_18658;
if(cljs.core.truth_(inst_18628)){
var statearr_18698_18742 = state_18658__$1;
(statearr_18698_18742[(1)] = (30));

} else {
var statearr_18699_18743 = state_18658__$1;
(statearr_18699_18743[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (16))){
var inst_18594 = (state_18658[(2)]);
var inst_18595 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18596 = figwheel.client.heads_up.display_exception.call(null,inst_18595);
var state_18658__$1 = (function (){var statearr_18700 = state_18658;
(statearr_18700[(13)] = inst_18594);

return statearr_18700;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(17),inst_18596);
} else {
if((state_val_18659 === (30))){
var inst_18630 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18631 = figwheel.client.heads_up.display_warning.call(null,inst_18630);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(33),inst_18631);
} else {
if((state_val_18659 === (10))){
var inst_18588 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18701_18744 = state_18658__$1;
(statearr_18701_18744[(2)] = inst_18588);

(statearr_18701_18744[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (18))){
var inst_18604 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_18605 = figwheel.client.heads_up.display_exception.call(null,inst_18604);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(21),inst_18605);
} else {
if((state_val_18659 === (37))){
var inst_18641 = (state_18658[(2)]);
var state_18658__$1 = state_18658;
var statearr_18702_18745 = state_18658__$1;
(statearr_18702_18745[(2)] = inst_18641);

(statearr_18702_18745[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18659 === (8))){
var inst_18580 = figwheel.client.heads_up.flash_loaded.call(null);
var state_18658__$1 = state_18658;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18658__$1,(11),inst_18580);
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
});})(c__10042__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__9930__auto__,c__10042__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto____0 = (function (){
var statearr_18706 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18706[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto__);

(statearr_18706[(1)] = (1));

return statearr_18706;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto____1 = (function (state_18658){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_18658);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e18707){if((e18707 instanceof Object)){
var ex__9934__auto__ = e18707;
var statearr_18708_18746 = state_18658;
(statearr_18708_18746[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18658);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18707;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18747 = state_18658;
state_18658 = G__18747;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto__ = function(state_18658){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto____1.call(this,state_18658);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__,msg_hist,msg_names,msg))
})();
var state__10044__auto__ = (function (){var statearr_18709 = f__10043__auto__.call(null);
(statearr_18709[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_18709;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__,msg_hist,msg_names,msg))
);

return c__10042__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__10042__auto___18810 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto___18810,ch){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto___18810,ch){
return (function (state_18793){
var state_val_18794 = (state_18793[(1)]);
if((state_val_18794 === (1))){
var state_18793__$1 = state_18793;
var statearr_18795_18811 = state_18793__$1;
(statearr_18795_18811[(2)] = null);

(statearr_18795_18811[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18794 === (2))){
var state_18793__$1 = state_18793;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18793__$1,(4),ch);
} else {
if((state_val_18794 === (3))){
var inst_18791 = (state_18793[(2)]);
var state_18793__$1 = state_18793;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18793__$1,inst_18791);
} else {
if((state_val_18794 === (4))){
var inst_18781 = (state_18793[(7)]);
var inst_18781__$1 = (state_18793[(2)]);
var state_18793__$1 = (function (){var statearr_18796 = state_18793;
(statearr_18796[(7)] = inst_18781__$1);

return statearr_18796;
})();
if(cljs.core.truth_(inst_18781__$1)){
var statearr_18797_18812 = state_18793__$1;
(statearr_18797_18812[(1)] = (5));

} else {
var statearr_18798_18813 = state_18793__$1;
(statearr_18798_18813[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18794 === (5))){
var inst_18781 = (state_18793[(7)]);
var inst_18783 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_18781);
var state_18793__$1 = state_18793;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18793__$1,(8),inst_18783);
} else {
if((state_val_18794 === (6))){
var state_18793__$1 = state_18793;
var statearr_18799_18814 = state_18793__$1;
(statearr_18799_18814[(2)] = null);

(statearr_18799_18814[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18794 === (7))){
var inst_18789 = (state_18793[(2)]);
var state_18793__$1 = state_18793;
var statearr_18800_18815 = state_18793__$1;
(statearr_18800_18815[(2)] = inst_18789);

(statearr_18800_18815[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18794 === (8))){
var inst_18785 = (state_18793[(2)]);
var state_18793__$1 = (function (){var statearr_18801 = state_18793;
(statearr_18801[(8)] = inst_18785);

return statearr_18801;
})();
var statearr_18802_18816 = state_18793__$1;
(statearr_18802_18816[(2)] = null);

(statearr_18802_18816[(1)] = (2));


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
});})(c__10042__auto___18810,ch))
;
return ((function (switch__9930__auto__,c__10042__auto___18810,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__9931__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__9931__auto____0 = (function (){
var statearr_18806 = [null,null,null,null,null,null,null,null,null];
(statearr_18806[(0)] = figwheel$client$heads_up_plugin_$_state_machine__9931__auto__);

(statearr_18806[(1)] = (1));

return statearr_18806;
});
var figwheel$client$heads_up_plugin_$_state_machine__9931__auto____1 = (function (state_18793){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_18793);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e18807){if((e18807 instanceof Object)){
var ex__9934__auto__ = e18807;
var statearr_18808_18817 = state_18793;
(statearr_18808_18817[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18793);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18807;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18818 = state_18793;
state_18793 = G__18818;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__9931__auto__ = function(state_18793){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__9931__auto____1.call(this,state_18793);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__9931__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__9931__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto___18810,ch))
})();
var state__10044__auto__ = (function (){var statearr_18809 = f__10043__auto__.call(null);
(statearr_18809[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto___18810);

return statearr_18809;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto___18810,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__){
return (function (state_18839){
var state_val_18840 = (state_18839[(1)]);
if((state_val_18840 === (1))){
var inst_18834 = cljs.core.async.timeout.call(null,(3000));
var state_18839__$1 = state_18839;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18839__$1,(2),inst_18834);
} else {
if((state_val_18840 === (2))){
var inst_18836 = (state_18839[(2)]);
var inst_18837 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_18839__$1 = (function (){var statearr_18841 = state_18839;
(statearr_18841[(7)] = inst_18836);

return statearr_18841;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18839__$1,inst_18837);
} else {
return null;
}
}
});})(c__10042__auto__))
;
return ((function (switch__9930__auto__,c__10042__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__9931__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__9931__auto____0 = (function (){
var statearr_18845 = [null,null,null,null,null,null,null,null];
(statearr_18845[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__9931__auto__);

(statearr_18845[(1)] = (1));

return statearr_18845;
});
var figwheel$client$enforce_project_plugin_$_state_machine__9931__auto____1 = (function (state_18839){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_18839);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e18846){if((e18846 instanceof Object)){
var ex__9934__auto__ = e18846;
var statearr_18847_18849 = state_18839;
(statearr_18847_18849[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18839);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18846;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18850 = state_18839;
state_18839 = G__18850;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__9931__auto__ = function(state_18839){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__9931__auto____1.call(this,state_18839);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__9931__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__9931__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__))
})();
var state__10044__auto__ = (function (){var statearr_18848 = f__10043__auto__.call(null);
(statearr_18848[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_18848;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__))
);

return c__10042__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.enforce_figwheel_version_plugin = (function figwheel$client$enforce_figwheel_version_plugin(opts){
return (function (msg_hist){
var temp__4657__auto__ = new cljs.core.Keyword(null,"figwheel-version","figwheel-version",1409553832).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,msg_hist));
if(cljs.core.truth_(temp__4657__auto__)){
var figwheel_version = temp__4657__auto__;
if(cljs.core.not_EQ_.call(null,figwheel_version,figwheel.client._figwheel_version_)){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different version of Figwheel.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__10042__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10042__auto__,figwheel_version,temp__4657__auto__){
return (function (){
var f__10043__auto__ = (function (){var switch__9930__auto__ = ((function (c__10042__auto__,figwheel_version,temp__4657__auto__){
return (function (state_18873){
var state_val_18874 = (state_18873[(1)]);
if((state_val_18874 === (1))){
var inst_18867 = cljs.core.async.timeout.call(null,(2000));
var state_18873__$1 = state_18873;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18873__$1,(2),inst_18867);
} else {
if((state_val_18874 === (2))){
var inst_18869 = (state_18873[(2)]);
var inst_18870 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel Client Version <strong>"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client._figwheel_version_),cljs.core.str.cljs$core$IFn$_invoke$arity$1("</strong> is not equal to "),cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel Sidecar Version <strong>"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel_version),cljs.core.str.cljs$core$IFn$_invoke$arity$1("</strong>"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(".  Shutting down Websocket Connection!"),cljs.core.str.cljs$core$IFn$_invoke$arity$1("<h4>To fix try:</h4>"),cljs.core.str.cljs$core$IFn$_invoke$arity$1("<ol><li>Reload this page and make sure you are not getting a cached version of the client.</li>"),cljs.core.str.cljs$core$IFn$_invoke$arity$1("<li>You may have to clean (delete compiled assets) and rebuild to make sure that the new client code is being used.</li>"),cljs.core.str.cljs$core$IFn$_invoke$arity$1("<li>Also, make sure you have consistent Figwheel dependencies.</li></ol>")].join('');
var inst_18871 = figwheel.client.heads_up.display_system_warning.call(null,"Figwheel Client and Server have different versions!!",inst_18870);
var state_18873__$1 = (function (){var statearr_18875 = state_18873;
(statearr_18875[(7)] = inst_18869);

return statearr_18875;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18873__$1,inst_18871);
} else {
return null;
}
}
});})(c__10042__auto__,figwheel_version,temp__4657__auto__))
;
return ((function (switch__9930__auto__,c__10042__auto__,figwheel_version,temp__4657__auto__){
return (function() {
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto__ = null;
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto____0 = (function (){
var statearr_18879 = [null,null,null,null,null,null,null,null];
(statearr_18879[(0)] = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto__);

(statearr_18879[(1)] = (1));

return statearr_18879;
});
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto____1 = (function (state_18873){
while(true){
var ret_value__9932__auto__ = (function (){try{while(true){
var result__9933__auto__ = switch__9930__auto__.call(null,state_18873);
if(cljs.core.keyword_identical_QMARK_.call(null,result__9933__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9933__auto__;
}
break;
}
}catch (e18880){if((e18880 instanceof Object)){
var ex__9934__auto__ = e18880;
var statearr_18881_18883 = state_18873;
(statearr_18881_18883[(5)] = ex__9934__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18873);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18880;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__9932__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18884 = state_18873;
state_18873 = G__18884;
continue;
} else {
return ret_value__9932__auto__;
}
break;
}
});
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto__ = function(state_18873){
switch(arguments.length){
case 0:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto____0.call(this);
case 1:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto____1.call(this,state_18873);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto____0;
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto____1;
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__9931__auto__;
})()
;})(switch__9930__auto__,c__10042__auto__,figwheel_version,temp__4657__auto__))
})();
var state__10044__auto__ = (function (){var statearr_18882 = f__10043__auto__.call(null);
(statearr_18882[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10042__auto__);

return statearr_18882;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10044__auto__);
});})(c__10042__auto__,figwheel_version,temp__4657__auto__))
);

return c__10042__auto__;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.file_line_column = (function figwheel$client$file_line_column(p__18885){
var map__18889 = p__18885;
var map__18889__$1 = ((((!((map__18889 == null)))?((((map__18889.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18889.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18889):map__18889);
var file = cljs.core.get.call(null,map__18889__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__18889__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__18889__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__18891 = "";
var G__18891__$1 = (cljs.core.truth_(file)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18891),cljs.core.str.cljs$core$IFn$_invoke$arity$1("file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):G__18891);
var G__18891__$2 = (cljs.core.truth_(line)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18891__$1),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" at line "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''):G__18891__$1);
if(cljs.core.truth_((function (){var and__6802__auto__ = line;
if(cljs.core.truth_(and__6802__auto__)){
return column;
} else {
return and__6802__auto__;
}
})())){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18891__$2),cljs.core.str.cljs$core$IFn$_invoke$arity$1(", column "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join('');
} else {
return G__18891__$2;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__18892){
var map__18899 = p__18892;
var map__18899__$1 = ((((!((map__18899 == null)))?((((map__18899.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18899.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18899):map__18899);
var ed = map__18899__$1;
var formatted_exception = cljs.core.get.call(null,map__18899__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__18899__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__18899__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__18901_18905 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__18902_18906 = null;
var count__18903_18907 = (0);
var i__18904_18908 = (0);
while(true){
if((i__18904_18908 < count__18903_18907)){
var msg_18909 = cljs.core._nth.call(null,chunk__18902_18906,i__18904_18908);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_18909);

var G__18910 = seq__18901_18905;
var G__18911 = chunk__18902_18906;
var G__18912 = count__18903_18907;
var G__18913 = (i__18904_18908 + (1));
seq__18901_18905 = G__18910;
chunk__18902_18906 = G__18911;
count__18903_18907 = G__18912;
i__18904_18908 = G__18913;
continue;
} else {
var temp__4657__auto___18914 = cljs.core.seq.call(null,seq__18901_18905);
if(temp__4657__auto___18914){
var seq__18901_18915__$1 = temp__4657__auto___18914;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18901_18915__$1)){
var c__7633__auto___18916 = cljs.core.chunk_first.call(null,seq__18901_18915__$1);
var G__18917 = cljs.core.chunk_rest.call(null,seq__18901_18915__$1);
var G__18918 = c__7633__auto___18916;
var G__18919 = cljs.core.count.call(null,c__7633__auto___18916);
var G__18920 = (0);
seq__18901_18905 = G__18917;
chunk__18902_18906 = G__18918;
count__18903_18907 = G__18919;
i__18904_18908 = G__18920;
continue;
} else {
var msg_18921 = cljs.core.first.call(null,seq__18901_18915__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_18921);

var G__18922 = cljs.core.next.call(null,seq__18901_18915__$1);
var G__18923 = null;
var G__18924 = (0);
var G__18925 = (0);
seq__18901_18905 = G__18922;
chunk__18902_18906 = G__18923;
count__18903_18907 = G__18924;
i__18904_18908 = G__18925;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Error on "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_line_column.call(null,ed))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__18926){
var map__18929 = p__18926;
var map__18929__$1 = ((((!((map__18929 == null)))?((((map__18929.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18929.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18929):map__18929);
var w = map__18929__$1;
var message = cljs.core.get.call(null,map__18929__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Compile Warning - "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(message)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(" in "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_line_column.call(null,message))].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[new cljs.core.Var(function(){return figwheel.client.default_on_compile_warning;},new cljs.core.Symbol("figwheel.client","default-on-compile-warning","figwheel.client/default-on-compile-warning",584144208,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-warning","default-on-compile-warning",-18911586,null),"app/dev/js/out_front/figwheel/client.cljs",33,1,357,357,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"message","message",1234475525,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"w","w",1994700528,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_warning)?figwheel.client.default_on_compile_warning.cljs$lang$test:null)])),figwheel.client.default_on_jsload,true,new cljs.core.Var(function(){return figwheel.client.default_on_compile_fail;},new cljs.core.Symbol("figwheel.client","default-on-compile-fail","figwheel.client/default-on-compile-fail",1384826337,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-fail","default-on-compile-fail",-158814813,null),"app/dev/js/out_front/figwheel/client.cljs",30,1,349,349,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"formatted-exception","formatted-exception",1524042501,null),new cljs.core.Symbol(null,"exception-data","exception-data",1128056641,null),new cljs.core.Symbol(null,"cause","cause",1872432779,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"ed","ed",2076825751,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_fail)?figwheel.client.default_on_compile_fail.cljs$lang$test:null)])),false,true,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("ws://"),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str.cljs$core$IFn$_invoke$arity$1("/figwheel-ws")].join(''),false,figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.fill_url_template = (function figwheel$client$fill_url_template(config){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
return cljs.core.update_in.call(null,config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938)], null),(function (x){
return clojure.string.replace.call(null,clojure.string.replace.call(null,x,"[[client-hostname]]",location.hostname),"[[client-port]]",location.port);
}));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"enforce-figwheel-version-plugin","enforce-figwheel-version-plugin",-1916185220),figwheel.client.enforce_figwheel_version_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__6802__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__6802__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__6802__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_message_watch = (function figwheel$client$add_message_watch(key,callback){
return cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,key,(function (_,___$1,___$2,msg_hist){
return callback.call(null,cljs.core.first.call(null,msg_hist));
}));
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__18941 = cljs.core.seq.call(null,plugins);
var chunk__18942 = null;
var count__18943 = (0);
var i__18944 = (0);
while(true){
if((i__18944 < count__18943)){
var vec__18945 = cljs.core._nth.call(null,chunk__18942,i__18944);
var k = cljs.core.nth.call(null,vec__18945,(0),null);
var plugin = cljs.core.nth.call(null,vec__18945,(1),null);
if(cljs.core.truth_(plugin)){
var pl_18951 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__18941,chunk__18942,count__18943,i__18944,pl_18951,vec__18945,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_18951.call(null,msg_hist);
});})(seq__18941,chunk__18942,count__18943,i__18944,pl_18951,vec__18945,k,plugin))
);
} else {
}

var G__18952 = seq__18941;
var G__18953 = chunk__18942;
var G__18954 = count__18943;
var G__18955 = (i__18944 + (1));
seq__18941 = G__18952;
chunk__18942 = G__18953;
count__18943 = G__18954;
i__18944 = G__18955;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__18941);
if(temp__4657__auto__){
var seq__18941__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18941__$1)){
var c__7633__auto__ = cljs.core.chunk_first.call(null,seq__18941__$1);
var G__18956 = cljs.core.chunk_rest.call(null,seq__18941__$1);
var G__18957 = c__7633__auto__;
var G__18958 = cljs.core.count.call(null,c__7633__auto__);
var G__18959 = (0);
seq__18941 = G__18956;
chunk__18942 = G__18957;
count__18943 = G__18958;
i__18944 = G__18959;
continue;
} else {
var vec__18948 = cljs.core.first.call(null,seq__18941__$1);
var k = cljs.core.nth.call(null,vec__18948,(0),null);
var plugin = cljs.core.nth.call(null,vec__18948,(1),null);
if(cljs.core.truth_(plugin)){
var pl_18960 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__18941,chunk__18942,count__18943,i__18944,pl_18960,vec__18948,k,plugin,seq__18941__$1,temp__4657__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_18960.call(null,msg_hist);
});})(seq__18941,chunk__18942,count__18943,i__18944,pl_18960,vec__18948,k,plugin,seq__18941__$1,temp__4657__auto__))
);
} else {
}

var G__18961 = cljs.core.next.call(null,seq__18941__$1);
var G__18962 = null;
var G__18963 = (0);
var G__18964 = (0);
seq__18941 = G__18961;
chunk__18942 = G__18962;
count__18943 = G__18963;
i__18944 = G__18964;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var args18965 = [];
var len__7923__auto___18972 = arguments.length;
var i__7924__auto___18973 = (0);
while(true){
if((i__7924__auto___18973 < len__7923__auto___18972)){
args18965.push((arguments[i__7924__auto___18973]));

var G__18974 = (i__7924__auto___18973 + (1));
i__7924__auto___18973 = G__18974;
continue;
} else {
}
break;
}

var G__18967 = args18965.length;
switch (G__18967) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args18965.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
return (
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.fill_url_template.call(null,figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370)))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.enable_repl_print_BANG_.call(null);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

var seq__18968_18976 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"initial-messages","initial-messages",2057377771).cljs$core$IFn$_invoke$arity$1(system_options));
var chunk__18969_18977 = null;
var count__18970_18978 = (0);
var i__18971_18979 = (0);
while(true){
if((i__18971_18979 < count__18970_18978)){
var msg_18980 = cljs.core._nth.call(null,chunk__18969_18977,i__18971_18979);
figwheel.client.socket.handle_incoming_message.call(null,msg_18980);

var G__18981 = seq__18968_18976;
var G__18982 = chunk__18969_18977;
var G__18983 = count__18970_18978;
var G__18984 = (i__18971_18979 + (1));
seq__18968_18976 = G__18981;
chunk__18969_18977 = G__18982;
count__18970_18978 = G__18983;
i__18971_18979 = G__18984;
continue;
} else {
var temp__4657__auto___18985 = cljs.core.seq.call(null,seq__18968_18976);
if(temp__4657__auto___18985){
var seq__18968_18986__$1 = temp__4657__auto___18985;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18968_18986__$1)){
var c__7633__auto___18987 = cljs.core.chunk_first.call(null,seq__18968_18986__$1);
var G__18988 = cljs.core.chunk_rest.call(null,seq__18968_18986__$1);
var G__18989 = c__7633__auto___18987;
var G__18990 = cljs.core.count.call(null,c__7633__auto___18987);
var G__18991 = (0);
seq__18968_18976 = G__18988;
chunk__18969_18977 = G__18989;
count__18970_18978 = G__18990;
i__18971_18979 = G__18991;
continue;
} else {
var msg_18992 = cljs.core.first.call(null,seq__18968_18986__$1);
figwheel.client.socket.handle_incoming_message.call(null,msg_18992);

var G__18993 = cljs.core.next.call(null,seq__18968_18986__$1);
var G__18994 = null;
var G__18995 = (0);
var G__18996 = (0);
seq__18968_18976 = G__18993;
chunk__18969_18977 = G__18994;
count__18970_18978 = G__18995;
i__18971_18979 = G__18996;
continue;
}
} else {
}
}
break;
}

return figwheel.client.socket.open.call(null,system_options);
})))
;
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;

figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__7930__auto__ = [];
var len__7923__auto___19001 = arguments.length;
var i__7924__auto___19002 = (0);
while(true){
if((i__7924__auto___19002 < len__7923__auto___19001)){
args__7930__auto__.push((arguments[i__7924__auto___19002]));

var G__19003 = (i__7924__auto___19002 + (1));
i__7924__auto___19002 = G__19003;
continue;
} else {
}
break;
}

var argseq__7931__auto__ = ((((0) < args__7930__auto__.length))?(new cljs.core.IndexedSeq(args__7930__auto__.slice((0)),(0),null)):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__7931__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__18998){
var map__18999 = p__18998;
var map__18999__$1 = ((((!((map__18999 == null)))?((((map__18999.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18999.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18999):map__18999);
var opts = map__18999__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq18997){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq18997));
});

figwheel.client.fetch_data_from_env = (function figwheel$client$fetch_data_from_env(){
try{return cljs.reader.read_string.call(null,goog.object.get(window,"FIGWHEEL_CLIENT_CONFIGURATION"));
}catch (e19005){if((e19005 instanceof Error)){
var e = e19005;
cljs.core._STAR_print_err_fn_STAR_.call(null,"Unable to load FIGWHEEL_CLIENT_CONFIGURATION from the environment");

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoload","autoload",-354122500),false], null);
} else {
throw e19005;

}
}});
figwheel.client.console_intro_message = "Figwheel has compiled a temporary helper application to your :output-file.\n\nThe code currently in your configured output file does not\nrepresent the code that you are trying to compile.\n\nThis temporary application is intended to help you continue to get\nfeedback from Figwheel until the build you are working on compiles\ncorrectly.\n\nWhen your ClojureScript source code compiles correctly this helper\napplication will auto-reload and pick up your freshly compiled\nClojureScript program.";
figwheel.client.bad_compile_helper_app = (function figwheel$client$bad_compile_helper_app(){
cljs.core.enable_console_print_BANG_.call(null);

var config = figwheel.client.fetch_data_from_env.call(null);
cljs.core.println.call(null,figwheel.client.console_intro_message);

figwheel.client.heads_up.bad_compile_screen.call(null);

if(cljs.core.truth_(goog.dependencies_)){
} else {
goog.dependencies_ = true;
}

figwheel.client.start.call(null,config);

return figwheel.client.add_message_watch.call(null,new cljs.core.Keyword(null,"listen-for-successful-compile","listen-for-successful-compile",-995277603),((function (config){
return (function (p__19009){
var map__19010 = p__19009;
var map__19010__$1 = ((((!((map__19010 == null)))?((((map__19010.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19010.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19010):map__19010);
var msg_name = cljs.core.get.call(null,map__19010__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return location.href = location.href;
} else {
return null;
}
});})(config))
);
});

//# sourceMappingURL=client.js.map