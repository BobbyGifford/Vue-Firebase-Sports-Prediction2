import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import AddPrediction from './components/predictions/AddPredDialog.vue'
import SignUpDialog from './components/user/SignUpDialog'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('add-prediction', AddPrediction)
Vue.component('app-sign-up-dialog', SignUpDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  }
})