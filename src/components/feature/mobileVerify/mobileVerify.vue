<template>
  <div class="mobileVerify">
    <cell
            :showIcon="true"
            :iconUrl="item.mobile.icon"
            :placeholder="'请输入手机号码'"
            :type="'mobile'"
            :model="item.mobile.val"
            @text_input_cb="val=>{item.mobile.val=val}"></cell>
    <div class="mobileVerify-imgCode"
         v-if='myImgCodeSwitch'>
      <cell :showIcon="true"
                 :type="'imgCode'"
                 :iconUrl="item.imgCode.icon"
                 :placeholder="'请输入图形验证码'"
                 :model="item.imgCode.val"
                 @text_input_cb="val=>{item.imgCode.val=val}"></cell>
      <img
              :src="item.imgCode.iconUrl"
              alt="" class="mobileVerify-imgCode-img"
              @click="mobile_verify_img">
    </div>
    <div class="mobileVerify-code">
      <cell
              :showIcon="true"
              :type="'code'"
              :iconUrl="item.verify.icon"
              :placeholder="'请输入验证码'"
              :model="item.verify.val"
              @text_input_cb="val=>{item.verify.val=val}"></cell>
      <div class="mobileVerify-btn"
           :class="[codeShow?'dis':'']"
           @click="mobile_verify_sendcode"
      >{{timeText}}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .mobileVerify{
    .mobileVerify-imgCode, .mobileVerify-code{
      position: relative;
      width: 90%;
      margin:0 auto;
      border: 1px solid #00aaee;
      border-radius: .15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1rem;
      .textInput{
        border:none;
        &.dis:after{
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          box-shadow: -1px 1px 1px red;
          border-radius: .15rem;
          top:0;
          left:0
        }
        &.dis:before{
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          box-shadow: 1px -1px 1px red;
          border-radius: .15rem;
          top:0;
          left:0
        }
      }
      .mobileVerify-btn,.mobileVerify-imgCode-img{
        width: 4rem;
        height: 100%;
      }
    }
    .mobileVerify-code{
      .mobileVerify-btn{
        border-top-right-radius: .15rem;
        border-bottom-right-radius: .15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #00aaee;
        color: #fff;
        font-size: .32rem;
        &.dis{
          pointer-events: none;
          background: #ccc;
        }
      }
    }
    &>div{
      margin-top: .3rem!important;
    }
  }
</style>
<script type="text/ecmascript-6">
    import cell from '../../ui/cell/cell.vue'
    import {bus} from '../../../until/evenbus'
    let _timeout = 59;//倒计时秒数，默认59
    let _timeText = '发送验证码';
    export default{
        data(){
            return {
                myImgCodeSwitch:this.imgCodeSwitch,//图形验证码开关
                verify:{//判断手机号和图形验证码有没有验证完成
                    mobile:false,
                    imgCode:false,
                    code:false,
                },
                item:this.data,
//                    {
//                    mobile:{
//                        icon:require('../../../public/img/test.png'),
//                        val:'',
//                    },
//                    imgCode:{
//                        icon:require('../../../public/img/test.png'),
//                        iconUrl:require('../../../public/img/test.png'),
//                        val:'',
//                    },
//                    verify:{
//                        icon:require('../../../public/img/test.png'),
//                        val:'',
//                    },
//                },
                msg:'',
                time:null,//清除定时器用的
                timeout:_timeout,//这个不用解释了吧，多少秒
                timeText:_timeText,//提示的文字
                codeShow:false,//发送验证码按钮能不能点击
                myModel:this.model,//组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
            }
        },
        props:['data','showIcon','iconRight','timeInterval','iconUrl','model','mobileModel','imgCodeSwitch'],
        components: {
            cell,
        },
        mounted() {
            if(!!this.item.imgCode){
               this.myImgCodeSwitch = !this.myImgCodeSwitch;
            }
            bus.$on('mobile_verify_submit_cb', (ca)=>{//监听mobile_verify_sub事件将数据添加到callback函数参数里面，然后触发的时候就可以从返回参数里面直接获取了
                if(this.verify.mobile&&this.verify.imgCode&&this.verify.code){
                    if(!this.imgCodeSwitch){//如果没打开图形验证码，就只返回手机号和验证码2个对象
                        let {mobile,verify} = this.item
                        ca({mobile,verify})
                        return
                    }
                    ca(this.item)
                    return false
                }
                bus.$emit('verify_defalut_cb',this.$children);//触发默认验证事件
            });
            if(!!this.timeInterval){//倒计时秒数带入
                this.timeout = this.timeInterval;
                _timeout = this.timeInterval;
            }
        },
        methods:{
            send_code_countdown(){//倒计时
                clearInterval(this.time);
                this.time = setInterval(()=>{
                    if(this.timeout>0){
                        this.timeText = `发送(${this.timeout})`;
                        this.timeout--;
                        this.send_code_countdown();
                        return
                    }
                    clearInterval(this.time);
                    this.codeShow = !this.codeShow;
                    this.timeText = _timeText;
                    this.timeout = _timeout;
                },1000)
            },
            mobile_verify_img(){//图形验证码
                this.$emit('mobile_verify_img_cb');
            },
            mobile_verify_sendcode(){//发送验证码
                bus.$emit('text_input_verify_cb',(data)=>{//验证返回的callback
                    this.verify[data.type] = true;
                    if((this.imgCodeSwitch&&this.verify.mobile&&this.verify.imgCode)||(!this.imgCodeSwitch&&this.verify.mobile)){//如果都都验证完了才执行发送验证码事件
                        this.codeShow = !this.codeShow;
                        this.send_code_countdown();
                        this.$emit('mobile_verify_sendcode_cb');
                    }
                });
                if(!this.verify.mobile){
                    bus.$emit('verify_defalut_cb',this.$children);//触发默认验证事件
                }
            },
        }
    }
</script>

