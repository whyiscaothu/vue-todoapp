import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import authenticate from './authenticate-module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoesFromApi: null,
    savingInputTodoWork: false,
    registeredData: null,
    innerBrowserHeight: Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0),
    token: localStorage.getItem('token') || null,
  },
  getters: {
    todoesFromApi: state => {
      if (state.todoesFromApi !== null) return state.todoesFromApi;
      else return null;
    },

    savingInputTodoWork: state => state.savingInputTodoWork,

    innerBrowserHeight: state => state.innerBrowserHeight,
  },
  mutations: {

    getTodoesFromApi(state, todoesFromApi) {
      state.todoesFromApi = todoesFromApi.reverse()
      state.savingInputTodoWork = false;
    },

    savingInputTodoWork(state) {
      state.savingInputTodoWork = true;
    },

    // handleAuthentication(state, processedUserData) {
    //   (processedUserData.statusCode === 200 && processedUserData.statusText === 'OK' && processedUserData.userData === 2) ? state.user.isAuthenticate = true : state.user.isAuthenticate = false;
    // },


  },
  actions: {

    getTodoesFromApi({commit}) {
      let {data} = axios({
        method: 'get',
        url: 'api/works'
      }).then(({data}) => {
          commit('getTodoesFromApi', data.data)
      }).catch(function (err) {
          //
      })
    },

    async saveTodoWork({commit, state}, name) {
      await axios({
        method: 'post',
        url: 'api/works',
        data: {
          name,
          status: 1
        },
      }).then(function (response) {

        return response;
      }).catch(function (err) {
          //
      })
    },

    async deleteTodoWork({commit}, todoWorkId) {
      await axios({
        method: 'delete',
        url: `api/works/${todoWorkId}`
      });
    },

    todoesFromApi({commit}, {data}) {
      commit('todoesFromApi', {data})
    },

  },
  modules: {
    authenticate
  }
})
