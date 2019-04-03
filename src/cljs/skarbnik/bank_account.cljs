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
      (get-in @state [:bank :error])]
     ;;
     [ components/button-open-file!
      {:open-file!          open-file!
       :state               state
       :recur-data-mutator! db/bank-recur-data!
       :read-file!          read-file!
       :data-key            :bank-data} ]
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
     [ components/date-picker state data :bank-data ]
     ;;
     [ components/bank-analyze {:data                 data
                                :initial-bank-balance db/initial-bank-balance
                                :bank-recur-data      db/bank-recur-data
                                :state state} ]]))

