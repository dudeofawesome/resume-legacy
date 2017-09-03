declare module 'gulp-yaml-validate' {
  const GulpYamlValidate: (options?: {
    /**
     * Enable or disable support for regexps, functions and undefined.
     *
     * **This flag should be enabled when working with untrusted data.**
     *
     * @default false
     */
    safe: boolean;
    /**
     * Control spacing in the resulting output. It has the same usage as for
     *   [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
     *
     * @default null
     */
    space: number | string;
    /**
     * Further transform the resulting output. It has the same usage as for
     *   [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
     *
     * @default null
     */
    replacer: Function | any[];
  }) => NodeJS.ReadWriteStream;
  export = GulpYamlValidate;
}
