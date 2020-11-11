# hjt-base-app 微应用（主应用）脚手架

## 快速开始

### 简介

hjt-base-app 是一个基于微前端（[qiankun.js](https://qiankun.umijs.org/zh)）中台架构的主应用脚手架，内部集成了`菜单`、`路由`、`SSO`、`http模块`、`城市切换`、`对接子应用模块`等功能，它可以帮组你快速创建应用。

### 准备

你的本地环境需要安装 `node` 和 `git`。我们的技术栈基于 `ES2015+`、`Vue.Js`、`Vuex`、`Vue-Router`、`qiankun.js` 和 `antd-vue`，提前了解和学习这些知识会非常有帮助。

### 安装

#### vue-cli 插件安装方式

安装模版，选 `主应用`

```shell
> vue create -p hjt-f2e/app-preset-vue my-app
```

初始化

``` shell
> cd my-app
> npm run init
```

**Github 仓库地址：** [github.com/hjt-f2e/app-preset-vue](https://github.com/hjt-f2e/app-preset-vue)

#### 其他安装方式

clone 代码到本地

``` shell
> git clone git@gitee.com:huanjutang/hjt-base-app.git
```

安装依赖

``` shell
> cd hjt-base-app
> npm install
> npm run init
```

### 目录结构

我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的部分功能和坑位，下面是整个项目的目录结构。

``` text
├── public
│   └── favicon.ico          # LOGO
|   └── index.html           # Vue 入口模板
├── src
│   ├── api                  # Api ajax 等
│   ├── assets               # 本地静态资源
│   ├── micro                # 微应用路由
│   ├── router               # Vue-Router
|      ├── config.js         # 路由配置文件
│   ├── store                # Vuex
│   ├── utils                # 工具库
│   ├── views                # 业务页面入口和常用模板
│   ├── App.vue              # Vue 模板入口
│   └── main.js              # Vue 入口 JS
├── README.md
└── package.json
```

### 本地开发

``` shell
> npm run dev
```

启动完成打开浏览器访问[http://localhost:9528](http://localhost:9528)

接下来你可以修改代码进行业务开发了，我们内建了典型业务模板、常用业务组件、全局路由等等各种实用的功能辅助开发，你可以继续阅读和探索其他文档。

## 路由和菜单

### 权限管理

具体逻辑在 `router/index.js` 的 `promiession` 函数

![avatar](https://imgcdn.huanjutang.com/assets/img/202011111427518081.png)

#### 判断步骤

1. 判断是否有 `token` 如果没有则跳转到 `sso` 登录
2. 判断是否挂载应用 `store.getters['user/router']` 和 `store.getters['settings/appList']`，加载过就直接 `next` 跳转
3. 获取用户权限信息 `store.dispatch('user/getUserInfo')`，根据 `userApps` 字段通过 `createRouters` 过滤筛选好的应用路由
4. 缓存过滤好的应用路由 `store.dispatch('user/setRouter')`，然后再通过 `router.addRoutes` 加入到路由表中
5. `startQiankun` 内的 `createApps` 判断应用权限
6. 缓存过滤好的应用权限 `store.dispatch('settings/setAppList')`，然后再通过 `registerMicroApp`、`start` 方法挂载 `qiankun.js` 子应用
7. 跳转到目标路由

#### 结构说明

##### 应用

``` javascript
// 配置改主应用支持的子应用
const supportApps = [
    {
        app_key: '5f72fe21be3b1',
        app_name: '测试系统',   // 应用与服务列表菜单名称
        app_value: 'demo-dashboard',
        app_entry: process.env.VUE_APP_PIXIU
    }
];
```

> 1. 建议应用 `app_name`用中文，例如 `app_name: '测试系统'`
> 2. `app_value` 不建议使用较简单的命名，建议用英文并且全小写 `-` 隔开，例如 `bad: demo  =>  good:demo-dashboard`
> 3. `app_entry` 建议单独声明到 `.env.production、.env.development、.env.staging` 文件内
> 4. 每增加一个应用需要增加一个对应的`supportApps`记录

##### 路由

``` javascript
import Layout from '../layout/index.vue';

const RouterView = {
    name: 'RouteView',
    render: (h) => h('router-view')
};

export default {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    children: [
        {   // 配置的子应用路由
            path: 'demo-dashboard*',
            name: 'demo-dashboard',
            component: RouterView,
        },
        {   // 此条路由为默认路由，不能去除
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/Index.vue')
        }
    ]
};
```

> 1. `children`内的一条数据对应`supportApps`内一条数据
> 2. `children`的`path`与`name`对应`app_value`，注意`path`后面需要额外增加一个`*`
> 3. 每增加一个`supportApps`需要增加一个对应的`children`

### 新增应用

1. 在 `src/router/config.js` 增加一笔路由记录

``` javascript
export default {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    children: [
        ...

        {
            path: 'demo-dashboard*',
            name: 'demo-dashboard',
            component: RouterView,
        },
        ...
    ]
};
```

2. 在 `src/micro/index.js` 增加一笔支持应用记录

``` javascript
const supportApps = [
    {
        app_key: '5f72fe21be3b1',
        app_name: '测试系统',
        app_value: 'demo-dashboard',
        app_entry: process.env.VUE_APP_PIXIU
    }
];

```

3. 在 `.env.production、.env.development、.env.staging` 内增加 `app_entry` 使用的配置常量（注意环境的区别）

```
VUE_APP_PIXIU=//localhost:9528
```

## 调试指南

文档整理中

## 祭“图”

图片整理中

## 奇思妙想

- 可选UI组件（element-ui、ant desgin vue）
