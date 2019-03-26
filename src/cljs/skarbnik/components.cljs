(ns skarbnik.components
  (:require
   [reagent.core :as r]
   [cljs.reader :as reader]
   [cljs-time.core :as cl-time]
   [clojure.string :as string
    :refer [split join]]
   [ghostwheel.core :as g
    :refer [>defn >defn- >fdef => | <- ?]]
   [skarbnik.helpers :as helpers]
   [skarbnik.db :as db]
   [skarbnik.logic :as logic]))




(defn bank-analyze
  [data state]
  (let [plus           (logic/get-total data >)
        minus          (logic/get-total data <)
        difference     (logic/get-sum plus minus)
        ending-balance (logic/get-sum (:initial-bank-balance @state) difference)
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
        [:h3 "Income: " (logic/cents->dollars plus)]
        [:h3 "Spendings: " (logic/cents->dollars minus)]
        [:h3.color-danger
         "Non-recurring spendings: " (logic/cents->dollars
                                      (logic/get-sum minus (- recur-sum)))]
        ;; [:h1  recur-sum*]
        ;; (prn (:bank-recur-data @state) )
        [:h3 "Net: " (logic/cents->dollars difference)]]
       [:section
        [:hr]
        [:h2 "All time:"]
        [:h3
         [:span "Recurring spendings sum: "]
         [:span
          (helpers/colorize-numbers recur-sum)
          (logic/cents->dollars recur-sum)]]
        [:span.inline-flex.h3
         [:span "Balance: "] [:span (helpers/colorize-numbers ending-balance)
                              (logic/cents->dollars ending-balance)]]]])))


(defn credit-analyze
  [data state]
  (let [plus           (logic/get-total data >)
        minus          (logic/get-total data <)
        difference     (logic/get-sum plus minus)
        ending-balance (logic/get-sum (:initial-credit-balance @state) difference)
        recur-sum      (logic/sum-recur-amounts (:credit-recur-data @state))]

       (do
         ;; Update state
         (swap! state assoc :credit-total-difference ending-balance)

         ;; View
         [:section.sums

          ;; sum `plus` and `minus` to get difference
          [:section
           [:h2 "This period:"]
           [:h3 "Debt: " (logic/cents->dollars plus)]
           [:h3 "Paid: " (logic/cents->dollars minus)]
           [:h3.color-danger
            "Non-recurring spendings: " (logic/cents->dollars
                                         (logic/get-sum plus (- recur-sum)))]
           [:h3 "Added debt: " (logic/cents->dollars difference)]]
          [:section
           [:hr]
           [:h2 "All time:"]
           [:h3
            [:span "Recurring spendings sum: "]
            [:span (helpers/colorize-numbers recur-sum)
             (logic/cents->dollars recur-sum)]]
           [:span.inline-flex.h3
            [:span "Total debt: "]
            [:span
             (if (not= 0 ending-balance)
               {:class "color-red margin-left-5"})
             (if (logic/is-number? ending-balance)
               (logic/cents->dollars ending-balance)
               "Fix numbers in your data file")]]]])))


(defn button-open-file!
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
                    (prn "FIXME: should nullify name of the current account on new file load and all the things: big data recurring data, all state!")
                    (swap! state assoc
                           recur-data-key {})
                    ;; Then read file and update state
                    (if (= file-names nil)
                      (prn "no file selected")
                      (read-file! (first file-names)
                                  (fn [data] (swap! state assoc
                                                    data-key
                                                    data))
                                  :parse)))))}
   "Open file"])


;; SAVE button

(defn account-NOT-in-accounts?
  "Filters names in `*-accounts.edn` to find dir-path name in there,
  if DOESN'T find one returns true."
  [accounts
   dir-path]
  (= (count
      (filter #(= % dir-path)
              accounts))
     0))

(defn button-save-account!
  [{:keys [state
           account-kind-$key
           accounts-path
           recur-transactions
           big-transactions
           recur-data-$key
           big-data-$key
           initial-balance-$key
           initial-balance-file-path
           data-file-path
           show-save-file-dialog!
           make-dir!
           write-file!
           read-file!
           data]}]
  [:button.button.button-smaller.save-file
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
                    (when big-data-$key
                      (write-file!
                       (str dir-path"/"big-transactions)
                       (big-data-$key @state)))
                    ;;
                    (write-file!
                     (str dir-path"/"initial-balance-file-path)
                     (logic/cents->dollars
                      (initial-balance-$key @state)))
                    ;;
                    (let [data* (map (fn [m]
                                       (-> m
                                        (update , :amount
                                                  logic/cents->dollars)))
                                     data)]
                      (write-file!
                       (str dir-path"/"data-file-path)
                       (logic/maps->js data*))))))}
   "Save account"])

;; ENDs: SAVE button


