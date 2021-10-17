(ns clj.basenote.interfaces.files
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(defn save-file [req]
  (let [tmpfilepath (:path (bean (-> req :params :file :tempfile)))
        filename (-> req :params :file :filename)
        custom-path (format "resources/files/%s/%s"
                            (-> req :route-params :page-id)
                            filename)]
    (io/make-parents custom-path)
    (io/copy (io/file tmpfilepath) (io/file custom-path))))