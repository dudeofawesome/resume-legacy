import * as Through from 'through2';

export const SRC = {
  HTML: `src/templates/*.mustache`,
  HTML_FRAGMENTS: `src/fragments/*.mustache`,
  DATA: `src/data.yaml`,
  PACKAGE: `package.json`,
  MANIFEST: `src/config/manifest.yaml.mustache`,
  SASS: `src/**/*.scss`,
  TYPESCRIPT: `src/scripts/**/*.ts`,
  TYPESCRIPT_ENTRY: `src/scripts/index.ts`,
  ASSETS: [`src/assets/**/*`, `node_modules/mdi/fonts/*`]
};

export const PROD = process.env.NODE_ENV === 'production';
console.log(`Environment: ${PROD ? 'PRODUCTION' : 'DEVELOP'}`);
console.log();

export const NOOP_PIPE = () => Through.obj();

export const IF_PROD = (pipe: NodeJS.ReadWriteStream, prod: boolean = true) => PROD === prod ? pipe : NOOP_PIPE();
export const IF_DEV = (pipe: NodeJS.ReadWriteStream) => IF_PROD(pipe, false);
