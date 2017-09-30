<template>
    <v-layout>
      <v-flex md8 offset-md2>
        <v-card v-for="(item, index) in categoryList" :key="item.id" class="mb-2">
          <v-layout>
            <v-flex>
              <v-card-title primary-title>
                <h2 class="mb-0">{{ item.title }} </h2>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
            <v-card-text>
              <h5>Category: {{ item.category }}</h5>
            </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
            <v-card-actions>
              <template v-if="isCreator === item.creatorId">
                <v-spacer></v-spacer>
                <app-edit-dialog :item="item"></app-edit-dialog>
                <app-delete-button :itemId="item.id"></app-delete-button>
              </template>
            </v-card-actions>
            </v-flex>
          </v-layout>
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