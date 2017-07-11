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


            let a = `<p class="loanDetial-title" style="margin-top: 0!important;">借款费用</p>
                <div class="loanDetial-p">
                固定期限14天，提前收取费用在到账金额中扣除，曰总费率1%,包括两部分：<br> 1、利息，固定利率0.03%/天；
        <br /> 2、服务费，固定费率0.97%/天。服务费包括:身份认证费、学历认证费、手机验证费、银行卡验证费、提现手续费、审核费等。 例如：借款1000元，借款周期14天，借款费用是140元【1000*1% *14(天)】
        <br />
            </div>
            <p class="loanDetial-title" style="margin-top: 0.5rem;margin-bottom: 0;">逾期费用</p>
                <div class="loanDetial-p">
                发生逾期未还款是，将收取逾期费用，包括两个部分：<br /> 1、滞纳金：10元/笔；
        <br /> 2、逾期手续费:按日收取,按逾期本金的 2%/天收取;
        <br /> 例如：借款1000元，借款周期14天，逾期2天，逾期费用50元【10+ 1000*2%*2】；
        <br />
            </div>
            <p class="loanDetial-title" style="margin-top: 0.5rem;margin-bottom: 0;">平台运营费</p>
                <div class="loanDetial-p">
                按笔收取，每笔收取提款金额的60%。
        <br /> 例如：提款1000元，发薪贷收取1000*6%=60元平台运营费。
        </div>`
            Alert({
                title:'标题',
                content:a,
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

