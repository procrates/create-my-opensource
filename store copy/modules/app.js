export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      isDevEnvironment: false,
      siteURL: null,
    }
  },

  getters: {
    isDevEnvironment: (state) => state.isDevEnvironment,
    siteURL: (state) => state.siteURL,
  },

  mutations: {
    SET_DEV_ENV(state, value) {
      state.isDevEnvironment = value
    },
    SET_SITE_URL(state, value) {
      state.siteURL = value
    },
  },
  actions: {
    setDevEnv({ commit }) {
      if (process.env.NODE_ENV === 'development') {
        const value = true
        commit('SET_DEV_ENV', value)
      } else {
        const value = false
        commit('SET_DEV_ENV', value)
      }
      console.log(process.env.NODE_ENV)
    },
    setSiteUrl({ commit }, payload) {
      commit('SET_SITE_URL', payload)
    },
  },
}
