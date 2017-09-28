<template>
  <v-container>
    <v-layout row>
        <v-flex>
            <h1>
                NFL
            </h1>
        </v-flex>
      <v-flex xs3 offset-xs9 mb-2 class="hidden-sm-and-up">
        <add-prediction></add-prediction>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-for="(item, index) in getNFL" :key="item.id" class="mb-2">
                <v-card-title primary-title>
                  <div>
                    <h2 class="mb-0">{{ item.title }} </h2>
                  </div>
                </v-card-title>
                <v-card-text>
                  <h5>Category: {{ item.category }}</h5>
                </v-card-text>
                <v-card-actions>
                </v-card-actions>
        </v-card>
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