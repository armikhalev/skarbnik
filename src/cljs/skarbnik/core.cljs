(ns skarbnik.core
  (:require [reagent.core :as r]
            [clojure.pprint :as pp]
            [clojure.core.async :as async]
            [cljs-time.core :as cl-time]
            [cljs.nodejs :as nodejs]
            [cljs.reader :as reader]
            [clojure.spec.alpha :as s]
            [ghostwheel.tracer]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.db :as db]
            [skarbnik.bank-account :as bank]
            [skarbnik.credit-account :as credit]
            [skarbnik.home :as home]
            [skarbnik.logic :as logic]))

(nodejs/enable-util-print!)

(defonce current-page (r/atom :home))

;; nodejs

(def fs (nodejs/require "fs"))
(def electron (nodejs/require "electron"))
(def dialog (.-dialog (.-remote electron)))
(def path (nodejs/require "path"))
(def app (.-app (.-remote electron)))
(def win (.getCurrentWindow (.-remote electron)))

;; ROOT PATH, it's diifferent on MacOS vs Linux, this is the idiomatic Electron way of doing this
;; Windows is not supported
;; NOTE: The path on Mac is: `/Users/megatron/Library/Application Support/skarbnik/..`
(def root-path (.join path (app.getPath "userData")))

;; file paths

(def bank-data-file-path "bank-data-file.txt")
(def credit-data-file-path "credit-data-file.txt")
(def bank-initial-balance-file-path "bank-initial-balance.txt")
(def credit-initial-balance-file-path "credit-initial-balance.txt")
(def bank-recur-transactions "bank-recurring-transactions.edn")
(def credit-recur-transactions "credit-recurring-transactions.edn")
(def credit-big-transactions "credit-big-transactions.edn")
(def bank-accounts-path (str root-path "/bank-accounts.edn"))
(def credit-accounts-path (str root-path "/credit-accounts.edn"))
;;

;; FILE MANAGEMENT FNs

(defn file-exists?
  [$filepath]
  (fs.existsSync $filepath))


(defn make-dir!
  [dir-path]
  (when-not (file-exists? dir-path)
    (.mkdir fs dir-path
            (fn [err]
              (if err
                (prn "Make dir error: " err)
                (prn "Successfully creted directory at: " dir-path))))))


(defn open-file!
  [path]
  (.showOpenDialog dialog path))

