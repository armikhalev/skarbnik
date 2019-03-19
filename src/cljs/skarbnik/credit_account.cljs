(ns skarbnik.credit-account
  (:require [reagent.core :as r]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))


(defn page
  "Creates CREDIT account page"
  [{:keys
    [state
     credit-accounts-path
     open-file!
     show-save-file-dialog!
     read-file!
     write-file!
     make-dir!
     initial-balance-file-path
     data-file-path
     credit-big-transactions
     credit-recur-transactions]}]

  (let [data (:credit-data @state)]
    [:section
     [:h2 (str "Credit account: " (:current-credit-account @state))]
     [:h2.error-message
      (get-in @state [:credit :error])]

     ;;
     (components/button-open-file!
      {:open-file!      open-file!
       :state           state
       :recur-data-key  :credit-recur-data
       :read-file!      read-file!
       :data-key        :credit-data})
     ;;
     (components/button-save-account!
      {:state                      state
       :account-kind-$key          :credit-accounts
       :accounts-path              credit-accounts-path
       :recur-transactions         credit-recur-transactions
       :big-transactions           credit-big-transactions
       :recur-data-$key            :credit-recur-data
       :big-data-$key              :credit-big-data
       :initial-balance-$key       :initial-credit-balance
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
       :initial-balance-$key :initial-credit-balance})

     [:h3 (str "Initial Balance: " (logic/cents->dollars (:initial-credit-balance @state)))]

     [:hr]

     ;; Add `:bigs` and `:debt`
     ;; TODO: add logic to merge data with bigs-and-paids
     (let [paids*                  (logic/payments data)
           paids                   (logic/str-dates->cljs-time paids*)
           bigs*                   (-> @state :credit-big-data vals)
           bigs                    (logic/str-dates->cljs-time bigs*)
           paids-with-bigs         (logic/paids-with-bigs paids bigs)
           data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs)
           back-to-str-dates       (map
                                    (fn [m]
                                      (update
                                       m :date #(logic/cljs-time->str %)))
                                    data-with-bigs-and-debt)
           merged-data             (for [d data
                                         b back-to-str-dates
                                         :when  (= (:amount d) (:amount b))]
                                     (merge d b))]
       (cljs.pprint/pprint merged-data)
       (components/transactions-table
        {:state                   state
         :data                    data
         :credit?                 true
         :account-data-$key       :credit-data
         :account-recur-data-$key :credit-recur-data
         :account-big-data-$key   :credit-big-data}))

     [:hr]
     (components/date-picker state data :credit-data)
     ;;
     (components/credit-analyze data state)]))

