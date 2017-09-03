declare module 'gulp-clean-css' {
  import { Options, Output } from 'clean-css';

  const gulp_clean_css: (options?: Options, callback?: (details: Output) => void | void) => NodeJS.ReadWriteStream;

  export = gulp_clean_css;
}
