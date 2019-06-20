(ns skarbnik.helpers
  (:require [clojure.string :as string]) )

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})


(defn set-distinct-data!
  "Adds key to `bank-data` as concatenation of `description`, `amount` and `date`
   And value being a map of those key/value pairs in `entry`"
  [mutator! entry]
  (let [data-key    (-> entry :_sk-id keyword)
        parsed-entry (select-keys entry [:description :amount :date :AccountName])] ;; <-- `AccountName` used in Mint
    (mutator! assoc data-key parsed-entry)))


(defn unset-distinct-data!
  "Removes selected key from state."
  [mutator! entry]
  (let [data-key    (-> entry :_sk-id keyword)]
    (mutator! dissoc data-key)))
