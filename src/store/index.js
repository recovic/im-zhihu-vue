import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      logged: false
  },
  mutations: {
      setLogged(state) {
          state.logged = true;
      }
  },
  actions: {
  },
  modules: {
  }
})
