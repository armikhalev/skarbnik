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


;; Tooltip

(defn tooltip
  [show-tooltip?
   text]
  [:div.tooltip
   {:class (when @show-tooltip? "show")}
   (if text text "")
   [:i]])

(defn tooltip-parent
  "<el> str? -> <tooltip <el>>"
  [parent-el
   tooltip-text]
  (let [show-tooltip? (r/atom false)]
    [:span.tooltip-parent
     {:on-mouse-over #(reset! show-tooltip? true)
      :on-mouse-out  #(reset! show-tooltip? false)}
     (if parent-el parent-el [:div ""])
     [tooltip show-tooltip? tooltip-text]]))

;; ENDs: Tooltip


(defn bank-analyze
  [{:keys [data
           initial-bank-balance
           bank-recur-data
           bank-total-difference!]}]
  (let [plus           (logic/get-total data >)
        minus          (logic/get-total data <)
        difference     (logic/get-sum plus minus)
        ending-balance (logic/get-sum initial-bank-balance difference)
        recur-sum*     (logic/sum-recur-amounts bank-recur-data)
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
         [:span "Balance: "]
         [:span
          (if (not= 0 ending-balance)
            {:class "color-red margin-left-5"})
          (if (logic/is-number? ending-balance)
            (logic/cents->dollars ending-balance)
            "Fix numbers in your data file")]]]])))

;; ENDs: bank-analyze


;; Credit-analyze & its tooltips

(defn added-debt-analyze-row
  [difference]
  [tooltip-parent
   (if (> difference 0)
     [:h3
      "Added debt: " (logic/cents->dollars difference)]
     ;; else if all paid
     [:h3.color-green
      "Less Debt: " (logic/cents->dollars difference)]),
   "This is `Debt` minus `Paid`"])

(defn debt-sum
  [debt-sum]
  [tooltip-parent
   [:h3 "Debt Sum: " (logic/cents->dollars debt-sum)]
   "Sum of all debt increasing transactions"])

(defn total-debt
  [ending-balance]
  [tooltip-parent
   [:span.total-debt.inline-flex.h3
    [:span "Total debt: "]
    [:span
     (if (not= 0 ending-balance)
       {:class "color-red margin-left-5"})
     (if (logic/is-number? ending-balance)
       (logic/cents->dollars ending-balance)
       "Fix numbers in your data file")]]
   "Initial Balance debt + Debt Sum of this period"])

(defn credit-analyze
  [{:keys [data
           initial-credit-balance
           credit-recur-data
           big-data
           credit-total-difference!]}]
  (let [plus           (logic/get-total data >)
        minus          (logic/get-total data <)
        difference     (logic/get-sum plus minus)
        ending-balance (logic/get-sum initial-credit-balance difference)
        big-data-sum   (logic/sum-recur-amounts big-data)
        recur-sum      (logic/sum-recur-amounts credit-recur-data)]

       (do
         ;; Update
         (credit-total-difference! ending-balance)

         ;; View
         [:section.sums

          ;; sum `plus` and `minus` to get difference
          [:section
           [:h2 "This period:"]
           [debt-sum plus]
           ;; [:h3 "Debt Sum: " (logic/cents->dollars plus)]
           [:h3 "Paid: " (logic/cents->dollars minus)]
           [:h3.color-danger
            "All Non-recurring spendings: " (logic/cents->dollars
                                             (logic/get-sum plus (- recur-sum)))]
           (when (seq big-data)
             [:span.bigs-analyze
              [:h3.color-danger
               "Non-recurring spendings without Bigs: " (logic/cents->dollars
                                                         (- (logic/get-sum plus (- recur-sum )) big-data-sum))]
              [:h3 "Bigs Sum: " (logic/cents->dollars big-data-sum)]])
           [:h3
            [:span "Recurring spendings sum: "]
            [:span (helpers/colorize-numbers recur-sum)
             (logic/cents->dollars recur-sum)]]

           [added-debt-analyze-row difference]]

          [:section
           [:hr]
           [:h2 "All time:"]
           [ total-debt ending-balance ]]])))

;; ENDs: Credit-analyze & its tooltips


(defn button-open-file!
  [{:keys [open-file!
           current-account!
           initial-balance!
           total-difference!
           read-file!
           meta-data-mutator!
           data-mutator!
           account-date-range-mutator!]}]
  [:button.button.button-smaller.open-file
   {:data-test "button-open-file"
    :on-click #(open-file!
                (fn [file-names]
                  ;; Then read file and update
                  (if (= file-names nil)
                    (prn "no file selected")
                    (read-file! (first file-names)
                                (fn [data]
                                  (do
                                    ;; Nullify everything
                                    (meta-data-mutator! {})
                                    (account-date-range-mutator! {})
                                    (current-account! "")
                                    (initial-balance! 0)
                                    (total-difference! 0)
                                    ;;
                                    (data-mutator! data)))
                                :parse))))}
   "Open file"])


;; SAVE button

