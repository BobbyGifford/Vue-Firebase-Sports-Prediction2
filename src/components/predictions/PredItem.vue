<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12>
              <v-card>
                  <v-card-title>
                      <h3>{{ individualPrediction.title }}</h3>
                  </v-card-title>
                  <v-card-text>
                      {{ individualPrediction.description }}
                  </v-card-text>
                  <v-card-actions>
                      <v-btn class="info">Agree</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn class="warning">Reset Vote</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn class="error">Disagree</v-btn>
                  </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    individualPrediction () {
      return this.$store.getters.getPrediction(this.id)
    }
  }
}
</script>