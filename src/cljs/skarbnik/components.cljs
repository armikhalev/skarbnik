(ns skarbnik.components
  "Components should be without side effects, but they depend on required libraries.
   State management should be provided only through args."
  (:require
   [reagent.core :as r]
   [clojure.pprint :as pp]
   [cljs.reader :as reader]
   [cljs-time.core :as cl-time]
   [clojure.string :as string
    :refer [split join]]
   [ghostwheel.core :as g
    :refer [>defn >defn- >fdef => | <- ?]]
   [skarbnik.helpers :as helpers]
   [skarbnik.logic :as logic]))




(defn bank-analyze
  [{:keys [data
           initial-bank-balance
           bank-recur-data
           bank-total-difference!]}]
  (let [plus           (logic/get-total data >)
        minus          (logic/get-total data <)
        difference     (logic/get-sum plus minus)
        ending-balance (logic/get-sum @initial-bank-balance difference)
        recur-sum*     (logic/sum-recur-amounts @bank-recur-data)
        recur-sum      (if (and
                            (not (number? recur-sum*))
                            (js/Number.isNaN recur-sum*))
                         0
                         recur-sum*)]

    (do
      (bank-total-difference! ending-balance)

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
  [{:keys [data
           initial-credit-balance
           credit-recur-data
           credit-total-difference!]}]
  (let [plus           (logic/get-total data >)
        minus          (logic/get-total data <)
        difference     (logic/get-sum plus minus)
        ending-balance (logic/get-sum @initial-credit-balance difference)
        recur-sum      (logic/sum-recur-amounts @credit-recur-data)]

       (do
         ;; Update
         (credit-total-difference! ending-balance)

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
           recur-data-mutator!
           big-data-mutator!
           current-account!
           initial-balance!
           total-difference!
           read-file!
           data-mutator!
           account-date-range-mutator!]}]
  [:button.button.button-smaller.open-file
   {:on-click #(open-file!
                (fn [file-names]
                  ;; Then read file and update
                  (if (= file-names nil)
                    (prn "no file selected")
                    (read-file! (first file-names)
                                (fn [data]
                                  (do
                                    ;; Nullify everything
                                    (account-date-range-mutator! {})
                                    (recur-data-mutator! {})
                                    (when big-data-mutator!
                                      (big-data-mutator! {}))
                                    (current-account! "")
                                    (initial-balance! 0)
                                    (total-difference! 0)
                                    ;;
                                    (data-mutator! data)))
                                :parse))))}
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
  [{:keys [account-kind-cursor
           account-kind-mutator!
           accounts-path
           recur-transactions
           big-transactions-path
           recur-data
           credit-big-data
           initial-balance
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
                    ;; Update and save it to file
                    (when (account-NOT-in-accounts? @account-kind-cursor dir-path)

                      ;; add directory name to accounts
                      (account-kind-mutator! conj dir-path)

                      ;; write path to *-accounts.edn for persistance
                      (write-file!
                       accounts-path
                       @account-kind-cursor))

                    ;; create dir (if doesn't exist fn will handle it)
                    (make-dir! dir-path)

                    ;; Write files
                    (write-file!
                     (str dir-path"/"recur-transactions)
                     @recur-data)
                    ;;
                    (when credit-big-data
                      (write-file!
                       (str dir-path"/"big-transactions-path)
                       @credit-big-data))
                    ;;
                    (write-file!
                     (str dir-path"/"initial-balance-file-path)
                     (logic/cents->dollars
                      @initial-balance))
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
  [initial-balance-mutator!]
  [:p  "Press Enter to set Initial balance: "
   [:input {:placeholder "0"
            :type "number"
            :on-key-press (fn [e]
                            (let [val (js/parseFloat (.-value (.-target e)))]
                              (when (logic/is-number? val)
                                (if (= "Enter" (.-key e))
                                  (let [val-in-cents (logic/dollars->cents val)]
                                    (initial-balance-mutator! val-in-cents))))))}]])

;; ROW

(defn table-row []
  (fn [{:keys [recur-data-mutator!
               big-data-mutator!
               side-drawer-mutator!
               idx
               entry
               selected?
               big?
               category-keys
               credit?]}]
    [:tr
     {:style {:background-color (cond
                                  @selected? "grey"
                                  @big?      "peru"
                                  :else      "")}}

     ;; Additional columns --->
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
                          (helpers/unset-distinct-data! big-data-mutator! entry)
                          ;; else
                          (helpers/set-distinct-data! big-data-mutator! entry))}
            (if @big? "BIG" "B?")
            ""]
           [:td ""])))

     ;; Recurring transaction label and handling

     (cond
       ;; Should not show label if amount is negative, i.e. paying off debt
       (and credit? (< (:amount entry) 0)) ;; -->
       ^{:key (str "recur-"idx)}
       [:td ""]
       ;;
       (and (not credit?) (> (:amount entry) 0)) ;; -->
       ^{:key (str "recur-"idx)}
       [:td ""]
       ;;
       :else ;; -->
       ^{:key (str "recur-"idx)}
       [:td
        (if-not @big?
          [:label.recur-sign
           {:on-click #(if @selected?
                         (helpers/unset-distinct-data! recur-data-mutator! entry)
                         ;; else
                         (helpers/set-distinct-data! recur-data-mutator! entry))
            :class (when @selected? "recur")}]
          ;; else don't show recur to avoid user confusion
          [:label ""])])

     ;; <--- Additional columns

     ;; ---> Columns coming from `entry`
     (doall
      (for [category-key category-keys
            :let [entry-val   (category-key entry)
                  ;; this three are used in side-drawer not in the row
                  description (:description entry)
                  date        (:date        entry)
                  amount      (:amount      entry)]]
        (case (name category-key)
          "_sk-id" ;; ->
          nil

          "debt" ;; ->
          nil

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
             {:on-click #(do
                           (side-drawer-mutator! :closed? false)
                           (side-drawer-mutator! :data {:entry entry-val
                                                        :parent-transaction {:description description
                                                                             :date        date
                                                                             :amount      amount}}))}
             (when (seq entry-val) "...")]

            ;; else
            ^{:key (str "bigs-" idx)}
            [:td ""])

          ;; else ->
          ^{:key (str category-key "-" idx)}
          [:td entry-val])))]))

