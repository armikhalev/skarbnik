(ns skarbnik.home
  (:require [reagent.core :as r :refer [atom]]
            [cljs.reader :as reader]
            [clojure.string :as string
             :refer [split join]]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.db :as db]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))

(defn page
  "Home page with all the accounts in two columns: `banks` and `credits`.
   This is not meant to be a pure function, since it's a page - the highest parent component.
   Hence `db` is used from namespace, not from input."
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
           credit-recur-transactions
           credit-big-transactions]}]
  ;;
  [:section
   [:h2 "Bank accounts"]
   [:ul.banks
    (for [bank-dir-path @db/bank-accounts
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
                       (fn [data] (swap! state assoc :initial-bank-balance
                                         (logic/dollars->cents data))))
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
                      (db/current-bank-account! bank-name))}
        bank-name]

       ;; DELETE account button
       [:button.button.margin-left-5.delete-bank
        {:on-click #(do
                      ;; remove bank-dir from state
                      (db/bank-accounts! (partial remove #{bank-dir-path}))

                      ;; then remove it from file
                      (write-file!
                       bank-accounts-path
                       (vec @db/bank-accounts)))}
        "X"]])]

   ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

   [:h2 "Credit accounts"]
   [:ul.credits
    (for [credit-dir-path @db/credit-accounts
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
                       (fn [data] (swap! state assoc :initial-credit-balance
                                         (logic/dollars->cents data))))
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
                      ;;
                      (read-file!
                       (str credit-dir-path"/"credit-big-transactions)
                       ;; Read EDN and put it into state
                       (fn [data]
                         (swap! state assoc
                                :credit-big-data (reader/read-string data))))
                      ;;
                      (db/current-credit-account! credit-name))}
        credit-name]

       ;; DELETE account button
       [:button.button.margin-left-5.delete-credit
        {:on-click #(do
                      ;; remove bank-dir from state
                      (db/credit-accounts! (partial remove #{credit-dir-path}))

                      ;; then remove it from file
                      (write-file!
                       credit-accounts-path
                       (vec @db/credit-accounts)))}
        "X"]])]])

