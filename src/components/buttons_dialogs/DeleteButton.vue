<template>
  <v-layout>
    <v-flex>
      <v-btn @click="removePrediction"><v-icon left>delete</v-icon>Delete</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['itemId'],
    methods: {
      removePrediction () {
        console.log(this.itemId)
        this.$store.dispatch('deletePrediction', this.itemId)
        this.$store.dispatch('loadPredictions')
      }
    }
  }
</script>