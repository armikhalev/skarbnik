(ns skarbnik.core-test
  (:require [cljs.test :refer-macros [is testing async]]
            [reagent.core :as r]
            [cljs.pprint :refer [pprint]]
            [devcards.core :refer-macros [deftest defcard-rg]]
            [skarbnik.logic :as logic]
            [skarbnik.helpers :as helpers]
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

;; Meta data
(def bank-meta-data  sdb/bank-meta-data)
(def bank-meta-data! sdb/bank-meta-data!)
;;
(def credit-meta-data  sdb/credit-meta-data)
(def credit-meta-data! sdb/credit-meta-data!)

;; Total diff
(def bank-total-difference  sdb/bank-total-difference)
(def bank-total-difference! sdb/bank-total-difference!)
;;
(def credit-total-difference  sdb/credit-total-difference)
(def credit-total-difference! sdb/credit-total-difference!)

;;;;;;;;;;;;;;;;;;;;; Prepare data ;;;;;

(bank-meta-data! {"Loan"     {:_sk-id "Loan"
                              :description "QUICKEN LOANS MTG PYMTS 120518",
                              :amount -2000,
                              :date "12/06/2018"
                              :meta-data {:tags #{:Recur}}},
                  "Discover" {:_sk-id "Discover"
                              :description "DISCOVER E-PAYMENT 181008",
                              :amount -3000,
                              :date "10/10/2018"
                              :meta-data {:tags #{:Recur}}}})

(credit-meta-data! {"Credit" {:_sk-id "Credit"
                              :description "DISCOVER E-PAYMENT 181008",
                              :amount 3000,
                              :date "10/10/2018"
                              :meta-data {:tags #{:Recur}}},
                    "BigRig" {:_sk-id "BigRig"
                              :description "Game:Big Rigs",
                              :amount 5000,
                              :date "10/11/2018"
                              :meta-data {:tags #{:BIG}}}})


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
  "Correct text in grey. Both should have the same text: "
  (let [meta-data      (vals (if-let [md @bank-meta-data] md {}))
        recur-data     (logic/filter-by-tag meta-data :Recur)]
    [:section.bank-analyze-comp
     {:style {:display "flex"}}
     [:div
      {:style {:background "grey" :margin-right "1em" :padding-right "1em" :text-align "right"}}
      [:h2 "This period:"]
      [:h3 "Income: 50.00"]
      [:h3 "Spendings: -100.00"]
      [:h3 "Non-recurring spendings: -50.00"]
      [:h3 "Net: -50.00"]
      [:hr]
      [:h2 "All time:"]
      [:h3 "Recurring spendings sum: -50.00"]
      [:h3 "Balance: -50.00"]]
     [ components/bank-analyze {:data                   test-data
                                :initial-bank-balance   @initial-bank-balance
                                :bank-recur-data        recur-data
                                :bank-total-difference! bank-total-difference!}]]))

;; ENDs: Bank

;; Credit

(defcard-rg credit-analyze-comp
  "Correct text in grey. Both should have the same text: "
  (let [meta-data      (vals (if-let [md @credit-meta-data] md {}))
        recur-data     (logic/filter-by-tag meta-data :Recur)
        big-data       (logic/filter-by-tag meta-data :BIG)]
    [:section.credit-analyze-comp
     {:style {:display "flex"}}
     [:div
      {:style {:background "grey" :margin-right "1em" :padding-right "1em" :text-align "right"}}
      [:h2 "This period:"]
      [:h3 "Debt Sum: 50.00 "]
      [:p "(Popover: Sum of all debt increasing transactions)"]
      [:h3 "Paid: -100.00"]
      [:h3 "All Non-recurring spendings: 20.00"]
      [:h3 "Non-recurring spendings without Bigs: -30.00"]
      [:h3 "Bigs Sum: 50.00"]
      [:span "Recurring spendings sum: 30.00"]
      [:h3 "Less Debt: -50.00"]
      [:span "(Popover: This is `Debt` minus `Paid`)"]
      [:hr]
      [:h2 "All time:"]
      [:h3 "Total debt: -50.00"]
      [:span "(Popover: Initial Balance debt + Debt Sum of this period)"]]
     [ components/credit-analyze {:data                     test-data
                                  :initial-credit-balance   @initial-credit-balance
                                  :big-data                 big-data
                                  :credit-recur-data        recur-data
                                  :credit-total-difference! credit-total-difference!}]]))

;; ENDs: Credit

;; LOGIC

(defn dates->cljs-time
  [date]
  (->cl-time/from-date (js/Date. date)))

(def test-credit-data
  '({:date "12/02/2017",
     :_sk-id "392fe6ad-c549-4c0e-93d5-baca1befbf87",
     :description "  Lots of Bad Services",
     :amount 10000}
    {:date "12/05/2017",
     :_sk-id "90653c71-d90f-4e9c-a3a4-c94a8d57d8e0",
     :description "  spasibo vashu za nogu",
     :amount -1000}
    {:date "12/01/2018",
     :_sk-id "15f27610-6c58-4ece-a059-3c9b2e244ea5",
     :description "  JMF LANDSCAPING HOLBROOK MA",
     :amount 10000}
    {:date "12/03/2018",
     :_sk-id "43ef6bc4-6751-4d7f-b614-51eaecad528b",
     :description "  MBTA MTICKET BOSTON MA",
     :amount 20000}
    {:date "12/05/2018",
     :_sk-id "c0fa6d17-00c2-47cd-93a2-321f5ca00eea",
     :description "  INTERNET PAYMENT - THANK YOU",
     :amount -10000}))

(def test-credit-big-data
  {:392fe6ad-c549-4c0e-93d5-baca1befbf87
   {:description "  Lots of Bad Services",
    :amount 200,
    :date (dates->cljs-time  "12/02/2017")},
   :43ef6bc4-6751-4d7f-b614-51eaecad528b
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
  {:90653c71-d90f-4e9c-a3a4-c94a8d57d8e0
   {:date "12/05/2017",
    :description "  spasibo vashu za nogu",
    :amount -1000,
    :bigs '({:description "  Lots of Bad Services",
            :amount 10000,
            :date (dates->cljs-time  "12/02/2017")}),
    :debt 9000},
   :c0fa6d17-00c2-47cd-93a2-321f5ca00eea
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
     :_sk-id "392fe6ad-c549-4c0e-93d5-baca1befbf87",
     :description "  Lots of Bad Services",
     :amount 10000,
     :bigs [],
     :debt 0}
    {:date "12/05/2017",
     :_sk-id "90653c71-d90f-4e9c-a3a4-c94a8d57d8e0",
     :description "  spasibo vashu za nogu",
     :amount -1000,
     :bigs
     ({:description "  Lots of Bad Services",
       :amount 10000,
       :date (dates->cljs-time "12/02/2017")}),
     :debt 9000}
    {:date "12/01/2018",
     :_sk-id "15f27610-6c58-4ece-a059-3c9b2e244ea5",
     :description "  JMF LANDSCAPING HOLBROOK MA",
     :amount 10000,
     :bigs [],
     :debt 0}
    {:date "12/03/2018",
     :_sk-id "43ef6bc4-6751-4d7f-b614-51eaecad528b",
     :description "  MBTA MTICKET BOSTON MA",
     :amount 20000,
     :bigs [],
     :debt 0}
    {:date "12/05/2018",
     :_sk-id "c0fa6d17-00c2-47cd-93a2-321f5ca00eea",
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


;; I/O

;; FIXME: It might be a good idea to put all these below `defs` into `let`
(def new-account-bank-data (atom nil))

(def select-account-read-meta-data
  (str {:f8c12863-8ae2-461c-8766-b790c32ba279 ;; <--- this should be the same as generated by creating account
        {:_sk-id "f8c12863-8ae2-461c-8766-b790c32ba279" :description "MBTA MTICKET BOSTON MA", :amount 20020, :date "12/03/2018", :meta-data {:tags #{:Recur}}}}))

(defn read-file!
  "NOTE: Imitation of I/O fn that just passes data."
  ;; arity 2
  ([$filepath swap-state-fn]
   (swap-state-fn select-account-read-meta-data))
  ;; arity 3
  ([$filepath swap-state-fn parse?]
   (let [content-parsed (logic/parse-csv @new-account-bank-data)] ;; <-- here the test happens, it reads the data from atom that pretends to be file
     (swap-state-fn content-parsed))))


;; --> WRITE file

(defn write-file!
  "NOTE: Imitation of I/O fn that just passes data."
  [filepath content]
  (reset! new-account-bank-data content))

(defn show-save-file-dialog!
  "NOTE: imitation of I/O fn that just returns directory path."
  []
  "yes/there/is/fake/path")

;; <-- ENDS: WRITE file

(def new-file-data "This does NOT contain `sk-id`"
  "description, amount, AccountName, date,  Labels, Category, Notes, TransactionType
   ATM DEPOSIT, 580.00, Bank Marvel, 4/01/2019,   , Income,        , credit\n")

(deftest select-account-test
  "User clicks open file to get data from csv file into Skarbnik. Saves that data as an account and then opens that account from Home page."
  (testing "1. Bank data should be empty"
    (is (= [] @sdb/bank-data)))

  (testing "2. Should NOT change `sk-id` of any entries"
    (do
      ;; TEMP: -->
      ;; * - Click 'open file' button, choose 'test.csv' file, click 'open':
      ;; *   -- should have dates in descending order
      ;; *   -- should have amount to be NN (numbers in file)
      ;; * - Click 'Save account' button, click 'test' folder name, click 'open':
      ;; *   -- click 'Home': should have new 'test' account
      ;; * - Click 'test' account:
      ;; *   -- should redirect back to Bank account page
      ;; *   -- should have the same amounts as before
      ;; *   -- should have same order of dates as before
      ;; <-- :TEMP

      ;; 1) "read file" means just set data in `sdb`
      ;; in app it is reading from data csv that created by user that does NOT contain `sk-id`s
      ;; has to `parse` data to read csv file and put into database, once it is there `sk-id` should be assigned


      ;; NOTE: We don't need to test `credit-data` because we test only I/O which in both cases the same
      (sdb/bank-data! (logic/parse-csv new-file-data))

      ;; This should stay as the value of `bank-data` before it was saved to file and then read back
      (let [pre-bank-data @sdb/bank-data
            all-accounts-paths (atom ["/Users/megatron/Documents/clojure-land/skarbnik/fixtures/test-bank"]) ;; <-- though it will not be used per se, this just a reminder for what it actually should be
            current-page (r/atom :home)
            bank-dir-path (first @sdb/bank-accounts)
            bank-initial-balance-file-path "bank-initial-balance.txt"
            bank-data-file-path "bank-data-file.txt"
            bank-meta-data-path "bank-meta-data-path.txt"
            bank-meta-data-transactions "bank-meta-data.edn"]

        ;; 2) save existing data as an account,
        ;; at this point after `save-account!` run, data should contain `sk-id`s
        ;; get those `sk-id`s to test in the next step

        (helpers/save-account!
         {:all-accounts-paths        all-accounts-paths
          :account-kind-mutator!     sdb/bank-accounts!
          :accounts-path             "whatever/path/account-path"
          :meta-data-path            bank-meta-data-transactions
          :meta-data                 @sdb/bank-meta-data
          :initial-balance           0 ;; <--- TODO: we don't care about it in this test for now but should eventually
          :initial-balance-file-path "whatever/path/initial-balance"
          :data-file-path            "whatever/path/data-file"
          :show-save-file-dialog!    show-save-file-dialog!
          :make-dir!                 identity ;; <-- we can't do this really
          :write-file!               write-file! ;; <-- that's where we update atom
          :data                      @sdb/bank-data})

        ;; 3) read data from file and see if sk-id is the same as generated by the above `save-account!` call
        (helpers/read-and-set-data!
         {:set-current-page!           (fn [] (reset! current-page :bank))
          :dir-path                    bank-dir-path
          :initial-balance-file-path   bank-initial-balance-file-path
          :read-file!                  read-file!
          :initial-balance-mutator!    sdb/initial-bank-balance!
          :data-file-path              bank-data-file-path
          :data-mutator!               sdb/bank-data! ;; <-- that's mainly what we test if it works properly
          :meta-data-path              bank-meta-data-path
          :meta-data-mutator!          sdb/bank-meta-data!
          :current-account-mutator!    sdb/current-bank-account!
          :current-name                "Test Bank Name"
          :total-difference-mutator!   sdb/bank-total-difference!
          :account-date-range-mutator! sdb/current-date-range-credit-data!})

        (is (= (-> pre-bank-data first :_sk-id)
               (-> @sdb/bank-data first :_sk-id)))))))

;; ENDs I/O
