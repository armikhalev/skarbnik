(ns user
  (:use [figwheel-sidecar.repl-api :as ra]))

(def figwheel-config
  {:figwheel-options {:css-dirs ["app/css"]}
   :build-ids ["dev"]
   :all-builds
   [{:id "dev"
     :figwheel {:on-jsload "skarbnik.core/mount-root"}
     :source-paths ["src/cljs" "env/dev/cljs"]
     :compiler {:main "skarbnik.dev"
                :asset-path "js/p/out"
                :output-to "app/js/p/app.js"
                :output-dir "app/js/p/out" }}]})

(defn start [] (ra/start-figwheel! figwheel-config))
(defn stop [] (ra/stop-figwheel!))
(defn cljs [] (ra/cljs-repl "dev"))
