<template>
  <div class="textInput">
    <img
            :src="iconUrl"
            alt="" class="icon"
            :class="[iconRight?'right':'left']"
            v-if="showIcon">
    <input
            id="inputText"
            type="text"
            :placeholder="placeholder"
            v-model="myModel"
    >
    <div class="btn"
         :class="[codeShow?'dis':'']"
         @click="send_code"
         v-if="showCode">{{timeText}}</div>
  </div>
</template>
<style lang="scss" scoped>
  .textInput{
    width: 90%;
    overflow: hidden;
    margin:0 auto;
    border: 1px solid #00aaee;
    border-radius: .15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
    img{
      width: .6rem;
      height: .5rem;
      margin: 0 .22rem;
      &.left{
        border-right: 1px solid #00aaee;
        padding-right: .1rem;
      }
      &.right{
        border-left: 1px solid #00aaee;
        order: 1;
        padding-left: .1rem;
      }
    }
    input{
      width: 100%;
      border: none;
      outline: none;
      flex:1 auto;
      font-size: .32rem;
      padding:0 .15rem;
      color: #00aaee;
    }
    .btn{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 4rem;
      background: #00aaee;
      color: #fff;
      font-size: .32rem;
      &.dis{
        pointer-events: none;
        background: #ccc;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  let _timeout = 59;//倒计时秒数，默认59
  let _timeText = '发送验证码';
    export default{
        data(){
            return {
                time:null,//清除定时器用的
                timeout:_timeout,//这个不用解释了吧，多少秒
                timeText:_timeText,//提示的文字
                codeShow:false,//发送验证码按钮能不能点击
                myModel:this.model//组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
            }
        },
        props:['showIcon','showCode','iconRight','timeInterval','iconUrl','placeholder','type','model'],
        mounted() {
            if(!!this.timeInterval){//倒计时秒数带入
                this.timeout = this.timeInterval;
                _timeout = this.timeInterval;
            }
            if(!!this.type){
                document.getElementById('inputText').setAttribute('type',this.type)
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
            send_code(){//发送验证码
                this.codeShow = !this.codeShow;
                this.send_code_countdown();
                this.$emit('send_code_cb');
            },
        },
        watch:{
            myModel(val) {
                this.$emit('text_input_cb',val);
            },
        },
    }
</script>

