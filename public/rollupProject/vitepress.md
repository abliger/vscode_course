vitepress 分为两部分。一部分是让markdown文件转换为vue 文件和充当客户端的作用。开发时，这一部分主要使用了vite对路由和请求的处理。另一部分是vitepress 的默认主题。
此处在第一部分会用到rollup。

从github 克隆 vitepress 

目标：打包 vitepress 第一部分（注意有两个入口文件）。

在终端运行`rollup -c scripts/rollup.config.js`，查看正确结果