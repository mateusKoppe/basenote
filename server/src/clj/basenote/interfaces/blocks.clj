(ns clj.basenote.interfaces.blocks
  (:require [codax.core :as codax]
            [clj.basenote.helpers.database :refer [get-session]]
            [clj.basenote.helpers.utils :refer [generate-uuid]]))

(defn create-block [block page-id]
  (let [id (generate-uuid)]
    (get-session
     (fn [db]
       (codax/assoc-at! db
                        [:blocks page-id id]
                        (merge {:id id} (select-keys block [:type :data])))
       (codax/get-at! db [:blocks page-id id])))))

(defn get-blocks [page-id]
  (get-session #(codax/get-at! % [:blocks page-id])))

(defn block-exists? [page-id id]
  (get-session #(some? (codax/get-at! % [:blocks page-id id]))))

(defn get-block [page-id id]
  (get-session #(codax/get-at! % [:blocks page-id id])))

(defn update-block [block]
  (get-session
   (fn [db]
     (codax/update-at! db
                       [:blocks (:page-id block) (:id block)]
                       (fn [_] (select-keys block [:id :type :data])))
     (codax/get-at! db [:blocks (:page-id block) (:id block)]))))

(defn remove-block [page-id id]
  (get-session #(codax/dissoc-at! % [:blocks page-id id])))
