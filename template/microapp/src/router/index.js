import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import URI from 'urijs';

import { message } from 'ant-design-vue';
import store from '../store';

import adminRouter from './modules/admin';

// 路由模块
const routers = [
    adminRouter
];

Vue.use(Router);
NProgress.configure({ showSpinner: false });

const router = new Router({
    mode: 'history',
    // eslint-disable-next-line no-underscore-dangle
    base: window.__POWERED_BY_QIANKUN__ ? '/{{appName}}' : '/',
    routes: [
        {
            path: '/404',
            component: () => import('@/views/404'),
            hidden: true
        },
        { path: '*', redirect: '/404', hidden: true },
    ]
});

function formatName(name) {
    name = name || '';
    if (name.indexOf('-') > -1) {
        return name.substring(0, name.indexOf('-'));
    }
    return name;
}

function createRouters(menus = []) {
    const menusMap = new Map();

    menus.forEach(item => {
        menusMap.set(item.menu_value, item.menu_name);
    });

    return routers
        .filter(item => menusMap.has(item.name))
        .map(item => {
            const { children = [], ...rest } = item;
            // 设置一级菜单title（sso可以控制菜单title）
            if (rest.meta && rest.meta.title) {
                rest.meta.title = formatName(menusMap.get(rest.name));
            }

            const newChildren = children.filter(child => menusMap.has(child.name));
            // 设置子菜单title（sso可以控制菜单title）
            newChildren.forEach(child => {
                if (child.meta && child.meta.title) {
                    child.meta.title = formatName(menusMap.get(child.name));
                }
            });

            // 如果默认路由的redirect跳转路由没有权限，
            // 那么就把父路由的默认重定向设置为第一个child的路由
            if (newChildren.length > 0) {
                rest.redirect = `${rest.path}/${newChildren[0].path}`;
            }

            return {
                children: newChildren,
                ...rest
            };
        });
}

async function promission(to, from, next) {
    NProgress.start();

    document.title = to.meta?.title || 'HJT-ADMIN';

    const hasToken = store.getters['user/token'];
    if (hasToken) {
        const routerLength = (store.getters['user/router'] && store.getters['user/router'].length) || 0;

        if (routerLength > 0) {
            next();

            return;
        }

        const userInfoData = await store.dispatch('user/getUserInfo');

        if (userInfoData.menus.length < 1) {
            message.error('暂无该菜单权限');
            next();

            return;
        }

        const allowRouters = createRouters(userInfoData.menus);

        if (allowRouters.length === 0) {
            next();

            return;
        }

        await store.dispatch('user/setRouter', allowRouters);
        router.addRoutes(allowRouters);

        const urlObj = new URI(to.redirectedFrom || to.path);
        urlObj.removeSearch('token');

        next({
            path: urlObj.toString(),
            query: to.query.params
        });
    } else {
        // // 登录必须跳转到主应用去登录
        const redirectUrl = `${process.env.VUE_APP_MAIN_APP_URL}${window.location.pathname}`;
        window.location.href = `${process.env.VUE_APP_SSO_LOGIN_URL}?redirect_url=${redirectUrl}`;
    }

    NProgress.done();
}

router.beforeEach(promission);
router.afterEach(() => {
    NProgress.done();
});

export default router;
