// Compiled by ClojureScript 1.9.473 {:static-fns true, :optimize-constants true, :elide-asserts true}
goog.provide('skarbnik_front.init');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('skarbnik_front.core');
goog.require('skarbnik_front.conf');
cljs.core.enable_console_print_BANG_();
skarbnik_front.init.start_descjop_BANG_ = (function skarbnik_front$init$start_descjop_BANG_(){
return skarbnik_front.core.init_BANG_(skarbnik_front.conf.setting);
});
skarbnik_front.init.start_descjop_BANG_();
