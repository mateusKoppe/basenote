(ns clj.basenote.pages
  (:require [ring.util.response :refer [response]]
            [codax.core :as codax]
            [clj.basenote.database :refer [get-session]]))

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

;; Routes

(defn route-list [req]
  (response (get-pages)))

(defn route-show [req]
  (let [id (-> req :route-params :id)]
    (response (get-page id))))

(defn route-create [req]
  (let [body (:body req)
        id (:id body)
        page (create-page {:id id
                           :title (:title body)})]
    (response page)))

(defn route-update [req]
  (let [body (:body req)
        id (-> req :route-params :id)
        page (update-page {:id id
                           :title (:title body)})]
    (response page)))

(defn route-delete [req]
  (let [id (-> req :route-params :id)]
    (remove-page id)
    (response nil)))