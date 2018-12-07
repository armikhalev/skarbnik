(ns skarbnik.bank-account
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs.nodejs :as nodejs]
             [ghostwheel.tracer]
             [ghostwheel.core :as g
              :refer [>defn >defn- >fdef => | <- ?]]
             [skarbnik.utils :as utils]))

(defn page
  "Creates bank account page"
  [{:keys
    [state
     open-file
     read<-file
     write->file
     data-file-path ]}]
  (let [data (:data @state)]
    [:section
     [:h2 "Bank Account"]
     [:button
      {:on-click #(open-file
                   (fn [file-names]
                     (if (= file-names nil)
                       (prn "no file selected")
                       (read<-file (first file-names)))))}
      "Open file"]

     [:button
      {:on-click #(write->file data-file-path (utils/maps->js data))}
      "Save"]

     [:p  "Press Enter to set Initial balance: "
      [:input {:placeholder "0"
               :type "number"
               :on-key-press (fn [e]
                               (if (= "Enter" (.-key e))
                                 (swap! state
                                        assoc :initial-balance
                                        (js/parseFloat (.-value (.-target e)))))) }]]

     [:h3 (str "Initial Balance: " (:initial-balance @state))]

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
        (:data @state))]]

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
      {:on-click #(swap! state assoc :data (utils/filter-by-date
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
                           (+ (utils/dollars->cents (:initial-balance @state))
                              (utils/dollars->cents difference)))]

       [:section.sums

        ;; sum `plus` and `minus` to get difference
        [:h2 "Difference: " difference]
        [:h2 "Plus: " plus]
        [:h2 "Minus: " minus]
        [:h2 "Ending Balance: " ending-balance]])
     ]))
