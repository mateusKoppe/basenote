(defproject basenote "0.1.0-SNAPSHOT"
  :description "FIXME: write this!"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :min-lein-version "2.9.1"

  :dependencies [[org.clojure/clojure "1.10.0"]
                 [org.clojure/core.async  "0.4.500"]
                 [compojure "1.6.2"]
                 [ring/ring-defaults "0.3.2"]
                 [ring/ring-json "0.5.1"]
                 [codax "1.3.1"]
                 [funcool/struct "1.3.0"]
                 [ring-cors "0.1.13"]]

  :plugins [[lein-ring "0.12.5"]]

  :source-paths ["src"]

  :ring {:handler clj.basenote.handler/app
         :port     4200})
