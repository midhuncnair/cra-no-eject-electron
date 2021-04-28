# Getting Started with Create React App + typescript + (react-router, redux) + electron

This project can be referenced from Github: -> .

## Available Scripts

Keep in mind this project is to show the integration of react (its other packages) with typescript and electron. And so all the default scripts are run keeping the integration in mind. However, if one want to run a command simply for react or for electron, simply append the command with `:react` or `:electron`
eg:-
for cmd `npm start`
the react counterpart is: `npm run start:react`
the electron counterpart is `npm run start:electron`
This is the same for almost all the default commands.

Below are the common commands that you can run in the project directory:

### `npm start`

Runs the app in the development mode.\
This will Open the browser at [http://localhost:3000](http://localhost:3000) and an electron instance.
This command is targeted to run the electron + react, so in browser you will see error and it is ok. If one wants to run the react for browser target simply use `npm run start:react` instead.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode for both targets electron and browser.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React and electron in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run package`

This will build and create packages for windows, mac and linux platforms in the `dist/` folder. This is a development package made out of production build. if you need a distributable package, please see `distribute` command.

### `npm run distribute`

This will build and create distributable packages for windows, mac and linux platforms in the `dist/` folder. If a publish config is available this command can publish the package to respective repos.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

If you prefer to create a react project/update an existing project to work well with similar configuration, below are the explaination on things that you might be interested.

### The Installation.

The base of this is from `create-react-app`, and the command used is:

`create-react-app cra-no-eject-electron --template typescript`

If there is any issue running the above command please refer to the official page here:
``https://create-react-app.dev/docs/adding-typescript/``

### Add necessary packages

#### 1. react-router-dom

This package helps us to handle pages in single page applications(SPA). The reason we are still using this as opposed to alternatives like `hookrouter` is that, unlike all other packages `react-router-dom`, supports typescript out of box and is well documented.

Run the below command in you shell at the project root (where package.json is located).
`npm i react-router-dom --save`
`npm i @types/react-router-dom --save-dev`

For more info please refer: ``https://reactrouter.com/web/guides/quick-start``

#### 2. react-redux

This package helps us maintain the webpage state. (State management application)
With this we are more likely to use thunk for async operations and so we will have the complete suit.

`npm i react-redux --save`
`npm i @reduxjs/toolkit --save`
`npm i @types/react-redux --save-dev`

The second installation `@reduxjs/toolkit` will include the complete toolkit needed to work with redux.
For more info please refer: ``https://react-redux.js.org/introduction/getting-started``

#### 3. electron-devtools-installer

This package helps us with debuging code while development and is completely optional.

`npm i electron-devtools-installer --save`
`npm i @types/electron-devtools-installer --save-dev`

We will see why the package itself is a part of dependency rather than a part of devDependency later.
For more info please refer: ``https://www.npmjs.com/package/electron-devtools-installer`` and ``https://www.electronjs.org/docs/tutorial/devtools-extension``

#### 4. electron

This package helps us to build cross platform desktop applications.

`npm i electron --save-dev`

For more info please refer: ``https://www.electronjs.org/``

#### 5. electron-builder

This package will help package and distrubute our application.

`npm i electron-builder --save-dev`

For more info please refer: ``https://www.electron.build/``

#### 6. @types/node

This is a types package needed so that typescript will work around the node native modules.
Make sure the version is >=14.14.41

`npm i @types/node --save-dev`

#### 7. cross-env, npm-run-all, wait-on

These packages will help us in writing complex inline scripts in package.json

`npm i cross-env --save-dev`
`npm i npm-run-all --save-dev`
`npm i wait-on --save-dev`

#### 8. @craco/craco

This package will help us to overwrite the react configurations as needed without ejecting and using react-scripts as the base.

`npm i @craco/craco --save-dev`

For more info please refer: ``https://www.npmjs.com/package/@craco/craco``

### Rearrange the package.json and update the scripts as per the codebase.

The major changes are:
1. `react-scripts` are replaced with `craco` in all the places under `scripts` except for `eject`. Also see a `craco.config.js` in the root directory.

2. Added key `homepage`. This is needed for electron to work woth react and viz.

3. Added key `main`. This is where we tell about the electron script. notice the script is under `public/` and it is the ideal/ recomented way of doing it.

4. Added key `build`. This is where we declare the electron-build related config goes. The basic configuration needed for you to get started is already there.

5. Addition/Changes in scrips. There are new scripts added to `scripts` key that are needed for application to run, build and package properly, you will understand them once you go through them. A few that you use commonly is explained above.
