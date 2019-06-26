(ns skarbnik.credit-account
  (:require [reagent.core :as r]
            [clojure.pprint :as pp]
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
    [credit-accounts-path
     open-file!
     show-save-file-dialog!
     read-file!
     write-file!
     make-dir!
     initial-balance-file-path
     big-transactions-path
     data-file-path
     credit-recur-transactions]}]

  (let [cur-range-data @db/current-date-range-credit-data
        data           (if (empty? cur-range-data)
                         @db/credit-data
                         cur-range-data)]
    [:section
     [:h2 (str "Credit account: " @db/current-credit-account)]
     [:h2.error-message
      (:error @db/credit)]

     ;;
     [ components/button-open-file!
      {:open-file!          open-file!
       :recur-data-mutator! db/credit-recur-data!
       :big-data-mutator!   db/credit-big-data!
       :current-account!    db/current-credit-account!
       :initial-balance!    db/initial-credit-balance!
       :total-difference!   db/credit-total-difference!
       :read-file!          read-file!
       :data-mutator!       db/credit-data!
       :account-date-range-mutator! db/current-date-range-credit-data!} ]
     ;;
     [ components/button-save-account!
      {:account-kind-cursor        db/credit-accounts
       :account-kind-mutator!      db/credit-accounts!
       :accounts-path              credit-accounts-path
       :recur-transactions         credit-recur-transactions
       :big-transactions-path      big-transactions-path
       :recur-data                 db/credit-recur-data
       :credit-big-data            db/credit-big-data
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
     (let [paids*                  (logic/payments data)
           paids                   (logic/str-dates->cljs-time paids*)
           bigs*                   (vals @db/credit-big-data)
           bigs                    (logic/str-dates->cljs-time bigs*)
           paids-with-bigs         (logic/paids-with-bigs paids bigs)
           data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs)
           back-to-str-dates       (logic/reduce-back-to-str-dates data-with-bigs-and-debt)
           merged-data             (logic/merge-bigs-debt-and-data data back-to-str-dates)]
       ;; (prn "credt-account below, line 74" )
       ;; (pp/pprint @db/credit-big-data)
       [components/transactions-table
        {:data                    merged-data
         :credit?                 true
         :recur-data-mutator!     db/credit-recur-data!
         :credit-big-data         db/credit-big-data
         :big-data-mutator!       db/credit-big-data!
         :side-drawer-mutator!    db/credit-side-drawer!
         :recur-data              db/credit-recur-data}])

     [components/side-drawer-wrapper
      @db/credit-side-drawer-data
      @db/credit-side-drawer-closed?
      db/credit-side-drawer!]

     [:hr]

     [ components/date-picker
      {:from-date!            db/from-date!
       :from-date             db/from-date
       :to-date!              db/to-date!
       :to-date               db/to-date
       :data                  data
       :account-data-mutator! db/current-date-range-credit-data!} ]
     ;;
     [ components/credit-analyze {:data                     data
                                  :initial-credit-balance   @db/initial-credit-balance
                                  :credit-recur-data        @db/credit-recur-data
                                  :credit-total-difference! db/credit-total-difference!}]

     [ components/rec-by-account-btn {:side-drawer-mutator! db/credit-side-drawer!
                                      :recur-data           @db/credit-recur-data}]]))

