(ns skarbnik.core
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs.nodejs :as nodejs]
             [ghostwheel.tracer]
             [ghostwheel.core :as g
              :refer [>defn >defn- >fdef => | <- ?]]
             [skarbnik.bank-account :as bank]
             [skarbnik.credit-account :as credit]
             [skarbnik.utils :as utils]))

(nodejs/enable-util-print!)

(defonce state (atom {:bank-data                []
                      :credit-data              []
                      :initial-bank-balance     0
                      :initial-credit-balance   0
                      :from-date                ""
                      :to-date                  ""}))

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
                (let [content-parsed (utils/parse-csv content)]
                  (if err
                    (prn err)
                    (swap-state-fn content-parsed)))))))

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
                           :data-file-path            credit-data-file-path}))])


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
