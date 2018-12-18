(ns skarbnik.bank-account
  (:require [reagent.core :as reagent :refer [atom]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.logic :as logic]))



(defn page
  "Creates bank account page"
  [{:keys
    [state
     open-file
     read-file!
     write-file!
     initial-balance-file-path
     data-file-path]}]

  (let [data (:bank-data @state)]
    [:section
     [:h2 "Bank Account"]

     [:h2.error-message
      (get-in @state [:bank :error])]

     [:button
      {:on-click #(open-file
                   (fn [file-names]
                     (if (= file-names nil)
                       (prn "no file selected")
                       (read-file! (first file-names)
                                   (fn [data] (swap! state assoc :bank-data data))
                                   :parse))))}
      "Open file"]

     [:button
      {:on-click #(write-file! data-file-path (logic/maps->js data))}
      "Save"]

     [:p  "Press Enter to set Initial balance: "
      [:input {:placeholder "0"
               :type "number"
               :on-key-press (fn [e]
                               (let [val (js/parseFloat (.-value (.-target e)))]
                                 (if (= "Enter" (.-key e))
                                   (do
                                     (swap! state assoc :initial-bank-balance val)
                                     (write-file! initial-balance-file-path val)))))}]]

     [:h3 (str "Initial Balance: " (:initial-bank-balance @state))]

     [:table
      [:thead
       [:tr
        (for [th (logic/get-maps-categories-str data)]
          ^{:key th}
          [:th th])]]
      [:tbody
       (map-indexed
        (fn [idx entry]
          ^{:key idx}
          [:tr
           (for [category-key (logic/get-maps-categories data)
                 :let [entry-val (category-key entry)]]
             ^{:key (str category-key "-" idx)}
             [:td
              {:class (if (= (name category-key) "amount")
                        (str "bold " (if (< entry-val 0) "color-red" "color-blue")))}
              entry-val])])

        ;; feed `map-indexed`
        (:bank-data @state))]]

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
        :name "to-date"}]]

     [:button
      {:on-click #(swap! state assoc :bank-data (logic/filter-by-date
                                                 data
                                                 (:from-date @state)
                                                 (:to-date @state)))}
      "Filter by date"]

     (let [plus           (logic/get-total data >)
           minus          (logic/get-total data <)
           difference     (logic/cents->dollars
                            (+ (logic/dollars->cents plus)
                               (logic/dollars->cents minus)))
           ending-balance (logic/cents->dollars
                            (+ (logic/dollars->cents (:initial-bank-balance @state))
                               (logic/dollars->cents difference)))]

       [:section.sums

        ;; sum `plus` and `minus` to get difference
        [:h2 "Difference: " difference]
        [:h2 "Plus: " plus]
        [:h2 "Minus: " minus]
        [:h2 "Ending Balance: " ending-balance]])]))

