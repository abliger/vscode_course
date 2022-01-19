# rollup 快速启动项目

rollup-start-app 是一个简易的网页应用，使用rollup 对源码进行打包，让`public`下的index.html 文件的`<script src='bundle.js'></script>`进行引用。

## app rollup 配置

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // 一个自动执行的功能，适合作为<script>标签
		sourcemap: true
	},
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		production && terser() // minify, but only in production
	]
};
```
使用的插件

|插件|作用|
|---|---|
|@rollup/plugin-node-resolve|发现npm 模块，没有它只能使用本地url导入|
|@rollup/plugin-commonjs|转换 CommonJS 到 ES6|
|rollup-plugin-terser|生成最小的es文件|

安装npm 模块后，运行npm 脚本 [run npm script](command:extension.js-debug.npmScript)