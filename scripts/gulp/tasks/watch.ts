import * as Gulp from 'gulp';
import * as Sass from 'gulp-sass';
import * as Mustache from 'gulp-mustache';
import * as Yaml from 'gulp-yaml';
import * as Del from 'del';
import * as Through from 'through2';
import * as Merge from 'gulp-merge';
import * as Sequence from 'run-sequence';
import * as Connect from 'gulp-connect';
import * as Package from './package.json';

Gulp.task(`watch`, [`watch:html`, `watch:sass`, `watch:assets`, `watch:typescript`]);
Gulp.task(`watch:sass`, () => Gulp.watch(SRC.SASS, [`build:sass`]));
Gulp.task(`watch:html`, () => Gulp.watch([SRC.HTML, SRC.DATA], [`build:html`]));
Gulp.task(`watch:assets`, () => Gulp.watch(SRC.ASSETS, [`build:assets`]));
Gulp.task(`watch:typescript`, () => Gulp.watch(SRC.TYPESCRIPT, [`build:typescript`]));
