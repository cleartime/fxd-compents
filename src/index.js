import Loading from './components/common/loading/';
import Alert from './components/common/alert/';
import Toask from './components/common/toask/';
import Button from './components/common/button/button.vue';
import Mask from './components/common/mask/mask.vue';
import Cell from './components/ui/cell/cell.vue';
import RadioTip from './components/ui/radioTip/radioTip.vue';
import MobileVerify from './components/feature/mobileVerify1/mobileVerify.vue';


const install = function(Vue) {
  if (install.installed) return;
  Vue.component(Loading.name, Loading);
  Vue.component(Alert.name, Alert);
    Vue.component(Toask.name, Toask);
    Vue.component(Button.name, Button);
    Vue.component(Mask.name, Mask);
  Vue.component(Cell.name, Cell);
  Vue.component(RadioTip.name, RadioTip);
  Vue.component(MobileVerify.name, MobileVerify);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  install,
  version: '1.0.0',
  Loading,
    Alert,
    Toask,
    Button,
    Mask,
    Cell,
  RadioTip,
  MobileVerify
};
