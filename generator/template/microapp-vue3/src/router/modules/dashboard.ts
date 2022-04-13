const dashboardRouter: RouterConfig = {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: 'dashboard', icon: 'dashboard' },
};

export default dashboardRouter;
