<template>
  <v-container class="fill-height" fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
      >
        <v-card>
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Login form</v-toolbar-title>
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
                validate-on-blur
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                required
                :rules="[v => !!v || 'Password is required', v => v.length >= 8 || 'Password must be at least 8 characters']"
                validate-on-blur
                class="mt-2"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="loginUser()" :disabled="!valid">Login</v-btn>
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
  methods: {
    loginUser () {
      const user = {
        id: Date.now(),
        login: this.login,
        password: this.password
      }
      console.log('user:', user)
    }
  }
}
</script>

<style scoped>
</style>
