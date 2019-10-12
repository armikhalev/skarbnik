(ns skarbnik.logic
  (:require
   [clojure.string :as string]
   [clojure.pprint :as pp :refer [pprint]]
   [cljs-time.core :as cl-time]
   [cljs-time.coerce :as ->cl-time]
   [clojure.spec.alpha :as s]
   [skarbnik.odd-specs :as odd-specs]
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
  "Returns sum of integers, that represent cents, in dollars.
   Spec here mostly to `trace` if we get Integers and not Floats"
  ;; {::g/trace true}
  [v1 v2]
  [int? int? =>
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
  (if (seq recur-data)
    (reduce
     (fn [sum m]
       (+ sum (get m :amount 0)))
     0
     recur-data)
    ;; else
    0))

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

(s/def ::date odd-specs/some-str-dates)
(s/def ::amount int?)
(s/def ::description string?)
(s/def ::_sk-id uuid?)

(s/def ::transaction (s/keys :req-un [::_sk-id ::date ::amount ::description]))
(s/def ::transactions (s/coll-of ::transaction))

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


;; Check if all the required categories are in the derived transactions vector
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
  "Parses first row of `[[string?]]` to get headers.
   Returns either vector of keys including `req-cats` or missing keys."
  ;; {::g/trace 4}
  [csv]
  [::csv-vectors?
   => (s/or :diffs vector?
            :cats  ::transactions)]

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

(defn remove-empty-maps
  "Removes empty maps from vector.
   Used to prevent empty lines from csv breaking the app."
  [v]
  (filter seq v))

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
        remove-empty-maps
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


(defn date->strs
  "Converts date string of form YYYY-MM-DD to list of strings."
  [date]
  ;; get only year-month-day, splitting out everything after 'T' (seconds etc.)
  (let [ymd (first (clojure.string/split date #"T"))]
    (clojure.string/split ymd #"-")))

(defn date->ints
  "Converts date string of form YYYY-MM-DD to list of integers."
  [date]
  ;; get only year-month-day, splitting out everything after 'T' (seconds etc.)
  (as-> date $d
      (first (clojure.string/split $d #"T"))
      (clojure.string/split $d #"-")
      (map js/parseInt $d)))

(defn ymd->mdy
  "Converts date format YYYY-MM-DD to MM/DD/YYYY."
  [mdy]
  (let [date (date->strs mdy)
        year (first date),
        month-day    (vec (rest date))]
    (clojure.string/join "/" (conj month-day year))))

(defn a-str-date->cljs-time
  "String`y-m-d` -> Object`:cl-time`"
  [date]
  (->> date
       date->ints
       (apply cl-time/date-time)))

(defn str-dates->cljs-time
  "Takes parsed csv data, updates `:date` values to cljs-time instances."
  [csv]
  (map
   (fn [m]
     (update m :date
             #(->cl-time/from-date (js/Date. %))))
   csv))

(defn cljs-time->str
  "Takes instance of cljs-time and converts it to a string in format `M/D/Y`"
  [val]
  (-> val
      ->cl-time/to-string
      ymd->mdy))

(defn mdy->ymd
  "Converts date format MM/DD/YYYY to YYYY-MM-DD."
  [mdy]
  (let [date (clojure.string/split mdy #"/"),
        year (last date),
        rest- (take 2 date)]
    (clojure.string/join "-" (conj rest- year))))


(defn filter-by-date
    "Filters out entries that are bigger than `from-date` and less than `to-date`.
     Expects `entry` to have key `:date`"
    [entries
     from-date
     to-date]
  (let [$from-date (a-str-date->cljs-time from-date)
        $to-date   (a-str-date->cljs-time to-date)]
    (filterv
     (fn [entry]
       (let [date (-> entry :date mdy->ymd a-str-date->cljs-time)]
         (and (or (cl-time/equal?  date $from-date)
                  (cl-time/after?  date $from-date))
              (or (cl-time/equal?  date $to-date)
                  (cl-time/before? date $to-date)))))
     entries)))

(defn sort-by-date
  "{:date 'mm/dd/yyyy'} -> sorted"
  [data]
  (sort-by
   :date
   #(cl-time/before?
     (-> %1 mdy->ymd a-str-date->cljs-time)
     (-> %2 mdy->ymd a-str-date->cljs-time))
   data))

(defn sort-by-cljs-date
  "{:date 'mm/dd/yyyy'} -> sorted"
  [data]
  (sort-by
   :date
   #(cl-time/before? %1 %2)
   data))

;; ENDs Dates


;; STARTs: Big amounts


(s/def ::cl-time-transaction (s/keys :req-un [::odd-specs/date ::amount ::description]))
(s/def ::cl-time-transactions (s/coll-of ::cl-time-transaction))

(s/def ::bigs       (s/coll-of ::cl-time-transaction))
(s/def ::a-paid-off (s/keys :req-un [::odd-specs/date ::amount ::description ::bigs]))
(s/def ::paid-offs  (s/coll-of ::a-paid-off))


(>defn payments
  "Gets all the credit payments.
   If value of the `:amount` is negative, then it is credit payment."
  ;; {::g/trace 4}
  [data]
  [::transactions
   => ::transactions | #(every? (fn [v] (< (:amount v) 0)) %)]
  (filter #(< (:amount %) 0) data))

;; ->

(defn filter-bigs-by-date
  "[{:date cljs-time?}], {:date cljs-time?}, :after | :before? -> ::bigs"
  [bigs paid when?]
  (case when?
    :after (filter #(cl-time/after?  (:date %) (:date paid)) bigs)
    :before (concat
             (filter #(cl-time/equal?  (:date %) (:date paid)) bigs)
             (filter #(cl-time/before? (:date %) (:date paid)) bigs))))


(>defn paids-with-bigs
  "1st step of paids getting bigs.
   [{:date}], [{:date}] -> [{:bigs []}]"
  [paids bigs]
  [::cl-time-transactions ::cl-time-transactions
   => ::paid-offs]
  (loop [p  paids
         bs bigs
         r  []]
    (let [fp (first p)]
      (if (empty? p)
        r
        ;; else
        (recur (rest p)
               (filter-bigs-by-date bs fp :after)
               (conj r (update
                        fp :bigs
                        (conj [] (filter-bigs-by-date bs fp :before)))))))))
;; <-

;; ->

(>defn diff-paid-bigs
  "Takes a map of paid debt with `:bigs` vector.
   Returns difference of (- bigs paid)."
  ;; {::g/trace 4}
  [big-paid]
  [::a-paid-off
   => number? | #(>= % 0)]
  (let [paid      (:amount        big-paid)
        bigs      (:bigs          big-paid)
        debt      (:overflow-debt big-paid)
        bigs-sum  (reduce #(+ % (:amount %2)) 0 bigs)
        bigs-paid (+ bigs-sum paid)
        debt?     (> debt 0)
        bigs?     (seq bigs)
        res       (cond
                    (and debt? bigs?) (+ debt bigs-paid)
                    debt?             (+ debt paid) ;; plus, because `paid` is negative number
                    bigs?             bigs-paid
                    :else             0)]
    (if (> res 0)
      res
      0)))

(>defn reduce-bigs-and-paids
  "2nd step of paids getting bigs.
   Here the `diff-paid-bigs` gets debt that goes to next paid-off.
   [{:amount int?, :bigs [{:amount int?}]}] ->
   [{:amount int?, :bigs [{:amount int?}]}] ;; but with debt moved to next paid-off transaction."
  [paids-with-bigs]
  [::paid-offs
   => ::paid-offs]
  (loop [b paids-with-bigs
         res []  ;; Comes from previous iteration
         bigs {} ;; Same as above
         debt 0]
    (if (empty? b)
      res
      ;; else
      (let [fb*  (first b)
            ;; Since `diff-paid-bigs` cannot get `bigs` before recur, easier to calculate debt overflow here
            fb   (if (> debt 0) ;; Current data
                   (-> fb*
                       ;; (update :overflow-bigs into (:bigs fb*))
                       (update :overflow-debt + debt))
                   fb*)
            diff (diff-paid-bigs fb)] ;; Current data
        (recur (rest b),                              ;; b
               (conj res
                     (-> fb
                         (update , :debt + diff)
                         (update , :bigs into bigs))) ;; res
               (if (> diff 0) (:bigs fb) {})          ;; bigs ;; If current bigs have debt we send them to next, otherwise clear bigs
               diff)))))                              ;; debt
;; <-

(defn reduce-back-to-str-dates
  "Takes `::paid-offs` converts dates to string.
   Returns a map with keys being `:_sk-id`, values `::a-paid-off`"
  [data-with-bigs-and-debt]
  (reduce
   (fn [a m]
     (let [d (update
              m :date #(cljs-time->str %))]
       ;; returns ->
       (update
        a (-> d :_sk-id keyword)
        merge d)))
   {}
   data-with-bigs-and-debt))

(>defn merge-bigs-debt-and-data
  "NOTE: Spec tests might be intermittent due to uncertain second arg `any?`.
   `Any?` is used to overcome inability to create dynamic keys in spec,
   which should create a map with dynamic key of form `:_sk-id` and value `::a-paid-off`."
  ;; {::g/trace 4}
  [data back-to-str-dates]
  [::transactions any?
   => ::transactions]
  (map
   (fn [m]
     (let [sk-id (-> m :_sk-id keyword)]
       (if-let [tfk (get back-to-str-dates sk-id)]
         (merge m tfk)
         (merge m {:bigs [] :debt 0}))))
   data))

;; ENDs: Big amounts


;; Random

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

(defn recur-by-account-name
  "{:_sk-id ^::transaction{:AccountName string?}} ->
   {string?: [^::transaction{}]}
   If no `:AccountName` found ret-> {nil ^::transactions[]}"
  [recur-data]
  (->> recur-data
       (group-by :AccountName)))


(s/def ::tags #{:Ignore}) ;; <-- there are `:Big` and `:Recur` also, but it is hard to test `filter-by-tag` with them included
(s/def ::meta-data (s/keys :req-un [::tags]))
(s/def ::transaction-with-meta-data (s/keys :req-un [::_sk-id ::date ::amount ::description ::meta-data]))
(s/def ::transactions-with-meta-data (s/coll-of ::transaction-with-meta-data))


(>defn filter-by-tag
  "[v: {:meta-data {:tags Set}}], tag: Keyword -> same vec but filtered by `tag`"
  [v tag]
  [::transactions-with-meta-data #{:Ignore} =>
   ::transactions-with-meta-data]
  (filter
   #(contains? (get-in % [:meta-data :tags]) tag)
   v))

(>defn filter-out-ignored
  "[v: {:_sk-id uuid?}], [uuid? ^::ignore-tag] ->
   same `data` vec but not containing vals of `ignore-uuds`"
  [data ignore-uuids]
  [::transactions ::transactions-with-meta-data =>
   ::transactions]
  (filter
   (fn [v]
     ((complement contains?)
      (set (map :_sk-id ignore-uuids))
      (:_sk-id v)))
   data))

;; (g/check)

