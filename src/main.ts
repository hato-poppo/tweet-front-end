import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api'; // NOTE: 追加 App.vue よりも先にimportしないと `@vue/composition-api` import should occur before import of `./App.vue` が発生する
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(VueCompositionApi); // NOTE: 追加
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
