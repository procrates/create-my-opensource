import GoTrue from 'gotrue-js'
export const auth = new GoTrue({
  APIUrl: 'https://create-my-opensource.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
})
console.log(auth)
export const state = () => ({
  currentUser: null,
})

export const mutations = {
  SET_CURRENT_USER(state, payload) {
    state.currentUser = payload
  },
}

export const getters = {}

export const actions = {
  attemptSignUp({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      auth
        .signup(credentials.email, credentials.password)
        .then((response) => {
          console.log('Confirmation email sent', response)
          commit('TOGGLE_LOAD')
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          console.log("It's an error", error)
        })
    })
  },
  attemptLogin({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      auth
        .login(credentials.email, credentials.password)
        .then((response) => {
          resolve(response)
          commit('SET_CURRENT_USER', response)
        })
        .catch((error) => {
          reject(error.json)
        })
    })
  },
}

export default {
  actions,
  getters,
  mutations,
  state,
}
