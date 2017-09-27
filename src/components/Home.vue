<template>
  <v-container class="text-xs-center">
    <v-layout row>
      <v-flex xs12>
        <h1>Predictions</h1>
        <h2 v-if="isUser">Signed In</h2>
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