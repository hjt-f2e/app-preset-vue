import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import URI from 'urijs';
<%_ if (options.uiframework === 'antd') { _%>
import { message } from 'ant-design-vue';
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
import { Message } from 'element-ui';
<%_ } _%>

import store from '../store';
import BasicLayout from '../layout/BasicLayout.vue';

import adminRouter from './modules/admin';
import dashboardRouter from './modules/dashboard';

// 路由模块
const routerMap = {
    path: '/',
    name: 'home',
    component: BasicLayout,
    redirect: '/dashboard',
    meta: { title: '首页' },
    children: [
        dashboardRouter,
        adminRouter
    ]
};

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

    return routerMap.children
        .filter(item => menusMap.has(item.name))
        .map(item => {
            const { children = [], ...rest } = item;
            // 设置一级菜单title（sso可以控制菜单title）
            if (rest.meta && rest.meta.title) {
                rest.meta.title = formatName(menusMap.get(rest.name));
            }

            if (Array.isArray(children) && children.length > 0) {
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
                    rest.redirect = newChildren[0].path;
                }

                return {
                    children: newChildren,
                    ...rest
                };
            }

            return {
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
        } else {
            const userInfoData = await store.dispatch('user/getUserInfo');

            if (userInfoData.menus.length < 1) {
<%_ if (options.uiframework === 'antd') { _%>
                message.error('暂无该菜单权限');
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
                Message({
                    message: '暂无该菜单权限',
                    type: 'error',
                    duration: 5000
                });
<%_ } _%>
                next(false);
            } else {
                routerMap.children = createRouters(userInfoData.menus);
                if (routerMap.children.length > 0) {
                    const allowRouters = [routerMap];
                    await store.dispatch('user/setRouter', allowRouters);
                    router.addRoutes(allowRouters);

                    const urlObj = new URI(to.redirectedFrom || to.path);
                    urlObj.removeSearch('token');

                    next({
                        path: urlObj.toString(),
                        query: to.query.params
                    });
                } else {
                    next();
                }
            }
        }
    } else {
        next(false);
        // 登录必须跳转到主应用去登录
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
