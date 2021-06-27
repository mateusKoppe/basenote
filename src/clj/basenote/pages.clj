(ns clj.basenote.pages
  (:require [ring.util.response :refer [response]]
            [codax.core :as codax]))

(defn create-page [page]
  (let [db (codax/open-database! "data/basenote")]
    (codax/assoc-at!
     db
     [:pages (:id page)]
     {:id (:id page)
      :title (:title page)})
    (let [res-page (codax/get-at! db [:pages (:id page)])]
      (codax/close-database! db)
      res-page)))

(defn get-pages []
  (let [db (codax/open-database! "data/basenote")
        list (codax/get-at! db [:pages])]
    (codax/close-database! db)
    list))

(defn update-page [page] 
  (let [db (codax/open-database! "data/basenote")]
    (codax/update-at!
     db
     [:pages (:id page)]
     (fn 
       [_] {:id (:id page)
              :title (:title page)}))
    (let [res-page (codax/get-at! db [:pages (:id page)])]
      (codax/close-database! db)
      res-page)))

(defn remove-page [id]
  (let [db (codax/open-database! "data/basenote")]
    (codax/dissoc-at! db [:pages id])
    (codax/close-database! db)))

;; Routes

(defn route-list [req]
  (response (get-pages)))

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