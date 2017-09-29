import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    username: null,
    predictions: [
      // {
      //   title: 'Example A Title',
      //   description: 'Example A body',
      //   id: 'idOfItem',
      //   creatorId: 'newCreator',
      //   voted: false,
      //   agree: 0,
      //   disagree: 0
      // }
    ],
    nfl: [],
    collegeFootball: [],
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
    setLoading (state, payload) {
      state.loading = payload
    },
    createPrediction (state, payload) {
      state.predictions.push(payload)
    },
    editPrediction (state, payload) {
      const editItem = state.predictions.find(item => {
        return item.id === payload.id
      })
      if (payload.title) {
        editItem.title = payload.title
      }
      if (payload.category) {
        editItem.category = payload.category
      }
    },
    setNFL (state, payload) {
      state.nfl = payload
    },
    setCollegeFootball (state, payload) {
      state.collegeFootball = payload
    },
    addNFL (state, payload) {
      state.nfl.push(payload)
    },
    addCollegeFootball (state, payload) {
      state.collegeFootball.push(payload)
    },
    addPrediction (state, payload) {
      state.predictions.push(payload)
    }
  },
  actions: {
    createPrediction ({commit, getters}, payload) {
      const newPrediction = {
        title: payload.title,
        creatorId: getters.getUser.id,
        category: payload.category,
        agree: payload.agree,
        disagree: payload.disagree
      }
      if (payload.category === 'NFL') {
        commit('addNFL', newPrediction)
      }
      if (payload.category === 'College Football') {
        commit('addCollegeFootball', newPrediction)
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
              id: user.uid,
              userVoteInfo: []
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
            id: user.uid,
            userVoteInfo: []
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
    loadPredictions ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('predictionList').once('value')
      .then((data) => {
        const list = []
        const nfl = []
        const college = []
        const obj = data.val()
        for (let key in obj) {
          if (obj[key].category === 'NFL') {
            nfl.push({
              id: key,
              title: obj[key].title,
              creatorId: obj[key].creatorId,
              category: obj[key].category,
              agree: obj[key].agree,
              disagree: obj[key].disagree
            })
          }
          if (obj[key].category === 'College Football') {
            college.push({
              id: key,
              title: obj[key].title,
              creatorId: obj[key].creatorId,
              category: obj[key].category,
              agree: obj[key].agree,
              disagree: obj[key].disagree
            })
          }
          list.push({
            id: key,
            title: obj[key].title,
            creatorId: obj[key].creatorId,
            category: obj[key].category,
            agree: obj[key].agree,
            disagree: obj[key].disagree
          })
        }
        commit('setLoading', true)
        commit('setPredictionList', list)
        commit('setNFL', nfl)
        commit('setCollegeFootball', college)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    editPrediction ({commit}, payload) {
      commit('setLoading', true)
      const object = {}
      if (payload.title) {
        object.title = payload.title
      }
      if (payload.category) {
        object.category = payload.category
      }
      firebase.database().ref('predictionList').child(payload.id).update(object)
      .then((data) => {
        commit('setLoading', false)
        commit('editPrediction', payload)
      })
      .catch(error => console.log(error))
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
    },
    getNFL (state) {
      return state.nfl
    },
    getCollegeFootball (state) {
      return state.collegeFootball
    }
  }
})
