(ns skarbnik.credit-account
  (:require [reagent.core :as r :refer [atom]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.components :as components]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]))


(defn page
  "Creates credit account page"
  [{:keys
    [state
     open-file
     read-file!
     write-file!
     initial-balance-file-path
     data-file-path
     credit-recur-transactions]}]

  (let [data (:credit-data @state)]
    [:section
     [:h2.error-message
      (get-in @state [:credit :error])]

     [:button.button-smaller.open-file
      {:on-click #(open-file
                   (fn [file-names]
                     (if (= file-names nil)
                       (prn "no file selected")
                       (read-file!
                        (first file-names)
                        (fn [data] (swap! state assoc :credit-data data))
                        :parse))))}
      "Open file"]

     [:button.button-smaller.save-file
      {:on-click #(write-file! data-file-path (logic/maps->js data))}
      "Save as account"]

     [:p  "Press Enter to set Initial balance: "
      [:input {:placeholder "0"
               :type "number"
               :on-key-press (fn [e]
                               (let [val (js/parseFloat (.-value (.-target e)))]
                                 (when (and (number? val) (not (js/Number.isNaN val)))
                                   (if (= "Enter" (.-key e))
                                     (do
                                       (swap! state assoc :initial-credit-balance val)
                                       (write-file! initial-balance-file-path val))))))}]]

     [:h3 (str "Initial Balance: " (:initial-credit-balance @state))]

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
             (let [selected? (r/atom (contains? (:credit-recur-data @state) (helpers/make-recur-keyword entry)))]
               (components/table-row
                {:type-recur-data :credit-recur-data
                 :state state
                 :idx idx
                 :entry entry
                 :selected? selected?
                 :data data} )))
         ;; feed `map-indexed`
         (:credit-data @state)))]]

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
       {:on-click #(swap! state assoc :credit-data (logic/filter-by-date
                                                    data
                                                    (:from-date @state)
                                                    (:to-date @state)))}
       "Filter by date"]]

     [:section
      [:hr]
      [:p "Click on any row to mark it as a recurring transaction."]
      [:button
       {:on-click #(write-file! credit-recur-transactions (:credit-recur-data @state))}
       "Save Recurring Transactions"]]

     (components/credit-analyze-comp data state)]))

