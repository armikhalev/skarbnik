(ns skarbnik.core-test
  (:require [cljs.test :refer-macros [is testing async]]
            [devcards.core :refer-macros [deftest]]
            [skarbnik.logic :as logic]))

(deftest add-test
  (testing "FIXME, I fail."
    (is (= 2 (logic/add 1 3)))))
