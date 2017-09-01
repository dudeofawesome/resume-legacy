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

Gulp.task(`clean:js`, () => Del([`build/**/*.js`, `build/**/*.d.ts`]));
Gulp.task(`clean:html`, () => Del([`build/**/*.html`]));
Gulp.task(`clean:css`, () => Del([`build/**/*.css`, `build/**/*.sass`]));
Gulp.task(`clean:assets`, () => Del([`build/assets`]));
Gulp.task(`clean`, [`clean:js`, `clean:html`, `clean:css`, `clean:assets`]);
