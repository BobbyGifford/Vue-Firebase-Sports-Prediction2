<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      dark
      enable-resize-watcher
      temporary
      v-if="isUser"
    >
      <v-list dense>
        <v-list-tile 
        v-for="item in navItems" :key="item.title"
        router 
        :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action @click="logout">
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"> <v-icon left class="ml-2">home</v-icon></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only pb-1 pt-1">
        <v-btn class="ml-1" fluid v-for="item in navItems" :key="item.title"
        router 
        :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
          </v-btn>
          <v-btn @click="logout" v-if="isUser">
            <v-icon left datk>exit_to_app</v-icon>
            Logout
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      navItems () {
        let navItems = null
        if (this.isUser) {
          navItems = [
            { icon: 'filter_3', title: 'NCAAF', link: '/college' },
            { icon: 'filter_2', title: 'NFL', link: '/NFL' },
            { icon: 'filter_1', title: 'All', link: '/predictionList' },
            { icon: 'add', title: 'Add', link: '/addPrediction' }
          ]
        }
        return navItems
      },
      isUser () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
