(ns skarbnik.bank-account
  (:require [reagent.core :as r :refer [atom]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]))

;; Components

(defn- table-row
  [{:keys [state idx entry selected? data]}]

  ^{:key idx}
  [:tr
   {:on-click #(if @selected?
                 (helpers/unset-recur-data! state entry :bank-recur-data)
                ;; else
                 (helpers/set-recur-data! state entry :bank-recur-data))
    :style {:background-color (if @selected? "grey" "")}}

   (for [category-key (logic/get-maps-categories data)
         :let [entry-val (category-key entry)]]
     ^{:key (str category-key "-" idx)}
     [:td
      (if (= (name category-key) "amount")
        (helpers/colorize-numbers entry-val))
      entry-val])])

;; ENDS: Components

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
             (table-row {:state state
                         :idx idx
                         :entry entry
                         :selected? selected?
                         :data data} )))

         ;; feed `map-indexed`
         (:bank-data @state)))]]

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
           difference     (logic/get-sum-in-dollars plus minus)
           ending-balance (logic/get-sum-in-dollars (:initial-bank-balance @state) difference)
           recur-sum      (logic/sum-recur-amounts (:bank-recur-data @state))]

       (do
         ;; Update state
         (swap! state assoc :bank-total-difference ending-balance)

         ;; View
         [:section.sums

          ;; sum `plus` and `minus` to get difference
          [:section
           [:h2 "This period:"]
           [:h3 "Income: " plus]
           [:h3 "Spendings: " minus]
           [:h3 {:class "color-danger"} "Non-recurring spendings: " (logic/get-sum-in-dollars plus (- recur-sum))]
           [:h3 "Net: " difference]]
          [:section
           [:h2 "All time:"]
           [:h3
            [:span "Recurring spendings sum: "] [:span (helpers/colorize-numbers recur-sum) recur-sum]]
           [:span
            {:class "inline-flex h3"}
            [:span "Balance: "] [:span (helpers/colorize-numbers ending-balance) ending-balance]]]]))]))

