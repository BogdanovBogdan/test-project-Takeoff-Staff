<template>
  <v-app id="inspire">
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
      <v-btn absolute bottom icon color="primary" @click="getUserId">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-snackbar
        bottom
        color="error"
        timeout="6000"
        :value="error"
      >
        Error: {{ error }}

        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click="clearError()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  computed: {
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    getUserId () {
      console.log(this.$store.getters.userId)
    },
    clearError () {
      this.$store.dispatch('clearError')
    }
  },
  components: {
    Navbar
  }
}
</script>
