import {
    LOGIN,
} from './mutation-types';
import router from "@/router";

export default {
    // /**
    // *
    // * @param { AuthenticateModuleState } state
    // * @param { string } data
    // */
    // [SET_DATA](state, { data }) {
    //     state.data = data;
    // },


    [LOGIN](state, {loginMessage = null, loginStatus = null}) {
        state.loginMessage = loginMessage;
        state.loginStatus = loginStatus
    },
};
