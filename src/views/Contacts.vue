<template>
  <div v-if="!loading">
    <v-data-table
      :headers="headers"
      :items="contacts"
      :search="search"
      sort-by="name"
      disable-pagination
      hide-default-footer
      class="elevation-1 pt-3"
    >
      <template v-slot:top >
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >New contact</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        :rules="[v => !!v || 'Required field']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="editedItem.company" label="Company"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save" :disabled='!editedItem.name'>Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
  <div v-else style="height: 100%; display: flex; align-items: center; justify-content: center;">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      search: '',
      headers: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Company', value: 'company' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        phone: '',
        company: ''
      },
      defaultItem: {
        name: '',
        email: '',
        phone: '',
        company: ''
      }
    }
  },
  computed: {
    contacts () {
      return this.$store.getters.contacts
    },
    formTitle () {
      return this.editedIndex !== -1 ? 'Edit contact' : 'Create contact'
    },
    userId () {
      return this.$store.getters.userId
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.contacts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.$store.dispatch('deleteContact', item.id)
          .then(() => {
            const idx = this.contacts.indexOf(item)
            this.contacts.splice(idx, 1)
          })
      }
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      const contact = { ...this.editedItem, ownerId: this.userId }

      if (this.editedIndex > -1) {
        const idx = this.editedIndex

        this.$store.dispatch('editContact', contact)
          .then(() => {
            Object.assign(this.contacts[idx], contact)
          })
      } else {
        this.$store.dispatch('createContact', contact)
      }
      this.close()
    }
  },
  created () {
    this.$store.dispatch('fetchContacts')
  }
}
</script>

<style>

</style>
