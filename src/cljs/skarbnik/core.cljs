(ns skarbnik.core
  (:require  [reagent.core :as reagent :refer [atom]]
             [cljs.nodejs :as nodejs]
             [skarbnik.utils :as utils]))

(nodejs/enable-util-print!)

(defonce state (atom {:data      []
                      :from-date ""
                      :to-date   ""}))

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


;; Dates
(defn mdy->ymd
  "Converts date format MM/DD/YYYY to YYYY-MM-DD."
  [mdy]
  (let [date (clojure.string/split mdy #"/"),
        year (last date),
        rest- (take 2 date)]
    (clojure.string/join "-" (conj rest- year ))))


(defn date->ints
  "Converts date string of form YYYY-MM-DD to list of integers."
  [date]
  (vec (map js/parseInt (clojure.string/split date #"-"))))


(defn compare-dates
  "Compares two lists of dates integers of form YYYY-MM-DD using comparison operator.
   Returns boolean."
  [comparator-symbol first-date second-date]
  (not (some false?
            (map
             (partial comparator-symbol)
             first-date second-date))))


(defn filter-by-date
  "Filters out entries that are bigger than `from-date` and less than `to-date`.
   Expects `entry` to have key `Trans.Date`."
  [entries from-date to-date]
  (filter
   (fn [entry]
     (let [date (:Trans.Date entry)]
       (and (compare-dates >= (date->ints (mdy->ymd date)) (date->ints from-date))
            (compare-dates <= (date->ints (mdy->ymd date)) (date->ints to-date)))))
   entries))
;; ENDs Dates

(defn get-maps-categories-str
  [maps]
  (-> maps
      first
      keys
      (->> , (map name))
      vec))


(defn get-maps-categories
  [maps]
  (-> maps
      first
      keys))


;; Root

(defn main-page []
  (let [data (:data @state)] 
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
      {:on-click #(write->file data-file-path (utils/maps->js data))}
      "Save"]

     [:table
      [:thead
       [:tr
        (for [th (get-maps-categories-str data)]
          ^{:key th}
          [:th th])]]
      [:tbody
       (map-indexed
        (fn [idx entry]
          ^{:key idx}
          [:tr
           (for [category-key (get-maps-categories data)]
             ^{:key (str category-key "-" idx)}
             [:td (category-key entry)])
           ;; TODO:  [:td
           ;;  {:class (str "bold " (if (< amount 0) "color-red" "color-blue"))}
           ;;  amount]
           #_[:td (:Category entry)]])

        ;; feed `map-indexed`
        (:data @state))]]

     [:section.date-picker
      [:label "Select date range from: "]
      [:input
       {:type "date"
        :on-change #(swap! state assoc :from-date (.-target.value %))
        :name "from-date"}]
      [:label " to: "]
      [:input
       {:type "date"
        :on-change #(swap! state assoc :to-date (.-target.value %))
        :name "to-date"}]]

     [:button
      {:on-click #(swap! state assoc :data (filter-by-date
                                            data
                                            (:from-date @state)
                                            (:to-date @state)))}
      "Filter by date"]

     (let [debt (utils/get-total data >)
           paid (utils/get-total data <)]

       [:section.sums

        ;; sum `debt` and `paid`, since paid is always negative
        [:h2 "Still owe: " (utils/cents->dollars
                            (+ (utils/dollars->cents debt)
                               (utils/dollars->cents paid)))]

        [:h2 "Total historical debt: " debt]
        [:h2 "Total historical paid: " paid]])
     ]))


;; Init

(defn mount-root
  []
  (reagent/render [main-page] (.getElementById js/document "app")))

(defn init!
  []
  (mount-root)
  (read<-file data-file-path))
