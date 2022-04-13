const state = {
    router: []
};

const mutations = {
    SET_ROUTER: (state, router) => {
        state.router = router;
    },
};

const actions = {
    setRouter({ commit }, data) {
        commit('SET_ROUTER', data);
    },
};

const getters = {
    router: state => state.router
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
