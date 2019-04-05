(ns skarbnik.bank-account
  (:require [reagent.core :as r]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.db :as db]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))


(defn page
  "Creates BANK account page"
  [{:keys
    [state
     bank-ui
     bank-accounts-path
     open-file!
     show-save-file-dialog!
     read-file!
     write-file!
     make-dir!
     initial-balance-file-path
     data-file-path
     bank-recur-transactions]}]

  (let [data @db/bank-data]
    [:section
     [:h2 (str "Bank account: " @db/current-bank-account)]
     [:h2.error-message
      (:error @bank-ui)]
     ;;
     [ components/button-open-file!
      {:open-file!          open-file!
       :recur-data-mutator! db/bank-recur-data!
       :read-file!          read-file!
       :data-mutator!       db/bank-data!}]
     ;;
     [ components/button-save-account!
      {:state                      state
       :account-kind-cursor        db/bank-accounts
       :account-kind-mutator!      db/bank-accounts!
       :accounts-path              bank-accounts-path
       :recur-transactions         bank-recur-transactions
       :recur-data                 db/bank-recur-data
       :initial-balance            db/initial-bank-balance
       :initial-balance-file-path  initial-balance-file-path
       :data-file-path             data-file-path
       :show-save-file-dialog!     show-save-file-dialog!
       :write-file!                write-file!
       :read-file!                 read-file!
       :make-dir!                  make-dir!
       :data                       data} ]
     ;;
     [components/input-initial-balance! db/initial-bank-balance!]
     ;;
     [:h3 (str "Initial Balance: " (logic/cents->dollars @db/initial-bank-balance))]

     [:hr]
     [components/transactions-table
      {:state                   state
       :data                    data
       :recur-data-mutator!     db/bank-recur-data!
       :big-data-mutator!       db/credit-big-data!
       :recur-data              db/bank-recur-data}]

     [:hr]
     [ components/date-picker
      {:from-date! db/from-date!
       :from-date db/from-date
       :to-date! db/to-date!
       :to-date db/to-date
       :data data
       :account-data-mutator! db/bank-data!} ]
     ;;
     [ components/bank-analyze {:data                   data
                                :state state
                                :initial-bank-balance   db/initial-bank-balance
                                :bank-recur-data        db/bank-recur-data
                                :bank-total-difference! db/bank-total-difference!
                                } ]]))

