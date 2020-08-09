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
function countDownTimer(timeStart, commitFunction, loginMessage, loginStatus) {
    let intervalID = setInterval(() => {
        timeStart--;
        if (timeStart > 0){
            commitFunction(LOGIN, {
                loginMessage,
                loginStatus
            });
            clearInterval(intervalID);
            location.reload();
        }
    }, 1000)
}

export function login({ dispatch, commit, state }, { email, password }) {

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
            countDownTimer(3, commit, loginMessage, false)
        }).catch(function (err) {
            //
        });

}


export function setUserInfoIntoLocalStorage({ commit }, { token, userName }) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('authenticated', '1');
}


export function register({dispatch, commit}, {name, email, password, c_password}) {
    axios.post('api/register',{
        name,
        email,
        password,
        c_password
    }).then(function ({data}) {
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
        countDownTimer(3, commit, loginMessage, false)

    }).catch(function (err) {
        //
    })
}
