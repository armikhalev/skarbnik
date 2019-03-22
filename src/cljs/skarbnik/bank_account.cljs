(ns skarbnik.bank-account
  (:require [reagent.core :as r]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
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

  (let [data (:bank-data @state)]
    [:section
     [:h2 (str "Bank account: " (:current-bank-account @state))]
     [:h2.error-message
      (get-in @state [:bank :error])]
     ;;
     (components/button-open-file!
      {:open-file!      open-file!
       :state           state
       :recur-data-key  :bank-recur-data
       :read-file!      read-file!
       :data-key        :bank-data})
     ;;
     (components/button-save-account!
      {:state                      state
       :account-kind-$key          :bank-accounts
       :accounts-path              bank-accounts-path
       :recur-transactions         bank-recur-transactions
       :recur-data-$key            :bank-recur-data
       :initial-balance-$key       :initial-bank-balance
       :initial-balance-file-path  initial-balance-file-path
       :data-file-path             data-file-path
       :show-save-file-dialog!     show-save-file-dialog!
       :write-file!                write-file!
       :read-file!                 read-file!
       :make-dir!                  make-dir!
       :data                       data})
     ;;
     (components/input-initial-balance!
      {:state state
       :initial-balance-$key :initial-bank-balance})
     ;;
     [:h3 (str "Initial Balance: " (logic/cents->dollars (:initial-bank-balance @state)))]

     [:hr]
     [components/transactions-table
      {:state                   state
       :data                    data
       :account-data-$key       :bank-data
       :account-recur-data-$key :bank-recur-data}]

     [:hr]
     (components/date-picker state data :bank-data)
     ;;
     (components/bank-analyze data state)]))

