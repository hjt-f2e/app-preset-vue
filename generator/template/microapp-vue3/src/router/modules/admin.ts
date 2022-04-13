import Empty from '@/layout/Empty.vue';

const adminRouter: RouterConfig = {
    path: '/page',
    name: 'page',
    component: Empty,
    meta: { title: '小程序页面管理', page: 'project', group: 'site' },
    redirect: '/page/manage',
    children: [
        {
            path: '/page/manage',
            name: 'pageManage',
            component: Empty,
            redirect: '/page/manage/list',
            meta: { title: '页面管理' },
            children: [
                {
                    path: '/page/manage/list',
                    name: 'pageManageList',
                    component: () => import('@/views/dashboard/index.vue'),
                    meta: { title: '页面管理列表', hidden: true },
                },
                {
                    path: '/page/manage/content',
                    name: 'pageManageContent',
                    component: () => import('@/views/dashboard/index.vue'),
                    meta: { title: '自定义页面编辑', hidden: true },
                }
            ]
        },
        {
            path: '/page/component-manage',
            name: 'pageComponentManage',
            redirect: '/page/component-manage/list',
            component: Empty,
            meta: { title: '页面组件管理' },
            children: [
                {
                    path: '/page/component-manage/list',
                    name: 'pageComponentManageList',
                    component: () => import('@/views/dashboard/index.vue'),
                    meta: { title: '页面管理列表', hidden: true },
                }
            ]
        },
    ]
};

export default adminRouter;
