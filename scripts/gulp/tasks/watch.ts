import * as Gulp from 'gulp';

import { SRC } from '../constants';

Gulp.task(`watch`, [`watch:html`, `watch:sass`, `watch:manifest`, `watch:assets`, `watch:typescript`]);
Gulp.task(`watch:sass`, () => Gulp.watch(SRC.SASS, [`build:sass`]));
Gulp.task(`watch:html`, () => Gulp.watch([SRC.HTML, SRC.HTML_FRAGMENTS, SRC.DATA, SRC.PACKAGE], [`build:html`]));
Gulp.task(`watch:manifest`, () => Gulp.watch([SRC.MANIFEST], [`build:manifest`]));
Gulp.task(`watch:assets`, () => Gulp.watch(SRC.ASSETS, [`build:assets`]));
Gulp.task(`watch:typescript`, () => Gulp.watch(SRC.TYPESCRIPT, [`build:webpack`]));
