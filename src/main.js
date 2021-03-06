import Vue from 'vue';
import App from '@/containers';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import "./filter/case.filter";
import "./mixin";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
