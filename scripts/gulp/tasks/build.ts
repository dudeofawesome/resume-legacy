import * as Gulp from 'gulp';
import * as Sass from 'gulp-sass';
import * as Autoprefixer from 'gulp-autoprefixer';
import * as Mustache from 'gulp-mustache';
import * as Yaml from 'gulp-yaml';
import * as Through from 'through2';
import * as Sequence from 'run-sequence';
import * as Connect from 'gulp-connect';
import * as Typescript from 'gulp-typescript';
import { Project } from 'gulp-typescript';
import * as ProjectTS from 'typescript';
import * as Sourcemaps from 'gulp-sourcemaps';
import * as Uglify from 'gulp-uglify';
import * as HTMLMin from 'gulp-htmlmin';
import * as Path from 'path';

import { SRC, PROD, IF_PROD, IF_DEV } from '../constants';

Gulp.task(`build`, [`clean`], () => Sequence([`build:html`, `build:assets`, `build:manifest`, `build:sass`, `build:typescript`]));

let Package: any;
let dataFile: {
  package?: {[key: string]: any};
  header?: {[key: string]: any};
  [key: string]: any;
} = {
  package: Package
};

Gulp.task(`build:package`, () =>
  Gulp.src(SRC.PACKAGE)
    .pipe(Through.obj((file, encoding, cb) => {
      Package = JSON.parse(file.contents.toString(encoding));

      Package = {
        ...Package,
        author: {
          ...Package.author,
          first_name: Package.author.name.split(' ')[0],
          last_name: Package.author.name.split(' ')[1],
          url_pretty: Path.basename(Package.author.url)
        },
        homepage_pretty: Path.basename(Package.homepage),
      };
      return cb(null);
    }))
);

Gulp.task(`build:data`, [`build:package`], () =>
  Gulp.src(SRC.DATA)
    .pipe(Yaml())
    .pipe(Through.obj((file, encoding, cb) => {
      if (file.path.endsWith(`.json`)) {
        dataFile = {
          ...JSON.parse(file.contents.toString(encoding)),
          package: Package,
          date: (new Date()).toISOString().split('T')[0]
        };
        dataFile.header.phone_clean = dataFile.header.phone.replace(/[^0-9]/g, '');
        dataFile.header.address = dataFile.header.address.replace(/\n/g, '<br />');
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
    .pipe(IF_DEV(Connect.reload()))
    .pipe(Gulp.dest(`build`))
);

Gulp.task(`build:html`, [`build:data`], () =>
  Gulp.src(SRC.HTML)
    .pipe(Mustache(dataFile as any, {
      extension: '.html'
    }))
    .pipe(IF_PROD(HTMLMin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      decodeEntities: true,
      removeComments: true
    } as any)))
    .pipe(IF_DEV(Connect.reload()))
    .pipe(Gulp.dest(`build`))
);

Gulp.task(`build:assets`, () =>
  Gulp.src(SRC.ASSETS)
    .pipe(IF_DEV(Connect.reload()))
    .pipe(Gulp.dest(`build/assets`))
);

Gulp.task(`build:sass`, () =>
  Gulp.src(SRC.SASS)
    .pipe(Sourcemaps.init())
    .pipe(Sass({
      outputStyle: PROD ? 'compressed' : 'nested'
    }).on('error', Sass.logError))
    .pipe(Autoprefixer())
    .pipe(IF_DEV(Sourcemaps.write({includeContent: true})))
    .pipe(IF_DEV(Connect.reload()))
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
