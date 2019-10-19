(ns skarbnik.db
  (:require [reagent.core :as r]
            [cljs.pprint :as pp :refer [pprint]]
            [cljs-time.core :as cljs-time]
            [skarbnik.logic :as logic]
            [clojure.spec.alpha :as s]))

;; Specs
;; TODO

;; END: Specs


;; ENDs: Auxiliary fns


(defonce db (r/atom {:pdf-page                {:show? false
                                               :page  ""}
                     ;;;;;;;;;;;;;;;;;;;;;;;;;
                     :bank-accounts            []
                     :credit-accounts          []
                     ;;;;;;;;;;;;;;;;;;;;;;;;;;
                     :current-bank-account     ""
                     :current-credit-account   ""
                     ;;;;;;;;;;;;;;;;;;;;;;;;;;
                     :bank-data                []
                     :credit-data              []
                     ;;;;;;;;;;;;;;;;;;;;;;;;;;
                     :bank-meta-data           {}
                     :credit-meta-data         {}
                     ;;;;;;;;;;;;;;;;;;;;;;;;;;
                     :bank-tags-choice          #{:Recur :Ignore}
                     :credit-tags-choice        #{:Recur :BIG :Ignore :gas}
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

                     ;;;;;;;;;;;;;;;;;;;;;;;;;;
                     :bank-side-drawer       {:closed? true
                                              :data {}}

                     :credit-side-drawer     {:closed? true
                                              :data {}}
                     ;;;;;;;;;;;;;;;;;;;;;;;;;;;

                     ;; Those two can handle all the meta/UI info about accounts
                     :bank                     {:error "" :message ""}
                     :credit                   {:error "" :message ""}

                     ;; UI
                     :ui-styles {:background ""}}))

;;;;;;;;;;;;; Cursors & Mutators ;;;;;;;;;;;;;

(def pdf-page
  (r/cursor db [ :pdf-page ]))

(defn pdf-page!
  [path v]
  (r/rswap! pdf-page assoc path v))

;;;

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


;;;;;;;;;;;;;;;;;;;; DATES ;;;;;;;;;;;;;;;;

(def from-date
  (r/cursor db [ :from-date ]))

(defn from-date!
  [v]
  (reset! from-date v))

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


;;;;;;;;;;; DATA ;;;;;;;;;;;;;;;

(def bank-data
  (r/cursor db [ :bank-data ]))

(defn bank-data!
  ([v]
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
     (do
       (current-date-range-bank-data! {})
       (reset! bank-data (logic/sort-by-date data)))))
  ([v from-file?]
   (do
     (current-date-range-bank-data! {})
     (let [data (map
                 #(update % :_sk-id
                          (fn [sk-id]
                            (when sk-id (clojure.string/trim sk-id))))
                 v)]
       (reset! bank-data (logic/sort-by-date data))))))

;;;

(def credit-data
  (r/cursor db [ :credit-data ]))

(defn credit-data!
  ([v]
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

     (do
       (current-date-range-credit-data! {})
       (reset! credit-data (logic/sort-by-date data)))))
  ([v from-file?]
   (do
     (current-date-range-credit-data! {})
     (let [data (map
                 #(update % :_sk-id
                          (fn [sk-id]
                            (when sk-id (clojure.string/trim sk-id))))
                 v)]
       (reset! credit-data (logic/sort-by-date data))))))

;;; <-- ENDs: DATA


;;; Meta Data (Tags)

(def bank-meta-data
  (r/cursor db [ :bank-meta-data ]))

(defn bank-meta-data!
  ([v]
   (reset! bank-meta-data v))
  ([f v]
   (r/rswap! bank-meta-data f v))
  ([f ks ap]
   "Use: (update-in<f> [:uuid<key is passed from caller> :meta-data :tags]<ks> #(disj % :BIG)<ap>)"
   (r/rswap! bank-meta-data f ks ap)))

(def credit-meta-data
  (r/cursor db [ :credit-meta-data ]))

(defn credit-meta-data!
  ([v]
   (reset! credit-meta-data v))
  ([f v]
   (r/rswap! credit-meta-data f v))
  ([f ks ap]
   "Use: (update-in<f> [:uuid<key is passed from caller> :meta-data :tags]<ks> #(disj % :BIG)<ap>)"
   (r/rswap! credit-meta-data f ks ap)))

(def bank-tags-choice
  (r/cursor db [ :bank-tags-choice ]))

(defn bank-tags-choice!
  ([v]
   (reset! bank-tags-choice v))
  ([f v]
   (r/rswap! bank-tags-choice f v)))

(def credit-tags-choice
  (r/cursor db [ :credit-tags-choice ]))

(defn credit-tags-choice!
  ([v]
   (reset! credit-tags-choice v))
  ([f v]
   (r/rswap! credit-tags-choice f v)))

;;; ENDs: Meta Data (Tags)


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


;;; Error messages

(def error-message
  (r/cursor db [ :error-message ]))

(defn error-message!
  [v]
  (reset! error-message v))

;; Account meta/UI ;;;

;; Bank side-drawer

(def bank-side-drawer
  (r/cursor db [ :bank-side-drawer ]))

(def bank-side-drawer-data
  (r/cursor db [ :bank-side-drawer :data ]))

(def bank-side-drawer-closed?
  (r/cursor db [ :bank-side-drawer :closed?]))

(defn bank-side-drawer!
  [path v]
  (r/rswap! bank-side-drawer assoc path v))

;; Credit side-drawer

(def credit-side-drawer
  (r/cursor db [ :credit-side-drawer ]))

(def credit-side-drawer-data
  (r/cursor db [ :credit-side-drawer :data ]))

(def credit-side-drawer-closed?
  (r/cursor db [ :credit-side-drawer :closed?]))

(defn credit-side-drawer!
  [path v]
  (r/rswap! credit-side-drawer assoc path v))

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

