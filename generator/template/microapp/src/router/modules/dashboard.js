const dashboardRouter = {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/admin/detail2'),
    meta: { title: 'dashboard', icon: 'dashboard' }
};

export default dashboardRouter;
