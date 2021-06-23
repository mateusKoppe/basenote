# Basenote

BaseNote allows the creation and editing of customizable pages, where the user can take notes, add lists, maintain todo-lists and custom databases that can be viewed in multiple ways. Furthermore, it is a self hosted solution where the user stores his own data, thus ensuring privacy and control over them.

## Why should I use?

BaseNote is a self-hosted application, that is, all information produced by you will be stored locally, you will have total security and control over your data, besides the guarantee that they will only be stored and not exploited in any way. Another plus point of ours is that you won't have to worry about having your access limited after a trial period, it's completely free.

## Setup

To get an interactive development environment run:

    npm install
    lein figwheel

and open your browser at [localhost:3449](http://localhost:3449/).
This will auto compile and send all changes to the browser without the
need to reload. After the compilation process is complete, you will
get a Browser Connected REPL. An easy way to try it is:

    (js/alert "Am I connected?")

and you should see an alert in the browser window.

To clean all compiled files:

    lein clean

To create a production build run:

    lein do clean, cljsbuild once min

And open your browser in `resources/public/index.html`. You will not
get live reloading, nor a REPL. 

## Server Running

To start a web server for the application, run:

    lein ring server

## License

Copyright © 2014 FIXME

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
