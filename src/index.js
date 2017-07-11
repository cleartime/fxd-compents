import {bus} from './until/evenbus'
// //

//  module.exports = {
//     bus,
//     loading : require('./components/common/loading/loading.vue'),
//     input : require('./components/ui/cell/cell.vue'),
//     radioTip : require('./components/ui/radioTip/radioTip.vue'),
//     mobileVerify: require('./components/feature/mobileVerify/mobileVerify.vue'),
// }

// module.exports = {
//     'abc':'abc'
// }

// 正确
// const a = 1;
// export default a;

import Loading from './components/common/loading/loading.vue';
import Input from './components/ui/cell/cell.vue';
import RadioTip from './components/ui/radioTip/radioTip.vue';
import MobileVerify from './components/feature/mobileVerify/mobileVerify.vue';


const install = function(Vue) {
  if (install.installed) return;

  Vue.component(Loading.name, Loading);
  Vue.component(Input.name, Input);
  Vue.component(RadioTip.name, RadioTip);
  Vue.component(MobileVerify.name, MobileVerify);

  // Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  // Vue.$toast = Vue.prototype.$toast = Toast;
  // Vue.$indicator = Vue.prototype.$indicator = Indicator;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
	bus,
  install,
  version: '2.0.5',
  Loading,
  Input,
  RadioTip,
  MobileVerify
};
