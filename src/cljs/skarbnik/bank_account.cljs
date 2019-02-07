(ns skarbnik.bank-account
  (:require [reagent.core :as r :refer [atom]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))


(defn page
  "Creates bank account page"
  [{:keys
    [state
     bank-accounts-path
     root-path
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
     (components/button-open-file-comp!
      {:open-file!      open-file!
       :state           state
       :recur-data-key  :bank-recur-data
       :read-file!      read-file!
       :data-key        :bank-data})

     ;;
     (components/input-save-account!
      {:state                      state
       :account-kind-$key          :bank-accounts
       :accounts-path              bank-accounts-path
       :root-path                  root-path
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

     (components/input-initial-balance!
      {:state state
       :initial-balance-$key :initial-bank-balance})


     [:h3 (str "Initial Balance: " (:initial-bank-balance @state))]

     [:hr]
     [:table
      [:thead
       [:tr
        (for [th (logic/get-maps-categories-str data)]
          ^{:key th}
          [:th th])]]
      [:tbody
       (doall
        (map-indexed
         (fn [idx entry]
           (let [selected? (r/atom (contains? (:bank-recur-data @state) (helpers/make-recur-keyword entry)))]
             (components/table-row
              {:type-recur-data :bank-recur-data
               :state           state
               :idx             idx
               :entry           entry
               :selected?       selected?
               :data            data})))

         ;; feed `map-indexed`
         (:bank-data @state)))]]

     [:hr]
     [:section.date-picker
      [:label "Select date range from: "]
      [:input
       {:type "date"
        :on-change #(swap! state assoc :from-date (.-target.value %))
        :name "from-date"}]
      [:label " to: "]
      [:input
       {:type "date"
        :on-change #(swap! state assoc :to-date (.-target.value %))
        :name "to-date"}]

      [:button.margin-left-5
       {:on-click #(swap! state assoc :bank-data (logic/filter-by-date
                                                  data
                                                  (:from-date @state)
                                                  (:to-date @state)))}
       "Filter by date"]]

     (components/bank-analyze-comp data state)]))

