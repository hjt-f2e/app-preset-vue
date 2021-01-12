<%_ if (options.uiframework === 'antd') { _%>
import { message } from 'ant-design-vue';
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
import { Message } from 'element-ui';
<%_ } _%>
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';

import store from '../store';

const supportApps = [
    {
        app_key: '5f72fe21be3b1',
        app_name: '测试系统',
        app_value: 'demo-dashboard',
        app_entry: process.env.VUE_APP_PIXIU
    }
];

export function createApps(userAppObj = {}) {
    const userApps = Object.keys(userAppObj).map(key => userAppObj[key]);
    return supportApps
        .filter(app => userApps.some(item => item.app_key === app.app_key))
        .map(app => ({
            name: app.app_value,
            entry: app.app_entry,
            container: '#microapp-container',
            activeRule: `/${app.app_value}`,
            appName: app.app_name,
            appValue: app.app_value
        }));
}

export default async function() {
    const userApps = store.getters['user/userApps'];
    const apps = createApps(userApps);

    if (apps.length === 0) {
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

        return;
    }

    await store.dispatch('settings/setAppList', apps);

    registerMicroApps(apps, {
        beforeLoad() {
            return Promise.resolve();
        },

        afterMount() {
            return Promise.resolve();
        }
    });

    addGlobalUncaughtErrorHandler(msg => {
        // 加载失败时提示
        if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
<%_ if (options.uiframework === 'antd') { _%>
            message.error('微应用加载失败，请检查应用是否可运行');
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
            Message({
                message: '微应用加载失败，请检查应用是否可运行',
                type: 'error',
                duration: 5000
            });
<%_ } _%>
        }
    });

    start({
        sandbox: {
            experimentalStyleIsolation: true
        }
    });
}
