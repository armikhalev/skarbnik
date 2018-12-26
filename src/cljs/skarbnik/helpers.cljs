(ns skarbnik.helpers)

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})


(defn make-recur-keyword
  [entry]
  (str (:description entry) "-" (:amount entry) "-" (:date entry)))


(defn set-recur-data!
  "Adds key to `bank-recur-data` as concatenation of `description`, `amount` and `date`
   And value being a map of those key/value pairs in `entry`"
  [state entry recur-data-key]
  (let [data-key    (make-recur-keyword entry)
        parsed-entry (select-keys entry [:description :amount :date])]

    (swap! state assoc-in [recur-data-key data-key]
           parsed-entry)))


(defn unset-recur-data!
  "Removes selected key from state."
  [state entry recur-data-key]
  (let [data-key    (make-recur-keyword entry)
        parsed-entry (select-keys entry [:description :amount :date])]

    (swap! state assoc-in [recur-data-key data-key]
           parsed-entry)))
