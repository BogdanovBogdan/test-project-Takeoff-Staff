import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyBmqrR5dI46zwXkWsLGDiCQPwBrH1fKNTw',
  authDomain: 'takeoff-staff-test-project.firebaseapp.com',
  databaseURL: 'https://takeoff-staff-test-project.firebaseio.com',
  projectId: 'takeoff-staff-test-project',
  storageBucket: 'takeoff-staff-test-project.appspot.com',
  messagingSenderId: '538901301927',
  appId: '1:538901301927:web:2be3ed75ef334e05e92982'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: function (h) { return h(App) },
      created () {
        this.$store.dispatch('fetchCurrentUser')
      }
    }).$mount('#app')
  }
})
