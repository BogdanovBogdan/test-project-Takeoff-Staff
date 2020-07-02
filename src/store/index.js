import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Contacts from './contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User, Contacts
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, message) {
      state.error = message
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({ commit }, status) {
      commit('setLoading', status)
    },
    setError ({ commit }, message) {
      commit('setError', message)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
