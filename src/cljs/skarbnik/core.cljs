(ns skarbnik.core
  (:require [reagent.core :as reagent :refer [atom]]
            [cljs.nodejs :as nodejs]
            [clojure.spec.alpha :as s]
            [ghostwheel.tracer]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.bank-account :as bank]
            [skarbnik.credit-account :as credit]
            [skarbnik.logic :as logic]))

(nodejs/enable-util-print!)

;; Specs
;; TODO
;; END: Specs


;; `:bank-recur-data` and `:bank-recur-data` - each of the recurring payments is a map with keys being (str `description` `amount` `date`) and
;; value a map of the form {`description`:val `amount`:val `date`:val}
;; then it will allow find recurring amounts if that amount and other data is in this map.

;; DB
(defonce state (atom {:bank-data                []
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
                      :bank                     {:error ""}
                      :credit                   {:error ""}}))
;; END: DB


(defonce current-page (atom :bank))

;; nodejs

(def fs (nodejs/require "fs"))
(def electron (nodejs/require "electron"))
(def dialog (.-dialog (.-remote electron)))
;;

;; file paths

(def bank-data-file-path "./bank-data-file.txt")
(def credit-data-file-path "./credit-data-file.txt")
(def bank-initial-balance-file-path "./bank-initial-balance.txt")
(def credit-initial-balance-file-path "./credit-initial-balance.txt")
;;


;; file management fns
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
                (swap! state assoc-in [:credit :error] "")))))


(defn read-file!
  "Fn of arity 2 just reads file content, arity 3 expects data in csv format parsing it to vector of maps"
  ;; arity 2
  ([filepath swap-state-fn]
   (.readFile fs filepath "utf-8"
              (fn [err content]
                (if err
                  (prn err)
                  (swap-state-fn content)))))
  ;; arity 3
  ([filepath swap-state-fn parse?]
   (.readFile fs filepath "utf-8"
              (fn [err content]
                (let [content-parsed (logic/parse-csv content)]
                  (if err
                    (prn err)
                    (do
                      (check-categories! (first content-parsed))
                      (swap-state-fn content-parsed))))))))

;; ENDs file management fns


;; Root

(defn main-page []
  [:main
   [:h1 "Skarbnik"]
   [:nav
    [:button
     {:on-click #(reset! current-page :bank)}
     "Bank Account"]

    [:button
     {:on-click #(reset! current-page :credit)}
     "Credit Account"]]

   (case @current-page
     :bank (bank/page {:state                     state
                       :open-file                 open-file
                       :read-file!                read-file!
                       :write-file!               write-file!
                       :initial-balance-file-path bank-initial-balance-file-path
                       :data-file-path            bank-data-file-path})

     :credit (credit/page {:state                     state
                           :open-file                 open-file
                           :read-file!                read-file!
                           :write-file!               write-file!
                           :initial-balance-file-path credit-initial-balance-file-path
                           :data-file-path            credit-data-file-path}))
   (let [sum (logic/get-sum-in-dollars
              (- (:credit-total-difference @state))
              (:bank-total-difference @state))]
     [:h3
      {:class "inline-flex"}
      [:span "Bank balance vs Credit account difference:"]
      [:span
       (helpers/colorize-numbers sum)
       sum]])])


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
     bank-initial-balance-file-path
     (fn [data] (swap! state assoc :initial-bank-balance data)))

    (read-file!
     credit-initial-balance-file-path
     (fn [data] (swap! state assoc :initial-credit-balance data)))
    ;;
    (read-file!
     bank-data-file-path
     (fn [data] (swap! state assoc :bank-data data))
     :parse)

    (read-file!
     credit-data-file-path
     (fn [data] (swap! state assoc :credit-data data))
     :parse)))
