import * as Gulp from 'gulp';
import * as Sequence from 'run-sequence';

Gulp.task(`dev`, () => Sequence([`clean`], [`build`], [`watch`, `serve`]));

Gulp.task(`default`, [`help`]);
