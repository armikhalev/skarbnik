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

(defonce state (atom {:data      []
                      :initial-balance 0
                      :from-date ""
                      :to-date   ""}))

(defonce current-page (atom :bank))

;; nodejs

(def fs (nodejs/require "fs"))
(def electron (nodejs/require "electron"))
(def dialog (.-dialog (.-remote electron)))
;;

;; file paths

(def data-file-path "./data-file.txt")
;;


;; file management fns
(defn open-file
  [path]
  (.showOpenDialog dialog path))


(defn write->file
  [filepath content]
  (.writeFile fs filepath content
              (fn [err]
                (if err
                  (prn "Error: " err)
                  (prn "Successfully wrote to file")))))


(defn read<-file
  [filepath]
  (.readFile fs filepath "utf-8"
              (fn [err content]
                (if err
                  (prn err)
                  (swap! state assoc :data (utils/parse-csv content))))))

;; ENDs file management fns


;; Root

(defn main-page []
  [:main
   [:h1 "Skarbnik"]
   [:nav
    [:button
     {:on-click #(reset! current-page :credit)}
     "Credit Account"]

    [:button
     {:on-click #(reset! current-page :bank)}
     "Bank Account"]]
   (case @current-page
     :bank (bank/page {:state          state
                       :open-file      open-file
                       :read<-file     read<-file
                       :write->file    write->file
                       :data-file-path data-file-path})

     :credit (credit/page {:state          state
                           :open-file      open-file
                           :read<-file     read<-file
                           :write->file    write->file
                           :data-file-path data-file-path}))])


;; Init

(defn mount-root
  []
  (reagent/render [main-page] (.getElementById js/document "app")))

(defn init!
  []
  (mount-root)
  (read<-file data-file-path))
