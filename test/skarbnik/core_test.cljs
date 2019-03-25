(ns skarbnik.core-test
  (:require [cljs.test :refer-macros [is testing async]]
            [reagent.core :as reagent]
            [devcards.core :refer-macros [deftest defcard-rg]]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))

(def test-data
  '({:date "11/26/2018", :description " MBTA PAY BY PHO BOSTON /MA US CARD PURCHASE", :BAICode " ", :amount -2500, :SerialNum " 2018112600000001"} {:date "11/13/2018", :description " ZINAIDA LEVIN M CANTON /MA US CARD PURCHASE", :BAICode " ", :amount -2500, :SerialNum " 2018111300000001"} {:date "11/13/2018", :description " CASH WITHDRAWAL SANTANDER D199 Holbrook /MA US", :BAICode " ", :amount -5000, :SerialNum " 2018111300000002"} {:date "11/13/2018", :description " INTERNET TRANSFER FROM ACCT *2394 - SANTANDER SAVINGS", :BAICode " ", :amount 5000, :SerialNum " 2018111300000003"}))

(def state (atom {:bank-data                []
                  :credit-data              []
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                  :bank-recur-data          {"Loan" {:description "QUICKEN LOANS MTG PYMTS 120518",
                                                     :amount -2000,
                                                     :date " 12/06/2018"},
                                             "Discover" {:description "DISCOVER E-PAYMENT 181008",
                                                         :amount -3000,
                                                         :date " 10/10/2018"},}
                  :credit-recur-data        {"Bank" {:description "DISCOVER E-PAYMENT 181008",
                                                         :amount 3000,
                                                         :date " 10/10/2018"},}
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                  :initial-bank-balance     0
                  :initial-credit-balance   0
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                  :bank-total-difference    0
                  :credit-total-difference  0
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                  :from-date                ""
                  :to-date                  ""
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                  :error-message            ""
                  :bank                     {:error ""}
                  :credit                   {:error ""}}))


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
  [ components/bank-analyze test-data state ])

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
  [ components/credit-analyze test-data state ])

;; ENDs: Credit
