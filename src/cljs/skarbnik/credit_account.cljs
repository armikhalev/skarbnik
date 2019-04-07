(ns skarbnik.credit-account
  (:require [reagent.core :as r]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.db :as db]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))


(defn page
  "Creates CREDIT account page"
  [{:keys
    [credit-ui
     credit-accounts-path
     open-file!
     show-save-file-dialog!
     read-file!
     write-file!
     make-dir!
     initial-balance-file-path
     data-file-path
     credit-recur-transactions]}]

  (let [data @db/credit-data]
    [:section
     [:h2 (str "Credit account: " @db/current-credit-account)]
     [:h2.error-message
      (:error @db/credit)]

     ;;
     [ components/button-open-file!
      {:open-file!          open-file!
       :recur-data-mutator! db/credit-recur-data!
       :read-file!          read-file!
       :data-mutator!       db/credit-data!} ]
     ;;
     [ components/button-save-account!
      {:account-kind-cursor        db/credit-accounts
       :account-kind-mutator!      db/credit-accounts!
       :accounts-path              credit-accounts-path
       :recur-transactions         credit-recur-transactions
       :recur-data                 db/credit-recur-data
       :initial-balance            db/initial-credit-balance
       :initial-balance-file-path  initial-balance-file-path
       :data-file-path             data-file-path
       :show-save-file-dialog!     show-save-file-dialog!
       :write-file!                write-file!
       :read-file!                 read-file!
       :make-dir!                  make-dir!
       :data                       data} ]

     ;;
     [components/input-initial-balance! db/initial-credit-balance!]

     [:h3 (str "Initial Balance: " (logic/cents->dollars @db/initial-credit-balance))]

     [:hr]

     ;; Add `:bigs` and `:debt`
     ;; TODO: add logic to merge data with bigs-and-paids
     (let [paids*                  (logic/payments data)
           paids                   (logic/str-dates->cljs-time paids*)
           bigs*                   (-> @db/credit-big-data vals)
           bigs                    (logic/str-dates->cljs-time bigs*)
           paids-with-bigs         (logic/paids-with-bigs paids bigs)
           data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs)
           back-to-str-dates       (reduce
                                    (fn [a m]
                                      (let [d (update
                                               m :date #(logic/cljs-time->str %))]
                                        ;; returns ->
                                        (update
                                         a (-> d helpers/three-fold-key keyword)
                                         merge d)))
                                    {}
                                    data-with-bigs-and-debt)
           merged-data             (map
                                    (fn [m]
                                      (let [three-fold-key (-> m helpers/three-fold-key keyword)]
                                        (merge m (three-fold-key back-to-str-dates))))
                                    data)]
       [components/transactions-table
        {:data                    merged-data
         :credit?                 true
         :recur-data-mutator!     db/credit-recur-data!
         :credit-big-data         db/credit-big-data
         :big-data-mutator!       db/credit-big-data!
         :recur-data              db/credit-recur-data}])

     [:hr]
     [ components/date-picker
      {:from-date! db/from-date!
       :from-date db/from-date
       :to-date! db/to-date!
       :to-date db/to-date
       :data data
       :account-data-mutator! db/credit-data!} ]
     ;;
     [ components/credit-analyze {:data                   data
                                  :initial-credit-balance   db/initial-credit-balance
                                  :credit-recur-data        db/credit-recur-data
                                  :credit-total-difference! db/credit-total-difference!
                                  }]]))

