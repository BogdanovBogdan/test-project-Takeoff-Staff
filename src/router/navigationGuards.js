import store from '../store'

export default async function (to, from, next) {
  try {
    await store.dispatch('fetchCurrentUser')
    next()
  } catch (error) {
    next('/login')
    store.commit('setError', error.message)
  }
}
