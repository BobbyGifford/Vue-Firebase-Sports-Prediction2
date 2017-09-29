<template>
  <v-container>
    <v-layout row wrap>
      <v-flex text-xs-center>
        <h1 class="ma-3">College Football</h1>
        <app-add-here class="mb-2" :category="'College Football'"></app-add-here>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <app-list :categoryList="getCollegeFootball"></app-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    getCollegeFootball () {
      return this.$store.getters.getCollegeFootball
    }
  }
}
</script>