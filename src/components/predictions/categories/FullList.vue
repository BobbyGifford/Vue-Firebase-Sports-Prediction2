<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center>
        <h1 class="ma-0">Full List</h1>
        <add-prediction class="mb-2 "></add-prediction>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <app-list :categoryList="getPredictionList"></app-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    getPredictionList () {
      return this.$store.getters.getPredictions
    }
  }
}
</script>