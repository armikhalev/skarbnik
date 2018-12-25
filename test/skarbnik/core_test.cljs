(ns skarbnik.core-test
  (:require [cljs.test :refer-macros [is testing async]]
            [reagent.core :as reagent]
            [devcards.core :refer-macros [deftest defcard-rg]]
            [skarbnik.logic :as logic]))

(def test-data
  '({:date "11/26/2018", :description " MBTA PAY BY PHO BOSTON /MA US CARD PURCHASE", :BAICode " ", :amount " -25.00", :SerialNum " 2018112600000001"} {:date "11/13/2018", :description " ZINAIDA LEVIN M CANTON /MA US CARD PURCHASE", :BAICode " ", :amount " -25.00", :SerialNum " 2018111300000001"} {:date "11/13/2018", :description " CASH WITHDRAWAL SANTANDER D199 Holbrook /MA US", :BAICode " ", :amount " -50.00", :SerialNum " 2018111300000002"} {:date "11/13/2018", :description " INTERNET TRANSFER FROM ACCT *2394 - SANTANDER SAVINGS", :BAICode " ", :amount " +50.00", :SerialNum " 2018111300000003"}))


(deftest get-total-test
  (testing "Should correctly get total sum of amounts"
    (is (= "50.00"(logic/get-total test-data >)))
    (is (= "-100.00"(logic/get-total test-data <)))))

(deftest get-ending-balance-test
  (testing "Should return correct ending balance"
    (is (= "-40.00" (logic/get-sum-in-dollars 10 -50)))))


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
