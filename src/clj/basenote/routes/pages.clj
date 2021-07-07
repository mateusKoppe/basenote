(ns clj.basenote.routes.pages
  (:require [ring.util.response :refer [response status]]
            [clj.basenote.interfaces.pages :as pages]
            [struct.core :as st]))

(defn page-schema [action]
  (let [base {:id [st/required st/string]
              :title [st/required st/string]}
        actions-rules {:update {:id [st/string]}}]
    (merge base (action actions-rules))))

(defn route-list [req]
  (try
    (response (pages/get-pages))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-show [req]
  (try
    (let [id (-> req :route-params :id)
          page (pages/get-page id)]
      (if (not page)
        (-> (response nil)
            (status 404))
        (response page)))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-create [req]
  (try
    (let [exists (pages/page-exists? (-> req :body :id))
          validation (st/validate (:body req) (page-schema :create))
          errors (first validation)
          fields (last validation)]
      (if exists
        (-> (response {:msg "id already used"})
            (status 409))
        (if errors
          (-> (response errors)
              (status 417))
          (response (pages/create-page fields)))))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-update [req]
  (try
    (let [id (-> req :route-params :id)
          exists (pages/page-exists? id)
          validation (st/validate (:body req) (page-schema :update))
          errors (first validation)
          fields (last validation)]
      (if (not exists)
        (-> (response nil)
            (status 404))
        (if errors
          (-> (response errors)
              (status 417))
          (response
           (pages/update-page (merge fields {:id id}))))))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-delete [req]
  (try
    (let [id (-> req :route-params :id)
          exists (pages/page-exists? id)]
      (if (not exists)
        (-> (response nil)
            (status 404))
        (do
          (pages/remove-page id)
          (response nil))))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))