(ns skarbnik.utils
  (:require
   [clojure.string :as string]
   [goog.labs.format.csv :as csv]))


;; CSV->maps convertor fns

(defn str->keys
  [s]
  (keyword
   (string/join
    (string/split s #"\s"))))

(defn get-categories
  "Parses first row of vector of vectors of csv data to get headers.
   Renames any name similar to `date`, `amount` and `category` to create api."
  [csv]
  (let [cats (map str->keys (first csv))]
    ()))

(defn csv->maps
  "Takes array of arrays with csv data, returns maps with categories added as keys."
  [csv]
  (let [categories (get-categories csv)
        entries    (rest csv)]
    (map (partial zipmap categories) entries)))

;; TODO: `csv/parse` returns vector of vectors.
;; Should parse first row to get headers, however, assumption should be only for `date`, `amount` and `category`.
;; All other headers must be displayed as they are in csv file.
;; Then map all the headers to every entry in a vector.
(defn parse-csv
  [csv]
  (-> csv
      csv/parse
      js->clj
      csv->maps))

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
