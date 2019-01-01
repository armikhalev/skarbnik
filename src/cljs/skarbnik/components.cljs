(ns skarbnik.components
  (:require
   [ghostwheel.core :as g
    :refer [>defn >defn- >fdef => | <- ?]]
   [skarbnik.helpers :as helpers]
   [skarbnik.logic :as logic]))

(defn table-row
  "`type-recur-data` (or `:bank-recur-data`  `:credit-recur-data`)"
  [{:keys [type-recur-data state idx entry selected? data]}]

  ^{:key idx}
  [:tr
   {:on-click #(if @selected?
                 (helpers/unset-recur-data! state entry type-recur-data)
                 ;; else
                 (helpers/set-recur-data! state entry type-recur-data))
    :style {:background-color (if @selected? "grey" "")}}

   (for [category-key (logic/get-maps-categories data)
         :let [entry-val (category-key entry)]]
     ^{:key (str category-key "-" idx)}
     [:td
      (if (= (name category-key) "amount")
        (helpers/colorize-numbers entry-val))
      entry-val])])


(defn bank-analyze-comp
  [data state]
  (let [plus           (logic/get-total data >)
        minus          (logic/get-total data <)
        difference     (logic/get-sum-in-dollars plus minus)
        ending-balance (logic/get-sum-in-dollars (:initial-bank-balance @state) difference)
        recur-sum*     (logic/sum-recur-amounts (:bank-recur-data @state))
        recur-sum      (if (and
                            (not (number? recur-sum*))
                            (js/Number.isNaN recur-sum*))
                         0
                         recur-sum*)]

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
        [:h3.color-danger
         "Non-recurring spendings: " (logic/get-sum-in-dollars minus (- recur-sum))]
        [:h3 "Net: " difference]]
       [:section
        [:hr]
        [:h2 "All time:"]
        [:h3
         [:span "Recurring spendings sum: "] [:span (helpers/colorize-numbers recur-sum) recur-sum]]
        [:span.inline-flex.h3
         [:span "Balance: "] [:span (helpers/colorize-numbers ending-balance) ending-balance]]]])))


(defn credit-analyze-comp
  [data state]
  (let [plus           (logic/get-total data >)
           minus          (logic/get-total data <)
           difference     (logic/get-sum-in-dollars plus minus)
           ending-balance (logic/get-sum-in-dollars (:initial-credit-balance @state) difference)
           recur-sum      (logic/sum-recur-amounts (:credit-recur-data @state))]

       (do
         ;; Update state
         (swap! state assoc :credit-total-difference ending-balance)

         ;; View
         [:section.sums

          ;; sum `plus` and `minus` to get difference
          [:section
           [:h2 "This period:"]
           [:h3 "Debt: " plus]
           [:h3 "Paid: " minus]
           [:h3.color-danger
            "Non-recurring spendings: " (logic/get-sum-in-dollars plus (- recur-sum))]
           [:h3 "Added debt: " difference]]
          [:section
           [:hr]
           [:h2 "All time:"]
           [:h3
            [:span "Recurring spendings sum: "] [:span (helpers/colorize-numbers recur-sum) recur-sum]]
           [:span.inline-flex.h3
            [:span "Total debt: "]
            [:span
             (if (not= 0 ending-balance)
               {:class "color-red margin-left-5"})
             ending-balance]]]])))
