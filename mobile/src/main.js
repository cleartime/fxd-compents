import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routers from './routers';
import FxdUi from '../../build/';
for(let i of Object.keys(FxdUi).filter((t,i)=>i>1)){
    Vue.component('fxd'+i, FxdUi[i])
}

//引入路由
Vue.use(VueRouter)

const router = new VueRouter(routers);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
