<template>
  <v-dialog height="500px" width="500px" persistent v-model="toggleDialog">
    <v-btn slot="activator"><v-icon left>edit</v-icon>Edit</v-btn>

  <v-card>
    <v-container>
      <v-form @submit.prevent="add">
      <v-layout>
        <v-flex>
          <v-card-title>
            Change Prediction
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
                <label for="category">Change Category</label>
                <v-select
                id="category" 
                v-bind:items="categories"
                v-model="category"
                label="Pick A Category"
                item-value="text"
                single-line
                bottom
                required>
              </v-select>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-card-actions>
                <v-btn class="info" @click="edit">Edit</v-btn>
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
  props: ['item'],
  data () {
    return {
      toggleDialog: false,
      title: this.item.title,
      category: this.item.category,
      categories: [
        { text: 'NFL' },
        { text: 'College Football' }
      ]
    }
  },
  methods: {
    edit () {
      if (this.title.trim() === '' || this.category.trim() === '') {
        return
      }
      const prediction = {
        title: this.title,
        category: this.prediction,
        id: this.item.id,
        agree: 0,
        disagree: 0
      }
      this.$store.dispatch('editPrediction', prediction)
      this.toggleDialog = false
      this.$store.dispatch('loadPredictions')
    }
  }
}
</script>
