<template>
  <div class="mobileVerify">
    <cell v-model="item.mobile.val"
          @input.native="e=>item.mobile.val=e.target.value"
          ref="mobile"
          type="imgText"
          inputType="mobile"
          @verify_cb="verify_cb"
    >
      <img :src="item.mobile.icon" alt="" slot="imgText">
    </cell>
    <cell v-model="item.imgCode.val"
          @input.native="e=>item.imgCode.val=e.target.value"
          ref="codeImg"
          type="all"
          inputType="imgCode"
          @verify_cb="verify_cb"
          v-if="type==='imgCode'"
          @click.native="change_pic">
      <img :src="item.imgCode.icon" alt="" slot="imgText">
      <img :src="item.imgCode.iconUrl" alt="" slot="btnText">
    </cell>
    <cell v-model="item.code.val"
          @input.native="e=>item.code.val=e.target.value"
          type="all"
          @verify_cb="verify_cb"
          inputType="code"
    >
      <img
              :src="item.code.icon"
              alt="" slot="imgText">
      <btn slot="btnText"
           @click.native="send_code"
           class=""
           :disabled="sendCodeDisabled"
           type="inset">{{timeText}}</btn>
    </cell>
    <btn @click.native="submit_btn" v-if="submit">确定</btn>
  </div>
</template>
<style lang="scss" scoped>
  .mobileVerify{
    &>div{
      margin-top: .3rem;
    }
  }
</style>
<script type="text/ecmascript-6">
    import cell from '../../ui/cell/cell.vue'
    import button from '../../common/button/button.vue'
    import {verify} from '../../../until/mixin'
    let _timeout = 59;//倒计时秒数，默认59
    let _timeText = '发送验证码';
    export default{
        name: 'fxd-mobileVerify',
        data(){
            return {
                time:null,//清除定时器用的
                timeout:_timeout,//这个不用解释了吧，多少秒
                timeText:_timeText,//提示的文字
                sendCodeDisabled:false,//发送验证码按钮能不能点击
            }
        },
        computed: {
            item:{
                get: function () {
                    const { mobile, imgCode, code } = this.data;
                    try{
                        mobile.icon = require('../../../public/img/mobile.png');
                    }catch (e){}
                    try{
                        imgCode.icon = require('../../../public/img/code.png');
                    }catch (e){}
                    try{
                        code.icon = require('../../../public/img/code.png');
                    }catch (e){}
                    return this.data
                },
            },
        },
        props:['type','data','submit'],
        mixins:[verify],
        components: {
            cell,
            'btn':button
        },
        methods:{
            send_code_countdown(){//倒计时
                clearInterval(this.time);
                this.time = setInterval(()=>{
                    if(this.timeout>0){
                        this.sendCodeDisabled = true;
                        this.timeText = `发送(${this.timeout})`;
                        this.timeout--;
                        this.send_code_countdown();
                        return
                    }
                    clearInterval(this.time);
                    this.sendCodeDisabled = false;
                    this.timeText = _timeText;
                    this.timeout = _timeout;
                },1000)
            },
            change_pic(){
                this.required([this.$refs.mobile]).then(()=>{
                    this.$emit('mobile_verify_change_pic_cb');
                })
            },
            send_code(){
                let requiredArr = [];
                if(this.type!=='imgCode'){
                    requiredArr = [this.$refs.mobile];
                }else{
                    requiredArr = [this.$refs.mobile, this.$refs.codeImg]
                }
                this.required(requiredArr).then(()=>{
                    this.send_code_countdown();
                    this.$emit('mobile_verify_send_code_cb');
                })
            },
            submit_btn(){
                this.required().then(()=>{
                    this.$emit('mobile_verify_submit_cb');
                })
            }
        },
    }
</script>

