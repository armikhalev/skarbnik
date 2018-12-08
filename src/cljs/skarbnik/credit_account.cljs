(ns skarbnik.credit-account
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs.nodejs :as nodejs]
             [ghostwheel.tracer]
             [ghostwheel.core :as g
              :refer [>defn >defn- >fdef => | <- ?]]
             [skarbnik.utils :as utils]))

(defn page
  "Creates credit account page"
  [{:keys
    [state
     open-file
     read-file!
     write-file!
     data-file-path ]}]
  (let [data (:credit-data @state)]
    [:section
     [:h2 "Credit Account"]
     [:button
      {:on-click #(open-file
                   (fn [file-names]
                     (if (= file-names nil)
                       (prn "no file selected")
                       (read-file! (first file-names) (fn [data] (swap! state assoc :credit-data data))))))}
      "Open file"]

     [:button
      {:on-click #(write-file! data-file-path (utils/maps->js data))}
      "Save"]

     [:p  "Press Enter to set Initial balance: "
      [:input {:placeholder "0"
               :type "number"
               :on-key-press (fn [e]
                               (if (= "Enter" (.-key e))
                                 (swap! state
                                        assoc :initial-credit-balance
                                        (js/parseFloat (.-value (.-target e)))))) }]]

     [:h3 (str "Initial Balance: " (:initial-credit-balance @state))]

     [:table
      [:thead
       [:tr
        (for [th (utils/get-maps-categories-str data)]
          ^{:key th}
          [:th th])]]
      [:tbody
       (map-indexed
        (fn [idx entry]
          ^{:key idx}
          [:tr
           (for [category-key (utils/get-maps-categories data)
                 :let [entry-val (category-key entry)]]
             ^{:key (str category-key "-" idx)}
             [:td
              {:class (if (= (name category-key) "Amount")
                        (str "bold " (if (< entry-val 0) "color-red" "color-blue")))}
              entry-val])
           ])

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
      {:on-click #(swap! state assoc :credit-data (utils/filter-by-date
                                                   data
                                                   (:from-date @state)
                                                   (:to-date @state)))}
      "Filter by date"]

     (let [plus           (utils/get-total data >)
           minus          (utils/get-total data <)
           difference     (utils/cents->dollars
                           (+ (utils/dollars->cents plus)
                              (utils/dollars->cents minus)))
           ending-balance (utils/cents->dollars
                           (+ (utils/dollars->cents (:initial-credit-balance @state))
                              (utils/dollars->cents difference)))]

       [:section.sums

        ;; sum `plus` and `minus` to get difference
        [:h2 "Difference: " difference]
        [:h2 "Plus: " plus]
        [:h2 "Minus: " minus]
        [:h2 "Ending Balance: " ending-balance]])
     ]))
