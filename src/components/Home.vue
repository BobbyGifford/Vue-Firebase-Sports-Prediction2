<template>
  <v-container text-xs-center>
    <v-layout row>
      <v-flex xs12 v-if="isUser">
        <h1>Create a prediction</h1>
      </v-flex>
      <v-flex xs12 v-else> 
        <h1>Sign In or</h1>
        <h1>Sign Up</h1>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!isUser">
      <v-flex xs12>
        <app-sign-up-dialog></app-sign-up-dialog>
        <app-sign-in-dialog></app-sign-in-dialog>
      </v-flex>
    </v-layout>
    <v-layout v-if="isUser">
      <v-flex>
        <add-prediction></add-prediction>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    isUser () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    }
  }
}
</script>