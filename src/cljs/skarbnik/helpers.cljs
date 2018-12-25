(ns skarbnik.helpers)

(defn colorize-numbers
  [number]
  {:class (str "bold margin-left-5 " (if (< number 0) "color-red" "color-blue"))})
