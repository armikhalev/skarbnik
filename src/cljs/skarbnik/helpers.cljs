(ns skarbnik.helpers
  (:require [clojure.string :as string]) )

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})


(defn three-fold-key
  ;; TODO: Spec it!
  [entry]
  (let [desc?  (:description entry)
        desc*  (string/trim (if desc? desc? " "))
        desc   (if (string? desc*) (-> desc* (string/replace #" " "")), desc*)
        amount (:amount entry)
        date*  (:date entry)
        date   (if (string? date*) (string/replace date* #"/" "-"), date*)]
    ;; null-check
    (when (not-any? nil? [desc amount date])
      (keyword
       (string/trim (str  desc "-"  amount "-"  date))))))


(defn set-distinct-data!
  "Adds key to `bank-data` as concatenation of `description`, `amount` and `date`
   And value being a map of those key/value pairs in `entry`"
  [mutator! entry]
  (let [data-key    (:_sk-id entry)
        parsed-entry (select-keys entry [:description :amount :date])]
    (mutator! assoc data-key parsed-entry)))


(defn unset-distinct-data!
  "Removes selected key from state."
  [mutator! entry]
  (let [data-key    (:_sk-id entry)]
    (mutator! dissoc data-key)))
