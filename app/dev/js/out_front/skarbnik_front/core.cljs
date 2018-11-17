(ns skarbnik-front.core
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs.nodejs :as nodejs]
             [clojure.string :as string]))

(def fs (nodejs/require "fs"))
(def electron (nodejs/require "electron"))
(def dialog (.-dialog (.-remote electron)))

;; Your code
(defonce state (atom {:message "Hello there,"
                      :data    ""}))


(defn open-file [path]
  (.showOpenDialog dialog path))


(defn read-file [filepath]
  (.readFile fs filepath "utf-8"
              (fn [err data]
                (if err
                  (prn err)
                  (swap! state update-in [:data] str data)))))


(defn split [sep s]
  (clojure.string/split s sep))

(defn lines [sep contents]
  (->> contents
       (split #"\n")
       (map (partial split sep))))


(defn str->keys
  [s]
  (keyword
   (string/join
    (string/split s #"\s"))))


(defn maps [sep contents]
  (let [lines (lines sep contents)
        cols- (first lines)
        cols  (map str->keys cols-)
        rows (rest lines)]
    (map (partial zipmap cols) rows)))


;; Root

(defn root-component []
  [:main
   [:h1 (:message @state)]
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

   [:button
    {:on-click #(open-file
                 (fn [file-names]
                   (if (= file-names nil)
                     (prn "no file selected")
                     (read-file (first file-names)))))}
    "Open file"]])


;; Init

(defn mount-root [setting]
  (reagent/render [root-component]
                  (.getElementById js/document "app")))

(defn init! [setting]
  (mount-root setting))
