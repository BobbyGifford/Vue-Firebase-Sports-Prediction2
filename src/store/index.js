import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    predictions: [
      {
        title: 'Example A Title',
        description: 'Example A body',
        id: 'idOfItem',
        creatorId: 'newCreator',
        voted: null
      },
      {
        title: 'Example B Title',
        description: null,
        id: 'idOfItem2',
        creatorId: 'newCreator',
        voted: null
      }
    ],
    user: null,
    loading: null,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    createPrediction (state, payload) {
      state.predictions.push(payload)
    }
  },
  actions: {
    createPrediction ({commit, getters}, payload) {
      const newPrediction = {
        title: payload.title,
        description: payload.description,
        creatorId: getters.getUser.id,
        voted: null,
        id: 'a1'
      }
      commit('createPrediction', newPrediction)
    },
    createUser ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.id})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      console.log(this.user)
    }
  },
  getters: {
    getPredictions (state) {
      return state.predictions
    },
    getPrediction (state) {
      return (predictionId) => {
        return state.predictions.find((matchPrediction) => {
          return matchPrediction.id === predictionId
        })
      }
    },
    getUser (state) {
      return state.user
    },
    getLoading (state) {
      return state.loading
    },
    getError (state) {
      return state.error
    }
  }
})
