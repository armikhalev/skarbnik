(ns skarbnik.helpers)

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})


(defn make-recur-keyword
  ;; TODO: Spec it!
  [entry]
  (let [desc   (:description entry)
        amount (:amount entry)
        date   (:date entry)]
    ;; null-check
    (when (not-any? nil? [desc amount date] )
      (str (.trim desc) "-" (.trim amount) "-" (.trim date)))))


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
  (let [data-key    (make-recur-keyword entry)]
    (swap! state update-in [recur-data-key]
           dissoc
           data-key)))