;; ENDs: ROW


(defn transactions-table
  [{:keys [data
           recur-data-mutator!
           credit-big-data
           big-data-mutator!
           side-drawer-mutator!
           credit?
           recur-data]}]
  [:table
   [:thead
    [:tr
    (if credit?
      (take 2 (cycle '([:th ""])))
      ;; else
      [:th ""])

     (for [th (logic/get-maps-categories-str data)]
       (case th
         "description"
         ^{:key th}
         [:th "Description"]

         "amount"
         ^{:key th}
         [:th "Amount"]

         "date"
         ^{:key th}
         [:th "Date"]

         "bigs"
         ^{:key th}
         [:th.color-burnt-orange "Bigs"]

         "debt"
         nil
        ;  ^{:key th}
        ;  [:th.color-burnt-orange "Debt"]

         "_sk-id"
         nil
        ;  ^{:key th}
        ;  [:th.color-burnt-orange "sk-id"]

         ;; else
         ^{:key th}
         [:th th]))]]
   [:tbody
    (doall
     (map-indexed
      (fn [idx entry]
        (let [selected? (r/atom (contains? @recur-data
                                           (-> entry :_sk-id keyword)))
              big? (if credit-big-data
                     (r/atom (contains? @credit-big-data
                                        (-> entry :_sk-id keyword)))
                     (r/atom false))]
          ^{:key idx}
          [table-row
           {:recur-data-mutator!  recur-data-mutator!
            :big-data-mutator!    big-data-mutator!
            :side-drawer-mutator! side-drawer-mutator!
            :idx             idx
            :entry           entry
            :selected?       selected?
            :category-keys   (logic/get-maps-categories data)
            :credit?         credit?
            :big?            big?
            :data            data}]))
      ;; feed `map-indexed`
      data))]])

(defn side-drawer
  [{:keys [entry parent-transaction]} ;; <- `db/side-drawer-data` desctructured
   closed?
   side-drawer-mutator!]
  [:table.side-drawer
   {:class (when @closed? "closed")
    :on-click #(do
                (side-drawer-mutator! :closed? true)
                (side-drawer-mutator! :data {:entry []
                                             :parent-transaction {:date nil
                                                                  :description ""
                                                                  :amount ""}}))}
   [:tbody
    [:tr
     [:td.close-btn.color-burnt-orange]]
    [:tr
     [:td.color-blue "Clicked: "]

     [:td (:description parent-transaction)]
     [:td (->> parent-transaction :date (str "d: "))]
     [:td (str "$: "(-> parent-transaction :amount logic/cents->dollars))]]
    [:tr
     [:td
      [:hr]]]
    (doall
     (for [v entry]
       ^{:key (str "bigs-sub-"(:amount v)"-"(-> v :date str)"-"(:description v))}
       [:tr
        [:td.color-burnt-orange "desc: "]
        [:td (:description v)]
        [:td.color-burnt-orange "date: "]
        [:td (-> v :date logic/cljs-time->str)]
        [:td.color-burnt-orange "amount: "]
        [:td (str "$" (-> v :amount logic/cents->dollars))]]))]])

(defn date-picker
  [{:keys [from-date
           from-date!
           to-date
           to-date!
           data
           account-data-mutator!]}]
  [:section.date-picker
   [:label "Select date range from: "]
   [:input
    {:type "date"
     :on-change #(from-date! (.-target.value %))
     :name "from-date"}]
   [:label " to: "]
   [:input
    {:type "date"
     :on-change #(to-date! (.-target.value %))
     :name "to-date"}]
   [:button.margin-left-5
    {:on-click
     #(account-data-mutator!
       (logic/filter-by-date
        data
        @from-date
        @to-date))}
    "Filter by date"]
   [:button.margin-left-5
    {:on-click #(account-data-mutator! {})}
    "Reset"]])
