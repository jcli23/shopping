import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from "./http/api";
import city from "./http/city";
import FastClick from 'fastclick'
import Vant from 'vant';
import 'vant/lib/index.css';
import dayjs from 'dayjs'

Vue.config.productionTip = false;
FastClick.attach(document.body);
Vue.prototype.$api=api;
Vue.prototype.$dayjs = dayjs
Vue.prototype.$city=city;

Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
