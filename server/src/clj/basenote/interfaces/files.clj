(ns clj.basenote.interfaces.files
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(defn save-file [req]
  (let [tmpfilepath (:path (bean (-> req :params :file :tempfile)))
        filename (-> req :params :file :filename)
        custom-path (format "files/%s/%s.%s"
                            (-> req :route-params :page-id)
                            filename 
                            (get (str/split filename #"\.") 1))]
    (io/make-parents custom-path)
    (io/copy (io/file tmpfilepath) (io/file custom-path))))