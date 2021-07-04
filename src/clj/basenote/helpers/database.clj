(ns clj.basenote.helpers.database
  (:require [codax.core :as codax]))

(defn get-session [fn]
  (let [db (codax/open-database! "data/basenote")
        res (fn db)]
    (codax/close-database! db)
    res))