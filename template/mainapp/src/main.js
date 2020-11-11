import Vue from 'vue';
import 'normalize.css/normalize.css';

// antd vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import store from './store';
import router from './router';
import App from './App.vue';

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
