import * as firebase from 'firebase'

export default {
  state: {
    predictions: [],
    nfl: [],
    collegeFootball: []
  },
  mutations: {
    setPredictionList (state, payload) {
      state.predictions = payload
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
    deletePrediction ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('predictionList').child(payload).remove()
      .then(data => commit('setLoading', false))
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
    getNFL (state) {
      return state.nfl
    },
    getCollegeFootball (state) {
      return state.collegeFootball
    }
  }
}
