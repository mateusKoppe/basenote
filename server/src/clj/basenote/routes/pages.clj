(ns clj.basenote.routes.pages
  (:require [ring.util.response :refer [response status]]
            [struct.core :as st]
            [clj.basenote.helpers.response :refer [validate-body]]
            [clj.basenote.interfaces.pages :as pages]))

(def validation-schema {:title [st/required st/string]})

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
    (validate-body
     (:body req) validation-schema
     (fn [fields]
       (let [exists (pages/page-exists? (-> req :body :id))]
         (if exists
           (-> (response {:msg "id already used"})
               (status 409))
           (response (pages/create-page fields))))))
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))

(defn route-update [req]
  (try
    (validate-body
     (:body req) validation-schema
     (fn [fields]
       (let [id (-> req :route-params :id)
             exists (pages/page-exists? id)]
         (if (not exists)
           (-> (response nil)
               (status 404))
           (response
            (pages/update-page (merge fields {:id id})))))))
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