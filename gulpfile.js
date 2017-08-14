const Gulp = require('gulp');
const Sass = require('gulp-sass');
const Del = require('del');
const Sequence = require('run-sequence');
const Connect = require('gulp-connect');

const SRC = {
  HTML: `src/**/*.html`,
  SASS: `src/**/*.scss`,
  ASSETS: `src/assets/**/*`
};

Gulp.task(`clean:js`, () => Del([`build/**/*.js`, `build/**/*.d.ts`]));
Gulp.task(`clean:html`, () => Del([`build/**/*.html`]));
Gulp.task(`clean:css`, () => Del([`build/**/*.css`, `build/**/*.sass`]));
Gulp.task(`clean`, [`clean:js`, `clean:html`, `clean:css`]);

Gulp.task(`build:html`, () =>
  Gulp.src(SRC.HTML)
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
Gulp.task(`watch:html`, () => Gulp.watch(SRC.HTML, [`build:html`]));
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
