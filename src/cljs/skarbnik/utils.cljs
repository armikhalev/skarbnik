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
    cats)) ;; TODO: finish implementation acc.to doc string

(defn csv->maps
  "Takes array of arrays with csv data, returns maps with categories added as keys."
  [csv]
  (let [categories (get-categories csv)
        entries    (rest csv)]
    (map (partial zipmap categories) entries)))

(defn parse-csv
  "Takes csv data converts it to clojure vector. Returns maps"
  [csv]
  (-> csv
      csv/parse
      js->clj
      csv->maps))

;; ENDs CSV->maps convertor fns


;; Maps->CSV convertor fns

(defn unzip-maps
  "Unzips maps into vector of vectors adding keys as the first vector"
  [maps]
  ;; Get keys that are categories to get all the values in `for` comprehension
  (let [cats (keys (first maps))]
    (->> maps
         (map vals)
         (map vec)
         (cons (->> cats
                    (map name)
                    vec)))))

(defn maps->js
  "Converts clojure array of maps to js array of arrays"
  [maps]
  (->> maps
       unzip-maps
       (map (partial clojure.string/join ", "))
       (clojure.string/join "\n")))
;; ENDs Maps->CSV convertor fns


(defn cents->dollars
  "Converts cents integers to dollars float numbers.
   Returns string."
  [cents]
  (.toFixed (/ cents 100) 2))


(defn dollars->cents
  [dollars]
  (js/parseInt (* dollars 100)))


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
