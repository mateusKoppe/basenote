(ns clj.basenote.routes.pages
  (:require [ring.util.response :refer [response]]
            [clj.basenote.interfaces.pages :as pages]))

(defn route-list [req]
  (response (pages/get-pages)))

(defn route-show [req]
  (let [id (-> req :route-params :id)]
    (response (pages/get-page id))))

(defn route-create [req]
  (let [body (:body req)
        id (:id body)
        page (pages/create-page {:id id
                           :title (:title body)})]
    (response page)))

(defn route-update [req]
  (let [body (:body req)
        id (-> req :route-params :id)
        page (pages/update-page {:id id
                           :title (:title body)})]
    (response page)))

(defn route-delete [req]
  (let [id (-> req :route-params :id)]
    (pages/remove-page id)
    (response nil)))