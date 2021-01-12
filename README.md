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

## Sentry 接入指南

关于前端项目的安装指引: [https://docs.sentry.io/platforms/javascript/](https://docs.sentry.io/platforms/javascript/)

**注意**:不建议 `qiankun.js` 主应用接入sentry
### 1.安装SDK

``` shell
$ npm install --save  @sentry/browser @sentry/integrations @sentry/tracing
```

### 2.上传报错

main.js

``` javascript
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

if (['development', 'staging', 'production'].includes(process.env.NODE_ENV)) {
    Sentry.init({
        dsn: '',
        integrations: [
            new VueIntegration({
                Vue,
                tracing: true,
                //  track child components
                tracingOptions: {
                    trackComponents: true,
                },
            }),
            new Integrations.BrowserTracing(),
        ],
        tracesSampleRate: 1,
        // 版本
        release: `项目名称@版本号`,
        // 环境
        environment: '版本号',
    });
}
```

### 3.上传sourceMmap

``` shell
$ npm install --save-dev @sentry/webpack-plugin
```

vue.config.js

```javascript
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
    productionSourceMap: true, // 是否生成sourcemap
    ...

    configureWebpack: {
        devtool: 'source-map' // soucemap
    },

    chainWebpack(config) {
        config.plugin('sentry')
            .use(SentryWebpackPlugin, [{
                authToken: 'authToken',
                org: '组织',
                project: '项目名',
                url: 'sentry URL',
                include: './dist/static/js/',
                release: `项目名称@版本号`,
                urlPrefix: '/',
            }]);
    }
}
```

### 4.上传后删除soucemap文件

``` shell
$ npm install filemanager-webpack-plugin -D
```

vue.config.js

``` javascript
const FileManagerPlugin = require('filemanager-webpack-plugin');

configureWebpack: {
    plugins: [
            // 删除上报后的.map文件
            new FileManagerPlugin({
                events: {
                    onEnd: {
                        delete: ['dist/js/*.map']
                    }
                }
            })
    ]
}
```

## 奇思妙想

- ~~可选UI组件（element-ui、ant desgin vue）~~
- 增加开发接入手册
