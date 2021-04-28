import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
/*
 ``electron-devtools-installer`` package is required only while develpment. however, we dont want to
 remove it completely until we have a stable version.
 This is the main reason we made the installation as part of dependency as opposed to devDependency.
 This is because the electron-builder will not consider devDependency while packagin and distributing.

 so if you are to remove this in all the builds you can either remove or move ``electron-devtools-installer``
 from dependency to devDependency.
*/

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow(
        {
            width: 1100,
            height: 700,
            backgroundColor: '#191622',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        }
    );

    // and load the index.html of the app.
    console.warn("The env_node = ", process.env.NODE_ENV,);
    let stateUrl;
    if (process.env.NODE_ENV === 'development') {
        stateUrl = 'http://localhost:3000';
    } else {
        stateUrl = url.format(
            {
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            }
        );
    }

    console.warn("the stateURL = ", stateUrl);

    mainWindow.loadURL(stateUrl);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on(
    'ready',
    createWindow
).whenReady().then(
    () => {
        if (process.env.NODE_ENV === 'development') {
            installExtension(
                REACT_DEVELOPER_TOOLS
            ).then(
                (name: string) => console.log(`Added Extension:  ${name}`)
            ).catch(
                (err: any) => console.log('An error occurred: ', err)
            );

            installExtension(
                REDUX_DEVTOOLS
            ).then(
                (name: string) => console.log(`Added Extension:  ${name}`)
            ).catch(
                (err: any) => console.log('An error occurred: ', err)
            );
        }
    }
);

app.allowRendererProcessReuse = true;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});