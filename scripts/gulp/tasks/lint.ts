import * as Gulp from 'gulp';
import * as StyleLint from 'gulp-stylelint';
import * as Mustache from 'gulp-mustache';
import * as YamlValidate from 'gulp-yaml-validate';
import * as Sequence from 'run-sequence';
import * as TSLint from 'gulp-tslint';

import { SRC } from '../constants';

Gulp.task(`lint`, [`clean`], () => Sequence([`lint:manifest`, `lint:sass`, `lint:typescript`]));

Gulp.task(`lint:data`, () =>
  Gulp.src(SRC.DATA)
    .pipe(YamlValidate())
);

Gulp.task(`lint:manifest`, () =>
  Gulp.src(SRC.MANIFEST)
//     .pipe(Mustache(dataFile as any, {
//       extension: ''
//     }))
//     .pipe(Yaml())
//     .pipe(Gulp.dest(`lint`))
);

Gulp.task(`lint:sass`, () =>
  Gulp.src(SRC.SASS)
    .pipe(StyleLint())
);

Gulp.task(`lint:typescript`, () =>
  Gulp.src(SRC.TYPESCRIPT)
    .pipe((TSLint as any)())
    .pipe((TSLint as any).report())
);
