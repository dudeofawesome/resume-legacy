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

let dataFile = {
  package: Package
};
Gulp.task(`build:data`, () =>
  Gulp.src(SRC.DATA).pipe(Yaml())
    .pipe(Through.obj(function (file, encoding, cb) {
      if (file.path.endsWith(`.json`)) {
        dataFile = Object.assign({},
          JSON.parse(file.contents.toString(encoding)),
          {
            package: Package,
            date: (new Date()).toISOString().split('T')[0]
          }
        );
        dataFile.header.phone_clean = dataFile.header.phone.replace(/[^0-9]/gi, '');
        dataFile.header.address = dataFile.header.address.replace(/\n/gi, '<br />');
        return cb(null);
      }
    })));
Gulp.task(`build:html`, [`build:data`], () =>
  // Merge(
  //   Gulp.src(SRC.HTML),
  //   Gulp.src(SRC.DATA)
  // )
  Gulp.src([SRC.HTML, SRC.HTML_FRAGMENTS, SRC.DATA])
    .pipe(Through.obj(function (file, encoding, cb) {
      if (file.path.endsWith(`.json`) || file.path.match(/\/fragments\//i)) {
        return cb(null);
      } else {
        return cb(null, file);
      }
    }))
    .pipe(Mustache(dataFile, {
      extension: '.html'
    }))
    .pipe(Connect.reload())
    .pipe(Gulp.dest(`build`)));
Gulp.task(`build:assets`, () =>
  Gulp.src(SRC.ASSETS)
    .pipe(Connect.reload())
    .pipe(Gulp.dest(`build/assets`)));
Gulp.task(`build:sass`, () =>
  Gulp.src(SRC.SASS)
    .pipe(Sass().on('error', Sass.logError))
    .pipe(Connect.reload())
    .pipe(Gulp.dest('build')));
let Typescript;
let projectTS;
let tsProject;
let Sourcemaps;
Gulp.task(`build:typescript`, () => {
  if (!Typescript) {
    Typescript = require('gulp-typescript');
    projectTS = require('typescript');
    Sourcemaps = require('gulp-sourcemaps');
  }
  if (!tsProject) {
    tsProject = Typescript.createProject('tsconfig.main.json', {typescript: projectTS});
  }
  let tsResult = tsProject.src()
    .pipe(Sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(Sourcemaps.write({includeContent: true, sourceRoot: 'src/scripts', destPath: 'build/scripts'}))
    .pipe(Connect.reload())
    .pipe(Gulp.dest('build/scripts'));
});

Gulp.task(`build`, [`clean`], () => Sequence([`build:html`, `build:assets`, `build:sass`, `build:typescript`]));