(defn input-initial-balance!
  [{:keys [state
           initial-balance-$key]}]
  [:p  "Press Enter to set Initial balance: "
   [:input {:placeholder "0"
            :type "number"
            :on-key-press (fn [e]
                            (let [val (js/parseFloat (.-value (.-target e)))]
                              (when (logic/is-number? val)
                                (if (= "Enter" (.-key e))
                                  (let [val-in-cents (logic/dollars->cents val)]
                                    (swap! state assoc initial-balance-$key val-in-cents))))))}]])

;; ROW

(defn table-row
  "`type-recur-data` (or `:bank-recur-data`  `:credit-recur-data`)"
  []

  (let [open? (r/atom false)]
    (fn [{:keys [type-recur-data
                 type-big-data
                 state
                 idx
                 entry
                 selected?
                 big?
                 data
                 credit?]}]
      [:tr
       {:style {:background-color (cond
                                    @selected? "grey"
                                    @big?      "peru"
                                    :else      "")}}
       (doall
        (for [category-key (logic/get-maps-categories data)
              :let [entry-val (category-key entry)]]
          (case (name category-key)
            "date" ;; ->
            ^{:key (str "date-" idx)}
            [:td entry-val]

            "amount" ;; ->
            ^{:key (str "amount-" idx)}
            [:td
             (helpers/colorize-numbers entry-val)
             (if (logic/is-number? entry-val)
               (logic/cents->dollars entry-val)
               ;;else
               "?")]

            "bigs" ;; ->
            (if entry-val
              ^{:key (str "bigs-" idx)}
              [:td.color-peru
               {:on-click #(swap! open? not)}
               (if @open?
                 (doall
                  (for [v entry-val]
                    ^{:key (str "bigs-sub-" idx "-" (helpers/three-fold-key v))}
                    [:tr.border
                     [:td.color-burnt-orange "desc: "]
                     [:td (:description v)]
                     [:td.color-burnt-orange "date: "]
                     [:td (-> v :date logic/cljs-time->str)]
                     [:td.color-burnt-orange "amount: "]
                     [:td (str "$" (-> v :amount logic/cents->dollars))]]))
                 "Show linked debts")]

              ;; else
              ^{:key (str "bigs-" idx)}
              [:td ""])

            "debt" ;; ->
            ^{:key (str "debt-" idx)}
            [:td.color-burnt-orange
             (when entry-val
               (str "$" (logic/cents->dollars entry-val)))]

            ;; else ->
            ^{:key (str category-key "-" idx)}
            [:td entry-val])))


       ;; Recurring transaction label and handling

       (if (and credit? (< (:amount entry) 0))
         ;; Should not show label if amount is negative, i.e. paying off debt
         ^{:key (str "recur-"idx)}
         [:td ""]

         ;; else
         ^{:key (str "recur-"idx)}
         [:td
          (if-not @big?
            [:label.recur-sign
             {:on-click #(if @selected?
                           (helpers/unset-distinct-data! state entry type-recur-data)
                           ;; else
                           (helpers/set-distinct-data! state entry type-recur-data))
              :class (when @selected? "recur")}]
            ;; else don't show recur to avoid user confusion
            [:label ""])])


       ;; Big transaction label and handling

       (when credit?
         ;; Should not show label if amount is negative, i.e. paying off debt
         (if (< (:amount entry) 0)
           ^{:key (str "big-"idx)}
           [:td ""]

           ;; else
           ^{:key (str "big-"idx)}

           (if-not @selected?
             [:td
              {:class (when @big? "color-danger")
               :on-click #(if @big?
                            (helpers/unset-distinct-data! state entry type-big-data)
                            ;; else
                            (helpers/set-distinct-data! state entry type-big-data))}
              (if @big? "BIG" "B?")
              ""]
             [:td ""])))])))

;; ENDs: ROW


(defn transactions-table
  [{:keys [state
           data
           credit?
           account-data-$key
           account-recur-data-$key
           account-big-data-$key]}]
  [:table
   [:thead
    [:tr
     (for [th (logic/get-maps-categories-str data)]
       (case th
         "bigs"
         ^{:key th}
         [:th.color-burnt-orange "Bigs"]

         "debt"
         ^{:key th}
         [:th.color-burnt-orange "Debt"]

         ;; else
         ^{:key th}
         [:th th]))]]
   [:tbody
    (doall
     (map-indexed
      (fn [idx entry]
        (let [selected? (r/atom (contains? (account-recur-data-$key @state)
                                           (helpers/three-fold-key entry)))
              big? (if account-big-data-$key
                     (r/atom (contains? (account-big-data-$key @state)
                                        (helpers/three-fold-key entry)))
                     (r/atom false))]

          ^{:key idx}
          [table-row
           {:type-recur-data account-recur-data-$key
            :type-big-data   account-big-data-$key
            :state           state
            :entry           entry
            :selected?       selected?
            :credit?         credit?
            :big?            big?
            :data            data}]))
      ;; feed `map-indexed`
      data))]])


(defn date-picker
  [state data account-kind-$key]
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
    {:on-click #(swap! state assoc
                       account-kind-$key
                       (logic/filter-by-date
                        data
                        (:from-date @state)
                        (:to-date @state)))}
    "Filter by date"]])
