(defproject skarbnik "0.1.0-alpha1"
  :description "Skarbnik - personal finance analyzing tool"
  :url "http://skarbnik.com/"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :source-paths ["src/cljs"]

  :dependencies [[org.clojure/clojure "1.10.0"]
                 [org.clojure/clojurescript "1.10.339"]
                 [devcards "0.2.6" :exclusions [org.clojure/clojure]]
                 [gnl/ghostwheel.tracer "0.3.5"]
                 [gnl/ghostwheel "0.3.5"]
                 [cljsjs/nodejs-externs "1.0.4-1"]
                 [reagent "0.8.1"]]

  :plugins [[lein-cljsbuild "1.1.7"]]

  :min-lein-version "2.5.3"

  :cljsbuild {:builds {:app {:source-paths ["src/cljs"]
                             :compiler {:output-to     "app/js/p/app.js"
                                        :output-dir    "app/js/p/out"
                                        :asset-path    "js/p/out"
                                        :optimizations :none
                                        :pretty-print  true
                                        :cache-analysis true}}

                       ;;; NOTE: For PROD the below devcards dev built config must be commented out
                       :devcards-test
                       {:source-paths ["env/dev/cljs" "test"]
                                       :figwheel {:devcards true}
                                       :compiler {:main runners.browser
                                                  :optimizations :none
                                                  :asset-path "cljs/tests/out"
                                                  :output-dir "resources/public/cljs/tests/out"
                                                  :output-to "resources/public/cljs/tests/all-tests.js"
                                                  :source-map-timestamp true}}}}

  :clean-targets ^{:protect false} [:target-path "out" "app/js/p"]

  :figwheel {:css-dirs ["app/css"]}
  :repl-options {:nrepl-middleware [cider.piggieback/wrap-cljs-repl]}

  :profiles {:dev {:cljsbuild {:builds {:app {:source-paths ["env/dev/cljs"]
                                              :compiler {:source-map true
                                                         :main       "skarbnik.dev"
                                                         :verbose true
                                                         :preloads [devtools.preload]
                                                         :external-config {:ghostwheel
                                                                           {:check     true
                                                                            :num-tests 10}}}
                                              :figwheel {:on-jsload "skarbnik.core/mount-root"}}}}
                   :source-paths ["env/dev/cljs"]

                   :dependencies [[figwheel-sidecar "0.5.17"]
                                  [binaryage/devtools "0.9.10"]
                                  [cider/piggieback "0.3.1"]]

                   :plugins [[lein-ancient "0.6.8"]
                             [lein-kibit "0.1.2"]
                             [lein-cljfmt "0.4.1"]
                             [lein-figwheel "0.5.17"]]}

             :production {:cljsbuild {:builds {:app {:compiler {:optimizations :advanced
                                                                :main          "skarbnik.prod"
                                                                :parallel-build true
                                                                :cache-analysis false
                                                                :closure-defines {"goog.DEBUG" false}
                                                                :externs ["externs/misc.js"]
                                                                :pretty-print false}
                                                     :source-paths ["env/prod/cljs"]}}}}}
  )
