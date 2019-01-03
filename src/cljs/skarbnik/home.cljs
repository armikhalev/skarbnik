(ns skarbnik.home
  (:require [reagent.core :as r :refer [atom]]
            [cljs.reader :as reader]
            [cljs.nodejs :as nodejs]
            [ghostwheel.core :as g
             :refer [>defn >defn- >fdef => | <- ?]]
            [skarbnik.helpers :as helpers]
            [skarbnik.logic :as logic]
            [skarbnik.components :as components]))

(defn page
  "Create home page with all the accounts in two columns: `banks` and `credits`"
  [{:keys [state
           read-file!
           bank-initial-balance-file-path
           bank-data-file-path
           bank-recur-transactions]}]
  ;;
  [:section

   [:ul.banks
    (for [bank (:bank-accounts @state)]
      ^{:key bank}
      [:li.inline-flex
       [:button.margin-left-5
        {:on-click #(do
                      ;;
                      (read-file!
                       (str "./"bank"/"bank-initial-balance-file-path)
                       (fn [data] (swap! state assoc :initial-bank-balance data)))
                      ;;
                      (read-file!
                       (str "./"bank"/"bank-data-file-path)
                       (fn [data] (swap! state assoc :bank-data data))
                       :parse)
                      ;;
                      (read-file!
                       (str "./"bank"/"bank-recur-transactions)
                       ;; Read EDN and put it into state
                       (fn [data] (swap! state assoc :bank-recur-data (reader/read-string data))))
                      )}
        "V"]
       [:p.margin-left-5 bank]
       [:button.margin-left-5
        {:on-click #(swap! state update-in [:bank-accounts]
                           (fn [s] (remove #{bank} s)))}
        "X"]])]

   [:div.credits
    (for [credit (:credit-accounts @state)]
      ^{:key credit}
      [:p credit])]])

