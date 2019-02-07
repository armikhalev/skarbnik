(ns skarbnik.components
  (:require
   [cljs.reader :as reader]
   [clojure.string :as string
    :refer [split join]]
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


(defn button-open-file-comp!
  [{:keys [open-file!
           state
           recur-data-key
           read-file!
           data-key]}]

  [:button.button.button-smaller.open-file
   {:on-click #(open-file!
                (fn [file-names]
                  (do
                    ;; Nullify recurring transactions data
                    (swap! state assoc
                           recur-data-key {})
                    ;; Then read file and update state
                    (if (= file-names nil)
                      (prn "no file selected")
                      (read-file! (first file-names)
                                  (fn [data] (swap! state assoc
                                                   data-key data))
                                  :parse)))))}
   "Open file"])


(defn account-NOT-in-accounts?
  "Filters names in `*-accounts.edn` to find dir-path name in there,
  if DOESN'T find one returns true."
  [accounts
   dir-path]
  (= (count
      (filter #(= % dir-path)
              accounts))
     0))

(defn input-save-account!
  [{:keys [state
           account-kind-$key
           accounts-path
           recur-transactions
           recur-data-$key
           initial-balance-$key
           initial-balance-file-path
           data-file-path
           show-save-file-dialog!
           make-dir!
           write-file!
           read-file!
           data]}]
  [:button.button.button-smaller.open-file
   {:on-click #(let [dir-path (-> (show-save-file-dialog!) str)]
                (when dir-path
                  (do
                    ;; Update state and save it to file
                    (when (account-NOT-in-accounts? (account-kind-$key @state) dir-path)

                      ;; add directory name to accounts in state
                      (swap! state update account-kind-$key conj dir-path)

                      ;; write path to *-accounts.edn for persistance
                      (write-file!
                       accounts-path
                       (account-kind-$key @state)))

                    ;; create dir (if doesn't exist fn will handle it)
                    (make-dir! dir-path)

                    ;; Write files
                    (write-file!
                     (str dir-path"/"recur-transactions)
                     (recur-data-$key @state))
                    ;;
                    (write-file!
                     (str dir-path"/"initial-balance-file-path)
                     (initial-balance-$key @state))
                    ;;
                    (write-file!
                     (str dir-path"/"data-file-path)
                     (logic/maps->js data)))))}
   "Save account"])


(defn input-initial-balance!
  [{:keys [state
           initial-balance-$key]}]
  [:p  "Press Enter to set Initial balance: "
   [:input {:placeholder "0"
            :type "number"
            :on-key-press (fn [e]
                            (let [val (js/parseFloat (.-value (.-target e)))]
                              (when (and (number? val) (not (js/Number.isNaN val)))
                                (if (= "Enter" (.-key e))
                                  (do
                                    (swap! state assoc initial-balance-$key val))))))}]])


