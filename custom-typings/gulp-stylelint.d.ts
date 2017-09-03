declare module 'gulp-stylelint' {
  interface IGulpStyleLint {
    (options?: any): NodeJS.ReadWriteStream;

    formatters: {
      string: any;
      verbose: any;
      json: any;
    };
  }

  const GulpStyleLint: IGulpStyleLint;
  export = GulpStyleLint;
}
