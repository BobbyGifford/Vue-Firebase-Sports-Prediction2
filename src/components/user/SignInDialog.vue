<template>
  <v-dialog height="500px" width="500px" persistent v-model="toggleDialog">
    <v-btn slot="activator">
      <v-icon left>verified_user</v-icon>
      Sign In
    </v-btn>
    <v-card>
      <v-container>
      <v-form @submit.prevent="signInUser">
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h4>Sign In</h4>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>

            <v-text-field
              name="email"
              label="Enter email"
              id="email"
              v-model="email"
              type="email"
              required></v-text-field>

            <v-text-field
              name="password"
              label="Create new password"
              id="password"
              v-model="password"
              type="password"
              required></v-text-field>

            </v-card-text>
          </v-flex>
        </v-layout>
        
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-btn type="submit">Sign In</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="toggleDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      toggleDialog: false,
      email: '',
      password: ''
    }
  },
  methods: {
    signInUser () {
      this.toggleDialog = false
      this.$store.dispatch('signIn', {email: this.email, password: this.password})
      this.$store.dispatch('loadPredictions')
      this.$forceUpdate()
    }
  }
}
</script>