(defn button-save-account!
  [{:keys [all-accounts-paths
           account-kind-mutator!
           accounts-path
           initial-balance
           initial-balance-file-path
           data-file-path
           show-save-file-dialog!
           make-dir!
           write-file!
           meta-data-path
           meta-data
           data]}]
  [:button.button.button-smaller.save-file
   {:data-test "button-save-account"
    :on-click #(helpers/save-account!
                {:all-accounts-paths        all-accounts-paths
                 :account-kind-mutator!     account-kind-mutator!
                 :accounts-path             accounts-path
                 :initial-balance           initial-balance
                 :initial-balance-file-path initial-balance-file-path
                 :data-file-path            data-file-path
                 :show-save-file-dialog!    show-save-file-dialog!
                 :make-dir!                 make-dir!
                 :write-file!               write-file!
                 :meta-data-path            meta-data-path
                 :meta-data                 meta-data
                 :data                      data})}
   "Save account"])

;; ENDs: SAVE button


;; Recurring by account BTN

(defn rec-by-account-btn
  [{:keys [recur-data
           side-drawer-mutator!]}]
  (let [recur-by-account (logic/recur-by-account-name recur-data)]
    [:button.button.button-smaller
     {:on-click #(do
                  (side-drawer-mutator! :data {:recur-entry recur-by-account})
                  (side-drawer-mutator! :closed? false))}
     "Recurring by account"]))

;; ENDs: Recurring by account BTN


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

(defn tooltip-tag
  [{:keys [show-tooltip?
           meta-data-mutator!
           meta-data
           tags-choice
           entry]}]
  [:div.tooltip-tag
   {:class (when @show-tooltip? "show-tooltip-tag")}
   (reduce (fn [span tag]
             (conj span
                   [:div
                    {:on-click #(let [contains-tag? (contains? meta-data tag)]
                                  (if contains-tag?
                                    (helpers/unset-tag! meta-data-mutator! entry tag)
                                    ;; else
                                    (helpers/set-tag!
                                     {:mutator!   meta-data-mutator!
                                      :entry      entry
                                      :meta-data  meta-data
                                      :tag        tag})))}
                    tag]))
           [:span ]
           tags-choice)])

(defn tag-with-tooltip
  [{:keys [entry
           idx
           selected?
           meta-data-mutator!
           meta-data
           tags-choice
           credit?]}]
  (let [show-tooltip? (r/atom false)]
    ^{:key (str "tag-"idx)}

    ;; Should show tag-tooltip only for spendings
    (cond
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
      [:td.tag-with-tooltip.cursor-pointer
       {:on-click #(reset! show-tooltip? (not @show-tooltip?))
        :class    (condp #(contains? %2 %1) meta-data
                    :BIG "color-danger"
                    :Recur "recur-sign recur"
                    ;; else
                    "")}
       [:span
        (reduce (fn [span v]
                  (conj span
                        [:div (case v
                                :Recur ""
                                v)]))
                [:span ] meta-data)
        [tooltip-tag {:show-tooltip?        show-tooltip?
                      :meta-data-mutator!   meta-data-mutator!
                      :meta-data            meta-data
                      :tags-choice          tags-choice
                      :entry                entry}]]])))

(defn table-row []
  (fn [{:keys [meta-data-mutator!
               side-drawer-mutator!
               idx
               entry
               tags
               tags-choice
               category-keys
               credit?]}]
    [:tr
     {:class (condp #(contains? %2 %1) tags
               :Recur  "recur-bg"
               :BIG    "big-bg"
               :Ignore "opaque"
               "")}

     ;; Additional columns --->

     ;; TAG
     [tag-with-tooltip {:entry                entry
                        :idx                  idx
                        :meta-data-mutator!   meta-data-mutator!
                        :meta-data            tags
                        :tags-choice          tags-choice
                        :credit?              credit?}]

     ;; <--- Additional columns

     ;; ---> Columns coming from `entry`
     (doall
      (for [category-key category-keys
            :let [entry-val   (category-key entry)
                  ;; these vals are used in side-drawer not in the row
                  debt (:debt entry)
                  description (:description entry)
                  date        (:date        entry)
                  amount      (:amount      entry)]]
        (case (name category-key)
          "_sk-id" ;; ->
          nil

          "debt" ;; ->
          nil
          ;; ^{:key (str "debt-" idx)}
          ;; [:td.color-burnt-orange
          ;;  (if (> entry-val 0)
          ;;    (str "$" (logic/cents->dollars entry-val))
          ;;    "")]
          "date" ;; ->
          ^{:key (str "date-" idx)}
          [:td entry-val]

          "description" ;; ->
          ^{:key (str "description-" idx)}
          [:td.description entry-val]

          "amount" ;; ->
          (if (logic/is-number? entry-val)
            ^{:key (str "amount-" idx)}
            [:td.amount
             (helpers/colorize-numbers entry-val)
             (logic/cents->dollars entry-val)]
            ;;else
            ^{:key (str "amount-" idx)}
            [:td.amount.color-danger.bold
             "???"])

          "bigs" ;; ->
          (if entry-val
            ^{:key (str "bigs-" idx)}
            [:td.big-entry.color-burnt-orange.cursor-pointer
             {:on-click #(do
                           (side-drawer-mutator! :closed? false)
                           (side-drawer-mutator! :data {:big-entry entry-val
                                                        :parent-transaction {:description description
                                                                             :date        date
                                                                             :amount      amount}}))}
             (if (> debt 0)
               (str "$" (logic/cents->dollars debt))
               (when (< amount 0)
                 "Paid Bigs off"))]

            ;; else
            ^{:key (str "bigs-" idx)}
            [:td ""])

          ;; else ->
          ^{:key (str category-key "-" idx)}
          [:td entry-val])))]))

