(ns clj.basenote.routes.upload
  (:require [ring.util.response :refer [response status]]
            [clj.basenote.interfaces.files :as files]))

(defn route-save [req]
  (try
    (files/save-file req)
    (-> (response "File saved with success!") (status 200))
    
    (catch Exception _
      (-> (response {:error "Error in the request"})
          (status 500)))))