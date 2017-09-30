<template>
  <v-dialog height="500px" width="500px" persistent v-model="toggleDialog">
    <v-btn slot="activator">
      <v-icon left>add</v-icon>
      Add {{ this.category }}
    </v-btn>
  <v-card>
    <v-container>
      <v-form @submit.prevent="add">
      <v-layout>
        <v-flex>
          <v-card-title>
            Make A Prediction
          </v-card-title>
          <v-layout>
            <v-flex>
              <v-card-text>
                <v-text-field
                name="title"
                id="title"
                label="Prediction"
                v-model="title"
                required>
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-card-actions>
                <v-btn class="info" :disabled="!isValid" @click="add">Add</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="toggleDialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      </v-form>
    </v-container>
  </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['category'],
  data () {
    return {
      toggleDialog: false,
      title: ''
    }
  },
  computed: {
    isValid () {
      return this.title !== ''
    }
  },
  methods: {
    add () {
      if (this.title.trim() === '') {
        return
      }
      const newPrediction = {
        title: this.title,
        category: this.category,
        agree: 0,
        disagree: 0
      }
      this.$store.dispatch('createPrediction', newPrediction)
      this.toggleDialog = false
      this.$store.dispatch('loadPredictions')
    }
  }
}
</script>
