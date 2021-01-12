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
        {
            path: 'demo-dashboard*',
            name: 'demo-dashboard',
            component: RouterView,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/Index.vue')
        }
    ]
};
