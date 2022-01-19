## 配置文件

```js
// rollup.config.js

// can be an array (for multiple inputs)
export default {
  // core input options
  external,
  input, // conditionally required
  plugins,

  // advanced input options
  cache,
  onwarn,
  preserveEntrySignatures,
  strictDeprecations,

  // danger zone
  acorn,
  acornInjectPlugins,
  context,
  moduleContext,
  preserveSymlinks,
  shimMissingExports,
  treeshake,

  // experimental
  experimentalCacheExpiry,
  perf,

  // required (can be an array, for multiple outputs)
  output: {
    // core output options
    dir,
    file,
    format, // required
    globals,
    name,
    plugins,

    // advanced output options
    assetFileNames,
    banner,
    chunkFileNames,
    compact,
    entryFileNames,
    extend,
    footer,
    hoistTransitiveImports,
    inlineDynamicImports,
    interop,
    intro,
    manualChunks,
    minifyInternalExports,
    outro,
    paths,
    preserveModules,
    preserveModulesRoot,
    sourcemap,
    sourcemapExcludeSources,
    sourcemapFile,
    sourcemapPathTransform,
    validate,

    // danger zone
    amd,
    esModule,
    exports,
    externalLiveBindings,
    freeze,
    indent,
    namespaceToStringTag,
    noConflict,
    preferConst,
    sanitizeFileName,
    strict,
    systemNullSetters
  },

  watch: {
    buildDelay,
    chokidar,
    clearScreen, //触发重建时是否清除屏幕
    skipWrite,
    exclude, //防止文件被监控
    include //限制文件监控至某些文件
  }
};
```

使用Rollup的配置文件，记得在命令行里加上--config或者-c
```shell
# 默认使用rollup.config.js
rollup --config

# 或者, 使用自定义的配置文件，这里使用my.config.js作为配置文件
rollup --config my.config.js
```

[配置详情](https://www.rollupjs.com/guide/big-list-of-options)

## 命令行的参数(Command line flags)
配置文件中的许多选项和命令行的参数是等价的。如果你使用这里的参数，那么将重写配置文件。想了解更多的话，仔细查阅这个包办大量选项的清单

|参数|描述|
|--|--|
|-i, --input <filename>      |要打包的文件（必须）|
|-o, --file <output>         |输出的文件 (如果没有这个参数，则直接输出到控制台)|
|-f, --format <format>       |输出的文件类型 (amd, cjs, esm, iife, umd)|
|-e, --external <ids>        |将模块ID的逗号分隔列表排除|
|-g, --globals <pairs>       |以`module ID:Global` 键值对的形式，用逗号分隔开 任何定义在这里模块ID定义添加到外部依赖|
|-n, --name <name>           |生成UMD模块的名字|
|-h, --help                  |输出 help 信息|
|-m, --sourcemap             |生成 sourcemap (`-m inline` for inline map)|
|--amd.id                    |AMD模块的ID，默认是个匿名函数|
|--amd.define                |使用Function来代替`define`|
|--no-strict                 |在生成的包中省略`"use strict";`|
|--no-conflict               |对于UMD模块来说，给全局变量生成一个无冲突的方法|
|--intro                     |在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容|
|--outro                     |在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容|
|--banner                    |在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容|
|--footer                    |在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容|
|--interop                   |包含公共的模块（这个选项是默认添加的）|