import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import settings from './modules/settings';
import user from './modules/user';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['settings', 'route']
});

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        settings,
        user
    },
    plugins: [vuexLocal.plugin]
});

export default store;
