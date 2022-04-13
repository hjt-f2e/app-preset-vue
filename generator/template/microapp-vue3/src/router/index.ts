import NProgress from 'nprogress';
import {
    createRouter, createWebHistory,
    NavigationGuardNext, RouteLocationNormalized,
} from 'vue-router';
import { ElMessage } from 'element-plus';
import api from '@/api';
import { useUserStore } from '@/store/user';
import Layout from '@/layout/Layout.vue';

import adminRouter from './modules/admin';

const routers: RouterConfig = {
    path: '/',
    name: 'home',
    component: Layout,
    meta: { title: '首页' },
    children: [
        adminRouter
    ],
};

const defaultRoutes: Array<RouterConfig> = [
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        hidden: true,
    },
    { path: '/*', redirect: '/404', hidden: true },
];

// eslint-disable-next-line no-underscore-dangle
const base = (window as any).__POWERED_BY_QIANKUN__ ? '/tools' : '/';
const router = createRouter({
    history: createWebHistory(base),
    routes: defaultRoutes,
});

function getMetaTitle(name?: string): string {
    const nowName = name || '';
    if (nowName.indexOf('-') > -1) {
        return nowName.substring(0, nowName.indexOf('-'));
    }
    return nowName;
}

function createRouters(menus: Menus = []): Array<RouterConfig> {
    const menusMap = new Map<string, string>();

    menus.forEach((item) => {
        menusMap.set(item.menu_value, item.menu_name);
    });

    if (routers.children && routers.children.length > 0) {
        return routers.children
            .filter((item) => menusMap.has(String(item.name)))
            .map((routerChildItem) => {
                const newRouter = {
                    ...routerChildItem
                };

                // 设置一级菜单title（sso可以控制菜单title）
                if (newRouter.meta && newRouter.meta.title) {
                    newRouter.meta.title = getMetaTitle(menusMap.get(String(newRouter.name)));
                }

                if (Array.isArray(newRouter.children) && newRouter.children.length > 0) {
                    const newChildren = newRouter.children.filter(child => menusMap.has(String(child.name)));
                    // 设置子菜单title（sso可以控制菜单title）
                    newChildren.forEach(child => {
                        if (child.meta && child.meta.title) {
                        // eslint-disable-next-line no-param-reassign
                            child.meta.title = getMetaTitle(menusMap.get(String(child.name)));
                        }
                    });

                    // 如果默认路由的redirect跳转路由没有权限，
                    // 那么就把父路由的默认重定向设置为第一个child的路由
                    if (newChildren.length > 0) {
                        newRouter.redirect = newChildren[0].path;
                    }

                    return {
                        ...newRouter,
                        children: newChildren
                    };
                }

                return {
                    ...newRouter
                };
            });
    }

    return [];
}

async function promission(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    NProgress.start();

    const {
        token, routers: routersMap, setUserInfo, setRouter
    } = useUserStore();

    if (token) {
        const routersLength = routersMap?.children?.length || 0;

        if (routersLength > 0) {
            next();
        } else {
            try {
                const res = await api.user.getUserInfo();
                const { data: userInfoData } = res;

                if (userInfoData) setUserInfo(userInfoData);

                if (userInfoData.menus && userInfoData.menus.length < 1) {
                    ElMessage({
                        message: '暂无该菜单权限',
                        type: 'error',
                        duration: 5000
                    });
                    next(false);
                } else {
                    routers.children = createRouters(userInfoData.menus);

                    if (routers.children.length > 0) {
                        routers.redirect = routers.children[0].path;
                        router.addRoute(routers);
                        setRouter(routers);
                    }

                    next();
                }
            } catch (e) {
                next(false);
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
