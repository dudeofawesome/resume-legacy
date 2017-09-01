import * as Gulp from 'gulp';
import * as Connect from 'gulp-connect';

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