;; ENDs: ROW


(defn transactions-table
  [{:keys [data
           meta-data-mutator!
           side-drawer-mutator!
           credit?
           meta-data
           tags-choice]}]
  (if-not (seq data)
    [:section.transactions-table-wrapper
     [:div.padder]
     [:table.transactions-table
      [:thead
       [:tr
        [:th
         [:h2.color-peru
          "Start by clicking <Open File> button and choose data file."]]]]]]

    ;; If there is table `data`
    [:section.transactions-table-wrapper
     [:div.padder]
     [:table.transactions-table
      [:thead
       [:tr
        ^{:key "empty-2"}
        [:th [:div "Tag"]]

        (for [th (logic/get-maps-categories-str data)]
          (case th
            "description"
            ^{:key th}
            [:th.description [:div "Description"]]

            "amount"
            ^{:key th}
            [:th [:div "Amount"]]

            "date"
            ^{:key th}
            [:th [:div "Date"]]

            "bigs"
            ^{:key th}
            [:th.color-burnt-orange [:div "BDebt"]]

            "debt"
            nil
            ;; ^{:key th}
            ;; [:th.color-burnt-orange [:div "Debt"]]

            "_sk-id"
            nil
            ;  ^{:key th}
            ;  [:th.color-burnt-orange "sk-id"]

            ;; else
            ^{:key th}
            [:th [:div th]]))]]
      [:tbody
       {:data-test "transactions-table"}
       (doall
        (map-indexed
         (fn [idx entry]
           (let [row-meta-data (get meta-data (-> entry :_sk-id keyword) [])]
             ^{:key idx}
             [table-row
              {:meta-data-mutator!   meta-data-mutator!
               :side-drawer-mutator! side-drawer-mutator!
               :idx                  idx
               :entry                entry
               :tags                (get-in row-meta-data [:meta-data :tags] [])
               :tags-choice          tags-choice
               :category-keys        (logic/get-maps-categories data)
               :credit?              credit?
               :data                 data}]))
         ;; feed `map-indexed`
         data))]]]))

;; ENDs: Transactions Table


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


;; SIDE DRAWER

(defn side-drawer-bigs
  [data]
  (let [{:keys [big-entry parent-transaction]} data]
    [:tbody
     [:tr
      [:td.color-blue "Clicked: "]

      [:td (:description parent-transaction)]
      [:td (->> parent-transaction :date (str "d: "))]
      [:td (str "$: "(-> parent-transaction :amount logic/cents->dollars))]]
     [:tr
      [:td
       [:hr]]]
     (doall
      (for [v big-entry]
        ^{:key (str "bigs-sub-"(:amount v)"-"(-> v :date str)"-"(:description v))}
        [:tr
         [:td.color-burnt-orange "desc: "]
         [:td (:description v)]
         [:td.color-burnt-orange "date: "]
         [:td (-> v :date logic/cljs-time->str)]
         [:td.color-burnt-orange "amount: "]
         [:td (str "$" (-> v :amount logic/cents->dollars))]]))]))

(defn side-drawer-recurs
  [{:keys [recur-entry]}]
  (doall
   (for [[account-name data] recur-entry]
     (let [sum-amounts (reduce #(+ %1 (:amount %2)) 0 data)]
       ^{:key (str account-name"-"uuid)}
       [:tbody
        [:tr
         [:td ""]
         [:td.color-blue account-name]]
        (for [v data]
          ^{:key (str "recur-sub-"(:amount v)"-"(-> v :date str)"-"(:description v))}
          [:tr
           [:td.color-peru "desc: "]
           [:td (:description v)]
           [:td.color-peru "date: "]
           [:td (-> v :date logic/cljs-time->str)]
           [:td.color-peru "amount: "]
           [:td (str "$" (-> v :amount logic/cents->dollars))]])
        [:tr
         [:td]
         [:td]
         [:td]
         [:td]
         [:td "Sum: "]
         [:td.color-danger (str "$"(logic/cents->dollars sum-amounts))]]
        [:tr
         [:td]
         [:td
          [:hr]]]]))))

(defn side-drawer-wrapper
  [data
   closed?
   side-drawer-mutator!]
  [:table.side-drawer
   {:class (when closed? "closed")
    :on-click #(side-drawer-mutator! :closed? true)}
   [:tbody
    [:tr
     [:td.close-btn.color-burnt-orange]]]
   (let [k (-> data keys first)]
     (case k
       :recur-entry (side-drawer-recurs data)
       :big-entry   (side-drawer-bigs data)
       ;; Else - never appears
       [:thead
        [:tr
         [:th "There is no data provided."]]]))])

;; ENDs: Side Drawer
