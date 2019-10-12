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


(credit-total-difference! 176498)
(bank-total-difference! 77561)

(def bank-test-data
  [{:date "12/06/2018"
    :description "QUICKEN LOANS MTG PYMTS 120518",
    :amount -2000}
   {:date "11/06/2018"
    :description "Zarplata",
    :amount 6000}
   {:description "DISCOVER E-PAYMENT 181008",
    :amount -3000,
    :date "10/10/2018"}])

(def credit-test-data
  [{:date "09/24/2018",
    :description "No bigh deal",
    :amount 2000}
   {:date "09/26/2018",
    :AccountName "Testing Account Name"
    :description "MBTA PAY BY PHO BOSTON /MA US CARD PURCHASE",
    :amount 2500}
   {:description "DISCOVER E-PAYMENT 181008",
    :amount -3000,
    :date "10/10/2018"}
   {:description "DISCOVER E-PAYMENT 181008",
    :AccountName "2 Testing Account Name"
    :amount 1000,
    :date "10/11/2018"}
   {:description "Game:Big Rigs",
    :amount 5000,
    :date "10/12/2018"}])


(defn stub-meta-data
  "data: [{}], which-update: [int?], tag: keyword? ->
  {uuid? {:_sk-id uuid? :meta-data {:tags tag}}}"
  [data
   which-update
   tag]
  (let [d-with-sk-id (map-indexed (fn [idx m] (assoc m :_sk-id idx)) data)
        with-meta-d  (map (fn [n] (-> d-with-sk-id
                                      (nth n)
                                      (assoc-in [:meta-data :tags] #{tag})))
                          which-update)]
    (into {} (map (juxt :_sk-id identity) with-meta-d))))


(def credit-test-data-with-meta
  (merge
   (stub-meta-data credit-test-data [1 3] :Recur)
   (stub-meta-data credit-test-data [4] :BIG)))

(bank-meta-data! (stub-meta-data bank-test-data [0] :Recur))
(credit-meta-data! credit-test-data-with-meta)

;;; ENDs: prepare data


;;; TESTS !!!

;;; UI

(deftest get-total-test
  (testing "Should correctly get total sum of amounts"
    (is (= 10500
           (logic/get-total credit-test-data >)))

    (is (= -3000
           (logic/get-total credit-test-data <)))))

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
      [:h3 "Income: 60.00"]
      [:h3 "Spendings: -50.00"]
      [:h3 "Non-recurring spendings: -30.00"]
      [:h3 "Net: 10.00"]
      [:hr]
      [:h2 "All time:"]
      [:h3 "Recurring spendings sum: -20.00"]
      [:h3 "Balance: -10.00"]]
     [ components/bank-analyze {:data                   bank-test-data
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
      [:h3 "Debt Sum: 105.00 "]
      [:p "(Popover: Sum of all debt increasing transactions)"]
      [:h3 "Paid: -30.00"]
      [:h3 "All Non-recurring spendings: 70.00"]
      [:h3 "Non-recurring spendings without Bigs: 20.00"]
      [:h3 "Bigs Sum: 50.00"]
      [:span "Recurring spendings sum: 35.00"]
      [:h3 "Added Debt: 75.00"]
      [:span "(Popover: This is `Debt` minus `Paid`)"]
      [:hr]
      [:h2 "All time:"]
      [:h3 "Total debt: 75.00"]
      [:span "(Popover: Initial Balance debt + Debt Sum of this period)"]]
     [ components/credit-analyze {:data                     credit-test-data
                                  :initial-credit-balance   @initial-credit-balance
                                  :big-data                 big-data
                                  :credit-recur-data        recur-data
                                  :credit-total-difference! credit-total-difference!} ]]))

;; ENDs: Credit

(deftest recur-by-account-name
  (testing
      "Should return recur-data arranged by account"
    (let [meta-data     (vals (if-let [md @credit-meta-data] md {}))
          recur-data    (logic/filter-by-tag meta-data :Recur)
          rd-by-account (logic/recur-by-account-name recur-data)]
      (is (= rd-by-account
             {"Testing Account Name"
              [{:date "09/26/2018",
                :AccountName "Testing Account Name",
                :description "MBTA PAY BY PHO BOSTON /MA US CARD PURCHASE",
                :amount 2500,
                :_sk-id 1,
                :meta-data {:tags #{:Recur}}}],
              "2 Testing Account Name"
              [{:description "DISCOVER E-PAYMENT 181008",
                :AccountName "2 Testing Account Name",
                :amount 1000,
                :date "10/11/2018",
                :_sk-id 3,
                :meta-data {:tags #{:Recur}}}]})))))

(defcard-rg sum-of-bank-and-credit-recurring-transactions-comp
  "Sum of Bank and Credit recurring transactions: `-55`: "
  (let [bank-meta-data      (vals (if-let [md @sdb/bank-meta-data] md {}))
        bank-recur-data     (logic/filter-by-tag bank-meta-data :Recur)

        credit-meta-data      (vals (if-let [md @sdb/credit-meta-data] md {}))
        credit-recur-data     (logic/filter-by-tag credit-meta-data :Recur)

        bank-recur-sum*     (logic/sum-recur-amounts bank-recur-data)
        bank-recur-sum      (if (and
                                 (not (number? bank-recur-sum*))
                                 (js/Number.isNaN bank-recur-sum*))
                              0
                              bank-recur-sum*)

        credit-recur-sum*     (logic/sum-recur-amounts credit-recur-data)
        credit-recur-sum      (if (and
                                   (not (number? credit-recur-sum*))
                                   (js/Number.isNaN credit-recur-sum*))
                                0
                                credit-recur-sum*)

        sum            (logic/cents->dollars
                        (logic/get-sum bank-recur-sum (- credit-recur-sum)))]
    [ components/sum-of-bank-and-credit-recur-transactions sum ]))

(defcard-rg bank-balance-vs-credit-account-difference-comp
  "Bank balance vs Credit account difference: `-989.37`"
  (let [sum (logic/get-sum
             (- @sdb/credit-total-difference)
             @sdb/bank-total-difference)]
    [ components/bank-balance-vs-credit-account-difference sum ]))

;;;; ENDs: UI


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
  (testing "User clicks open file to get data from csv file into Skarbnik. Saves that data as an account and then opens that account from Home page." (is true))
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
