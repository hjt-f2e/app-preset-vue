import Cookies from 'js-cookie';
import { message } from 'ant-design-vue';

import api from '@/api';

// 此模块禁止设置到storeage内

const TOKEN_KEY = process.env.NODE_ENV === 'production' ? 'production_1ac4824f700ce88566c1ff053d843b64' : 'staging_1ac4824f700ce88566c1ff053d843b64';

function getToken() {
    return Cookies.get(TOKEN_KEY, { domain: process.env.VUE_APP_DOMAIN });
}

function setToken(token) {
    return Cookies.set(TOKEN_KEY, token, { domain: process.env.VUE_APP_DOMAIN, expires: 1 });
}

function removeToken() {
    return Cookies.remove(TOKEN_KEY);
}

const states = {
    token: getToken(),
    userInfo: {},
    router: [],
    userApps: {}
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
        setToken(token);
    },

    REMOVE_TOKEN(state) {
        state.token = '';
        removeToken();
    },

    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    },

    SET_ROUTER(state, router) {
        state.router = router;
    },

    SET_USER_APPS(state, value) {
        state.userApps = value;
    }
};

const actions = {
    setToken({ commit }, token) {
        commit('SET_TOKEN', token);
    },

    resetToken({ commit }) {
        commit('REMOVE_TOKEN');
    },

    setRouter({ commit }, data = []) {
        commit('SET_ROUTER', data);
    },

    getUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            api.user.getUserInfo()
                .then(({ data }) => {
                    if (data) {
                        const { user, city_list: cityList, user_apps: userApps } = data;
                        commit('SET_USER_INFO', user);
                        commit('SET_USER_APPS', userApps);
                        commit('settings/SET_CITY_LIST', cityList, { root: true });
                        resolve(data);
                    } else {
                        message.error({
                            content: 'Verification failed, please Login again.'
                        });

                        reject(new Error('Verification failed, please Login again.'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};

const getters = {
    token: state => state.token,
    userInfo: state => state.userInfo,
    router: state => state.router,
    userApps: state => state.userApps
};

export default {
    namespaced: true,
    state: states,
    mutations,
    actions,
    getters
};
