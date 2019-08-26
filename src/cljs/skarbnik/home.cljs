(ns skarbnik.home
  (:require [reagent.core :as r :refer [atom]]
            [cljs.reader :as reader]
            [clojure.string :as string
             :refer [split join]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.db :as db]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))

(defn page
  "Home page with all the accounts in two columns: `banks` and `credits`.
   This is not meant to be a pure function, since it's a page - the highest parent component.
   Hence `db` is used from namespace, not from input."
  [{:keys [read-file!
           write-file!
           bank-accounts-path
           credit-accounts-path
           current-page
           bank-initial-balance-file-path
           credit-initial-balance-file-path
           bank-data-file-path
           credit-data-file-path
           credit-meta-data-path
           bank-meta-data-path]}]
  ;;
  [:section
   [:h2 "Bank accounts"]
   [:ul.banks
    (if (seq @db/bank-accounts)
      (for [bank-dir-path @db/bank-accounts
            :let [bank-name (-> bank-dir-path (split #"/") last)]]
        ^{:key bank-name}
        [:li.inline-flex.border.margin-left-5

         ;; SELECT acconut button
         [:button.button-smaller.select-bank
          {:data-test "select-account-button"
           :on-click #(helpers/read-and-set-data!
                       {:set-current-page!           (fn [] (reset! current-page :bank))
                        :dir-path                    bank-dir-path
                        :initial-balance-file-path   bank-initial-balance-file-path
                        :read-file!                  read-file!
                        :initial-balance-mutator!    db/initial-bank-balance!
                        :data-file-path              bank-data-file-path
                        :data-mutator!               db/bank-data!
                        :meta-data-path              bank-meta-data-path
                        :meta-data-mutator!          db/bank-meta-data!
                        :current-account-mutator!    db/current-bank-account!
                        :current-name                bank-name
                        :total-difference-mutator!   db/bank-total-difference!
                        :account-date-range-mutator! db/current-date-range-bank-data!})}
          bank-name]

         ;; DELETE account button
         [:button.button.margin-left-5.delete-bank
          {:data-test "delete-account-button"
           :on-click #(do
                        ;; remove bank-dir from state
                        (db/bank-accounts! (partial remove #{bank-dir-path}))

                        ;; then remove it from file
                        (write-file!
                         bank-accounts-path
                         (vec @db/bank-accounts)))}
          "X"]])
      ;; else - no bank-accounts
      [:li "You don't have any saved Bank accounts, click <Bank Account>, open file and then save it as an account."])]

   ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

   [:h2 "Credit accounts"]
   [:ul.credits
    (if (seq @db/credit-accounts)
      (for [credit-dir-path @db/credit-accounts
            :let [credit-name (-> credit-dir-path (split #"/") last)]]
        ^{:key credit-name}
        [:li.inline-flex.border.margin-left-5

         ;; SELECT acconut button
         [:button.button-smaller.select-credit
          {:on-click #(helpers/read-and-set-data!
                       {:set-current-page!           (fn [] (reset! current-page :credit))
                        :dir-path                    credit-dir-path
                        :initial-balance-file-path   credit-initial-balance-file-path
                        :read-file!                  read-file!
                        :initial-balance-mutator!    db/initial-credit-balance!
                        :data-file-path              credit-data-file-path
                        :data-mutator!               db/credit-data!
                        :meta-data-path              credit-meta-data-path
                        :meta-data-mutator!          db/credit-meta-data!
                        :current-account-mutator!    db/current-credit-account!
                        :current-name                credit-name
                        :total-difference-mutator!   db/credit-total-difference!
                        :account-date-range-mutator! db/current-date-range-credit-data!})}
          credit-name]

         ;; DELETE account button
         [:button.button.margin-left-5.delete-credit
          {:on-click #(do
                        ;; remove bank-dir from state
                        (db/credit-accounts! (partial remove #{credit-dir-path}))

                        ;; then remove it from file
                        (write-file!
                         credit-accounts-path
                         (vec @db/credit-accounts)))}
          "X"]])
      ;; else - no credit accounts
      [:li "You don't have any saved Credit accounts, click <Credit Account>, open file and then save it as an account."])]])

