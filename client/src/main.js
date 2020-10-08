import Vue from 'vue';
import './plugins/axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './store';
import App from './App.vue';
import router from './router';


Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
