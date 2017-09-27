import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    username: null,
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
    setPredictionList (state, payload) {
      state.predictions = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setUsername (state, payload) {
      state.user.username = payload
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
        voted: 0
      }
      let key
      firebase.database().ref('predictionList').push(newPrediction)
      .then((data) => {
        key = data.key
        return key
      })
      .then(() => {
        commit('createPrediction', {...newPrediction, id: key})
      })
      .catch(error => {
        console.log(error)
      })
    },
    createUser ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          },
        )
        .catch(
          error => {
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    signIn ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const returningUser = {
            id: user.uid
          }
          commit('setUser', returningUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', true)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid})
    },
    loadPredictions ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('predictionList').once('value')
      .then((data) => {
        const list = []
        const obj = data.val()
        for (let key in obj) {
          list.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            creatorId: obj[key].creatorId,
            voted: obj[key].voted
          })
        }
        commit('setPredictionList', list)
        commit('setLoading', true)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
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
