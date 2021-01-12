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
import App from './App.vue';

<%_ if (options.uiframework === 'antd') { _%>
Vue.use(Antd);
<%_ } _%>
<%_ if (options.uiframework === 'element') { _%>
Vue.use(ElementUI);
<%_ } _%>

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
