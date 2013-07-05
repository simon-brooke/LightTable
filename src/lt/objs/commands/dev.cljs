(ns lt.objs.commands.dev
  (:require [lt.objs.settings :as settings]
            [lt.objs.notifos :as notifos]
            [lt.objs.sidebar.command :as cmd]))


(def win (.Window.get (js/require "nw.gui")))

(defn open-tools []
  (.showDevTools win))

(cmd/command {:command :dev-inspector
              :desc "Dev: Open web inspector"
              :hidden true
              :exec open-tools})

(cmd/command {:command :toggle-edge
              :desc "Toggle edge"
              :hidden true
              :exec (fn []
                      (if (settings/fetch :edge)
                        (do
                          (settings/store! :edge false)
                          (notifos/set-msg! "Tracking normal"))
                        (do
                          (settings/store! :edge true)
                          (notifos/set-msg! "Tracking edge"))))})