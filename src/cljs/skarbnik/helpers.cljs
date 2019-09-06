(ns skarbnik.helpers
  (:require [clojure.string :as string]
            [cljs.reader :as reader]
            [clojure.pprint :as pp]
            [skarbnik.logic :as logic]) )

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})


(defn set-tag!
  "Adds `tag` key to tags meta-data."
  [{:keys [mutator! entry meta-data tag]}]
  (let [data-key        (-> entry :_sk-id keyword)
                                                                       ;; `AccountName` used in Mint
        parsed-entry    (select-keys entry [:_sk-id :description :amount :date :AccountName])
        entry-with-meta (assoc-in parsed-entry [:meta-data :tags] meta-data)
        ;; NOTE: `Big`s, `recur` and `ignore` are exclusive, so if one appears two others should dissappear BUT not custom tags.
        entry-with-tags (update-in entry-with-meta [:meta-data :tags]
                                   (fn [v t]
                                     (let [default-tags (clojure.set/intersection #{t} #{:BIG :Recur :Ignore})
                                           custom-tags  (clojure.set/difference v #{:BIG :Recur :Ignore})]
                                       (if-not (empty? default-tags)
                                         (clojure.set/union custom-tags default-tags)
                                         (set (conj v t)))))
                                   tag)]
    (mutator! assoc data-key entry-with-tags)))


(defn unset-tag!
  "Removes selected `tag` from state."
  [mutator! entry tag]
  (let [data-key    (-> entry :_sk-id keyword)]
    (mutator! update-in [data-key :meta-data :tags] #(disj % tag))))


(defn read-and-set-data!
  [{:keys [set-current-page!
           dir-path
           initial-balance-file-path
           read-file!
           initial-balance-mutator!
           data-file-path
           data-mutator!
           meta-data-path
           meta-data-mutator!
           current-account-mutator!
           current-name
           total-difference-mutator!
           account-date-range-mutator!]}]
  (do
    ;; Nullify everything
    (account-date-range-mutator! {})
    (data-mutator! {})
    (meta-data-mutator! {})
    (initial-balance-mutator! 0)
    (total-difference-mutator! 0)
    ;;
    (set-current-page!)
    ;;
    (read-file!
     (str dir-path"/"initial-balance-file-path)
     (fn [data] (initial-balance-mutator!
                 (logic/dollars->cents data))))
    ;;
    (read-file!
     (str dir-path"/"data-file-path)
     (fn [data] (data-mutator! data :from-file))
     :parse)
    ;;
    (read-file!
     (str dir-path"/"meta-data-path)
     ;; Read EDN and put it into state
     (fn [data]
       (meta-data-mutator! (reader/read-string data))))
    ;;
    (current-account-mutator! current-name)))

(defn account-NOT-in-accounts?
  "Filters names in `*-accounts.edn` to find dir-path name in there,
  if DOESN'T find one returns true."
  [accounts
   dir-path]
  (= (count
      (filter #(= % dir-path)
              accounts))
     0))

(defn save-account!
  [{:keys [all-accounts-paths
           account-kind-mutator!
           accounts-path
           initial-balance
           initial-balance-file-path
           data-file-path
           show-save-file-dialog!
           make-dir!
           write-file!
           meta-data-path
           meta-data
           data]}]
  (let [dir-path (-> (show-save-file-dialog!) str)]
                (when dir-path
                  (do
                    ;; Update and save it to file
                    (when (account-NOT-in-accounts? @all-accounts-paths dir-path)

                      ;; add directory name to accounts
                      (account-kind-mutator! conj dir-path)

                      ;; write path to *-accounts.edn for persistance
                      (write-file!
                       accounts-path
                       @all-accounts-paths))

                    ;; create dir (if doesn't exist fn will handle it)
                    (make-dir! dir-path)

                    ;; Write files
                    (write-file!
                     (str dir-path"/"meta-data-path)
                     meta-data)

                    (write-file!
                     (str dir-path"/"initial-balance-file-path)
                     (logic/cents->dollars
                      initial-balance))
                    ;;
                    (let [data* (map (fn [m]
                                       (-> m
                                        (update , :amount
                                                  logic/cents->dollars)))
                                     data)]
                      (write-file!
                       (str dir-path"/"data-file-path)
                       (logic/maps->js data*)))))))
