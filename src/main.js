import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import AddPrediction from './components/buttons_dialogs/AddPredDialog.vue'
import SignUpDialog from './components/user/SignUpDialog'
import SignInDialog from './components/user/SignInDialog'
import ListFormat from './components/predictions/categories/PredictionListFormat'
import EditDialog from './components/buttons_dialogs/EditDialog'
import AddHere from './components/buttons_dialogs/AddHere'
import DeleteButton from './components/buttons_dialogs/DeleteButton'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('add-prediction', AddPrediction)
Vue.component('app-sign-up-dialog', SignUpDialog)
Vue.component('app-sign-in-dialog', SignInDialog)
Vue.component('app-edit-dialog', EditDialog)
Vue.component('app-list', ListFormat)
Vue.component('app-add-here', AddHere)
Vue.component('app-delete-button', DeleteButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyChjXWktAmXsdb718imZY_bXFy6fRGlDy4',
      databaseURL: 'https://sportspredgifford1.firebaseio.com',
      projectId: 'sportspredgifford1',
      storageBucket: 'sportspredgifford1.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('loadPredictions')
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
  updated () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('loadPredictions')
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
