## 插件

常用插件[github](https://github.com/rollup/plugins)

rollup 项目集合 [github](https://github.com/rollup/awesome)

但本文并不探讨rollup 官方插件而是 其他第三方 可能用到的插件

### rollup-plugin-vue

例子：

```js
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'

export default {
    input: 'index.vue',
    output: {
        format: 'esm',
        file: 'dist/index.js'
    },
    external: ['vue'],
    plugins: [
        css(),
        vue({ css: false })
    ]
}
```

[拉取项目](command:abliger.rollup_course.pullProjectVue)

#### 使用jsx

```js
import jsx from 'rollup-plugin-jsx'
export default {
    // ...
    plugins: [
        // ...
        jsx({ factory: "h" }),
    ],
    sourceMap: true
}
```

导入rollup-plugin-jsx 插件 把 jsx 语法转换为 函数，其中factory 使用 h 函数 是 vue 的生成虚拟dom 的函数

> 注意 rollup-plugin-jsx 在匹配时 会判断 编译前和编译后是否相同。而 rollup 会放入 空字符串 导致前后相同。如果出现该问题，到对应位置注释该代码

#### 使用ts

// todo

#### rollup-plugin-jsx

这里 看一下 rollup-plugin-jsx
它会把 jsx 转换成 函数。进入该函数我们会发现rollup-plugin-jsx 是对[jsx-transform](https://github.com/alexmingoia/jsx-transform) 简单包装，主要使用它的fromString 函数 对jsx进行转换

```js
var jsx = require('jsx-transform')
var MagicString = require( 'magic-string' )
var createFilter = require('rollup-pluginutils').createFilter

module.exports = function(options){
  options = options || {}
  var filter = createFilter( options.include, options.exclude )
  return {
    transform: function sourceToCode(code, id){
      if ( !filter( id ) ) return null

      var s = new MagicString( code )
      var out = jsx.fromString(code, options)
      s.overwrite( 0, code.length, out.toString() )

      return  {
        code: s.toString(),
        map: s.generateMap({ hires: true })
      }
    }
  }
}
```

#### rollup-plugin-css

对css 内容进行输出

可选项

```js
{
    include?: ReadonlyArray<string | RegExp> | string | RegExp | null, // 包含路径
    exclude?: ReadonlyArray<string | RegExp> | string | RegExp | null, // 排除路径
    output?:boolean| string | ((styles: string, styleNodes: Record<string, string>, bundle: OutputBundle) => void)
        | null | undefined // 输出文件名，如果是函数 如 (styles, styleNodes) => {writeFileSync('bundle.css', styles)}
    // - styles: the contents of all style tags combined: 'body { color: green }'
    // - styleNodes: an array of style objects: [{lang: 'css', content: 'body { color: green }'}]
}
```