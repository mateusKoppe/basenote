(ns clj.basenote.routes.blocks
  (:require [ring.util.response :refer [response status]]
            [struct.core :as st]
            [clj.basenote.helpers.response :refer [validate-body]]
            [clj.basenote.interfaces.blocks :as blocks]))

(def validation-schema {:type [st/required st/string]
                        :data [st/required st/map]})

(defn route-list [req]
  (try
    (let [id (-> req :route-params :page-id)]
      (response (blocks/get-blocks id)))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-show [req]
  (try
    (let [id (-> req :route-params :id)
          page-id (-> req :route-params :page-id)
          block (blocks/get-block page-id id)]
      (if (not block)
        (-> (response nil)
            (status 404))
        (response block)))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-create [req]
  (try
    (validate-body
     (:body req) validation-schema
     (fn [fields]
       (let [exists (blocks/block-exists?
                     (-> req :body :page-id)
                     (-> req :body :id))]
         (if exists
           (-> (response {:msg "id already used"})
               (status 409))
           (response (blocks/create-block
                     fields
                     (-> req :route-params :page-id)))))))
  (catch Exception _
    (-> (response {:error "Error in the request"})
        (status 500)))))

(defn route-update [req]
  (try
    (validate-body
     (:body req) validation-schema
     (fn [fields]
       (let [id (-> req :route-params :id)
             page-id (-> req :route-params :page-id)
             exists (blocks/block-exists? page-id id)]
         (if (not exists)
           (-> (response nil)
               (status 404))
           (response 
            (blocks/update-block
             (merge fields {:page-id page-id :id id})))))))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-delete [req]
  (try
    (let [page-id (-> req :route-params :page-id)
          id (-> req :route-params :id)
          exists (blocks/block-exists? page-id id)]
      (if (not exists)
        (-> (response nil)
            (status 404))
        (do
          (blocks/remove-block page-id id)
          (response nil))))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))