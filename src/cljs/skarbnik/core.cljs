(ns skarbnik.core
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs.nodejs :as nodejs]
             [clojure.string :as string]))

(nodejs/enable-util-print!)

(def fs (nodejs/require "fs"))
(def electron (nodejs/require "electron"))
(def dialog (.-dialog (.-remote electron)))

(def data-file-path "./data-file.txt")

;; Your code
(defonce state (atom {:message "Hello there,"
                      :data    ""}))


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


(defn split [sep s]
  (clojure.string/split s sep))


(defn lines
  [sep contents]
  (->> contents
       (split #"\n")
       (map (partial split sep))))


(defn str->keys
  [s]
  (keyword
   (string/join
    (string/split s #"\s"))))


(defn maps
  [sep contents]
  (let [lines (lines sep contents)
        cols- (first lines)
        cols  (map str->keys cols-)
        rows (rest lines)]
    (map (partial zipmap cols) rows)))


;; Root

(defn main-page []
  [:main
   [:h1 (:message @state)]
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
     (for [entry (maps #"," (:data @state))]
       ^{:key (str (:Trans.Date entry) "-" (:Amount entry))}
       [:tr
        [:td (:Trans.Date entry)]
        [:td (:PostDate entry)]
        [:td (:Description entry)]
        [:td (:Amount entry)]
        [:td (:Category entry)]
        ])]]

   ])


;; Init

(defn mount-root
  []
  (reagent/render [main-page] (.getElementById js/document "app")))

(defn init!
  []
  (mount-root)
  (read<-file data-file-path))
