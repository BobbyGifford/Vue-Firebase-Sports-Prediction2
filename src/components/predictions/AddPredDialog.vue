<template>
  <v-dialog height="500px" width="500px" persistent v-model="toggleDialog">
    <v-btn fab slot="activator">
      <v-icon>add</v-icon>
    </v-btn>

  <v-card>
    <v-container>
      <v-form @submit.prevent="add">
      <v-layout row>
        <v-flex 12>
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
                <v-text-field
                name="description"
                id="description"
                label="Description (optional)"
                v-model="description">
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
  props: ['prediction'],
  data () {
    return {
      toggleDialog: false,
      title: '',
      description: ''
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
      if (this.description.trim() === '') {
        this.description = null
      }
      const newPrediction = {
        title: this.title,
        description: this.description
      }
      this.$store.dispatch('createPrediction', newPrediction)
      this.toggleDialog = false
      this.$router.push('/predictionList')
    }
  }
}
</script>
