(ns skarbnik.core
  (:require [reagent.core :as reagent :refer [atom]]
            [cljs.nodejs :as nodejs]
            [cljs.reader :as reader]
            [clojure.spec.alpha :as s]
            [ghostwheel.tracer]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.bank-account :as bank]
            [skarbnik.credit-account :as credit]
            [skarbnik.home :as home]
            [skarbnik.logic :as logic]))

(nodejs/enable-util-print!)

;; Specs
;; TODO
;; END: Specs


;; `:bank-recur-data` and `:bank-recur-data` - each of the recurring payments is a map with keys being (str `description` `amount` `date`) and
;; value a map of the form {`description`:val `amount`:val `date`:val}
;; then it will allow find recurring amounts if that amount and other data is in this map.

;; DB
(defonce state (atom {:bank-accounts            []
                      :current-bank-account     ""
                      :credit-accounts          []
                      :current-credit-account   ""
                      :bank-data                []
                      :credit-data              []
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :bank-recur-data          {}
                      :credit-recur-data        {}
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
                      :bank                     {:error "" :message ""}
                      :credit                   {:error "" :message ""}}))
;; END: DB


(defonce current-page (atom :bank))

;; nodejs

(def fs (nodejs/require "fs"))
(def electron (nodejs/require "electron"))
(def dialog (.-dialog (.-remote electron)))
;;

;; file paths

(def bank-data-file-path "bank-data-file.txt")
(def credit-data-file-path "credit-data-file.txt")
(def bank-initial-balance-file-path "bank-initial-balance.txt")
(def credit-initial-balance-file-path "credit-initial-balance.txt")
(def bank-recur-transactions "bank-recurring-transactions.edn")
(def credit-recur-transactions "credit-recurring-transactions.edn")
(def bank-accounts-path "./bank-accounts.edn")
;;


;; FILE MANAGEMENT FNs

(defn make-dir!
  [dir-path]
  (.mkdir fs dir-path
          (fn [err]
            (if err
              (prn "Make dir error: " err)
              (prn "Successfully creted directory at: " dir-path)))))


(defn open-file
  [path]
  (.showOpenDialog dialog path))


(defn write-file!
  [filepath content]
  (.writeFile fs filepath content
              (fn [err]
                (if err
                  (prn "Error: " err)
                  (prn "Successfully wrote to file")))))


(defn check-categories!
  "Checks quantity of keys, if required column headers are missing (i.e. >= 2), changes `:error` of the current page, otherwise defaults it to empty and returns passed map."
  [m]
  (let [cats     (keys m)
        cur-page @current-page]
    (case @current-page
      :bank   (if (<= (count cats) 2)
                (swap! state assoc-in [:bank :error] (str "Please, add missing columns: " cats " at " (name cur-page)))
                (swap! state assoc-in [:bank :error] ""))

      :credit (if (<= (count cats) 2)
                (swap! state assoc-in [:credit :error] (str "Please, add missing columns: " cats " at " (name cur-page)))
                (swap! state assoc-in [:credit :error] ""))
      ;; If home page, then there is no need to check cats, since they should have been checked the first time file was uploaded in either `:bank` or `:credit` pages
      :default)))


(defn read-file!
  "Fn of arity 2 just reads file content, arity 3 expects data in csv format parsing it to vector of maps"
  ;; arity 2
  ([filepath swap-state-fn]
   (.readFile fs filepath "utf-8"
              (fn [err content]
                (if err
                  (prn "Error reading file -> "err)
                  (swap-state-fn content)))))
  ;; arity 3
  ([filepath swap-state-fn parse?]
   (.readFile fs filepath "utf-8"
              (fn [err content]
                (let [content-parsed (logic/parse-csv content)]
                  (if err
                    (prn "Error reading csv file -> " err)
                    (do
                      (check-categories! (first content-parsed))
                      (swap-state-fn content-parsed))))))))

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
   [:h1 "Skarbnik"]

   [:hr]
   (nav)
   [:hr]
   (case @current-page
     :home (home/page {:state      state
                       :read-file! read-file!
                       :bank-initial-balance-file-path bank-initial-balance-file-path
                       :bank-data-file-path bank-data-file-path
                       :bank-recur-transactions bank-recur-transactions})

     :bank (bank/page {:state                     state
                       :bank-accounts-path        bank-accounts-path
                       :open-file                 open-file
                       :read-file!                read-file!
                       :write-file!               write-file!
                       :make-dir!                 make-dir!
                       :initial-balance-file-path bank-initial-balance-file-path
                       :data-file-path            bank-data-file-path
                       :bank-recur-transactions   bank-recur-transactions})

     :credit (credit/page {:state                     state
                           :open-file                 open-file
                           :read-file!                read-file!
                           :write-file!               write-file!
                           :initial-balance-file-path credit-initial-balance-file-path
                           :data-file-path            credit-data-file-path
                           :credit-recur-transactions credit-recur-transactions}))
   (let [sum (logic/get-sum-in-dollars
              (- (:credit-total-difference @state))
              (:bank-total-difference @state))]
     [:h3
      {:class "inline-flex"}
      [:span "Bank balance vs Credit account difference:"]
      [:span
       (helpers/colorize-numbers sum)
       sum]])
   (nav)])

;; ENDs: Root


;; Init

(defn mount-root
  []
  (reagent/render [main-page] (.getElementById js/document "app")))

(defn init!
  []
  (do
    (mount-root)
    ;;
    (read-file!
     bank-accounts-path
     (fn [data] (swap! state assoc :bank-accounts (reader/read-string data))))

    (read-file!
     credit-initial-balance-file-path
     (fn [data] (swap! state assoc :initial-credit-balance data)))
    ;;
    #_(read-file!
     bank-data-file-path
     (fn [data] (swap! state assoc :bank-data data))
     :parse)

    (read-file!
     credit-data-file-path
     (fn [data] (swap! state assoc :credit-data data))
     :parse)
    ;;
    #_(read-file!
     bank-recur-transactions
     ;; Read EDN and put it into state
     (fn [data] (swap! state assoc :bank-recur-data (reader/read-string data))))

    (read-file!
     credit-recur-transactions
     ;; Read EDN and put it into state
     (fn [data] (swap! state assoc :credit-recur-data (reader/read-string data))))))
