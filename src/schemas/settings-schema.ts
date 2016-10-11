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

class Theme {
    public lr2: LR2Theme = null;
}

class LR2Theme {
    public directory: string = '';
    public defaultEncoding: string = 'UTF-8';
}

class Songs {
    public directories: string[] = [''];
    public files: string[] = [''];
    public encoding: Encoding;
}

class Encoding {
    public likeBms: string = "Shift-JIS";
    public resound: string = "UTF-8";
}

class Options {
    public windowSize: WindowSize;
    public windowMode: string = "window";
    public volume: number = 100;
    public output: string = 'WebAudioAPI';
    public input: string = 'Keyboard';
}

class WindowSize {
    public width: number = 720;
    public height: number = 1280;
}

export class SettingsSchema {
    public theme: Theme = null;
    public songs: Songs = null;
    public options: Options = null;
}