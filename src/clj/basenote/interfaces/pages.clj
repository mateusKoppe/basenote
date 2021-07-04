(ns clj.basenote.interfaces.pages
  (:require [codax.core :as codax]
            [clj.basenote.helpers.database :refer [get-session]]))

(defn create-page [page]
  (get-session
   (fn [db]
     (codax/assoc-at! db
                      [:pages (:id page)]
                      {:id (:id page)
                       :title (:title page)})
     (codax/get-at! db [:pages (:id page)]))))

(defn get-pages []
  (get-session #(codax/get-at! % [:pages])))

(defn get-page [id]
  (get-session #(codax/get-at! % [:pages id])))

(defn update-page [page]
  (get-session
   (fn [db]
     (codax/update-at! db
                       [:pages (:id page)]
                       (fn [_] {:id (:id page)
                                :title (:title page)}))
     (codax/get-at! db [:pages (:id page)]))))

(defn remove-page [id]
  (get-session #(codax/dissoc-at! % [:pages id])))