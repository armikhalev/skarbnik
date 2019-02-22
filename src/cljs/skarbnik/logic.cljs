(ns skarbnik.logic
  (:require
   [clojure.string :as string]
   [clojure.spec.alpha :as s]
   [ghostwheel.core :as g
    :refer [>defn >defn- >fdef => | <- ?]]
   [goog.labs.format.csv :as csv]))

;;;;;;;;;;;;;;;;
;; Amount fns ;;
;;;;;;;;;;;;;;;;

(defn is-number?
  "Checks if value is number and not `NaN`."
  [v]
  (and (number? v) (not (js/Number.isNaN v))))


(>defn cents->dollars
  "Converts cents integers to dollars float numbers.
   Returns string."
  [cents]
  [int? =>
   string?]
  (.toFixed (/ cents 100) 2))


(defn dollars->cents
  [dollars]
  (js/parseInt (* dollars 100)))


(>defn get-sum
  "Returns sum of integers, that represent cents, in dollars."
  ;; {::g/trace true}
  [v1 v2]
  [int? int? => ;; TODO: figure out how to check for float
   int?]
  (+ v1 v2))


(>defn get-total
  "`data`: [{`:amount` val}]"
  ;; {::g/trace true}
  [data comparator-symbol]
  [vector? symbol?
   => int?]
  (reduce
   (fn [acc d]
     (if (comparator-symbol (:amount d) 0)
       (+ acc (:amount d))
       acc))
   0
   data))
;; (g/check)


(defn sum-recur-amounts
  "{int? {`:amount` int?}} -> (int? :kind number?)"
  [recur-data]
  (reduce
   (fn [sum [k v]]
     (+ sum (:amount v)))
   0
   recur-data))

;; ENDS: Amount fns


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; CSV->maps convertor fns ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(>defn str->keys
  "Takes a string of words separated by space, returns joined string.
   NOTE: returns string not keyword."
  ;; {::g/trace true}
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


(defn amount->ints
  [data]
  (let [ret (map
             #(update
               % :amount
               (comp dollars->cents js/parseFloat))
             data)]
    (do
      (prn "FIXME: logic/amount->ints")
      ret)))

;; STARTS: CSV->maps convertor fns
(>defn parse-csv
  "Takes csv data converts it to clojure vector. Returns maps"
  ;; {::g/trace 4}
  [csv]
  [string?
   => (s/coll-of map?)]

  (when csv ;; null-check
    (-> csv
        csv/parse
        js->clj
        csv->maps
        amount->ints)))
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
  "Compares two lists of dates, integers of form [YYYY MM DD] using comparison operator.
   Returns boolean."
  [comparator-symbol first-date second-date]
  (or
   ;; If dates are different, filter out
   (some false?
         (map
          comparator-symbol
          first-date second-date))
   ;; If dates are the same should include them
   (every? true?
           (map = first-date second-date))))

(comment
  ;;; f >= s
  [2018 12 9]
  [2018 11 12]
  ;; lessEq
  '(true false true)
  [2018 12 9]
  [2018 12 12]
  '(true true true)
  [2018 12 10]
  [2018 12 05]
  '(true true false)

  ;;; f <= s
  [2018 11 10]
  [2018 12 05]
  '(true false true)
  ;; MoreEq
  [2018 12 9]
  [2018 12 1]
  '(true true true)
  [2018 12 05]
  [2018 12 10]
  '(true true false)
  )

(defn filter-by-date
  "Filters out entries that are bigger than `from-date` and less than `to-date`.
   Expects `entry` to have key `:date`."
  [entries from-date to-date]
  (filter
   (fn [entry]
     (let [date (:date entry)]
       (and (compare-dates <= (date->ints (mdy->ymd date)) (date->ints from-date))
            (compare-dates >= (date->ints (mdy->ymd date)) (date->ints to-date)))))
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
