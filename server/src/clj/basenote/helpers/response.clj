(ns clj.basenote.helpers.response
  (:require [ring.util.response :refer [response status]]
            [struct.core :as st]))

(defn validate-body [body schema callback]
  (let [validation (st/validate body schema)
        errors (first validation)
        fields (last validation)]
    (if errors
      (-> (response errors)
          (status 417))
      (callback fields))))