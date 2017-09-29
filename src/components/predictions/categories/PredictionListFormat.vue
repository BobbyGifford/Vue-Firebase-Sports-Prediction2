<template>
    <v-layout>
      <v-flex>
        <v-card v-for="(item, index) in categoryList" :key="item.id" class="mb-2">
          <v-card-title primary-title>
            <h2 class="mb-0">{{ item.title }} </h2>
          </v-card-title>
          <v-card-text>
            <h5>Category: {{ item.category }}</h5>
          </v-card-text>
          <v-card-actions>
            <template v-if="isCreator === item.creatorId">
            <app-edit-dialog :item="item"></app-edit-dialog>
            </template>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: ['categoryList'],
  computed: {
    isUser () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    },
    isCreator () {
      if (!this.isUser) {
        return false
      }
      return this.$store.getters.getUser.id
    }
  }
}
</script>