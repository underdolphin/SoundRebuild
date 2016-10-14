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

const electron = require('electron-connect').server.create();
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const prettydiff = require('gulp-prettydiff');
const typescript = require('gulp-typescript');

const project = typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
});

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
});

gulp.task('js:main', () => {

    gulp.src('src/main/**/*.ts')
        .pipe(plumber())
        .pipe(project())
        .pipe(prettydiff({
            lang: 'js',
            mode: 'minify',
        }))
        .pipe(gulp.dest('./build/main'));
});

gulp.task('js:renderer', () => {

    gulp.src('src/renderer/**/*.ts')
        .pipe(plumber())
        .pipe(project())
        .pipe(prettydiff({
            lang: 'js',
            mode: 'minify',
        }))
        .pipe(gulp.dest('./build/renderer'));
});

gulp.task('serve', () => {
    electron.start();
    gulp.watch('build/main/**/**.js', ['restart:electron']);
    gulp.watch(['build/**/**.html', 'build/**/**.css', 'build/renderer/**/**.js'], ['reload:renderer'])
})

gulp.task('watch', () => {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.styl', ['css']);
    gulp.watch('src/main/**/*.ts', ['js:main']);
    gulp.watch('src/renderer/**/*.ts', ['js:renderer']);
});

gulp.task('restart:electron', (done) => {
    electron.restart();
    done();
});

gulp.task('reload:renderer', (done) => {
    electron.reload();
    done();
});

gulp.task("default", ['js:main','js:renderer','watch', 'serve']);