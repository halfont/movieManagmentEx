import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import timeline from '@/store/timeline';

Vue.use(Vuex);


const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    timeline,
  },
});

export default store;
