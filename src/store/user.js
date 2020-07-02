import firebase from 'firebase'

export default {
  state: {
    userId: null
  },
  mutations: {
    setUser (state, userId) {
      state.userId = userId
    }
  },
  actions: {
    fetchCurrentUser ({ commit }) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            commit('setUser', user.uid)
            resolve(true)
          } else reject(new Error('Login first'))
        })
      })
    },

    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', newUser.user.uid)
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', user.user.uid)
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async logoutUser ({ commit }) {
      commit('clearError')

      try {
        await firebase.auth().signOut()
        commit('setUser', null)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    userId (state) {
      // console.log('user: userId', state.userId, 'type', typeof state.userId)
      return state.userId
    }
  }
}
