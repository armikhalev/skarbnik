// Compiled by ClojureScript 1.9.473 {:elide-asserts true, :target :nodejs}
goog.provide('skarbnik.core');
goog.require('cljs.core');
goog.require('cljs.nodejs');
skarbnik.core.path = cljs.nodejs.require.call(null,"path");
skarbnik.core.Electron = cljs.nodejs.require.call(null,"electron");
skarbnik.core.BrowserWindow = skarbnik.core.Electron.BrowserWindow;
skarbnik.core.crash_reporter = skarbnik.core.Electron.crashReporter;
skarbnik.core.Os = cljs.nodejs.require.call(null,"os");
skarbnik.core._STAR_win_STAR_ = cljs.core.atom.call(null,null);
skarbnik.core.app = skarbnik.core.Electron.app;
skarbnik.core._main = (function skarbnik$core$_main(){
skarbnik.core.crash_reporter.start(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"companyName","companyName",2030952346),"Sen Mikhalev",new cljs.core.Keyword(null,"submitURL","submitURL",-169159433),"http://skarbnik.com/"], null)));

cljs.nodejs.process.on("error",(function (err){
return console.log(err);
}));

skarbnik.core.app.on("window-all-closed",(function (){
if(cljs.core.not_EQ_.call(null,cljs.nodejs.process.platform,"darwin")){
return skarbnik.core.app.quit();
} else {
return null;
}
}));

return skarbnik.core.app.on("ready",(function (){
cljs.core.reset_BANG_.call(null,skarbnik.core._STAR_win_STAR_,(new skarbnik.core.BrowserWindow(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),(800),new cljs.core.Keyword(null,"height","height",1025178622),(600)], null)))));

cljs.core.deref.call(null,skarbnik.core._STAR_win_STAR_).loadURL([cljs.core.str.cljs$core$IFn$_invoke$arity$1("file://"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(skarbnik.core.path.resolve(__dirname,"../index.html"))].join(''));

return cljs.core.deref.call(null,skarbnik.core._STAR_win_STAR_).on("closed",(function (){
return cljs.core.reset_BANG_.call(null,skarbnik.core._STAR_win_STAR_,null);
}));
}));
});
cljs.nodejs.enable_util_print_BANG_.call(null);
console.log([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Start descjop application on "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(skarbnik.core.Os.type()),cljs.core.str.cljs$core$IFn$_invoke$arity$1(".")].join(''));
cljs.core._STAR_main_cli_fn_STAR_ = skarbnik.core._main;
