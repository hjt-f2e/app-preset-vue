import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import settings from './modules/settings';
import user from './modules/user';
import router from './modules/router';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['settings', 'user']
});

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        settings,
        user,
        router
    },
    plugins: [vuexLocal.plugin]
});
export default store;
