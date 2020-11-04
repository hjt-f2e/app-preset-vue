import Layout from '@/layout';

const adminRouter = {
    path: '/config',
    name: 'config',
    component: Layout,
    redirect: '/config/configIndex/',
    meta: { title: '首页', icon: '' },
    children: [
        {
            path: 'configIndex',
            name: 'configIndex',
            component: () => import('@/views/admin/list'),
            meta: { title: '列表' }
        },
        {
            path: 'detail',
            name: 'adminDetail',
            component: () => import('@/views/admin/detail'),
            meta: { title: '详情页' },
            hidden: true, // 是否在菜单中显示
        }
    ]
};

export default adminRouter;
