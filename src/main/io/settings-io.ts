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

import * as fs from 'fs';
import {SettingsSchema} from '../../schemas/settings-schema';

export class SettingsIO {
    public defaultReader() {
        return JSON.parse(fs.readFileSync(`${process.cwd()}/build/assets/default.settings.json`, `utf-8`));
    }

    public Reader() {
        let jsonString : string;
        try {
            jsonString = fs.readFileSync(`${process.cwd()}/build/assets/settings.json`, `utf-8`);
        } catch (error) {
            jsonString = 'null';
        }
        return JSON.parse(jsonString);
    }

    public Writer(settings: JSON): void {
        fs.writeFile(`${process.cwd()}/build/assets/settings.json`, JSON.stringify(settings));
    }
}
