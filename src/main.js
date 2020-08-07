import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import vueScroll from 'vuescroll';

Vue.use(vueScroll, {
  ops: {
    // The global config
  },
  name: 'vueScroll' // customize component name, default -> vueScroll
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
