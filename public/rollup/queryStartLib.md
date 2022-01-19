## lib rollup 配置

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'howLongUntilLunch',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	},
	{
		input: 'src/main.js',
		external: ['ms'], // 让ms 模块不打包在文件中
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
```

lib 项目与app 不同 它可行运行在浏览器也可能运行在node环境中，所以需要输出多种格式的文件

输出文件格式有以下几种

|格式|含义|
|---|---|
|amd | 异步模块定义，用于像RequireJS这样的模块加载器|
|cjs | CommonJS，适用于 Node 和 Browserify/Webpack|
|esm | 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 `<script type=module>` 标签引入|
|iife| 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）|
|umd | 通用模块定义，以amd，cjs 和 iife 为一体|
|system | SystemJS 加载器格式|

注意这段代码

```js
{
    input: 'src/main.js',
    external: ['ms'],
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' }
    ]
}
```

由于此处没有插件`@rollup/plugin-node-resolve`、`@rollup/plugin-commonjs` rollup 找不到ms 模块，此处`external`作用是无效的。
加入`plugins: [resolve(),commonjs()]`后生效

> **external特殊情况 如jquery** 
> 添加 globals: {  jquery: '$'}

安装npm 模块后，运行npm 脚本 [run npm script](command:extension.js-debug.npmScript)