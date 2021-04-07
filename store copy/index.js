import Vuex from 'vuex'
import auth from './modules/auth'
import app from './modules/app'

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      auth,
      app,
    },
  })
}

export default createStore
