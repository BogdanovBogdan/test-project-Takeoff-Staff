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

        <v-divider></v-divider>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <router-link to="/" tag="span" class="hidden-sm-and-down" style="cursor: pointer">
          Takeoff Staff
        </router-link>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <v-spacer></v-spacer>

      <v-btn
        text
        v-for="link of links"
        :key="link.name"
        :to="link.path">
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.name }}
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
    drawer: null,
    links: [
      { name: 'Login', icon: 'mdi-login', path: '/' },
      { name: 'Registration', icon: 'mdi-account-check-outline', path: '/registration' },
      { name: 'Contacts', icon: 'mdi-contacts-outline', path: '/contacts' }
    ]
  })
}
</script>
