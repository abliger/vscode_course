## js api

rollup 不仅可以使用命令行运行，也可使用node 来打包，处理复杂情况。

rollup js api 对外开放了两个函数 rollup 和 watch

例如 

```js
const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
// see below for details on the options
/**
 * @type import('rollup').RollupOptions
 */
const inputOptions = {
    input: 'src/main.js',
    external: ['ms'],
    plugins: [
        resolve(), // so Rollup can find `ms`
        commonjs() // so Rollup can convert `ms` to an ES module
    ],
};
/**
 * @type import('rollup').OutputOptions
 */
const outputOptions = {
    globals: {
        "ms": "ms"
    },
    name: 'howLongUntilLunch',
    file: 'out.js',
    format: 'umd'
};

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    console.log('bundle', bundle);

    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);
    console.log('code', code);
    console.log('map', map);
    // or write the bundle to disk
    await bundle.write(outputOptions);
}

build();
```

watch

```js
const rollup = require('rollup');

const watchOptions = {...};
const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
  // event.code 会是下面其中一个：
  //   START        — 监听器正在启动（重启）
  //   BUNDLE_START — 构建单个文件束
  //   BUNDLE_END   — 完成文件束构建
  //   END          — 完成所有文件束构建
  //   ERROR        — 构建时遇到错误
  //   FATAL        — 遇到无可修复的错误
});

// 停止监听
watcher.close();
```