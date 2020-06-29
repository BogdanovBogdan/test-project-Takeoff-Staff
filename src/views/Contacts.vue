<template>
  <v-data-table
    :headers="headers"
    :items="contacts"
    :search="search"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
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
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
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
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
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
      contacts: [
        {
          name: 'Jhon',
          email: 'Jhon@gmail.com',
          phone: '+133-453-54-23',
          company: 'apple'
        },
        {
          name: 'Jhon',
          email: 'Jhon@gmail.com',
          phone: '+133-453-54-23',
          company: 'apple'
        },
        {
          name: 'Jhon',
          email: 'Jhon@gmail.com',
          phone: '+133-453-54-23',
          company: 'apple'
        },
        {
          name: 'Elsa Jean',
          email: 'ElsaJean@gmail.com',
          phone: '+321-555-54-23',
          company: 'Brazzers'
        },
        {
          name: 'Jhon',
          email: 'Jhon@gmail.com',
          phone: '+133-453-54-23',
          company: 'apple'
        },
        {
          name: 'Elsa Jean',
          email: 'ElsaJean@gmail.com',
          phone: '+321-555-54-23',
          company: 'Brazzers'
        }
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
  methods: {
    editItem (item) {
      this.editedIndex = this.contacts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.contacts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.contacts.splice(index, 1)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.contacts[this.editedIndex], this.editedItem)
      } else {
        this.contacts.push(this.editedItem)
      }
      this.close()
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex !== -1 ? 'Edit contact' : 'Create contact'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>

<style>

</style>
