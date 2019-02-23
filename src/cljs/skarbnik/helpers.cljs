(ns skarbnik.helpers)

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})


(defn three-fold-key
  ;; TODO: Spec it!
  [entry]
  (let [desc   (:description entry)
        amount (:amount entry)
        date   (:date entry)]
    ;; null-check
    (when (not-any? nil? [desc amount date])
      (clojure.string/trim (str  desc "-"  amount "-"  date)))))


(defn set-distinct-data!
  "Adds key to `bank-data` as concatenation of `description`, `amount` and `date`
   And value being a map of those key/value pairs in `entry`"
  [state entry d-data-key]
  (let [data-key    (three-fold-key entry)
        parsed-entry (select-keys entry [:description :amount :date])]

    (swap! state assoc-in [d-data-key data-key]
           parsed-entry)))


(defn unset-distinct-data!
  "Removes selected key from state."
  [state entry d-data-key]
  (let [data-key    (three-fold-key entry)]
    (swap! state update-in [d-data-key]
           dissoc
           data-key)))
