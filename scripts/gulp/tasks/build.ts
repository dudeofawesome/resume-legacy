import * as Gulp from 'gulp';
import * as Sass from 'gulp-sass';
import * as Mustache from 'gulp-mustache';
import * as Yaml from 'gulp-yaml';
import * as Del from 'del';
import * as Through from 'through2';
import * as Sequence from 'run-sequence';
import * as Connect from 'gulp-connect';
import * as Typescript from 'gulp-typescript';
import { Project } from 'gulp-typescript';
import * as ProjectTS from 'typescript';
import * as Sourcemaps from 'gulp-sourcemaps';
import * as Uglify from 'gulp-uglify';

import * as Package from '../../../package.json';

import { SRC, PROD, IF_PROD, IF_DEV } from '../constants';

Gulp.task(`build`, [`clean`], () => Sequence([`build:html`, `build:assets`, `build:manifest`, `build:sass`, `build:typescript`]));

let dataFile: {
  package?: {[key: string]: any};
  header?: {[key: string]: any};
} = {
  package: Package
};

Gulp.task(`build:data`, () =>
  Gulp.src(SRC.DATA)
    .pipe(Yaml())
    .pipe(Through.obj((file, encoding, cb) => {
      if (file.path.endsWith(`.json`)) {
        dataFile = {
          ...JSON.parse(file.contents.toString(encoding)),
          package: {
            ...Package,
            author: {
              ...Package.author,
              first_name: Package.author.name.split(' ')[0],
              last_name: Package.author.name.split(' ')[1]
            }
          },
          date: (new Date()).toISOString().split('T')[0]
        };
        dataFile.header.phone_clean = dataFile.header.phone.replace(/[^0-9]/gi, '');
        dataFile.header.address = dataFile.header.address.replace(/\n/gi, '<br />');
        return cb(null);
      }
    }))
);

Gulp.task(`build:manifest`, () =>
  Gulp.src(SRC.MANIFEST)
    .pipe(Mustache(dataFile as any, {
      extension: ''
    }))
    .pipe(Yaml())
    .pipe(Connect.reload())
    .pipe(Gulp.dest(`build`))
    // .pipe(Through.obj((file, encoding, cb) => {
    //   if (file.path.endsWith(`.json`)) {
    //     dataFile = Object.assign({},
    //       JSON.parse(file.contents.toString(encoding)),
    //       {
    //         package: Package,
    //         date: (new Date()).toISOString().split('T')[0]
    //       }
    //     );
    //     dataFile.header.phone_clean = dataFile.header.phone.replace(/[^0-9]/gi, '');
    //     dataFile.header.address = dataFile.header.address.replace(/\n/gi, '<br />');
    //     return cb(null);
    //   }
    // }))
);

Gulp.task(`build:html`, [`build:data`], () =>
  Gulp.src([SRC.HTML, SRC.HTML_FRAGMENTS, SRC.DATA])
    .pipe(Through.obj(function (file, encoding, cb) {
      if (file.path.endsWith(`.json`) || file.path.match(/\/fragments\//i)) {
        return cb(null);
      } else {
        return cb(null, file);
      }
    }))
    .pipe(Mustache(dataFile as any, {
      extension: '.html'
    }))
    .pipe(Connect.reload())
    .pipe(Gulp.dest(`build`))
);

Gulp.task(`build:assets`, () =>
  Gulp.src(SRC.ASSETS)
    .pipe(Connect.reload())
    .pipe(Gulp.dest(`build/assets`))
);

Gulp.task(`build:sass`, () =>
  Gulp.src(SRC.SASS)
    .pipe(Sass().on('error', Sass.logError))
    .pipe(Connect.reload())
    .pipe(Gulp.dest('build'))
);

const tsProject: Project = Typescript.createProject(PROD ? 'tsconfig.prod.json' : 'tsconfig.main.json', {typescript: ProjectTS});
Gulp.task(`build:typescript`, () => {
  const tsResult = tsProject.src()
    .pipe(Sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(IF_DEV(Sourcemaps.write({includeContent: true, sourceRoot: 'src/scripts'})))
    .pipe(IF_PROD(Uglify()))
    .pipe(IF_DEV(Connect.reload()))
    .pipe(Gulp.dest('build/scripts'));
});
