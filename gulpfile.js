const Gulp = require('gulp');
const Sass = require('gulp-sass');
const Mustache = require('gulp-mustache');
const Yaml = require('gulp-yaml');
const Del = require('del');
const Through = require('through2');
const Merge = require('gulp-merge');
const Sequence = require('run-sequence');
const Connect = require('gulp-connect');

const SRC = {
  HTML: `src/templates/*.mustache`,
  HTML_FRAGMENTS: `src/fragments/*.mustache`,
  DATA: `src/data.yaml`,
  SASS: `src/**/*.scss`,
  ASSETS: `src/assets/**/*`
};

Gulp.task(`clean:js`, () => Del([`build/**/*.js`, `build/**/*.d.ts`]));
Gulp.task(`clean:html`, () => Del([`build/**/*.html`]));
Gulp.task(`clean:css`, () => Del([`build/**/*.css`, `build/**/*.sass`]));
Gulp.task(`clean:assets`, () => Del([`build/assets`]));
Gulp.task(`clean`, [`clean:js`, `clean:html`, `clean:css`, `clean:assets`]);

let dataFile = {};
Gulp.task(`build:yaml`, () =>
  Gulp.src(SRC.DATA).pipe(Yaml())
    .pipe(Through.obj(function (file, encoding, cb) {
      if (file.path.endsWith(`.json`)) {
        dataFile = JSON.parse(file.contents.toString(encoding));
        return cb(null);
      }
    })));
Gulp.task(`build:html`, [`build:yaml`], () =>
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

Gulp.task(`build`, [`clean`], () => Sequence([`build:html`, `build:assets`, `build:sass`]));

Gulp.task(`watch`, [`watch:html`, `watch:sass`, `watch:assets`]);
Gulp.task(`watch:sass`, () => Gulp.watch(SRC.SASS, [`build:sass`]));
Gulp.task(`watch:html`, () => Gulp.watch([SRC.HTML, SRC.DATA], [`build:html`]));
Gulp.task(`watch:assets`, () => Gulp.watch(SRC.ASSETS, [`build:assets`]));

Gulp.task('livereload', () =>
  Gulp.watch(['build/**/*.css', 'build/**/*.html'])
    .pipe(connect.reload()));

Gulp.task(`serve`, () => {
  Gulp.watch(['build/**/*.css', 'build/**/*.html'])
    .on('change', (file) =>
      Gulp.src(file.path)
        .pipe(Connect.reload()));
  return Connect.server({
    root: 'build',
    livereload: true
  });
});

Gulp.task(`dev`, () => Sequence([`clean`], [`build`], [`watch`, `serve`]));

Gulp.task(`help`, () => {
  console.log();
  console.log(`You're probably looking for \`gulp build\``);
  console.log();
});

Gulp.task(`default`, [`help`]);
