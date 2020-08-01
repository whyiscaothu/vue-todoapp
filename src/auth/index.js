import bearer from '@websanova/vue-auth/drivers/auth/bearer';
import axios from '../plugins/axios';
import router from '../router';

const config = {
    auth: bearer,
    http: axios,
    router: router,
    tokenDefaultName: 'auth-token',
    tokenStore: ['cookie'],
    notFoundRedirect: {
        name: 'Home'
    },
    registerData: {
        url: 'register',
        method: 'POST',
        redirect: null,
    },
    loginData: {
        url: 'login',
        method: 'POST',
        redirect: '/',
        fetchUser: true,
    },
    logoutData: {
        url: 'logout',
        method: 'POST',
        redirect: '/login',
        makeRequest: true
    },
    fetchData: {
        url: 'user',
        method: 'GET',
        enabled: true
    },
    parseUserData (data) {
        return data || {}
    },
};

export default config;