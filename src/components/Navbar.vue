<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="link in links">
          <v-list-item
            :key="link.name"
            link
            :to="link.path"
          >
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ link.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <div v-if="user">
          <v-divider class="mt-3"></v-divider>
          <v-list-item
            link
            @click="logout()"
          >
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-xs-block d-sm-none"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <router-link to="/" tag="span" class="hidden-xs-and-down" style="cursor: pointer">
          Takeoff Staff
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        text
        v-for="link of links"
        :key="link.name"
        :to="link.path"
        class="hidden-xs-only hidden-lg-and-up"
      >
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.name }}
      </v-btn>
      <v-divider
        class="ml-4 mr-1 hidden-xs-only hidden-lg-and-up"
        inset
        vertical
        v-if="user"
      ></v-divider>
      <v-btn
        text
        @click="logout()"
        v-if="user"
        class="hidden-xs-only hidden-lg-and-up"
      >
      <v-icon left>mdi-logout</v-icon>
      Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null
  }),
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  computed: {
    user () {
      return this.$store.getters.userId
    },
    links () {
      if (this.user) {
        return [
          { name: 'Contacts', icon: 'mdi-contacts-outline', path: '/' }
        ]
      } else {
        return [
          { name: 'Login', icon: 'mdi-login', path: '/Login' },
          { name: 'Registration', icon: 'mdi-account-check-outline', path: '/registration' }
        ]
      }
    }
  }
}
</script>
