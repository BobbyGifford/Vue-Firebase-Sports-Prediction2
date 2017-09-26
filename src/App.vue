<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      dark
      enable-resize-watcher
      temporary
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"> <v-icon left class="mr-2">home</v-icon>Bold Predictions</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only pb-1 pt-1">
        <v-btn class="ml-1" fluid v-for="item in navItems" :key="item.title"
        router 
        :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
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
        drawer: false,
        navItems: [
          { icon: 'code', title: 'List', link: '/predictionList' }
        ]
      }
    }
  }
</script>
