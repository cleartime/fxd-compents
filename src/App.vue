<template>
  <div>
    <!--<alert :msg="msg"></alert>-->
    <!--<toask :msg='msg'></toask>-->
    <!--<fmask/>-->
    <!--<actionsheet></actionsheet>-->
    <!--<textInput :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message" @text_input_cb="val=>{item.message=val}"></textInput>-->
    <!--<textInput :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message2" @text_input_cb="val=>{item.message2=val}"></textInput>-->
    <loading></loading>
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
import loading from './components/common/loading/loading.vue'

import swiper from './components/ui/swiper/swiper.vue'
import textInput from './components/ui/textInput/textInput.vue'
import radioTip from './components/ui/radioTip/radioTip.vue'
  export default {
    name: 'app',
    data() {
      return {
          msg:'确定要退出么',
          icon:require('./public/img/test.png'),
          placeholder:'请输入电话号码',
          type:'number',
          item:{
              message:'322',
              message2:'222'
          },
      }
    },
    components: {
        alert,
        toask,
        fmask,
        actionsheet,
        swiper,
        textInput,
        radioTip,
        loading
    },
    mounted() {
    },
    methods: {
        aaa(){
            console.log(333)
        }
    }
  }
</script>

