import Vue from 'vue'
import Vuex from 'vuex'

import predictions from './predictions'
import user from './user'
import errorLoading from './error-loading'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    predictions: predictions,
    user: user,
    errorLoading: errorLoading
  }
})
