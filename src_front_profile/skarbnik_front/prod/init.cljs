(ns skarbnik-front.init
    (:require [skarbnik-front.core :as core]
              [skarbnik-front.conf :as conf]))

(enable-console-print!)

(defn start-descjop! []
  (core/init! conf/setting))

(start-descjop!)
