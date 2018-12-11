(ns skarbnik.logic
  (:require
   [clojure.string :as string]
   [clojure.spec.alpha :as s]
   [ghostwheel.tracer]
   [ghostwheel.core :as g
    :refer [>defn >defn- >fdef => | <- ?]]
   [goog.labs.format.csv :as csv]))


;; CSV->maps convertor fns

(>defn str->keys
  "Takes a string of words separated by space, returns joined string as a keyword."
  [s]
  [string?
   => keyword?]
  (keyword
   (string/join
    (string/split s #"\s"))))


;; STARTS: get-categories
(s/def ::csv-vectors? (s/coll-of (s/coll-of map? :kind vector?) ))

(>defn get-categories
  "Parses first row of vector of vectors of csv data to get headers.
   Renames any name similar to `date`, `amount` and `category` to create api."
  [csv]
  [::csv-vectors?
   => seq?]
  (let [cats (map str->keys (first csv))]
    cats)) ;; TODO: finish implementation acc.to doc string
;; ENDS: get-categories


;; STARTS: csv->maps
(>defn csv->maps
  "Takes array of arrays with csv data, returns maps with categories added as keys."
  [csv]
  [::csv-vectors?
   => seq?] ;; TODO: Should check for `date`, `amount` and `category` as keys
  (let [categories (get-categories csv)
        entries    (rest csv)]
    (map (partial zipmap categories) entries)))
;; ENDS: csv->maps


;; STARTS: CSV->maps convertor fns
(>defn parse-csv
  "Takes csv data converts it to clojure vector. Returns maps"
  [csv]
  [string?
   => seq?] ;; TODO: should be more clear on what actually is returned
  (-> csv
      csv/parse
      js->clj
      csv->maps))
;; ENDS: CSV->maps convertor fns


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Maps->CSV convertor fns ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

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


(>defn get-total
  "`data` list of maps with key `:Amount`"
  [data comparator-symbol]
  [vector? symbol?
   => string?]
  (cents->dollars
   (reduce
    (fn [acc d]
      (if (comparator-symbol (:Amount d) 0)
        (+ acc (dollars->cents (js/parseFloat (:Amount d))))
        acc))
    0
    data)))

;; Dates
(defn mdy->ymd
  "Converts date format MM/DD/YYYY to YYYY-MM-DD."
  [mdy]
  (let [date (clojure.string/split mdy #"/"),
        year (last date),
        rest- (take 2 date)]
    (clojure.string/join "-" (conj rest- year))))


(defn date->ints
  "Converts date string of form YYYY-MM-DD to list of integers."
  [date]
  (vec (map js/parseInt (clojure.string/split date #"-"))))


(defn compare-dates
  "Compares two lists of dates integers of form YYYY-MM-DD using comparison operator.
   Returns boolean."
  [comparator-symbol first-date second-date]
  (not (some false?
            (map
             (partial comparator-symbol)
             first-date second-date))))


(defn filter-by-date
  "Filters out entries that are bigger than `from-date` and less than `to-date`.
   Expects `entry` to have key `Trans.Date`."
  [entries from-date to-date]
  (filter
   (fn [entry]
     (let [date (:Trans.Date entry)]
       (and (compare-dates >= (date->ints (mdy->ymd date)) (date->ints from-date))
            (compare-dates <= (date->ints (mdy->ymd date)) (date->ints to-date)))))
   entries))
;; ENDs Dates

(defn get-maps-categories-str
  [maps]
  (-> maps
      first
      keys
      (->> , (map name))
      vec))


(defn get-maps-categories
  "Takes a vector of maps that is csv data, takes first row and gets the keys."
  [maps]
  (-> maps
      first
      keys))

(g/check)
