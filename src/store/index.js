import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

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
    retrieveToken(state, {email, password}) {
      axios({
        method: 'post',
        url: 'api/login',
        data: {
          email,
          password
        }
      }).then(function ({data}) {
        const token = data.data.token;
        localStorage.setItem('token', token)
        console.log('Done sign in.')
        location.reload();
      }).catch(function (err) {

      })
    },


    register(state, registeredResponse) {
      state.registeredData = registeredResponse;
      router.push({name: 'Login'})
    },


    getTodoesFromApi(state, todoesFromApi) {
      state.todoesFromApi = todoesFromApi.reverse()
    },


    savingInputTodoWork(state) {
      state.savingInputTodoWork = true;
    },

    // handleAuthentication(state, processedUserData) {
    //   (processedUserData.statusCode === 200 && processedUserData.statusText === 'OK' && processedUserData.userData === 2) ? state.user.isAuthenticate = true : state.user.isAuthenticate = false;
    // }


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
        state.savingInputTodoWork = false;
        return response;
      }).catch(function (err) {
          //
      })
    },


    async deleteTodoWork({commit}, id) {
      await axios({
        method: 'delete',
        url: `api/works/${id}`
      });
    },


    todoesFromApi({commit}, {data}) {
      commit('todoesFromApi', {data})
    },


    register({commit}, {name, email, password, c_password}) {
      axios({
        method: 'post',
        url: 'api/register',
        data: {
          name,
          email,
          password,
          c_password
        }
      }).then(function (response) {
        commit('register', response)
      })
    },


    retrieveToken({commit}, {email, password}) {
      commit('retrieveToken', {
        email,
        password
      })
    },


    // async retrieveUserInfo({commit}) {
    //
    //   let user = await axios({
    //     method: 'get',
    //     url: 'api/user'
    //   }).then(function (response) {
    //     return response;
    //   });
    //
    //   let processedUserData = {
    //     statusCode: user.status, //statusCode = 200
    //     statusText: user.statusText, //statusText = 'OK'
    //     userData: [
    //       user.data.name,//name: "user"
    //       user.data.email,//email: "user@mail.com"
    //     ].length
    //   }
    //
    //   commit('handleAuthentication', processedUserData)
    // },


  },
  modules: {
    //
  }
})
