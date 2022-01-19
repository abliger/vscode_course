## 插件

常用插件[github](https://github.com/rollup/plugins)

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