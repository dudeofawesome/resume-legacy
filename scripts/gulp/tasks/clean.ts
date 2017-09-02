import * as Gulp from 'gulp';
import * as Del from 'del';

Gulp.task(`clean`, [`clean:js`, `clean:html`, `clean:css`, `clean:assets`]);
Gulp.task(`clean:js`, () => Del([`build/**/*.js`, `build/**/*.d.ts`]));
Gulp.task(`clean:html`, () => Del([`build/**/*.html`]));
Gulp.task(`clean:css`, () => Del([`build/**/*.css`, `build/**/*.sass`]));
Gulp.task(`clean:assets`, () => Del([`build/assets`]));
