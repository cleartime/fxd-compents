<template>
  <div>
    <!--<alert :msg="msg"></alert>-->
    <!--<toask :msg='msg'></toask>-->
    <!--<fmask/>-->
    <!--<actionsheet></actionsheet>-->
    <!--<cell :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message" @text_input_cb="val=>{item.message=val}cell>&ndash;&gt;-->
    <!--<cell :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message2" @text_input_cb="val=>{item.message2=val}cell>&ndash;&gt;-->
    <!--<loading></loading>-->
    <!--<mobileVerify-->
            <!--:data="item"-->
            <!--@mobile_verify_img_cb="mobile_verify_img_cb"-->
            <!--@mobile_verify_sendcode_cb="mobile_verify_sendcode_cb"></mobileVerify>-->
    <div @click="submit">提交</div>
  </div>
</template>

<style lang="scss">
@import './lib/reset.css';
@import 'lib/config';
</style>

<script>
import actionsheet from './components/common/actionsheet/actionsheet.vue'
import fmask from './components/common/mask/mask.vue'
import Alert from './components/common/alert/'
import Loading from './components/common/loading/'

import swiper from './components/ui/swiper/swiper.vue'
import textInput from './components/ui/cell/cell.vue'
import radioTip from './components/ui/radioTip/radioTip.vue'

import {bus} from './until/evenbus'
import mobileVerify from './components/feature/mobileVerify/mobileVerify.vue'
  export default {
    name: 'app',
    data() {
      return {
          msg:'确定要退出么',
          icon:require('./public/img/test.png'),
          placeholder:'请输入电话号码',
          type:'number',
          item:{
              mobile:{
                  icon:require('./public/img/test.png'),
                  val:'',
              },
              imgCode:{
                  icon:require('./public/img/test.png'),
                  iconUrl:require('./public/img/test.png'),
                  val:'',
              },
              verify:{
                  icon:require('./public/img/test.png'),
                  val:'',
              },
          },
      }
    },
    components: {
        fmask,
        actionsheet,
        swiper,
        textInput,
        radioTip,
        mobileVerify
    },
    mounted() {
    },
    methods: {
        mobile_verify_img_cb(){
            console.log(1)
        },
        mobile_verify_sendcode_cb(){
            console.log(2)
        },
        submit(){

            Alert({
                title:'你四不四傻',
            }).then(function(b){
                console.log(b)
            });
//
//            bus.$emit('mobile_verify_submit_cb',(data)=>{
//                console.log(data)
//            });
        }
    }
  }
</script>

