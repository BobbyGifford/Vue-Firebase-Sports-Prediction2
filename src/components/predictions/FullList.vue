<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md10 offset-md1 mb-2>
        <add-prediction></add-prediction>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 md10 offset-md1>
        <v-card v-for="(item, index) in getPredictionList" :key="item.id" class="mb-2">
          <v-container fluid>
            <v-layout row>
              <v-flex xs7 md9>
                <v-card-title primary-title>
                    <div>
                        <h5 class="mb-0">{{ item.title }} </h5>
                    </div>
                </v-card-title>
                <v-card-text v-if="item.description !== null">
                  {{ item.description }}
                </v-card-text>
                <v-card-actions>
                    <v-btn class="success ml-2" :to="'/predictionItem/' + item.id">
                        View Item
                    </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
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