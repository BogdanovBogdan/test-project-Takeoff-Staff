import firebase from 'firebase'

export default {
  state: {
    contacts: []
  },
  mutations: {
    createContact (state, newContact) {
      state.contacts.push(newContact)
    },
    fetchContacts (state, fetchedContacts) {
      state.contacts = fetchedContacts
    }
  },
  actions: {
    async createContact ({ commit }, newContact) {
      commit('clearError')

      try {
        const contact = await firebase.database().ref(`users/${newContact.ownerId}/contacts/`).push({
          name: newContact.name,
          email: newContact.email,
          phone: newContact.phone,
          company: newContact.company
        })
        commit('createContact', { ...newContact, id: contact.key })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },

    async editContact ({ commit, getters }, contact) {
      commit('clearError')

      try {
        await firebase.database().ref(`users/${getters.userId}/contacts/`).child(contact.id).update({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },

    async fetchContacts ({ commit, getters }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const arrContacts = (await firebase.database().ref(`users/${getters.userId}/contacts`).once('value')).val()
        const fetchedContacts = []
        for (const obj in arrContacts) {
          fetchedContacts.push({ ...arrContacts[obj], id: obj })
        }
        commit('fetchContacts', fetchedContacts)
      } catch (error) {
        commit('setError', error.message)
        throw error
      } finally {
        commit('setLoading', false)
      }
    },

    async deleteContact ({ commit, getters }, idContact) {
      commit('clearError')

      try {
        await firebase.database().ref(`users/${getters.userId}/contacts/${idContact}`).remove()
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    contacts (state) {
      return state.contacts
    }
  }
}
