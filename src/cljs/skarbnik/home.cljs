(ns skarbnik.home
  (:require [reagent.core :as r :refer [atom]]
            [cljs.reader :as reader]
            [clojure.string :as string
             :refer [split join]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))

(defn page
  "Home page with all the accounts in two columns: `banks` and `credits`"
  [{:keys [state
           read-file!
           write-file!
           bank-accounts-path
           credit-accounts-path
           current-page
           bank-initial-balance-file-path
           credit-initial-balance-file-path
           bank-data-file-path
           credit-data-file-path
           bank-recur-transactions
           credit-recur-transactions]}]
  ;;
  [:section
   [:h2 "Bank accounts"]
   [:ul.banks
    (for [bank-dir-path (:bank-accounts @state)
          :let [bank-name (-> bank-dir-path (split #"/") last)]]
      ^{:key bank-name}
      [:li.inline-flex.border.margin-left-5

       ;; SELECT acconut button
       [:button.button-smaller.select-bank
        {:on-click #(do
                      (reset! current-page :bank)
                      ;;
                      (read-file!
                       (str bank-dir-path"/"bank-initial-balance-file-path)
                       (fn [data] (swap! state assoc :initial-bank-balance data)))
                      ;;
                      (read-file!
                       (str bank-dir-path"/"bank-data-file-path)
                       (fn [data] (swap! state assoc :bank-data data))
                       :parse)
                      ;;
                      (read-file!
                       (str bank-dir-path"/"bank-recur-transactions)
                       ;; Read EDN and put it into state
                       (fn [data]
                         (swap! state assoc
                                :bank-recur-data (reader/read-string data))))
                      (swap! state assoc :current-bank-account bank-name))}
        bank-name]

       ;; DELETE account button
       [:button.button.margin-left-5.delete-bank
        {:on-click #(do
                      ;; remove bank-dir from state
                      (swap! state update-in [:bank-accounts]
                             (fn [s] (remove #{bank-dir-path} s)))

                      ;; then remove it from file
                      (write-file!
                       bank-accounts-path
                       (vec
                        (:bank-accounts @state))))}
        "X"]])]

   ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

   [:h2 "Credit accounts"]
   [:ul.credits
    (for [credit-dir-path (:credit-accounts @state)
          :let [credit-name (-> credit-dir-path (split #"/") last)]]
      ^{:key credit-name}
      [:li.inline-flex.border.margin-left-5

       ;; SELECT acconut button
       [:button.button-smaller.select-credit
        {:on-click #(do
                      (reset! current-page :credit)
                      ;;
                      (read-file!
                       (str credit-dir-path"/"credit-initial-balance-file-path)
                       (fn [data] (swap! state assoc :initial-credit-balance data)))
                      ;;
                      (read-file!
                       (str credit-dir-path"/"credit-data-file-path)
                       (fn [data] (swap! state assoc :credit-data data))
                       :parse)
                      ;;
                      (read-file!
                       (str credit-dir-path"/"credit-recur-transactions)
                       ;; Read EDN and put it into state
                       (fn [data]
                         (swap! state assoc
                                :credit-recur-data (reader/read-string data))))
                      (swap! state assoc :current-credit-account credit-name))}
        credit-name]

       ;; DELETE account button
       [:button.button.margin-left-5.delete-credit
        {:on-click #(do
                      ;; remove credit-dir from state
                      (swap! state update-in [:credit-accounts]
                             (fn [s] (remove #{credit-dir-path} s)))

                      ;; then remove it from file
                      (write-file!
                       credit-accounts-path
                       (vec
                        (:credit-accounts @state))))}
        "X"]])]

   #_[:div.credits
    [:h2 "Credit accounts"]
    (for [credit (:credit-accounts @state)]
      ^{:key credit}
      [:p credit])]])

