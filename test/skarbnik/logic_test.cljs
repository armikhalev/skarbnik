(ns skarbnik.logic-test
  (:require [cljs.test :refer-macros [is testing async]]
            [reagent.core :as r]
            [cljs.pprint :refer [pprint]]
            [devcards.core :refer-macros [deftest defcard-rg]]
            [skarbnik.core_test :as sk-test]
            [skarbnik.logic :as logic]
            [skarbnik.helpers :as helpers]
            [cljs-time.coerce :as ->cl-time]
            [skarbnik.db :as sdb]
            [skarbnik.components :as components]))

;; LOGIC

(defn dates->cljs-time
  [date]
  (->cl-time/from-date (js/Date. date)))

(def credit-test-data
  '(;;;;;; 2017 year ;;;;;;;
    {:date "12/02/2017",
     :_sk-id "1",
     :description "1 data: 10,000",
     :amount 10000}
    {:date "12/05/2017",
     :_sk-id "2",
     :description "1 payment: -1,000",
     :amount -1000}

    ;;;;;;;; 2018 year ;;;;;;;;
    {:date "12/01/2018",
     :_sk-id "3",
     :description "2 data: 10,000",
     :amount 10000}
    {:date "12/03/2018",
     :_sk-id "4",
     :description "4 data: 20,000",
     :amount 20000}
    {:date "12/05/2018",
     :_sk-id "5",
     :description "2 payment: -10,000",
     :amount -10000}))

(def credit-test-big-data
  (sk-test/stub-meta-data credit-test-data [0 3] :BIG))


(defn paids-with-bigs [credit-test-data* credit-test-big-data*]
  (let [paids* (logic/payments credit-test-data*)
        paids  (logic/str-dates->cljs-time paids*)
        bigs*  (vals credit-test-big-data*)
        bigs   (logic/str-dates->cljs-time bigs*)]
    (logic/paids-with-bigs paids bigs)))


;; First Paid off

(def credit-test-data-first-paid-off
  (conj (rest credit-test-data) (assoc (first credit-test-data) :amount 200, :description "1 data: 200")))

(def credit-test-big-data-first-paid-off
  (sk-test/stub-meta-data credit-test-data-first-paid-off [0 3] :BIG))

;; ENDS: First Paid off


(def more-data-with-bigs-and-debt
  "Used to test not overflowing non-debt, so `first-paid-off` is used"
  (let [d (vec credit-test-data-first-paid-off)]
    (conj d (assoc (last d) :amount -5000, :description "MoreData: -5,000") (last d))))

(deftest merge-bigs-debt-and-data-test
  (testing
      "Should calculate debt with any number of paid-offs afterwards, not overflowing non-debt."
    (let [paids-with-bigs* (paids-with-bigs
                            more-data-with-bigs-and-debt
                            credit-test-big-data-first-paid-off)
          data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs*)]
      (is (= (mapv :debt data-with-bigs-and-debt)
             [0 10000 5000 0]))))

  (testing
      "Should not pass debt to next payment debts if payment paid off all the previous debts."
    (let [paids-with-bigs* (paids-with-bigs
                            credit-test-data-first-paid-off
                            credit-test-big-data-first-paid-off)
          data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs*)]
      (is (= (mapv :debt data-with-bigs-and-debt)
             [0 10000]))))
  (testing
      "Should not have `bigs` populated with debt paid off other day before."
    (let [[first-credit & rest-credit] more-data-with-bigs-and-debt
          data-with-two-paids-same-day (cons first-credit
                                             (conj
                                              rest-credit
                                              (assoc
                                               (second credit-test-data)
                                               :amount -100
                                               :description "1.5 payment: -100")))
          paids-with-bigs* (paids-with-bigs
                            data-with-two-paids-same-day
                            credit-test-big-data-first-paid-off)
          data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs*)
          third-bigs        (:bigs (nth data-with-bigs-and-debt 2))]
      (is (= 1 (count third-bigs)))))

  (testing
      "Should return transactions with debts
       that go over to the next payment (negative amount) i.e. `:overflow-debt`,
       with big transactions linked to debt."
    (let [paids-with-bigs*        (paids-with-bigs
                                   credit-test-data, credit-test-big-data)
          data-with-bigs-and-debt (logic/reduce-bigs-and-paids paids-with-bigs*)
          back-to-str-dates       (logic/reduce-back-to-str-dates data-with-bigs-and-debt)
          merged-bigs             (logic/merge-bigs-debt-and-data
                                   credit-test-data, back-to-str-dates)
          res-without-bigs        (map #(dissoc % :bigs) merged-bigs)] ;; we omit bigs in result
      (is (= res-without-bigs
             ;; Expected:
             ;; NOTE: This is NOT exact data, it should also contain `:bigs` but we omit due to difficulties with dates
             '({:date "12/02/2017",
               :_sk-id "1",
               :description "1 data: 10,000",
               :amount 10000,
               :debt 0}
              {:date "12/05/2017",
               :_sk-id "2",
               :description "1 payment: -1,000",
               :amount -1000,
               :debt 9000}
              {:date "12/01/2018",
               :_sk-id "3",
               :description "2 data: 10,000",
               :amount 10000,
               :debt 0}
              {:date "12/03/2018",
               :_sk-id "4",
               :description "4 data: 20,000",
               :amount 20000,
               :debt 0}
              {:date "12/05/2018",
               :_sk-id "5",
               :description "2 payment: -10,000",
               :amount -10000,
               :overflow-debt 9000,
               :debt 19000}))))))

;; ENDS: LOGIC

