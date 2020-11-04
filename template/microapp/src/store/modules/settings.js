const states = {
    cityId: '510100',
    currentCity: { id: '510100', name: '成都' }
};

const mutations = {
    SET_CITY: (state, value) => {
        state.cityId = value;
    },

    CHANGE_CITY: (state, { id, name }) => {
        state.currentCity = { id, name };
    }
};

const actions = {
    setCity({ commit }, value) {
        commit('SET_CITY', value);
    },

    changeCity({ commit }, { id, name }) {
        commit('SET_CITY', id);
        commit('CHANGE_CITY', { id, name });
    }
};

const getters = {
    cityId: state => state.cityId,
    currentCity: state => state.currentCity
};

export default {
    namespaced: true,
    state: states,
    mutations,
    actions,
    getters
};
