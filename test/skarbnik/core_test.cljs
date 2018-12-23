(ns skarbnik.core-test
  (:require [cljs.test :refer-macros [is testing async]]
            [devcards.core :refer-macros [deftest]]
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
