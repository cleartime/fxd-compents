<template>
  <div class="textInput" :class="[dis?'dis':'']">
    <img
            :src="iconUrl"
            alt=""
            class="icon"
            :class="[iconRight?'right':'left']"
            v-if="showIcon">
    <input
            @blur="verify_reg"
            ref="dom"
            type="text"
            :placeholder="placeholder"
            v-model="myModel">
    <toask v-if="toaskSwitch" :msg="toaskMsg"></toask>
  </div>
</template>
<style lang="scss" scoped>
  .textInput{
      &.dis{
        border: 1px solid red
       }
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
  }
</style>
<script type="text/ecmascript-6">
  import regArr from "../../../config/regular"
  import {toaskMixin} from '../../../until/mixin'
  import {bus} from '../../../until/evenbus'
    export default{
        data(){
            return {
                regObj:'',//规则json
                dis:false,//错误效果
                time:null,//清除定时器用的
                myModel:this.model,//组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
                myMaxlength:this.maxlength,
            }
        },
        props:['showIcon','iconRight','iconUrl','placeholder','type','model','maxlength','readOnly'],
        mixins:[toaskMixin],
        mounted() {
            !!this.readOnly&&this.$refs.dom.setAttribute('readonly',!!this.readOnly)//设置类型默认为text
            if(!!this.type){//获取规则json
                this.regObj = regArr.filter(t=>{
                    return t.type===this.type
                })[0];
                this.$refs.dom.setAttribute('type',this.regObj.textType)//设置类型默认为text
                this.myMaxlength = this.regObj.maxlength//强制设置类型长度
            }
            this.max_length();
        },
        methods:{
            max_length(){//设置最大长度默认不设置
                if(!!this.myMaxlength&&this.myModel.length>this.myMaxlength){
                    this.myModel = this.myModel.substr(0,this.myMaxlength)
                }
            },
            verify_reg(){//验证正则表达式
                if(!!this.regObj){
                    this.dis = false;
                    if(!this.myModel){
                        this.dis = true;
                        this.toask_switch();
                        this.toaskMsg = `${this.regObj.name}不能为空`;
                        this.$refs.dom.focus();
                        return false
                    }
                    if(!(this.regObj.reg.test(this.myModel))){
                        this.dis = true;
                        this.toask_switch();
                        this.toaskMsg = `${this.regObj.name}格式不正确`;
                        this.$refs.dom.focus();
                        return false
                    }
                    bus.$on('text_input_verify_cb',(ca)=>{
                        ca(true)
                    });
                }
            }
        },
        watch:{
            myModel(val) {
                this.max_length();
                this.$emit('text_input_cb',val);
            }
        },
    }
</script>

