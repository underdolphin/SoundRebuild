//    Copyright 2016 underdolphin(masato sueda)
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

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