# app-preset-vue 微应用（子应用）脚手架

## 快速开始

### 简介

欢聚堂前端组，vue项目常见脚手架。

microapp 是一个基于微前端（[qiankun.js](https://qiankun.umijs.org/zh)）中台架构的子应用脚手架，内部集成了`菜单`、`路由`、`SSO`、`http模块`、`七牛上传`、`对接主应用模块`等功能，它可以帮组你快速创建应用。

### 准备

你的本地环境需要安装 `node` 和 `git`。我们的技术栈基于 `ES2015+`、`Vue.Js`、`Vuex`、`Vue-Router`、`qiankun.js` 和 `antd-vue`，提前了解和学习这些知识会非常有帮助。

-- 鲁迅

### 安装

#### vue-cli 插件安装方式

安装vue-cli

``` shell
npm install -g @vue/cli
```

安装模版

```shell
> vue create -p hjt-f2e/app-preset-vue my-app
```

初始化

``` shell
> cd my-app
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
│   ├── router               # Vue-Router
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

![avatar](https://imgcdn.huanjutang.com/assets/img/2020116172358081.png)

#### 判断步骤

1. 判断是否有`token` 如果没有则跳转到 `主应用` 登录
2. 判断是否加载过路由 `store.getters['user/router']`，加载过就直接 `next` 跳转
3. 获取用户权限信息 `store.dispatch('user/getUserInfo')`，根据 `menus` 字段通过 `createRouter` 过滤筛选好的菜单路由
4. 缓存过滤好的菜单路由 `store.dispatch('user/setRouter')`，然后再通过 `router.addRoutes` 加入到路由表中
5. 跳转到目标路由

#### 结构说明

``` javascript
const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
};

const adminRouter = {
    path: '/project',   // 跳转路径，使用全路径描述
    name: 'project',    // 路由名称，建议使用唯一 name，否则会出现意外 BUG
    redirect: '/project/list',  // 重定向地址，定义折叠菜单需要用到
    component: RouteView,   // 定义折叠菜单需要用到，放一个空 RouteView ，否则会出现不渲染 BUG
    meta: {
        title: '项目管理',  // 菜单名称（面包屑名称）
        icon: 'project' // 菜单图标（必填）
    },
    children: [
        // 子路由
        {
            path: '/project/list',  // 跳转路径，使用全路径描述（重要）
            name: 'projectList',    // 路由名称，建议使用唯一 name，否则会出现意外 BUG
            component: () => import('@/views/admin/list'),
            meta: { title: '用例列表' },
            children: [
                {
                    // 列表路由
                    path: '/project/list/detail',
                    name: 'projectListDetail',
                    component: () => import('@/views/admin/detail'),
                    meta: { title: '楼盘详情页' }
                }
            ]
        },
       ...
    ]
}
```

> 1. 建议路由名称使用路径驼峰命名，例如 `/project -> project`，`/project/list -> projectList` 等
> 2. 所有路径均必须使用全路径名称命名，例如 `/project -> /project/list -> /project/list/detail` 等
> 3. 菜单循环只支持`二级`，多余的 `children` 层级不会被渲染出来
> 4. 使用 `() => import('...')` 方式为路由动态引入

### 新增菜单（一级菜单）

1. 在 `src/router/modules/` 下新建一个文件 `hello.js`（如果在现有的模块下新增则忽略）

``` javascript
const HelloRouter = {
    path: '/hello',
    name: 'hello',
    conpoment: () => import('@/views/hello'),
    meta: {
        title: 'hello一级菜单',
        icon: 'user'
    },
};

export default HelloRouter;
```

2. 在 `src/router/index.js` 内引入该模块

``` javascript
import helloRouter from './modules/hello';

const routerMap = {
    path: '/',
    name: 'home',
    component: BasicLayout,
    redirect: '/dashboard',
    meta: { title: '首页' },
    children: [
        ......,
        helloRouter
    ]
};
```

### 新增子菜单（二级菜单）

在 `src/router/modules/` 下对应模块内的children增加二级菜单路由

``` javascript
const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
};

const HelloRouter = {
    path: '/hello',
    name: 'hello',
    conpoment: RouteView,   // 必须，此处引入一个空 router-view ，用来展示 children 内组件
    meta: {
        title: 'hello一级菜单',
        icon: 'user'
    },
    children: [
        {
            path: '/hello/list',
            name: 'helloList',
            conpoment: () => import('@/views/hello/list'),
            meta: { title: 'hello二级菜单' }
        }
    ]
};

export default HelloRouter;
```

### 新增页面

在 `src/router/modules/` 下对应模块内的children增加二级菜单`children`子路由

``` javascript
const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
};

const HelloRouter = {
    path: '/hello',
    name: 'hello',
    conpoment: RouteView,   // 必须，此处引入一个空 router-view ，用来展示 children 内组件
    meta: {
        title: 'hello一级菜单',
        icon: 'user'
    },
    children: [
        {
            path: '/hello/list',
            name: 'helloList',
            redirect: '/hello/list'
            conpoment: RouteView,   // 必须，此处引入一个空 router-view ，用来展示 children 内组件
            meta: { title: 'hello二级菜单' },
            children: [
                {   // 默认 list 展示组件
                    path: '',
                    name: 'helloList',
                    component: () => import('@/views/hello/list')
                },
                {   // 新增的页面
                    path: '/hello/list/detail',
                    name: 'helloListDetail',
                    component: () => import('@/views/hello/detail')
                }
            ]
        }
    ]
};

export default HelloRouter;
```

### 更多层，套娃思想一样

## 调试指南

文档整理中

## 祭“图”

图片整理中

## 奇思妙想

- 可选UI组件（element-ui、ant desgin vue）
