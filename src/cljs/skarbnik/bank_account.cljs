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
     open-file
     read-file!
     write-file!
     initial-balance-file-path
     data-file-path
     bank-recur-transactions]}]

  (let [data (:bank-data @state)]
    [:section
     [:h2.error-message
      (get-in @state [:bank :error])]

     [:button.open-file
      {:on-click #(open-file
                   (fn [file-names]
                     (if (= file-names nil)
                       (prn "no file selected")
                       (read-file! (first file-names)
                                   (fn [data] (swap! state assoc :bank-data data))
                                   :parse))))}
      "Open file"]

     [:button.save-file
      {:on-click #(write-file! data-file-path (logic/maps->js data))}
      "Save"]

     [:p  "Press Enter to set Initial balance: "
      [:input {:placeholder "0"
               :type "number"
               :on-key-press (fn [e]
                               (let [val (js/parseFloat (.-value (.-target e)))]
                                 (when (and (number? val) (not (js/Number.isNaN val)))
                                   (if (= "Enter" (.-key e))
                                     (do
                                       (swap! state assoc :initial-bank-balance val)
                                       (write-file! initial-balance-file-path val))))))}]]

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
               :state state
               :idx idx
               :entry entry
               :selected? selected?
               :data data} )))

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

     [:section
      [:hr]
      [:p "Click on any row to mark it as a recurring transaction."]
      [:button
       {:on-click #(write-file! bank-recur-transactions (:bank-recur-data @state))}
       "Save Recurring Transactions"]]

     (components/bank-analyze-comp data state)]))

