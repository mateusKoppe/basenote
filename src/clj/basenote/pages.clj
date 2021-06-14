(ns clj.basenote.pages
  (:require [ring.util.response :refer [response]]))

(def pages (atom []))

(defn route-list [req]
  (response @pages))

(defn route-create [req]
  (let [body (:body req)]
    (swap! pages #(conj % {:title (:title body)}))
    (response @pages)))