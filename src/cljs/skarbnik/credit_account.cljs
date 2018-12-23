(ns skarbnik.credit-account
  (:require [reagent.core :as reagent :refer [atom]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.logic :as logic]))



(defn page
  "Creates credit account page"
  [{:keys
    [state
     open-file
     read-file!
     write-file!
     initial-balance-file-path
     data-file-path]}]

  (let [data (:credit-data @state)]
    [:section
     [:h2 "Credit Account"]

     [:h2.error-message
      (get-in @state [:credit :error])]

     [:button
      {:on-click #(open-file
                   (fn [file-names]
                     (if (= file-names nil)
                       (prn "no file selected")
                       (read-file!
                        (first file-names)
                        (fn [data] (swap! state assoc :credit-data data))
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
                                     (swap! state assoc :initial-credit-balance val)
                                     (write-file! initial-balance-file-path val)))))}]]

     [:h3 (str "Initial Balance: " (:initial-credit-balance @state))]

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
        (:credit-data @state))]]

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
      {:on-click #(swap! state assoc :credit-data (logic/filter-by-date
                                                   data
                                                   (:from-date @state)
                                                   (:to-date @state)))}
      "Filter by date"]

     (let [plus           (logic/get-total data >)
           minus          (logic/get-total data <)
           difference     (logic/get-sum-in-dollars plus minus)
           ending-balance (logic/get-sum-in-dollars (:initial-credit-balance @state) difference)]

       [:section.sums

        ;; sum `plus` and `minus` to get difference
        [:section
         [:h2 "This period:"]
         [:h3 "Debt: " plus]
         [:h3 "Paid: " minus]
         [:h3 "Added debt: " difference]]
        [:section
         [:h2 "All time:"]
         [:h3 "Total debt: " ending-balance]]])]))

