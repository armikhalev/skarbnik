(ns skarbnik.utils
  (:require
   [clojure.string :as string]
   [goog.labs.format.csv :as csv]))


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

;; TODO: `csv/parse` returns vector of vectors.
;; Should parse first row to get headers, however, assumption should be only for `date`, `amount` and `category`.
;; All other headers must be displayed as they are in csv file.
;; Then map all the headers to every entry in a vector.
(defn scv->maps
  [scv]
  (-> scv
      csv/parse
      js->clj))

#_(defn scv->maps
  [scv]
  (maps #"," scv))

;; ENDs CSV->maps convertor fns


(defn cents->dollars
  "Converts cents integers to dollars float numbers.
   Returns string."
  [cents]
  (.toFixed (/ cents 100) 2))


(defn dollars->cents
  [dollars]
  (* dollars 100))


(defn get-total
  "`data` list of maps with key `:Amount`"
  [data comparator-symbol]
  (cents->dollars
   (reduce
    (fn [acc d]
      (if (comparator-symbol (:Amount d) 0)
        (+ acc (dollars->cents (js/parseFloat (:Amount d))))
        acc))
    0
    data)))
