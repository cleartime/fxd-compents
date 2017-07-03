<template>
  <div>
    <!--<alert :msg="msg"></alert>-->
    <!--<toask :msg='msg'></toask>-->
    <!--<fmask/>-->
    <!--<actionsheet></actionsheet>-->
    <textInput :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="message"></textInput>
  </div>
</template>

<style lang="scss">

@import './lib/reset.css';
@import 'lib/config';
</style>

<script>
import actionsheet from './components/common/actionsheet/actionsheet.vue'
import fmask from './components/common/mask/mask.vue'
import alert from './components/common/alert/alert.vue'
import toask from './components/common/toask/toask.vue'
import swiper from './components/ui/swiper/swiper.vue'
import textInput from './components/ui/textInput/textInput.vue'

  export default {
    name: 'app',
    data() {
      return {
          msg:'确定要退出么',
          icon:require('./public/img/test.png'),
          placeholder:'请输入电话号码',
          type:'number',
          message:'322'
      }
    },
    components: {
      alert,
      toask,
      fmask,
      actionsheet,
        swiper,
        textInput
    },
    mounted() {

    },
    methods: {
    }
  }
</script>

