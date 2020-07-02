<template>
  <v-container class="fill-height" fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card>
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Regestration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
                required
                :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Invalid e-mail']"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                required
                counter
                :rules="[v => !!v || 'Password is required', v => v.length >= 6 || 'Password must be at least 8 characters']"
                class="mt-2"
              ></v-text-field>

              <v-text-field
                id="password2"
                label="Password again"
                name="password2"
                prepend-icon="mdi-lock"
                type="password"
                required
                counter
                :rules="[v => v == password || 'Passwords don\'t match']"
                class="mt-2"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="registerUser()"
              :disabled="!valid"
              :loading="loading"
            >Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      email: '',
      password: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    registerUser () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('registerUser', user)
        .then(() => this.$router.push('/'))
    }
  }
}
</script>

<style scoped>
</style>
