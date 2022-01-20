## vue3-markdown-loader

vue3-markdown-loader 是本人参照vitepress markdown解析，编写的markdown 解析工具，它主要依赖`markdown-it`系列工具。



### 1. 打包vue3-markdown-loader

在进行这项实验时，请先[拉去代码](command:abliger.rollup_course.markdown)到本地

操作步骤：
1. 进入项目我们会看到这是一个npm 项目,我们会知道该项目一定需要`@rollup/plugin-node-resolve`、`@rollup/plugin-commonjs`这两个插件
2. 在`package.json` 中`peerDependencies`，分别是 vue 和 prismjs(分析markdown 代码片段模块)
我们大体就可以写出以下配置文件
```js
export default defineConfig({
    input: './index.js',
    external: ['prism', 'vue'],
    output: [
        {
            name: 'md',
            file: 'dist/index.umd.js',
            format: "umd"
        },
        {
            name: 'md',
            file: 'dist/index.cjs.js',
            format: "cjs"
        },
        {
            file: 'dist/index.ex.js',
            format: "es"
        }
    ],
    plugins: [resolve(), commonjs()]
})
```
运行后，rollup 会提示 该项目引用到了json文件，我们在配置文件添加rollup json插件

```js
import json from '@rollup/plugin-json'
//..
plugins: [resolve(), commonjs(),json()]
//..
```

### 2. 使用vue3-markdown-loader

使用npm 依赖vue3-markdown-loader

创建html文件， body内容填写以下代码
```html
<div id="sdf"></div>
<script src="./dist/index.js"></script>
<link rel="stylesheet" href="index.css" type="text/css" />
// vue3-markdown-loader 中的css文件
```

```js
import { md } from 'vue3-markdown-loader/dist/index.umd'

const m = md({
    style: 1,
    baseCardNum: 6,
    mdOption: {
        css: null
    }
})
let content = m.render('## df\n ```js\nlet s="sdf"\n```\n')
document.getElementById('sdf').innerHTML = content
```

npm 下载 rollup 及其插件

```js
import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
export default defineConfig({
    input: './index.js',
    output: {
        dir: 'dist',
        format: "umd"
    },
    plugins: [resolve(), commonjs()]
})
```

运行 `rollup -c`
