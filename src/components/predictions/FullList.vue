<template>
  <v-container>
    <v-layout row>
      <v-flex xs3 offset-xs9 mb-2 class="hidden-sm-and-up">
        <add-prediction></add-prediction>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-for="(item, index) in getPredictionList" :key="item.id" class="mb-2">
                <v-card-title primary-title>
                  <div>
                    <h2 class="mb-0">{{ item.title }} </h2>
                  </div>
                </v-card-title>
                <v-card-text>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="changeVote(index, 1)"><v-icon>thumb_up</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn><v-icon>thumbs_up_down</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn><v-icon>thumb_down</v-icon></v-btn>
                  <!-- <v-btn class="success ml-2" :to="'/predictionItem/' + item.id">
                    Vote
                  </v-btn> -->
                </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    changeVote (index, vote) {
      console.log('Index of Item: ' + index)
      console.log('Vote: ' + vote)
    }
  },
  computed: {
    getPredictionList () {
      return this.$store.getters.getPredictions
    }
  }
}
</script>