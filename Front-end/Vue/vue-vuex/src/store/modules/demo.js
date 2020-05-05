const state = {
    count: 0,
    token: ''
}

const getter = {
    getCount (state, getter, rootState) { return state.count },
    getToken (state) { return state.token }
}

const mutation = {
    setCount(state) { state.count++ },
    setToken(state, value) { state.token = value }
}

const action = {
    setCount({ state, commit }) {
        commit('setCount')
    },
    setToken({ state, commit }, payload) {
        commit('setToken', payload)
    }
}

export default {
    namespaced: true,
    state,
    getter,
    action,
    mutation
}