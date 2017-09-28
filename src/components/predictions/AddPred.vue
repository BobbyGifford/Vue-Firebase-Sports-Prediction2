<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h1>Make a Prediction</h1>
      </v-flex>
    </v-layout>
    <v-form @submit.prevent="add">
      <v-layout>
        <v-flex>
          <v-text-field
            name="title"
            id="title"
            label="Prediction"
            v-model="title"
            required>
          </v-text-field>
          <v-select 
            v-bind:items="categories"
            v-model="category"
            label="Pick A Category"
            item-value="text"
            single-line
            bottom
            required>
          </v-select>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-btn class="info" :disabled="!isValid" @click="add">Add</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: ['prediction'],
  data () {
    return {
      title: '',
      category: null,
      categories: [
        { text: 'NFL' },
        { text: 'College Football' }
      ]
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
      this.$router.push('/')
    }
  }
}
</script>
