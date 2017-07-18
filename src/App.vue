<template>
  <div>
    <!--<alert :msg="msg"></alert>-->
    <!--<toask :msg='msg'></toask>-->
    <!--<fmask/>-->
    <!--<actionsheet></actionsheet>-->
    <!--<cell1cell :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message" @text_input_cb="val=>{item.message=cell1cell>&ndash;&gt;&ndash;&gt;-->
    <!--<cell1cell :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message2" @text_input_cb="val=>{item.message2=cell1cell>&ndash;&gt;&ndash;&gt;-->
    <!--<loading></loading>-->
            <!--:data="item"-->
            <!--@mobile_verify_img_cb="mobile_verify_img_cb"-->
            <!--@mobile_verify_sendcode_cb="mobile_verify_sendcode_cbmobileVerify1rify>-->
    <!--<div @click="submit">提交</div>-->
    <!--<fmask></fmask>-->
    <!--<fxd-button @click.native="submit">确定</fxd-button>-->
    <!--<cell v-model="type" @input.native="e=>type=e.target.value" type="mobile" :verify="false"></cell>-->
        <!--<mobileVerify-->
                <!--type="imgCode"-->
                      <!--:data="item"-->
                      <!--@mobile_verify_change_pic_cb="mobile_verify_change_pic_cb"-->
                      <!--@mobile_verify_send_code_cb="mobile_verify_send_code_cb"-->
                      <!--@mobile_verify_submit_cb="mobile_verify_submit_cb"></mobileVerify>-->
      <swiper></swiper>
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
import button from './components/common/button/button.vue'

import swiper from './components/ui/cellSwiper/cellSwiper.vue'
import cell from './components/ui/cell/cell.vue'
import radioTip from './components/ui/radioTip/radioTip.vue'

import {bus} from './until/evenbus'
import mobileVerify from './components/feature/mobileVerify/mobileVerify.vue'
  export default {
    name: 'app',
    data() {
      return {
          msg:'确定要退出么',
          icon: require('./public/img/code.png'),
          placeholder:'请输入电话号码',
          type:'sfsdfds',
          item:{
              mobile:{
                  icon:require('./public/img/mobile.png'),
                  val:'',
              },
              imgCode:{
                  icon:require('./public/img/code.png'),
                  iconUrl:'',
                  val:'',
              },
              code:{
                  icon:require('./public/img/code.png'),
                  val:'',
              },

          },
      }
    },
    components: {
        fmask,
        actionsheet,
        swiper,
        cell,
        radioTip,
        mobileVerify,
        'fxd-button':button
    },
    mounted() {
    },
    methods: {
        submit(){
          console.log(this.type)
        },
        mobile_verify_change_pic_cb(){
            console.log(3)
        },
        mobile_verify_send_code_cb(){
            console.log(1)
        },
        mobile_verify_submit_cb(){
            console.log(2)
        }
    }
  }
</script>

