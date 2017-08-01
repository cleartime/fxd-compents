<template>
  <div class="sendCode">
    <cell v-model="sendCodeItem"
          @input.native="e=>sendCodeItem = e.target.value"
          :type="type"
          inputType="code"
    >
      <div slot="imgText"><slot></slot></div>
      <btn slot="btnText"
           @click.native="send_code"
           class=""
           :disabled="sendCodeDisabled"
           type="inset">{{timeText}}</btn>
    </cell>
  </div>
</template>
<script type="text/ecmascript-6">
    import cell from '../../ui/cell/cell.vue'
    import button from '../../common/button/button.vue'
    import regArr from '../../../config/regular'
    let _timeout = 59;//倒计时秒数，默认59
    let _timeText = '发送验证码';
    export default{
        name: 'fxd-sendCode',
        data(){
            return {
                time:null,//清除定时器用的
                timeout:_timeout,//这个不用解释了吧，多少秒
                timeText:_timeText,//提示的文字
                sendCodeDisabled:false,//发送验证码按钮能不能点击
            }
        },
        computed: {
            sendCodeItem(){
                return this.value
            }
        },
        props:['type','value','verifyCellName'],
        components: {
            cell,
            'btn':button
        },
        mounted() {
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
            send_code(){
                let ref = this.$parent.$refs[this.verifyCellName]
                ref.blur();
                if(!!ref.$refs.dom.value&&regArr[2].reg.test(ref.$refs.dom.value)){
                    this.send_code_countdown();
                    this.$emit('send_code_cb');
                }  
            },
        },
    }
</script>

