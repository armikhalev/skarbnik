(ns skarbnik.core
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs.nodejs :as nodejs]
             [skarbnik.utils :as utils]))

(nodejs/enable-util-print!)

(defonce state (atom {:data ""}))

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
                  (swap! state update-in [:data] str content)))))
;; ENDs file management fns


;; Root

(defn main-page []
  [:main
   [:h1 "Skarbnik"]
   [:button
    {:on-click #(open-file
                 (fn [file-names]
                   (if (= file-names nil)
                     (prn "no file selected")
                     (read<-file (first file-names)))))}
    "Open file"]

   [:button
    {:on-click #(write->file data-file-path (:data @state))}
    "Save"]

   [:table
    [:thead
     [:tr
      (for [th ["Trans.Date" "Post.Date" "Description" "Amount" "Category"]]
        ^{:key th}
        [:th th])]]
    [:tbody
     (map-indexed
      (fn [idx entry]
        (let [amount (:Amount entry)]
          ^{:key idx}
          [:tr
           [:td (:Trans.Date entry)]
           [:td (:PostDate entry)]
           [:td (:Description entry)]
           [:td
            {:class (str "bold " (if (< amount 0) "color-red" "color-blue"))}
            amount]
           [:td (:Category entry)]]))

      ;; feed `map-indexed`
      (utils/scv->maps (:data @state)))]]

   (let [debt (utils/get-total (utils/scv->maps (:data @state)) >)
         paid (utils/get-total (utils/scv->maps (:data @state)) <)]
     [:section

      ;; sum `debt` and `paid`, since paid is always negative
      [:h2 "Still owe: " (utils/cents->dollars
                          (+ (utils/dollars->cents debt)
                             (utils/dollars->cents paid)))]

      [:h2 "Total historical debt: " debt]

      [:h2 "Total historical paid: " paid]])
   ])


;; Init

(defn mount-root
  []
  (reagent/render [main-page] (.getElementById js/document "app")))

(defn init!
  []
  (mount-root)
  (read<-file data-file-path))
