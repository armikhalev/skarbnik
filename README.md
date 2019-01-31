# Skarbnik
## How does this app work?
- Algorithm looks for payments that are similar by amount and category, then labels them as `recurring`
- Also it looks for payments that are equal or higher than user defined limit of non-recurring big payment, however, it **skips** `recurring` payments. This kind of payments are labeled `big`.
- To label a payment user has to search for the transaction by `description` in the search tool of the app.
- There are two types of accounts used in the app: `bank-account` and `credit-account`, each should be dealt differently through the following process:
1. All the transactions that paying off the debt on `bank-account` should not be included in representation of `expenses`.
2. Same for `credit-account`, where all the other transactions are included in the `expenses`, in this way we can see what was obtained by transaction, in contrast to the flow between accounts.
3. After that we can sum all the transactions on `credit-account` and all the transactions that labeled as `paid-debt`(either account can provide this info), in this way we can see how much user still owes.

## What should this app do?
- Skarbnik is a finance analyzing app
- It takes csv file of financial data and gives UI for parsing that data
- It saves data to csv file that can be copied or edited
- It calculates sum of recurring payments
- It shows quantity of big non-recurring credit payments being paid off
- It calculates how much should be left from income after recurring payments paid
- Also it shows how much big non-recurring credits negatively influence monthly income

## How to use this app?
- Skarbnik should be used for analyzing financial data, so it is limited by periods in which user is interested. That means that user should have different CSV files for different periods of time, though there is search option by date, it doesn't mean user should upload all the data available.
- Get financial data in csv format from your financial institution (Bank, Credit Card) or another financial app (Mint).
- Upload that csv file to Skarbnik. 

TODO: determine size of the file limit

- Now you can look at your recurring payments, non-recurring but big credits being included in monthly expenses, you can filter data by date and categories.

## What Skarbnik is not?
It is not a comprehensive financial app with automatic update of data. It is not connected to internet, all data is on user's computer in csv files protected only by safety of user's personal computer (Secure read and write of csv might be a goal for the next version). Supposedly, user uploads only the recent data, not the whole financial history.

## Requirements for project

### Skarbnik uses [electron-template](https://github.com/ducky427/electron-template), so here is the default readme:

