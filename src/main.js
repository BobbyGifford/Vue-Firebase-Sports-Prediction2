import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import AddPrediction from './components/predictions/AddPredDialog.vue'
import SignUpDialog from './components/user/SignUpDialog'
import SignInDialog from './components/user/SignInDialog'
import ToEdit from './components/predictions/ToEdit'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('add-prediction', AddPrediction)
Vue.component('app-sign-up-dialog', SignUpDialog)
Vue.component('app-sign-in-dialog', SignInDialog)
Vue.component('app-to-edit', ToEdit)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        console.log('signed in')
      }
    })
    this.$store.dispatch('loadPredictions')
  }
})
