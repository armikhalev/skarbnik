(ns skarbnik.odd-specs
  (:require
   [cljs-time.core :as cl-time]
   [clojure.spec.gen.alpha :as gen]
   [clojure.spec.alpha :as s]))

(defn ints->clj-time
  [[y m d]]
  (cl-time/date-time y m d))

(def some-dates
  (take 10 (iterate
           #(->> % second (+ 1) (assoc % 1))
           [2012 1 1])))

(def some-str-dates
  (set
   (map #(clojure.string/join "/" %)
        some-dates)))

;;; SPECS

(s/def ::amount int?)
(s/def ::description string?)

;; NOTE: This might be the case where Spec can't give two possible values for same key (`:date` here)
(s/def ::date (set (map ints->clj-time some-dates)))

(s/def ::transaction (s/keys :req-un [::date ::amount ::description]))
(s/def ::transactions
  (s/coll-of ::transaction))
