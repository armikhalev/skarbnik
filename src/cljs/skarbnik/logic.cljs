(ns skarbnik.logic
  (:require
   [clojure.string :as string]
   [clojure.spec.alpha :as s]
   [ghostwheel.core :as g
    :refer [>defn >defn- >fdef => | <- ?]]
   [goog.labs.format.csv :as csv]))

(defn add [a b] (+ a b))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; CSV->maps convertor fns ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(>defn str->keys
  "Takes a string of words separated by space, returns joined string.
   NOTE: returns string not keyword."
  [s]
  [string?
   => string?]
  (string/join
   (string/split s #"\s")))


;; STARTS: get-categories
(s/def ::csv-vectors?
  (s/coll-of
   (s/coll-of string? :kind vector?)
   :kind vector?))

(s/def ::date string?)
(s/def ::amount string?)
(s/def ::description string?)

(s/def ::description (s/keys :req-un [::date ::amount ::description]))
(s/def ::categories?
  (s/coll-of ::description))

(defn find-cat
  [s re]
  (re-find re (clojure.string/lower-case s)))

(def cats [#"date" #"amount" #"description"])

(defn categorize
  "Finds strings similar to `date`, `amount` and `description` to create api, changes them to the named ones.
   Returns seq of keys."
  [cats data]
  (map
   (fn [s]
     (let [found (filter
                  (partial find-cat s)
                  cats)]
       (if (> (count found) 0)
         (keyword (find-cat s (first found)))
         (keyword s))))
   data))


;; Check if all the required categories are in the derived categories vector
(def req-cats [:date :amount :description])

(defn all-cats?
  "Returns vector intersection of two vectors."
  [req-cats cats]
  (vec
   (clojure.set/intersection
    (set req-cats) (set cats))))

(defn diff-cats
  "Returns vector difference between two vectors."
  [req-cats cats]
  (vec (clojure.set/difference
       (set req-cats) (set cats))))

(>defn get-categories
  "Parses first row of vector of vectors of strings to get headers.
   Returns either vector of keys including `req-cats` or missing keys."
  ;; {::g/trace 4}
  [csv]
  [::csv-vectors?
   => (s/or :diffs vector?
            :cats  ::categories?)]

  (let [data-cats (map str->keys (first csv))
        categories (categorize cats data-cats)]
    (if (= 3 (count (all-cats? req-cats categories)))
      categories
      (diff-cats req-cats categories))))
;; ENDS: get-categories


;; STARTS: csv->maps
(>defn csv->maps
  "Takes array of arrays with csv data, returns maps with categories added as keys."
  ;; {::g/trace 4}
  [csv]
  [::csv-vectors?
   => (s/coll-of map?)]

  (let [categories (get-categories csv)
        entries    (rest csv)]
    (map (partial zipmap categories) entries)))
;; ENDS: csv->maps


;; STARTS: CSV->maps convertor fns
(>defn parse-csv
  "Takes csv data converts it to clojure vector. Returns maps"
  [csv]
  [string?
   => (s/coll-of map?)]

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


;;;;;;;;;;;;;;;;
;; Amount fns ;;
;;;;;;;;;;;;;;;;

(defn cents->dollars
  "Converts cents integers to dollars float numbers.
   Returns string."
  [cents]
  (.toFixed (/ cents 100) 2))


(defn dollars->cents
  [dollars]
  (js/parseInt (* dollars 100)))


(>defn get-total
  "`data` list of maps with key `:amount`"
  [data comparator-symbol]
  [vector? symbol?
   => string?]
  (cents->dollars
   (reduce
    (fn [acc d]
      (if (comparator-symbol (:amount d) 0)
        (+ acc (dollars->cents (js/parseFloat (:amount d))))
        acc))
    0
    data)))
;; ENDS: Amount fns


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
   Expects `entry` to have key `:date`."
  [entries from-date to-date]
  (filter
   (fn [entry]
     (let [date (:date entry)]
       (and (compare-dates >= (date->ints (mdy->ymd date)) (date->ints from-date))
            (compare-dates <= (date->ints (mdy->ymd date)) (date->ints to-date)))))
   entries))
;; ENDs Dates

(defn get-maps-categories-str
  "[{}] -> [String]"
  [maps]
  (-> maps
      first
      keys
      (->> , (map name))
      vec))


(defn get-maps-categories
  "[{}] -> [Keyword]"
  [maps]
  (-> maps
      first
      keys))

;; (g/check)
