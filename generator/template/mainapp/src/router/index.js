import Vue from 'vue';
import Router from 'vue-router';
import URI from 'urijs';
<%_ if (options.uiframework === 'antd') { _%>
import { message } from 'ant-design-vue';
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
import { Message } from 'element-ui';
<%_ } _%>

import store from '../store';
import routers from './config';
import startQiankun, { createApps } from '../micro';

import { createWaterMark } from '../utils/index';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/404',
            component: () => import('@/views/404'),
            hidden: true
        },
        { path: '*', redirect: '/404', hidden: true },
    ]
});

function createRouters() {
    const userApps = store.getters['user/userApps'];
    const apps = createApps(userApps);

    return routers.children
        .filter(item => apps
            .some(app => app.appValue === item.name)
            || item.name === 'dashboard');
}

async function permession(to, from, next) {
    // 获取 token
    const { token } = to.query;
    if (token) {
        await store.dispatch('user/setToken', token);
    }

    const hasToken = store.getters['user/token'];
    if (hasToken) {
        const routerList = store.getters['router/router'];
        const appList = store.getters['settings/appList'];

        // 如果已经挂载了App和对应路由，那么就跳出循环
        if (appList.length > 0 && routerList.length > 0) {
            next();

            return;
        }

        try {
            await store.dispatch('user/getUserInfo');
        } catch (e) {
            // 重新登录
            window.location.href = `${process.env.VUE_APP_SSO_LOGIN_URL}?redirect_url=${window.location.href}`;

            return;
        }

        routers.children = createRouters();
        const allowRouters = [routers];
        if (allowRouters.length === 0) {
<%_ if (options.uiframework === 'antd') { _%>
            message.error('您暂无任何应用权限，请联系管理员开通');
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
            Message({
                message: '您暂无任何应用权限，请联系管理员开通',
                type: 'error',
                duration: 5000
            });
<%_ } _%>
            next(false);

            return;
        }

        router.addRoutes(allowRouters);
        await store.dispatch('router/setRouter', allowRouters);
        await startQiankun();
        createWaterMark(store.getters['user/userInfo'].name);

        const urlObj = new URI(to.redirectedFrom || to.path);
        urlObj.removeSearch('token');

        next({
            path: urlObj.toString(),
            query: to.query.params
        });
    } else {
        // 重新登录
        window.location.href = `${process.env.VUE_APP_SSO_LOGIN_URL}?redirect_url=${window.location.href}`;
    }
}

router.beforeEach(permession);

export default router;
