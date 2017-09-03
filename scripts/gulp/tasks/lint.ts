import * as Gulp from 'gulp';
import * as StyleLint from 'gulp-stylelint';
import * as Mustache from 'gulp-mustache';
import * as Yaml from 'gulp-yaml';
import * as Sequence from 'run-sequence';
import * as TSLint from 'gulp-tslint';

import { SRC } from '../constants';

Gulp.task(`lint`, [`clean`], () => Sequence([`lint:html`, `lint:manifest`, `lint:sass`, `lint:typescript`]));

Gulp.task(`lint:data`, () =>
  Gulp.src(SRC.DATA)
//     .pipe(Yaml())
//     .pipe(Through.obj((file, encoding, cb) => {
//       if (file.path.endsWith(`.json`)) {
//         dataFile = {
//           ...JSON.parse(file.contents.toString(encoding)),
//           package: {
//             ...Package,
//             author: {
//               ...Package.author,
//               first_name: Package.author.name.split(' ')[0],
//               last_name: Package.author.name.split(' ')[1]
//             }
//           },
//           date: (new Date()).toISOString().split('T')[0]
//         };
//         dataFile.header.phone_clean = dataFile.header.phone.replace(/[^0-9]/gi, '');
//         dataFile.header.address = dataFile.header.address.replace(/\n/gi, '<br />');
//         return cb(null);
//       }
//     }))
);

Gulp.task(`lint:manifest`, () =>
  Gulp.src(SRC.MANIFEST)
//     .pipe(Mustache(dataFile as any, {
//       extension: ''
//     }))
//     .pipe(Yaml())
//     .pipe(Gulp.dest(`lint`))
);

Gulp.task(`lint:html`, [`lint:data`], () =>
  Gulp.src([SRC.HTML, SRC.HTML_FRAGMENTS, SRC.DATA])
//     .pipe(Through.obj(function (file, encoding, cb) {
//       if (file.path.endsWith(`.json`) || file.path.match(/\/fragments\//i)) {
//         return cb(null);
//       } else {
//         return cb(null, file);
//       }
//     }))
//     .pipe(Mustache(dataFile as any, {
//       extension: '.html'
//     }))
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
