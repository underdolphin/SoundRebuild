/// <reference path="../../typings/index.d.ts" />

import {app, BrowserWindow} from 'electron';
const client = require('electron-connect').client;

import * as express from 'express';
import * as path from 'path';
const exapp = express();
const port = 3000;

exapp.use(express.static(path.join(__dirname,'../renderer')));
let server = exapp.listen(port,() => {
    console.log(`app listening`);
});

let win: Electron.BrowserWindow = null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadURL(`http://localhost:${port}`);

    win.on('closed', () => {
        win = null;
    });

    client.create(win);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});