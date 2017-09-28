<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12>
              <v-card>
                  <v-card-title class="ma-0">
                      <h3>{{ individualPrediction.title }}</h3>
                  </v-card-title>
                  <v-card-text class="ma-0">
                      <div v-if="individualPrediction.description !== null">{{ individualPrediction.description }}</div>
                  </v-card-text>
                  <v-card-actions>
                  <v-btn class="ma-0"><v-icon>thumb_up</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-0"><v-icon>thumbs_up_down</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-0"><v-icon>thumb_down</v-icon></v-btn>
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
    },
    isUser () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    },
    isCreator () {
      if (!this.isUser) {
        return false
      }
      return this.$store.getters.getUser.id === this.individualPrediction.creatorId
    }
  }
}
</script>