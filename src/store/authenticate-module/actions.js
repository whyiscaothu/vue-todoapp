import {
    LOGIN,
} from './mutation-types';
import router from 'vue-router'

// /**
// *
// * @param { function } commit
// * @param { string } data
// */
// export function setData({ commit }, { data }) {
//     commit(SET_DATA, { data });
// }


export function login({ dispatch, commit, state }, { email, password }) {
    let loginStatus = false
    let start = 0;
    let end = 3;
    let intervalID;

    axios
        .post('api/login', {
            email,
            password
        })
        .then(function ({data}) {
            const loginMessage = data.message;
            const token = data.data.token;
            const userName = data.data.name;
            dispatch('setUserInfoIntoLocalStorage', {
                token,
                userName
            });
            commit(LOGIN, {
                loginMessage,
                loginStatus: true
            });
            // code open modal when login success ò fail here.

            intervalID = setInterval(() => {
                start++;
                console.log(start)
                if (start === end){
                    commit(LOGIN, {
                        loginMessage,
                        loginStatus
                    });
                    clearInterval(intervalID);
                    location.reload();
                }
            }, 1000)


        }).catch(function (err) {
            //
        });

}


export function setUserInfoIntoLocalStorage({ commit }, { token, userName }) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('authenticated', '1');
}
