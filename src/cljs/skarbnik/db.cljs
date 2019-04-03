(ns skarbnik.db
  (:require [reagent.core :as r]
            [clojure.spec.alpha :as s]))

(defonce db (r/atom { :bank-accounts            []
                      :credit-accounts          []
                      ;;;;;;;;;;;;;;;;;;;;;;;;;;
                      :current-bank-account     ""
                      :current-credit-account   ""
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

;;;;;;;;;;;;; Cursors & Mutators ;;;;;;;;;;;;;

(def bank-accounts
  (r/cursor db [ :bank-accounts ]))

(defn bank-accounts!
  ([f]
   (r/rswap! bank-accounts f))
  ([f v]
   (r/rswap! bank-accounts f v)))

;;;

(def credit-accounts
  (r/cursor db [ :credit-accounts ]))

(defn credit-accounts!
  ([f]
   (r/rswap! credit-accounts f))
  ([f v]
   (r/rswap! credit-accounts f v)))

;;;---

(def current-bank-account
  (r/cursor db [ :current-bank-account ]))

(defn current-bank-account!
  [v]
  (reset! current-bank-account v))

;;

(def current-credit-account
  (r/cursor db [ :current-credit-account ]))

(defn current-credit-account!
  [v]
  (reset! current-credit-account v))

;;;;;;;;;;; DATA ;;;;;;;;;;;;;;;

(def bank-data
  (r/cursor db [ :bank-data ]))

(defn bank-data!
  [v]
   (reset! bank-data v))

;;;

(def credit-data
  (r/cursor db [ :credit-data ]))

(defn credit-data!
  [v]
  (reset! credit-data v))

;;; <-- ENDs: DATA

;;; REcur data

(def bank-recur-data
  (r/cursor db [ :bank-recur-data ]))

(defn bank-recur-data!
  ([f]
   (r/rswap! bank-recur-data f))
  ([f v]
   (r/rswap! bank-recur-data f v))
  ([f k v]
   (r/rswap! bank-recur-data f k v)))

;;;

(def credit-recur-data
  (r/cursor db [ :credit-recur-data ]))

(defn credit-recur-data!
  ([f]
   (r/rswap! credit-recur-data f))
  ([f v]
   (r/rswap! credit-recur-data f v))
  ([f k v]
   (r/rswap! credit-recur-data f k v)))

;;;; Credit Big Data

(def credit-big-data
  (r/cursor db [ :credit-big-data ]))

(defn credit-big-data!
  ([f]
   (r/rswap! credit-big-data f))
  ([f v]
   (r/rswap! credit-big-data f v))
  ([f k v]
   (r/rswap! credit-big-data f k v)))

;;; Initial balances

(def initial-bank-balance
  (r/cursor db [ :initial-bank-balance ]))

(defn initial-bank-balance!
  [v]
  (reset! initial-bank-balance v))

;;;;

(def initial-credit-balance
  (r/cursor db [ :initial-credit-balance ]))

(defn initial-credit-balance!
  [v]
  (reset! initial-credit-balance v))
