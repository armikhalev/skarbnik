(ns skarbnik.helpers
  (:require [clojure.string :as string]) )

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})


(defn three-fold-key
  ;; TODO: Spec it!
  [entry]
  (let [desc   (-> entry :description (string/replace #" " "-"))
        amount (:amount entry)
        date   (-> entry :date (string/replace #"/" "-"))]
    ;; null-check
    (when (not-any? nil? [desc amount date])
      (string/trim (str  desc "-"  amount "-"  date)))))


(defn set-distinct-data!
  "Adds key to `bank-data` as concatenation of `description`, `amount` and `date`
   And value being a map of those key/value pairs in `entry`"
  [mutator! entry]
  (let [data-key    (three-fold-key entry)
        parsed-entry (select-keys entry [:description :amount :date])]
    (mutator! assoc data-key parsed-entry)))


(defn unset-distinct-data!
  "Removes selected key from state."
  [mutator! entry]
  (let [data-key    (three-fold-key entry)]
    (mutator! dissoc data-key)))
