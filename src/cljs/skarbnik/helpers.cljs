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

(defn account-NOT-in-accounts?
  "Filters names in `*-accounts.edn` to find dir-path name in there,
  if DOESN'T find one returns true."
  [accounts
   dir-path]
  (= (count
      (filter #(= % dir-path)
              accounts))
     0))

(defn save-account!
  [{:keys [all-accounts-paths
           account-kind-mutator!
           accounts-path
           recur-transactions
           big-transactions-path
           recur-data
           credit-big-data
           initial-balance
           initial-balance-file-path
           data-file-path
           show-save-file-dialog!
           make-dir!
           write-file!
           data]}]
  (let [dir-path (-> (show-save-file-dialog!) str)]
                (when dir-path
                  (do
                    ;; Update and save it to file
                    (when (account-NOT-in-accounts? all-accounts-paths dir-path)

                      ;; add directory name to accounts
                      (account-kind-mutator! conj dir-path)

                      ;; write path to *-accounts.edn for persistance
                      (write-file!
                       accounts-path
                       all-accounts-paths))

                    ;; create dir (if doesn't exist fn will handle it)
                    (make-dir! dir-path)

                    ;; Write files
                    (write-file!
                     (str dir-path"/"recur-transactions)
                     recur-data)
                    ;;
                    (when credit-big-data
                      (write-file!
                       (str dir-path"/"big-transactions-path)
                       credit-big-data))
                    ;;
                    (write-file!
                     (str dir-path"/"initial-balance-file-path)
                     (logic/cents->dollars
                      initial-balance))
                    ;;
                    (let [data* (map (fn [m]
                                       (-> m
                                        (update , :amount
                                                  logic/cents->dollars)))
                                     data)]
                      (write-file!
                       (str dir-path"/"data-file-path)
                       (logic/maps->js data*)))))))
