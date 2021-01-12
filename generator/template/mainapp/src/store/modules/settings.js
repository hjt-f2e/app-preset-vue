const cityListConfig = [
    {
        id: '510100',
        name: '成都',
    },
    {
        id: '330100',
        name: '杭州',
    },
    {
        id: '500100',
        name: '重庆',
    },
    {
        id: '410100',
        name: '郑州',
    },
    {
        id: '320100',
        name: '南京',
    },
    {
        id: '420100',
        name: '武汉',
    }
];

const states = {
    cityId: '510100',
    currentCity: { id: '510100', name: '成都' },
    cityList: [],
    currentApp: {},
    appList: []
};

const mutations = {
    SET_CITY(state, value) {
        state.cityId = value;
    },

    SET_CITY_LIST(state, data = []) {
        state.cityList = cityListConfig.filter(item => data.some(id => item.id === id));
    },

    CHANGE_CITY(state, { id, name }) {
        state.currentCity = { id, name };
    },

    SET_APP_LIST(state, data = []) {
        state.appList = data;
    },

    CHANGE_APP(state, value) {
        state.currentApp = value;
    }
};

const actions = {
    setCity({ commit }, value) {
        commit('SET_CITY', value);
    },

    setCityList({ commit }, value) {
        commit('SET_CITY_LIST', value);
    },

    changeCity({ commit }, { id, name }) {
        commit('SET_CITY', id);
        commit('CHANGE_CITY', { id, name });
    },

    setAppList({ commit }, data = []) {
        commit('SET_APP_LIST', data);
    },

    changeApp({ commit }, value) {
        commit('CHANGE_APP', value);
    }
};

const getters = {
    cityId: state => state.cityId,
    currentCity: state => state.currentCity,
    cityList: state => state.cityList,
    currentApp: state => state.currentApp,
    appList: state => state.appList
};

export default {
    namespaced: true,
    state: states,
    mutations,
    actions,
    getters
};
