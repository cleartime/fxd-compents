import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routers from './routers';

//引入路由
Vue.use(VueRouter)

const router = new VueRouter(routers);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
