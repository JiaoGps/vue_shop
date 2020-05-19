import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
const path = require("path");
import Vant,{Lazyload}  from 'vant';
import 'vant/lib/index.css';


Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
