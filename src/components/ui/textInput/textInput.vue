<template>
  <div class="textInput" :class="[dis?'dis':'']">
    <img
            :src="iconUrl"
            alt=""
            class="icon"
            :class="[iconRight?'right':'left']"
            v-if="showIcon">
    <input
            id="inputText"
            :placeholder="placeholder"
            v-model="myModel">
    <!--<toask v-if="toaskSwitch" :msg="toaskMsg"></toask>-->
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
    export default{
        data(){
            return {
                dis:false,//错误效果
                time:null,//清除定时器用的
                myModel:this.model,//组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
            }
        },
        props:['showIcon','iconRight','iconUrl','placeholder','type','model','maxlength','readOnly'],
        mixins:[toaskMixin],
        render: function (createElement) {
            console.log(createElement)
            return createElement('p', 'No items found.')
        },
        mounted() {
            !!this.readOnly&&document.getElementById('inputText').setAttribute('readonly',!!this.readOnly)//设置类型默认为text
            !!this.type&&document.getElementById('inputText').setAttribute('type',this.type||"text")//设置类型默认为text
            this.max_length();
        },
        methods:{
            max_length(){//设置最大长度默认不设置
                if(!!this.maxlength&&this.myModel.length>this.maxlength){
                    this.myModel = this.myModel.substr(0,this.maxlength)
                }
            },
            verify_reg(){//验证正则表达式
                if(!!this.type){
                    let regObj = regArr.filter(t=>{
                        return t.type===this.type
                    })[0]
                    if(!(regObj.reg.test(this.myModel))){
                        this.dis = !this.dis;
                        this.toask_switch();
                        this.toaskMsg = `请输入${regObj.name}`;
                    }
                }
            }
        },
        watch:{
            myModel(val) {
                this.verify_reg();
                this.max_length();
                this.$emit('text_input_cb',val);
            }
        },
    }
</script>