* JDK 1.7+
* Leiningen 2.5.3
* node.js 5.1.1 or >
* [NSIS](http://nsis.sourceforge.net/) - for Windows

On Mac/Linux, installing node.js using [Node Version Manager](https://github.com/creationix/nvm) is recommended.

## Testing with Devcards
Run `lein figwheel app devcards-test` in terminal then in your browser go to http://0.0.0.0:3449/tests.html

---

This project uses Electron v3.0.10 Please check [Electron's GitHub page](https://github.com/atom/electron) for the latest version. The version is specified in `Gruntfile.js` under the `Grunt Config` section.

## Setup

On Mac/Linux:

```
scripts/setup.sh
```

On Windows:

```
scripts\setup.bat
```

This will install the node dependencies for the project, along with grunt and bower and will also run `grunt setup`.


## Development mode

Start the figwheel server:

```
lein figwheel
```

If you are on OSX/Linux and have `rlwrap` installed, you can start the figwheel server with:

```
rlwrap lein figwheel
```

This will give better readline support.

More about [figwheel](https://github.com/bhauman/lein-figwheel) here.


In another terminal window, launch the electron app:

```
grunt launch
```

You can edit the `src/cljs/skarbnik/core.cljs` file and the changes should show up in the electron app without the need to re-launch.

## Using nREPL with figwheel

- Start the repl using `lein repl`.

```
user> (use 'figwheel-sidecar.repl-api)
nil
user> (def figwheel-config
        {:figwheel-options {:css-dirs ["app/css"]}
         :build-ids ["dev"]
         :all-builds
           [{:id "dev"
             :figwheel {:on-jsload "skarbnik.core/mount-root"}
             :source-paths ["src/cljs" "env/dev/cljs"]
             :compiler {:main "skarbnik.dev"
                        :asset-path "js/p/out"
                        :output-to "app/js/p/app.js"
                        :output-dir "app/js/p/out" }}]})
#'user/figwheel-config
user> (start-figwheel! figwheel-config)
Figwheel: Starting server at http://localhost:3449
Figwheel: Watching build - dev
Compiling "resources/public/js/repler.js" from ["src/cljs" "env/dev/cljs"]...
Successfully compiled "app/js/p/app.js" in 2.06 seconds.
Figwheel: Starting CSS Watcher for paths  ["app/css"]
#<SystemMap>
```

See [Figwheel wiki](https://github.com/bhauman/lein-figwheel/wiki/Using-the-Figwheel-REPL-within-NRepl) for more details.

## Dependencies

Node dependencies are in `package.json` file. Bower dependencies are in `bower.json` file. Clojure/ClojureScript dependencies are in `project.clj`.

## Icons

Please replace the icons provided with your application's icons. The development icons are from [node-appdmg](https://github.com/LinusU/node-appdmg** project.

Files to replace:

* app/img/logo.icns
* app/img/logo.ico
* app/img/logo_96x96.png
* scripts/dmg/TestBkg.png
* scripts/dmg/TestBkg@2x.png

## Creating a build for release

### Windows
To create a Windows build from a non-Windows platform, please install `wine`. On OS X, an easy option is using homebrew.

On Windows before doing a production build, please edit the `scripts/build-windows-exe.nsi** file. The file is the script for creating the NSIS based setup file.

If NSIS is available on the path, a further setup executable will be created for Windows. Further, if the release command is run from a OS X machine, a DMG file will be created.

### MacOS

Using [`electron-packager`](https://github.com/maxogden/electron-packager), we are able to create a directory which has OS executables (.app, .exe etc) running from any platform.
- ignore all the errors, no time to fix the npm dependency hell
<!-- - add empty files: `bank-accounts.edn`, `credit-accounts.edn`  -->
- comment out `dev-cards` build in `project.clj`
- if freshly cloned from github: run `scripts/setup.sh`
- run `grunt release` to create production js files in `app`, if that didn't work try `lein do clean, with-profile production cljsbuild once`
- copy `package.example.json` from main foder to `app` or add electron to devDependencies and `productName` to existing `package.json`
- run `npm install` in `app` directory
- if not installed get `electron-packager`, then run `electron-packager . skarbnik --icon=img/logo.icns` inside `app` directory, that should do it!
- launch `Skarbnik.app` that will be inside newly created directory `Skarbnik-darwin-x64` 

To create the release directories:

```
grunt release
```

This will create the directories in the `builds` folder.

Note: you will need to be on OSX to create a DMG file and on Windows to create the setup .exe file.


## Grunt commands

To run a command, type `grunt <command>` in the terminal.


| Command       | Description                                                                               |
|---------------|-------------------------------------------------------------------------------------------|
| setup         | Download electron project, installs bower dependencies and setups up the app config file. |
| launch        | Launches the electron app                                                                 |
| release       | Creates a Win/OSX/Linux executables                                                       |
| outdated      | List all outdated clj/cljs/node/bower dependencies                                        |

## Leiningen commands

To run a command, type `lein <command>` in the terminal.

| Command       | Description                                                                               |
|---------------|-------------------------------------------------------------------------------------------|
| cljfmt fix    | Auto-formats all clj/cljs code. See [cljfmt](https://github.com/weavejester/cljfmt)       |
| kibit         | Statically analyse clj/cljs and give suggestions                                          |


## TODO:
- On Open File: If recur payments selected, then notify user that all selections will be lost if not saved
- Fix all the error messages, they should notify user about solution of the problem that caused error
- Create search bar
- Add reset for Dates range
- Figure out how to show `big` payments
- Fix: when saving updated data to the same location, it produces error, because it tries to create new folder instead of using the existing one.Also, that same name is added to `bank-accounts.edn`, which should never happen, because it breaks react's list rendering.
- The above means also that there should be a way to update account
- Fix: shouldn't allow saving account if there is no data
