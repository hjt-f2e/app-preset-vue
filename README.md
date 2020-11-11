# app-preset-vue

## 简介

欢聚堂前端组，vue项目常见脚手架，它可以帮组你快速创建应用。

- [microapp](template/microapp) 是一个基于微前端（[qiankun.js](https://qiankun.umijs.org/zh)）中台架构的`子应用`脚手架，内部集成了`菜单`、`路由`、`SSO`、`http模块`、`七牛上传`、`对接主应用模块`等功能。[git仓库地址](https://gitee.com/huanjutang/hjt-micro-app)

- [mainapp](template/mainapp) 是一个基于微前端（[qiankun.js](https://qiankun.umijs.org/zh)）中台架构的`主应用`脚手架，内部集成了`菜单`、`路由`、`SSO`、`http模块`、`城市切换`、`对接子应用模块`等功能。[git仓库地址](https://gitee.com/huanjutang/hjt-base-app)

## 准备

你的本地环境需要安装 `node` 和 `git`。我们的技术栈基于 `ES2015+`、`Vue.Js`、`Vuex`、`Vue-Router`、`qiankun.js` 和 `antd-vue`，提前了解和学习这些知识会非常有帮助。

## 快速开始

1. 安装vue-cli

``` shell
npm install -g @vue/cli
```

2. 安装模版

```shell
> vue create -p hjt-f2e/app-preset-vue my-app
```

3. 初始化

``` shell
> cd my-app
> npm run init
```

## 本地开发

``` shell
> npm run dev
```

启动完成打开浏览器访问[http://localhost:9528](http://localhost:9528)

接下来你可以修改代码进行业务开发了，我们内建了典型业务模板、常用业务组件、全局路由等等各种实用的功能辅助开发，你可以继续阅读和探索其他文档。

## 奇思妙想

- 可选UI组件（element-ui、ant desgin vue）
