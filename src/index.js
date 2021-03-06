import Loading from './components/common/loading/';
import Actionsheet from './components/common/actionsheet/actionsheet.vue';
import Alert from './components/common/alert/';
import Toask from './components/common/toask/';
import Button from './components/common/button/button.vue';
import Mask from './components/common/mask/mask.vue';
import Cell from './components/ui/cell/cell.vue';
import Picker from './components/ui/picker/picker.vue';
import CellPicker from './components/ui/cellPicker/cellPicker.vue';
import AddPicker from './components/ui/addPicker/addPicker.vue';
import RadioTip from './components/ui/radioTip/radioTip.vue';
import Header from './components/ui/header/header.vue';
import MobileVerify from './components/feature/mobileVerify/mobileVerify.vue';
import SendCode from './components/feature/sendCode/sendCode.vue';

const install = function(Vue) {
  if (install.installed) return;
  Vue.component(Actionsheet.name, Actionsheet);
    Vue.component(Loading.name, Loading);
  Vue.component(Alert.name, Alert);
    Vue.component(Toask.name, Toask);
    Vue.component(Button.name, Button);
    Vue.component(Mask.name, Mask);
  Vue.component(Cell.name, Cell);
    Vue.component(Picker.name, Picker);
    Vue.component(CellPicker.name, CellPicker);
     Vue.component(AddPicker.name, AddPicker);
  Vue.component(RadioTip.name, RadioTip);
    Vue.component(Header.name, Header);
  Vue.component(MobileVerify.name, MobileVerify);
  Vue.component(SendCode.name, SendCode);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  install,
  version: '1.5.2',
    Actionsheet,
  Loading,
    Alert,
    Toask,
    Button,
    Mask,
    Cell,
    Picker,
    AddPicker,
    CellPicker,
  RadioTip,
    Header,
  MobileVerify,
  SendCode
};
