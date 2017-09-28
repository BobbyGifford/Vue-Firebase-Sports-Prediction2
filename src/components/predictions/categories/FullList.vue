<template>
  <v-container>
    <v-layout row>
      <v-flex xs11>
        <h1>
          Full List
        </h1>
      </v-flex>
      <v-flex xs1 class="mt-4 hidden-xs-only">
        <add-prediction></add-prediction></v-flex>
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
                  <h5>Category: {{ item.category }}</h5>
                </v-card-text>
                <v-card-actions>
                  <app-to-edit :item="item"></app-to-edit>
                </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <add-prediction></add-prediction>
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