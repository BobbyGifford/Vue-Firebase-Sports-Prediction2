<template>
  <v-layout>
    <v-flex>
      <div v-if="creator">
      <v-btn @click="toEdit">Edit</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  props: ['item'],
  computed: {
    isUser () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    },
    creator () {
      if (!this.isUser) {
        return false
      }
      return this.$store.getters.getUser.id === this.item.creatorId
    }
  },
  methods: {
    toEdit () {
      this.$router.push('/edit')
    }
  }
}
</script>