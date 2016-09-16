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

/// <reference path="typings/index.d.ts" />

const Electron = require('electron-connect').server;
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const prettydiff = require('gulp-prettydiff');
const typescript = require('gulp-typescript');

const process = require('child_process');

gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('css', () => {
    gulp.src('src/**/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(cleancss())
        .pipe(gulp.dest('./build/'));
})

gulp.task('js', () => {
    const project = typescript('tsconfig.json', {
        typescript: require('typescript')
    });

    gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(typescript(project))
        .pipe(prettydiff({
            lang: 'js',
            mode: 'minify',
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('serve', () => {
    const electron = Electron.create();
    electron.start();
    gulp.watch('build/main/**/**.js',electron.restart)
    gulp.watch(['build/**/**.html','build/**/**.css','build/renderer/**/**.js'],electron.reload)
})

gulp.task('watch', () => {

    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.styl', ['css']);
    gulp.watch('src/**/*.ts', ['js']);
});

gulp.task("default",['html','css','js','serve','watch']);