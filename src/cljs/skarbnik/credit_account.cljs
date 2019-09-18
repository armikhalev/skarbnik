(ns skarbnik.credit-account
  (:require [reagent.core :as r]
            [clojure.pprint :as pp :refer [pprint]]
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
     data-file-path
     credit-meta-data-path]}]

  (let [cur-range-data @db/current-date-range-credit-data
        data           (if (empty? cur-range-data)
                         @db/credit-data
                         cur-range-data)
        meta-data*      (vals (if-let [md @db/credit-meta-data] md {}))
        meta-data      (logic/str-dates->cljs-time meta-data*)
        recur-data     (logic/filter-by-tag meta-data :Recur)
        big-data       (logic/filter-by-tag meta-data :BIG)]
    [:section
     [:h2 (str "Credit account: " @db/current-credit-account)]
     [:h2.error-message
      (:error @db/credit)]

     ;;
     [ components/button-open-file!
      {:open-file!          open-file!
       :current-account!    db/current-credit-account!
       :initial-balance!    db/initial-credit-balance!
       :read-file!          read-file!
       :meta-data-mutator!  db/credit-meta-data!
       :data-mutator!       db/credit-data!
       :total-difference!   db/credit-total-difference!
       :account-date-range-mutator! db/current-date-range-credit-data!} ]
     ;;
     [ components/button-save-account!
      {:all-accounts-paths         db/credit-accounts
       :account-kind-mutator!      db/credit-accounts!
       :accounts-path              credit-accounts-path
       :initial-balance            @db/initial-credit-balance
       :initial-balance-file-path  initial-balance-file-path
       :data-file-path             data-file-path
       :show-save-file-dialog!     show-save-file-dialog!
       :write-file!                write-file!
       :make-dir!                  make-dir!
       :meta-data-path             credit-meta-data-path
       :meta-data                  @db/credit-meta-data
       :data                       data} ]

     ;;
     [components/input-initial-balance! db/initial-credit-balance!]

     [:h3 (str "Initial Balance: " (logic/cents->dollars @db/initial-credit-balance))]

     [:hr]

     (let [paids*                  (logic/payments data)
           paids                   (logic/str-dates->cljs-time paids*)
           paids-with-bigs         (logic/paids-with-bigs paids big-data)
           data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs)
           back-to-str-dates       (logic/reduce-back-to-str-dates data-with-bigs-and-debt)
           merged-data             (logic/merge-bigs-debt-and-data data back-to-str-dates)]
       ;; (prn "credt-account below, line 74" )
       ;; (pp/pprint merged-data)
       [components/transactions-table
        {:data                    merged-data
         :credit?                 true
         :meta-data-mutator!      db/credit-meta-data!
         :meta-data               @db/credit-meta-data
         :side-drawer-mutator!    db/credit-side-drawer!
         :tags-choice             @db/credit-tags-choice}])

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
                                  :big-data                 big-data
                                  :credit-recur-data        recur-data
                                  :credit-total-difference! db/credit-total-difference!}]


     [ components/rec-by-account-btn {:side-drawer-mutator! db/credit-side-drawer!
                                      :recur-data           recur-data}]]))

