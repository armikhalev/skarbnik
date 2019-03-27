(ns skarbnik.db
  (:require [reagent.core :as r]
            [clojure.spec.alpha :as s]))

(defonce db (r/atom { :bank-accounts            []
                      :credit-accounts          []
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :current-bank-account     ""
                      :current-credit-account   ""
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :current-bank-dir-path    ""
                      :current-credit-dir-path  ""
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :bank-data                []
                      :credit-data              []
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :bank-recur-data          {}
                      :credit-recur-data        {}
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :credit-big-data          {}
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :initial-bank-balance     0
                      :initial-credit-balance   0
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :bank-total-difference    0
                      :credit-total-difference  0
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :from-date                ""
                      :to-date                  ""
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :error-message            ""
                      :bank                     {:error "" :message ""}
                      :credit                   {:error "" :message ""}}))

(def bank-accounts
  (r/cursor db [ :bank-accounts ]))

(defn bank-accounts!
  [f v]
  (r/rswap! bank-accounts f v))

(def credit-accounts
  (r/cursor db [ :credit-accounts ]))

(defn credit-accounts!
  [f v]
  (r/rswap! credit-accounts f v))
