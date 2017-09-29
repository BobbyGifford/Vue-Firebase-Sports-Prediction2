<template>
  <v-container>
    <v-layout row wrap>
        <v-flex text-xs-center>
          <h1 class="ma-0">NFL</h1>
          <app-add-here class="mb-2" :category="'NFL'"></app-add-here>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <app-list :categoryList="getNFL"></app-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    getNFL () {
      return this.$store.getters.getNFL
    }
  }
}
</script>