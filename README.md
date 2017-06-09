# Vitraux Visiteurs

Vitraux Visiteurs is a Web App built to guide people into discovering the beauty
and history of stained-glass windows in Troyes, France.

## Table of contents

* [Setting up the development environment](#setting-up-the-development-environment)
* [Run the application](#run-the-application)
* [Webpack](#webpack)
* [Development prerequisites](#development-prerequisites)
* [Code structure](#code-structure)
* [App theme](#app-theme)
* [Versioning](#versioning)
* [Creators](#creators)
* [Copyright and licence](#copyright-and-licence)

## Setting up the development environment

1. Install [Node.js](https://nodejs.org/en/)
2. Open command line
3. Go to project root folder
4. Run the following command to install project dependencies:
```
npm install
```

## Run the application

1. In the project root folder, run this command
```
npm start
```
2. Open your browser, and go to [localhost:8080](localhost:8080).

## Webpack

To build the app, we use *Webpack*. It's a module bundler for modern Javascript applications.
We use it for many things :
- Transpile Javascript with [Babel](https://babeljs.io/)
- Compile [Sass](http://sass-lang.com/) files.
- Create one *.css* file from all the *.scss* files.
- Minify *.js* files
- Minify *.css* files
- Build the React.js files into one big file.
- Run a [dev server](https://www.npmjs.com/package/webpack-dev-server)

All of this is done automaticaly when you run ***npm start*** to run the app.

For more details, [see the webpack documentation](https://webpack.js.org/)

## Development prerequisites

### You must know

To understand the source code, you must learn these things :
- [Javascript](https://www.w3schools.com/js/) Because the app is coded in Javascript
- [ES6 javascript syntax](https://www.tutorialspoint.com/es6/index.htm)
- [React.js](https://facebook.github.io/react/) A javascript library for building user interfaces

### You must take a look at

You are going to use these tools. So you need to understand a bit how they work :
- [React Router](https://reacttraining.com/react-router/) A router for React.js apps
- [material-ui](http://www.material-ui.com/#/) A set of React Components that implement Google's material design

### You should take a look at

All the config is done. But if you want to know how it works :
- [Webpack](https://webpack.js.org/concepts/) A module bundler for modern Javascript applications.
- [Babel.js](https://babeljs.io/) A Javascript transpiler

## Hypertopic

[Hypertopic documention](https://github.com/Hypertopic/Protocol/blob/master/README.md)  
This is the protocol we use to fetch data bout stained glasses.

Look at **/src/config/constants.js** to see the API and endpoints we use and the ressource we fetch in Vitraux Visiteurs.S

## Code structure

All the source code of the app is in the **/src** folder.

### Main files

At the root of the **/src** folder, you can find 2 files.

#### index.html

This is the html page of the app. In this file, there is a ***div*** with the **app** id. This ***div*** is where we are going to mount our React app.
All the scripts and css files are included automaticaly by webpack during the build.

#### index.js

In this file, we tell that we want to render the React app in the ***div*** with the **app** id of the html file.
- ***MuiThemeProvider*** is the required component to use ***material-ui*** (see the [material-ui documentation](http://www.material-ui.com/) for more about it).
- ***BrowserRouter*** is required to use [react-router-dom](https://reacttraining.com/react-router/)
- ***App*** is the main component of our app.

### The App component

It can be found at this path: */src/components/App.jsx*.
This is where we put all the content. You can see the *AppBar* and a *Switch*.
This *Switch* component is part of *react-router-dom*. It will load a component depending of the current app route.
These components are in the */src/components/pages* folder.

### Stores

It's a concept from the React **Flux** archirecture of Facebook. (you can find the official documentation of Flux [here](https://github.com/facebook/flux)).

In our web app, we need the same data in different places (in different components). But we don't want to make a request to get the data each time we need them ! We want to make the requests once, the first time we need them.

Stores are the solution.  
They are ES6 classes, that make a **GET** request to fetch the data when they are instanciated. As the app is a single page app, these instances are alive until we close the app. So the data are available until the app is closed.

On request response, the data are saved in the stores (as classe attributs), and we tell to the listening components that the store's data have changed by emmiting an event : **this.emitChange()** (look at **/src/stores/BaseStore.js** for more about it).

The components get their data from stores.

### Services

The way we fetch data should be delegated. Components or stores don't fetch data from server or other, they delegate such tasks to services.

In our case, our services make **GET** requests to the hypertopic API. Our stores use services to retrieve their data.

## App theme

Vitraux Visiteur uses [material-ui](http://www.material-ui.com/) to implement Google's material design. You can customise the Material ui theme by changing the colors in **/src/config/theme.js**.

## Versioning

Vitraux Visiteurs is maintained under [the Semantic Versioning guidelines](http://semver.org/).

## Creators

This is a school project for the [University of Technology of Troyes
(UTT)](http://www.utt.fr/)

**Professor:**

* [Aurélien Bénel](https://github.com/benel)

**Student Team:**

* [Yassine Doghri](https://github.com/yassinedoghri)
* [Amine Benjelloun](https://github.com/aminebenj)
* [Denis Chenesseau](https://github.com/Wolfsister)
* [Alexandre Patelli](https://github.com/alexandrepa)
* [Maxime Couture](https://github.com/MaximeCouture)
* [Helene Ardo Sow](https://github.com/titiardo)
* [Othman Tariq](https://github.com/othmanetariq)
* [Nora Ouelasri](https://github.com/ouelasrn)
* [Imane Tarchoun](https://github.com/imaneIT)
* [Damien Brandao](https://github.com/brandaod)

## Copyright and licence

Code and documentation copyright 2016 Hypertopic.
