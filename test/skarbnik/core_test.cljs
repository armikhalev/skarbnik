(ns skarbnik.core-test
  (:require [cljs.test :refer-macros [is testing async]]
            [reagent.core :as r]
            [devcards.core :refer-macros [deftest defcard-rg]]
            [skarbnik.logic :as logic]
            [cljs-time.coerce :as ->cl-time]
            [skarbnik.db :as sdb]
            [skarbnik.components :as components]))

;; Gets the real db and make a copy, then use it for testing

(def state sdb/db)

;; Initial balance
(def initial-bank-balance  sdb/initial-bank-balance)
(def initial-bank-balance! sdb/initial-bank-balance!)
;;
(def initial-credit-balance  sdb/initial-credit-balance)
(def initial-credit-balance! sdb/initial-credit-balance!)

;; REcur data
(def bank-recur-data  sdb/bank-recur-data)
(def bank-recur-data! sdb/bank-recur-data!)
;;
(def credit-recur-data  sdb/credit-recur-data)
(def credit-recur-data! sdb/credit-recur-data!)

;; Total diff
(def bank-total-difference  sdb/bank-total-difference)
(def bank-total-difference! sdb/bank-total-difference!)
;;
(def credit-total-difference  sdb/credit-total-difference)
(def credit-total-difference! sdb/credit-total-difference!)

;;;;;;;;;;;;;;;;;;;;; Prepare data ;;;;;

(bank-recur-data! {"Loan" {:description "QUICKEN LOANS MTG PYMTS 120518",
                           :amount -2000,
                           :date "12/06/2018"},
                   "Discover" {:description "DISCOVER E-PAYMENT 181008",
                               :amount -3000,
                               :date "10/10/2018"}})

(credit-recur-data! {"Bank" {:description "DISCOVER E-PAYMENT 181008",
                             :amount 3000,
                             :date "10/10/2018"}})


(def test-data
  '({:date "11/26/2018",
     :description "MBTA PAY BY PHO BOSTON /MA US CARD PURCHASE",
     :amount -2500}
    {:date "11/13/2018",
     :description "ZINAIDA LEVIN M CANTON /MA US CARD PURCHASE",
     :amount -2500}
    {:date "11/13/2018",
     :description "CASH WITHDRAWAL SANTANDER D199 Holbrook /MA US",
     :amount -5000}
    {:date "11/13/2018",
     :description "INTERNET TRANSFER FROM ACCT *2394 - SANTANDER SAVINGS",
     :amount 5000}))

;;; ENDs: prepare data


;;; TESTS !!!

(deftest get-total-test
  (testing "Should correctly get total sum of amounts"
    (is (= 5000
           (logic/get-total test-data >)))

    (is (= -10000
           (logic/get-total test-data <)))))

(deftest get-ending-balance-test
  (testing "Should return correct ending balance"
    (is (= -40.00
           (logic/get-sum 10 -50)))))


(defn colorize-number
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})

(defcard-rg colorize-number
  "Should colorize number"
  [:span
   {:class "inline-flex"}
   [:h3
    "Income: " ]
   [:h3 (colorize-number -2) -2]])

(defcard-rg color-red-if-not-null
  "Should set color of the number to red if not 0"
  (let [ending-balance 1]
    [:span
     (if (not= 0 ending-balance)
       {:class "color-red margin-left-5"})
     ending-balance]))

;; Bank

(defcard-rg bank-analyze-comp
  "Should show correct calculation numbers:
  This period:
    Income: 50.00
    Spendings: -100.00
    Non-recurring spendings: -50.00
    Net: -50.00
    All time:
    Recurring spendings sum: -50.00
    Balance:
    -50.00"
  [ components/bank-analyze {:data test-data
                             :initial-bank-balance   initial-bank-balance
                             :bank-recur-data        bank-recur-data
                             :bank-total-difference! bank-total-difference!}])

;; ENDs: Bank

;; Credit


(defcard-rg credit-analyze-comp
  "Should show correct calculation numbers:
  This period:
    Debt: 50.00
    Paid: -100.00
    Non-recurring spendings: 20.00
    Added debt: -50.00
    All time:
    Recurring spendings sum: 30.00
    Total debt:
    -50.00"
  [ components/credit-analyze {:data                     test-data
                               :initial-credit-balance   initial-credit-balance
                               :credit-recur-data        credit-recur-data
                               :credit-total-difference! credit-total-difference!}])

;; ENDs: Credit

;; LOGIC

(defn dates->cljs-time
  [date]
  (->cl-time/from-date (js/Date. date)))