(defn show-save-file-dialog!
  []
  (.showOpenDialog dialog win #js {:properties #js ["openDirectory"]}))

(defn write-file!
  [filepath content]
  (.writeFile fs filepath content
              (fn [err]
                (if err
                  (prn "Error: " err)
                  (prn "Successfully wrote to file")))))


(defn check-categories!
  "Checks quantity of keys, if required column headers are missing (i.e. <= cats 2),
  changes `:error` of the current page, otherwise defaults it to empty and returns passed map.
  The actual check happens in `logic/get-categories`
  that returns either missing keys (< cats 2) or all categories."
  [m]
  (let [cats     (keys m)
        cur-page @current-page]
    (case cur-page
      :bank   (if (<= (count cats) 2)
                (db/bank! :error
                       (str "Please, add missing columns: " cats " at " (name cur-page)))
                (db/bank! :error ""))

      :credit (if (<= (count cats) 2)
                (db/credit! :error
                       (str "Please, add missing columns: " cats " at " (name cur-page)))
                (db/credit! :error ""))
      ;; If home page, then there is no need to check cats, since they should have been checked the first time file was uploaded in either `:bank` or `:credit` pages
      :default)))


(defn read-file!
  "Fn of arity 2 just reads file content, arity 3 expects data in csv format parsing it to vector of maps"
  ;; arity 2
  ([$filepath swap-state-fn]
   (let [fs-read-file-fn (fn []
                           (fs.readFile
                            $filepath "utf-8"
                            (fn [err content]
                              (if err
                                (prn "Error reading file -> "err)
                                ;; else
                                (swap-state-fn content)))))]
     (if (file-exists? $filepath)
       (fs-read-file-fn)
       ;; else
       (do
         (fs.appendFileSync $filepath "" "utf-8")
         (fs-read-file-fn)))))

  ;; arity 3
  ([$filepath swap-state-fn parse?]
   (let [fs-read-file-fn (fn [] (fs.readFile
                                 $filepath "utf-8"
                                 (fn [err content]
                                   (let [content-parsed (logic/parse-csv content)]
                                     (if err
                                       (prn "Error reading csv file -> " err)
                                       ;; else
                                       (do
                                         (check-categories! (first content-parsed))
                                         (swap-state-fn content-parsed)))))))]
     (if (file-exists? $filepath)
       (fs-read-file-fn)
       ;; else
       (do
         (fs.appendFileSync $filepath "" "utf-8")
         (fs-read-file-fn))))))

;; ENDs file management fns


;; Aux

(defn nav []
  [:nav
   [:button.button
    {:on-click #(reset! current-page :home)
     :style (if (= @current-page :home) {:color "blue"})}
    "Home"]

   [:button.button
    {:on-click #(reset! current-page :bank)
     :style (if (= @current-page :bank) {:color "blue"})}
    "Bank Account"]

   [:button.button
    {:on-click #(reset! current-page :credit)
     :style (if (= @current-page :credit) {:color "blue"})}
    "Credit Account"]])

;; ENDs: Aux


;; Root

(defn main-page []
  [:main
   {:class @db/ui-background}
   [ nav ]
   [:hr]
   (case @current-page
     :home (home/page {:current-page                    current-page
                       :write-file!                     write-file!
                       :bank-accounts-path              bank-accounts-path
                       :credit-accounts-path            credit-accounts-path
                       :read-file!                      read-file!

                       :credit-initial-balance-file-path  credit-initial-balance-file-path
                       :credit-data-file-path             credit-data-file-path
                       :credit-recur-transactions         credit-recur-transactions
                       :credit-big-transactions           credit-big-transactions

                       :bank-initial-balance-file-path  bank-initial-balance-file-path
                       :bank-data-file-path             bank-data-file-path
                       :bank-recur-transactions         bank-recur-transactions})

     :bank (bank/page {:bank-accounts-path        bank-accounts-path
                       :show-save-file-dialog!    show-save-file-dialog!
                       :open-file!                open-file!
                       :read-file!                read-file!
                       :write-file!               write-file!
                       :make-dir!                 make-dir!
                       :initial-balance-file-path bank-initial-balance-file-path
                       :data-file-path            bank-data-file-path
                       :bank-recur-transactions   bank-recur-transactions})

     :credit (credit/page {:credit-accounts-path      credit-accounts-path
                           :open-file!                open-file!
                           :show-save-file-dialog!    show-save-file-dialog!
                           :read-file!                read-file!
                           :write-file!               write-file!
                           :make-dir!                 make-dir!
                           :initial-balance-file-path credit-initial-balance-file-path
                           :big-transactions-path     credit-big-transactions
                           :data-file-path            credit-data-file-path
                           :credit-big-transactions   credit-big-transactions
                           :credit-recur-transactions credit-recur-transactions}))

   (let [bank-recur-sum*     (logic/sum-recur-amounts @db/bank-recur-data)
         bank-recur-sum      (if (and
                                  (not (number? bank-recur-sum*))
                                  (js/Number.isNaN bank-recur-sum*))
                               0
                               bank-recur-sum*)
         credit-recur-sum      (logic/sum-recur-amounts @db/credit-recur-data)
         sum            (logic/cents->dollars
                         (logic/get-sum bank-recur-sum (- credit-recur-sum)))]
     ;; (prn "In `core`, line 226:----> ")
     ;; (pp/pprint recur-by-account)
     [:h3
      [:span "Sum of Bank and Credit recurring transactions: "]
      [:span
       (helpers/colorize-numbers sum)
       sum]])

   (let [sum (logic/get-sum
              (- @db/credit-total-difference)
              @db/bank-total-difference)]
     [:h3
      {:class "inline-flex"}
      [:span "Bank balance vs Credit account difference:"]
      [:span
       (helpers/colorize-numbers sum)
       (if (logic/is-number? sum)
         (logic/cents->dollars sum)
         "Something wrong with numbers in files")]])
   (nav)

   [:hr]

   [:div.ui-styles
    [:button.button-micro
     {:on-click #(db/ui-background!
                  (case @db/ui-background
                    "" "white-background"
                    ""))}
     "Theme"]]])

;; ENDs: Root

;; Init
(defn mount-root
  []
  (r/render [main-page] (.getElementById js/document "app")))

(defn init!
  []
  (do
    (mount-root)

    ;; BANK

    (read-file!
     bank-accounts-path
     (fn [data] (db/bank-accounts! into (reader/read-string data))))

    ;; CREDIT

    (read-file!
     credit-accounts-path
     (fn [data] (db/credit-accounts! into (reader/read-string data))))))

