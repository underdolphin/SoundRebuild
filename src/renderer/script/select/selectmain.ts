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

const minWidth = 960;
const minHeight = 1080;

const stage = new PIXI.Container();
const renderer = rendererSetUp();

function resizeMonitor(renderer: PIXI.WebGLRenderer) {
    const body = document.body as HTMLBodyElement;
    window.onresize = async () => {
        await renderer.resize(
            (body.clientWidth > minWidth) ? body.clientWidth : minWidth, (body.clientHeight > minHeight) ? body.clientHeight : minHeight
        );
    }
}

function rendererSetUp() {
    const body = document.body as HTMLBodyElement;
    let width = (body.clientWidth > minWidth) ? body.clientWidth : minWidth;
    let height = (body.clientHeight > minHeight) ? body.clientHeight : minHeight;
    const renderer = new PIXI.WebGLRenderer(width, height);
    body.appendChild(renderer.view);
    return renderer;
}

function gameLoop() {
    renderer.render(stage);
    requestAnimationFrame(gameLoop);
}

function selectMain() {
    gameLoop();
    resizeMonitor(renderer);
}

selectMain();