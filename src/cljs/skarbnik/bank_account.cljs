(ns skarbnik.bank-account
  (:require [reagent.core :as r :refer [atom]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))


(defn page
  "Creates bank account page"
  [{:keys
    [state
     bank-accounts-path
     open-file
     read-file!
     write-file!
     make-dir!
     initial-balance-file-path
     data-file-path
     bank-recur-transactions]}]

  (let [data (:bank-data @state)]
    [:section
     [:h2.error-message
      (get-in @state [:bank :error])]

     [:button.button.button-smaller.open-file
      {:on-click #(open-file
                   (fn [file-names]
                     (do
                       ;; Nullify recurring transactions data
                       (swap! state assoc :bank-recur-data {})
                       ;; Then read file and update state
                       (if (= file-names nil)
                         (prn "no file selected")
                         (read-file! (first file-names)
                                     (fn [data] (swap! state assoc :bank-data data))
                                     :parse)))))}
      "Open file"]

     [:p  "Press Enter to save bank account data: "
      [:input
       {:placeholder "Bank account name"
        :type "string"
        :on-key-press (fn [e]
                        (let [dir-path (.-value (.-target e))]
                          (when (> (count dir-path) 0)
                            (if (= "Enter" (.-key e))
                              (do
                                ;; Update state and save it to file
                                (swap! state update :bank-accounts conj dir-path)
                                (write-file! bank-accounts-path
                                             (:bank-accounts @state))
                                ;; Create directory with entered name
                                (make-dir! dir-path)
                                ;; Write files
                                (write-file! (str "./"dir-path"/"bank-recur-transactions)
                                             (:bank-recur-data @state))
                                (write-file! (str "./"dir-path"/"initial-balance-file-path)
                                             (:initial-bank-balance @state))
                                (write-file! (str "./"dir-path"/"data-file-path)
                                             (logic/maps->js data)))))))}]]

     [:p  "Press Enter to set Initial balance: "
      [:input {:placeholder "0"
               :type "number"
               :on-key-press (fn [e]
                               (let [val (js/parseFloat (.-value (.-target e)))]
                                 (when (and (number? val) (not (js/Number.isNaN val)))
                                   (if (= "Enter" (.-key e))
                                     (do
                                       (swap! state assoc :initial-bank-balance val))))))}]]

     [:h3 (str "Initial Balance: " (:initial-bank-balance @state))]

     [:hr]
     [:table
      [:thead
       [:tr
        (for [th (logic/get-maps-categories-str data)]
          ^{:key th}
          [:th th])]]
      [:tbody
       (doall
        (map-indexed
         (fn [idx entry]
           (let [selected? (r/atom (contains? (:bank-recur-data @state) (helpers/make-recur-keyword entry)))]
             (components/table-row
              {:type-recur-data :bank-recur-data
               :state           state
               :idx             idx
               :entry           entry
               :selected?       selected?
               :data            data})))

         ;; feed `map-indexed`
         (:bank-data @state)))]]

     [:hr]
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
        :name "to-date"}]

      [:button.margin-left-5
       {:on-click #(swap! state assoc :bank-data (logic/filter-by-date
                                                  data
                                                  (:from-date @state)
                                                  (:to-date @state)))}
       "Filter by date"]]

     (components/bank-analyze-comp data state)]))

