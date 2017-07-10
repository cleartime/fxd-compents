import {bus} from './until/evenbus'

module.exports = {
    bus,
    alert : require('./components/common/alert/alert.vue'),
    loading : require('./components/common/loading/loading.vue'),
    input : require('./components/ui/textInput/textInput.vue'),
    radioTip : require('./components/ui/radioTip/radioTip.vue'),
    mobileVerify: require('./components/feature/mobileVerify/mobileVerify.vue'),
}
