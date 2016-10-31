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
    play: () => {
        // get theme elements
        const lr2StyleDirectory =
            document.getElementById('lr2_style_dir_label') as HTMLInputElement;
        const lr2StyleEncodings =
            document.getElementsByName('lr2_style_encoding') as NodeListOf<HTMLInputElement>;

        // get songs elements
        const bmsStyleDirectories =
            document.getElementById('bms_style_dirs_label') as HTMLInputElement;
        const bmsStyleSongs =
            document.getElementById('bms_style_songs_label') as HTMLInputElement;
        const bmsStyleEncodings =
            document.getElementsByName('bms_style_encoding') as NodeListOf<HTMLInputElement> ;

        // get options elements
        const selectWindowModeButton = document.getElementById('option_window_mode_window') as HTMLInputElement;
        const selectFullscreenModeButton = document.getElementById('option_window_mode_fullscreen') as HTMLInputElement;
        const soundMasterVolume = document.getElementById('option_sound_master_volume') as HTMLInputElement;
        const selectWebAudioOutputButton = document.getElementById('option_sound_output_webaudio') as HTMLInputElement;
        const selectKeyboardInputButton = document.getElementById('option_others_input_keyboard') as HTMLInputElement;
        const selectWebMidiInputButton = document.getElementById('option_others_input_webmidi') as HTMLInputElement;

        console.log(lr2StyleDirectory.value);
    }
});