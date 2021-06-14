(ns clj.basenote.handler
  (:require [compojure.core :refer [defroutes GET POST]]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
            [clj.basenote.pages :as pages]))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (GET "/pages" [] pages/route-list)
  (POST "/pages" [] pages/route-create)
  (route/not-found "Not Found"))

(def app
  (-> (wrap-defaults app-routes api-defaults)
      wrap-json-response
      (wrap-json-body {:keywords? true :bigdecimals? true})))