(def test-credit-data
  '({:date "12/02/2017",
     :description "  Lots of Bad Services",
     :amount 10000}
    {:date "12/05/2017",
     :description "  spasibo vashu za nogu",
     :amount -1000}
    {:date "12/01/2018",
     :description "  JMF LANDSCAPING HOLBROOK MA",
     :amount 10000}
    {:date "12/03/2018",
     :description "  MBTA MTICKET BOSTON MA",
     :amount 20000}
    {:date "12/05/2018",
     :description "  INTERNET PAYMENT - THANK YOU",
     :amount -10000}))

(def test-credit-big-data
  {"--Lots-of-Bad-Services-200-12-02-2017"
   {:description "  Lots of Bad Services",
    :amount 200,
    :date (dates->cljs-time  "12/02/2017")},
   "--MBTA-MTICKET-BOSTON-MA-20000-12-03-2018"
   {:description "  MBTA MTICKET BOSTON MA",
    :amount 20000,
    :date (dates->cljs-time "12/03/2018")}})

(defn paids-with-bigs [test-credit-data* test-credit-big-data*]
  (let [paids* (logic/payments test-credit-data*)
        paids  (logic/str-dates->cljs-time paids*)
        bigs*  (vals test-credit-big-data*)
        bigs   (logic/str-dates->cljs-time bigs*)]
    (logic/paids-with-bigs paids bigs)))

(def back-to-str-dates
  {:--spasibo-vashu-za-nogu--1000-12-05-2017
   {:date "12/05/2017",
    :description "  spasibo vashu za nogu",
    :amount -1000,
    :bigs '({:description "  Lots of Bad Services",
            :amount 10000,
            :date (dates->cljs-time  "12/02/2017")}),
    :debt 9000},
   :--INTERNET-PAYMENT---THANK-YOU--10000-12-05-2018
   {:date "12/05/2018",
    :description "  INTERNET PAYMENT - THANK YOU",
    :amount -10000,
    :bigs '({:description "  Lots of Bad Services",
            :amount 10000,
            :date (dates->cljs-time  "12/02/2017")}
           {:description "  MBTA MTICKET BOSTON MA",
            :amount 20000,
            :date (dates->cljs-time "12/03/2018")}),
    :debt 19000}})

(def expected-bigs-debt-and-data
  '({:date "12/02/2017",
     :description "  Lots of Bad Services",
     :amount 10000,
     :bigs [],
     :debt 0}
    {:date "12/05/2017",
     :description "  spasibo vashu za nogu",
     :amount -1000,
     :bigs
     ({:description "  Lots of Bad Services",
       :amount 10000,
       :date (dates->cljs-time "12/02/2017")}),
     :debt 9000}
    {:date "12/01/2018",
     :description "  JMF LANDSCAPING HOLBROOK MA",
     :amount 10000,
     :bigs [],
     :debt 0}
    {:date "12/03/2018",
     :description "  MBTA MTICKET BOSTON MA",
     :amount 20000,
     :bigs [],
     :debt 0}
    {:date "12/05/2018",
     :description "  INTERNET PAYMENT - THANK YOU",
     :amount -10000,
     :bigs
     ({:description "  Lots of Bad Services",
       :amount 10000,
       :date (dates->cljs-time "12/02/2017")}
      {:description "  MBTA MTICKET BOSTON MA",
       :amount 20000,
       :date (dates->cljs-time "12/03/2018")}),
     :debt 19000}))

(def test-credit-data-first-paid-off
  (conj (rest test-credit-data) (assoc (first test-credit-data) :amount 200)))

(def more-data-with-bigs-and-debt
  (let [d (vec test-credit-data-first-paid-off)]
    (conj d (assoc (last d) :amount -5000) (last d))))

(deftest merge-bigs-debt-and-data-test
  (testing
      "Should calculate debt with any number of paid-offs afterwards, not overflowing non-debt."
    (let [paids-with-bigs* (paids-with-bigs
                            more-data-with-bigs-and-debt
                            test-credit-big-data)
          data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs*)]
      (is (= (mapv :debt data-with-bigs-and-debt)
             [0 10000 5000 0]))))

  (testing
      "Should not pass debt to next payment debts if payment paid off all the previous debts."
    (let [paids-with-bigs* (paids-with-bigs
                            test-credit-data-first-paid-off
                            test-credit-big-data)
          data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs*)]
      (is (= (mapv :debt data-with-bigs-and-debt)
             [0 10000]))))
  (testing
      "Should return transactions with debts
       that go over to the next payment (negative amount),
       with big transactions linked to debt."
    (is (= (logic/merge-bigs-debt-and-data
            test-credit-data
            back-to-str-dates)
           expected-bigs-debt-and-data))))

;; ENDS: LOGIC

