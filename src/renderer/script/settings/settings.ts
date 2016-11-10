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

Polymer({
    is: "settings-element",
    created: () => {
        let settings = null;
        fetch('/assets/usersettings.json')
            .then((res) => {
                return res.json();
            }).then((json) => {
                settings = json;
                console.log(JSON.stringify(json));
                setUserSettings(settings);
            });
    },
    play: () => {
        // get theme elements
        const lr2Directory =
            document.getElementById('lr2_style_dir_label') as HTMLInputElement;
        const lr2Encodings =
            document.getElementsByName('lr2_style_encoding') as NodeListOf<HTMLInputElement>;

        // get songs elements
        const bmsDirectories =
            document.getElementById('bms_style_dirs_label') as HTMLInputElement;
        const bmsSongs =
            document.getElementById('bms_style_songs_label') as HTMLInputElement;
        const bmsEncodings =
            document.getElementsByName('bms_style_encoding') as NodeListOf<HTMLInputElement>;

        // get options elements
        const mode =
            document.getElementsByName('option_mode') as NodeListOf<HTMLInputElement>;
        const masterVolume =
            document.getElementById('option_master_volume') as HTMLInputElement;
        const output =
            document.getElementsByName('sound_output') as NodeListOf<HTMLInputElement>;
        const input =
            document.getElementsByName('input') as NodeListOf<HTMLInputElement>;

        const data = new SettingsData();
        data.lr2Directory = lr2Directory.value;
        data.lr2Encodings = getValueFromList(lr2Encodings);
        data.bmsDirectories = inputValueToArray(bmsDirectories);
        data.bmsSongs = inputValueToArray(bmsSongs);
        data.bmsEncodings = getValueFromList(bmsEncodings);
        data.mode = getValueFromList(mode);
        data.masterVolume = Number(masterVolume.value);
        data.output = getValueFromList(output);
        data.input = getValueFromList(input);

        saveSettings(data);

        location.href = "/view/player/select.html";
    }
});

class SettingsData {
    lr2Directory?: string = "";
    lr2Encodings: string = "";
    bmsDirectories?: string[] = null;
    bmsSongs?: string[] = null;
    bmsEncodings: string = "";
    mode: string = "";
    masterVolume: number = 100;
    output: string = "";
    input: string = "";
}

function setUserSettings(userSettings: any) {
    // get theme elements
    const lr2Directory =
        document.getElementById('lr2_style_dir_label') as HTMLInputElement;
    const lr2Encodings =
        document.getElementsByName('lr2_style_encoding') as NodeListOf<HTMLInputElement>;

    // get songs elements
    const bmsDirectories =
        document.getElementById('bms_style_dirs_label') as HTMLInputElement;
    const bmsSongs =
        document.getElementById('bms_style_songs_label') as HTMLInputElement;
    const bmsEncodings =
        document.getElementsByName('bms_style_encoding') as NodeListOf<HTMLInputElement>;

    // get options elements
    const mode =
        document.getElementsByName('option_mode') as NodeListOf<HTMLInputElement>;
    const masterVolume =
        document.getElementById('option_master_volume') as HTMLInputElement;
    const output =
        document.getElementsByName('sound_output') as NodeListOf<HTMLInputElement>;
    const input =
        document.getElementsByName('input') as NodeListOf<HTMLInputElement>;

    lr2Directory.value = userSettings.lr2Directory;
    setChecked(lr2Encodings, userSettings.lr2Encodings);
    bmsDirectories.value = userSettings.bmsDirectories.toString();
    bmsSongs.value = userSettings.bmsSongs.toString();
    setChecked(bmsEncodings, userSettings.bmsEncodings);
    setChecked(mode, userSettings.mode);
    masterVolume.value = userSettings.masterVolume.toString();
    setChecked(output, userSettings.output);
    setChecked(input, userSettings.input);
}

function getValueFromList(inputList: NodeListOf<HTMLInputElement>): string {
    for (let i = 0; i < inputList.length; i++) {
        if (inputList[i].checked) {
            return inputList[i].value;
        }
    }
    return "";
}

function setChecked(inputList: NodeListOf<HTMLInputElement>, userSetting: string) {
    for (let i = 0; i < inputList.length; i++) {
        if (inputList[i].value == userSetting) {
            inputList[i].setAttribute('checked', 'true');
        } else {
            inputList[i].removeAttribute('checked');
        }
    }
}

function inputValueToArray(inputElement: HTMLInputElement): string[] {
    const value = inputElement.value;
    return value.trim().split(',');
}

import * as fs from 'fs';

/**
 * Save settings for when started
 */
function saveSettings(saveSettingData: SettingsData) {
    fs.writeFile(`${process.cwd()}/build/assets/usersettings.json`, JSON.stringify(saveSettingData), (error) => {
        if (error) throw error;
        console.log('write success');
    });
}