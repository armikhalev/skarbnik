(ns skarbnik.helpers
  (:require [clojure.string :as string]
            [cljs.reader :as reader]
            [skarbnik.logic :as logic]) )

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


(defn read-and-set-data!
  [{:keys [set-current-page!
           dir-path
           initial-balance-file-path
           read-file!
           initial-balance-mutator!
           data-file-path
           data-mutator!
           recur-transactions-path
           recur-data-mutator!
           big-transactions-path
           big-data-mutator!
           current-account-mutator!
           current-name]}]
  (do
    (set-current-page!)
    ;;
    (read-file!
     (str dir-path"/"initial-balance-file-path)
     (fn [data] (initial-balance-mutator!
                 (logic/dollars->cents data))))
    ;;
    (read-file!
     (str dir-path"/"data-file-path)
     (fn [data] (data-mutator! data :from-file))
     :parse)
    ;;
    (read-file!
     (str dir-path"/"recur-transactions-path)
     ;; Read EDN and put it into state
     (fn [data]
       (recur-data-mutator! (reader/read-string data))))
    ;;
    (when big-transactions-path
      (read-file!
       (str dir-path"/"big-transactions-path)
       ;; Read EDN and put it into state
       (fn [data]
         (big-data-mutator! (reader/read-string data)))))
    ;;
    (current-account-mutator! current-name)))

