(ns clj.basenote.interfaces.pages
  (:require [codax.core :as codax]
            [clj.basenote.helpers.database :refer [get-session]]))

(defn create-page [page]
  (get-session
   (fn [db]
     (codax/assoc-at! db
                      [:pages (:id page)]
                      (select-keys page [:id :title]))
     (codax/get-at! db [:pages (:id page)]))))

(defn get-pages []
  (get-session #(codax/get-at! % [:pages])))

(defn page-exists? [id]
  (get-session #(some? (codax/get-at! % [:pages id :id]))))

(defn get-page [id]
  (get-session #(codax/get-at! % [:pages id])))

(defn update-page [page]
  (get-session
   (fn [db]
     (codax/update-at! db
                       [:pages (:id page)]
                       (fn [_] (select-keys page [:id :title])))
     (codax/get-at! db [:pages (:id page)]))))

(defn remove-page [id]
  (get-session #(codax/dissoc-at! % [:pages id])))