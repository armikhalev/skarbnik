(ns skarbnik.utils
  (:require
   [clojure.string :as string]))


;; CSV->maps convertor fns

(defn split [sep s]
  (clojure.string/split s sep))


(defn lines
  [sep contents]
  (->> contents
       (split #"\n")
       (map (partial split sep))))


(defn str->keys
  [s]
  (keyword
   (string/join
    (string/split s #"\s"))))


(defn maps
  [sep contents]
  (let [lines (lines sep contents)
        cols- (first lines)
        cols  (map str->keys cols-)
        rows (rest lines)]
    (map (partial zipmap cols) rows)))

(defn scv->maps
  [scv]
  (maps #"," scv))

;; ENDs CSV->maps convertor fns


(defn get-total
  "`data` list of maps with key `:Amount`"
  [data comparator-symbol]
  (reduce
   (fn [acc d]
     (if (comparator-symbol (:Amount d) 0)
       (+ acc (js/parseFloat (:Amount d)))
       acc))
   0
   data))
