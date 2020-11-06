const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
};

const adminRouter = {
    path: '/project',
    name: 'project',
    redirect: '/project/list',
    component: RouteView,
    meta: { title: '项目管理', icon: 'project' },
    children: [
        {
            path: '/project/list',
            name: 'projectList',
            component: () => import('@/views/admin/list'),
            meta: { title: '用例列表' },
            children: [
                {
                    path: 'detail',
                    name: 'listDetail',
                    component: () => import('@/views/admin/detail'),
                    meta: { title: '楼盘详情页' }
                }
            ]
        },
        {
            path: '/project/version',
            name: 'versionList',
            component: () => import('@/views/admin/detail2'),
            meta: { title: '版本管理' },
            children: [
                {
                    path: 'detail',
                    name: 'versionDetail',
                    component: () => import('@/views/admin/detail2'),
                    meta: { title: '版本详情页' }
                }
            ]
        }
    ]
};

export default adminRouter;
