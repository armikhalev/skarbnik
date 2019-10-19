(ns skarbnik.bank-account
  (:require [reagent.core :as r]
            [cljs.nodejs :as nodejs]
            [clojure.pprint :refer [pprint]]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.db :as db]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))


(defn page
  "Creates BANK account page"
  [{:keys
    [print?
     bank-accounts-path
     open-file!
     show-save-file-dialog!
     read-file!
     write-file!
     make-dir!
     initial-balance-file-path
     data-file-path
     bank-meta-data-path]}]

  (let [cur-range-data @db/current-date-range-bank-data
        data           (if (empty? cur-range-data)
                         @db/bank-data
                         cur-range-data)
        meta-data      (vals (if-let [md @db/bank-meta-data] md {}))
        recur-data     (logic/filter-by-tag meta-data :Recur)]
    [:section
     [:h2
      {:data-test "bank-account-title"}
      (str "Bank account: " @db/current-bank-account)]
     [:h2.error-message
      (:error @db/bank)]
     ;;
     (when-not print?
       [:span
         [ components/button-open-file!
          {:open-file!          open-file!
           :current-account!    db/current-bank-account!
           :initial-balance!    db/initial-bank-balance!
           :read-file!          read-file!
           :meta-data-mutator!  db/bank-meta-data!
           :data-mutator!       db/bank-data!
           :total-difference!   db/bank-total-difference!
           :account-date-range-mutator! db/current-date-range-bank-data!} ]
         ;;
         [ components/button-save-account!
          {:all-accounts-paths         db/bank-accounts
           :account-kind-mutator!      db/bank-accounts!
           :accounts-path              bank-accounts-path
           :initial-balance            @db/initial-bank-balance
           :initial-balance-file-path  initial-balance-file-path
           :data-file-path             data-file-path
           :show-save-file-dialog!     show-save-file-dialog!
           :write-file!                write-file!
           :make-dir!                  make-dir!
           :meta-data-path             bank-meta-data-path
           :meta-data                  @db/bank-meta-data
           :data                       data} ]
         ;;
         [components/input-initial-balance! db/initial-bank-balance!]])

     [:h3 (str "Initial Balance: " (logic/cents->dollars @db/initial-bank-balance))]

     (if print?
       (let [recur-data* (map #(dissoc % :meta-data) recur-data)]
         [:div.print-mode
          [components/transactions-table
           {:data                    recur-data*
            :meta-data-mutator!      db/bank-meta-data!
            :meta-data               @db/bank-meta-data
            :tags-choice             @db/bank-tags-choice}]])

       ;; Else show all transactions
       [:span
        [:hr]
        [components/transactions-table
         {:data                    data
          :meta-data-mutator!      db/bank-meta-data!
          :meta-data               @db/bank-meta-data
          :tags-choice             @db/bank-tags-choice}]])

     [components/side-drawer-wrapper
      @db/bank-side-drawer-data
      @db/bank-side-drawer-closed?
      db/bank-side-drawer!]

     [:hr]

     (when-not print?
       [ components/date-picker
        {:from-date! db/from-date!
         :from-date db/from-date
         :to-date! db/to-date!
         :to-date db/to-date
         :data data
         :account-data-mutator! db/current-date-range-bank-data!} ])
     ;;
     (let [ignore-uuids    (logic/filter-by-tag meta-data :Ignore)
           data-not-ignore (logic/filter-out-ignored data ignore-uuids)]
       [ components/bank-analyze {:data                   data-not-ignore
                                  :initial-bank-balance   @db/initial-bank-balance
                                  :bank-recur-data        recur-data
                                  :bank-total-difference! db/bank-total-difference!}])

     (when-not print?
       [ components/rec-by-account-btn {:side-drawer-mutator! db/bank-side-drawer!
                                        :recur-data           recur-data}])]))

