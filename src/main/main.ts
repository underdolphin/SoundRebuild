/// <reference path="../../typings/index.d.ts" />

import {app,BrowserWindow} from 'electron';
const client = require('electron-connect').client;

let win: Electron.BrowserWindow = null;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });

    win.loadURL(`file://${__dirname}/../renderer/index.html`);

    win.on('closed', () => {
        win = null;
    });

    client.create(win);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});