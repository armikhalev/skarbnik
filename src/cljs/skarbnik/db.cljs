(ns skarbnik.db
  (:require [reagent.core :as r]
            [cljs.pprint :as pp]
            [cljs-time.core :as cljs-time]
            [skarbnik.logic :as logic]
            [clojure.spec.alpha :as s]))

;; Specs
;; TODO

;; `:bank-recur-data` and `:credit-recur-data` - each of the recurring payments is a map with keys being (str `description` `amount` `date`) and
;; value a map of the form {`description`:val `amount`:val `date`:val}
;; then it will allow find recurring amounts if that amount and other data is in this map.

;; END: Specs

(defonce db (r/atom {:bank-accounts            []
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
                     :current-date-range-bank-data   []
                     :current-date-range-credit-data []
                     ;;;;;;;;;;;;;;;;;;;;;;;;;;
                     :error-message            ""

                     :side-drawer              {:data
                                                {:entry []
                                                 :parent-transaction {:date nil
                                                                      :description ""
                                                                      :amount ""}}
                                                :closed? true}
                     ;; Those two can handle all the meta/UI info about accounts
                     :bank                     {:error "" :message ""}
                     :credit                   {:error "" :message ""}

                     ;; UI
                     :ui-styles {:background ""}}))

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

;;; Current account

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
  (let [;; This is needed for Mint app, that doesn't add minus to transactions
        ;; instead it gives Transaction Type
        transaction-type? (-> v first :TransactionType)
        debit?            #(= "debit" (:TransactionType %))
        data              (if transaction-type?
                            (map
                             #(if (debit? %)
                                (-> %
                                    (update , :amount -)
                                    (assoc , :_sk-id (str (random-uuid))))
                                ;;else
                                (assoc % :_sk-id (str (random-uuid))))
                             v)
                            ;;else
                            (map #(assoc % :_sk-id (str (random-uuid))) v))]
    (reset! bank-data (sort-by
                       :date
                       #(cljs-time/before?
                         (-> %1 logic/mdy->ymd logic/a-str-date->cljs-time)
                         (-> %2 logic/mdy->ymd logic/a-str-date->cljs-time))
                       data))))

;;;

(def credit-data
  (r/cursor db [ :credit-data ]))

(defn credit-data!
  [v]
  (let [;; This is needed for Mint app, that doesn't add minus to transactions
        ;; instead it gives Transaction Type
        transaction-type? (-> v first :TransactionType)
        credit?           #(= "credit" (:TransactionType %))
        data              (if transaction-type?
                            (map
                             #(if (credit? %)
                                (-> %
                                    (update , :amount -)
                                    (assoc , :_sk-id (str (random-uuid))))
                                ;;else
                                (assoc % :_sk-id (str (random-uuid))))
                             v)
                            ;;else
                            (map #(assoc % :_sk-id (str (random-uuid))) v))]
    (reset! credit-data (sort-by
                         :date
                         #(cljs-time/before?
                           (-> %1 logic/mdy->ymd logic/a-str-date->cljs-time)
                           (-> %2 logic/mdy->ymd logic/a-str-date->cljs-time))
                         data))))

;;; <-- ENDs: DATA

;;; REcur data

(def bank-recur-data
  (r/cursor db [ :bank-recur-data ]))

(defn bank-recur-data!
  ([v]
   (reset! bank-recur-data v))
  ([f v]
   (r/rswap! bank-recur-data f v))
  ([f k v]
   (r/rswap! bank-recur-data f k v)))

;;;

(def credit-recur-data
  (r/cursor db [ :credit-recur-data ]))

(defn credit-recur-data!
  ([v]
   (reset! credit-recur-data v))
  ([f v]
   (r/rswap! credit-recur-data f v))
  ([f k v]
   (r/rswap! credit-recur-data f k v)))

;;;; Credit Big Data

(def credit-big-data
  (r/cursor db [ :credit-big-data ]))

(defn credit-big-data!
  ([v]
   (reset! credit-big-data v))
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

;;; Total Differnce

(def bank-total-difference
  (r/cursor db [ :bank-total-difference ]))

(defn bank-total-difference!
  [v]
  (reset! bank-total-difference v))
;;

(def credit-total-difference
  (r/cursor db [ :credit-total-difference ]))

(defn credit-total-difference!
  [v]
  (reset! credit-total-difference v))

;; DATES

(def from-date
  (r/cursor db [ :from-date ]))

(defn from-date!
  [v]
  (reset! from-date v))

;;;


(def to-date
  (r/cursor db [ :to-date ]))

(defn to-date!
  [v]
  (reset! to-date v))

(def current-date-range-bank-data
  (r/cursor db [ :current-date-range-bank-data ]))

(defn current-date-range-bank-data!
  [v]
  (reset! current-date-range-bank-data v))

(def current-date-range-credit-data
  (r/cursor db [ :current-date-range-credit-data ]))

(defn current-date-range-credit-data!
  [v]
  (reset! current-date-range-credit-data v))

;;; Error messages

(def error-message
  (r/cursor db [ :error-message ]))

(defn error-message!
  [v]
  (reset! error-message v))

;; Account meta/UI

(def side-drawer
  (r/cursor db [ :side-drawer ]))

(def side-drawer-data
  (r/cursor db [ :side-drawer :data ]))

(def side-drawer-closed?
  (r/cursor db [ :side-drawer :closed?]))

(defn side-drawer!
  [path v]
  (r/rswap! side-drawer assoc path v))

;;

(def bank
  (r/cursor db [ :bank ]))

(defn bank!
  [path v]
  (r/rswap! bank assoc path v))

;;;

(def credit
  (r/cursor db [ :credit ]))

(defn credit!
  [path v]
  (r/rswap! credit assoc path v))

;; UI

(def ui-background
  (r/cursor db [ :ui-styles :background ]))

(defn ui-background!
  [v]
  (reset! ui-background v))

