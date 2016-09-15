/// <reference path="../../typings/index.d.ts" />

import electron = require('electron');

const {app} = electron;

const {BrowserWindow} = electron;

let win: Electron.BrowserWindow = null;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });

    win.loadURL(`file://${__dirname}/../renderer/index.html`)

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});