/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import Vue from 'vue';
import 'normalize.css/normalize.css';

<%_ if (options.uiframework === 'antd') { _%>
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
<%_ } _%>

import store from './store';
import router from './router';
import { getCurrentCity } from './utils';
import App from './App.vue';

<%_ if (options.uiframework === 'antd') { _%>
Vue.use(Antd);
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
Vue.use(ElementUI);
<%_ } _%>

Vue.config.productionTip = false;

function render(props = {}) {
    if (render.app) {
        render.app.$destroy();
    }

    render.app = new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount(props.container ? props.container.querySelector('#app') : '#app');
}

if (window.__POWERED_BY_QIANKUN__) {
    // 如果是微应用的方式启动
    store.commit('settings/CHANGE_CITY', getCurrentCity());

    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    // TODO::微应用业务
}

// 微应用挂载
export async function mount(props) {
    render(props);
}

// 微应用卸载
export async function unmount () {
    if (render.app) {
        render.app.$destroy();
    }
}
