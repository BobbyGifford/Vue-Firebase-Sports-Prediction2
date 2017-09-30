export default {
  state: {
    loading: null,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {},
  getters: {
    getLoading (state) {
      return state.loading
    },
    getError (state) {
      return state.error
    }
  }
}
