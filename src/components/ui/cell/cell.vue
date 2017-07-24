<template>
  <div class="fxd-cell"
       :class="!!type?type:''"
       :error="myError"
  >
    <div v-if="type==='imgText'|| type==='all'" class="imgText">
      <slot name="imgText">
        <!--<img src="/" alt="">-->
      </slot>
    </div>
      <input
              :readonly="readonly"
              :placeholder="myPlaceholder"
              type="text"
              class="input"
              v-model="myValue"
              @blur="blur"
              :maxlength='myMaxlength'
              ref="dom">
    <div v-if="type==='btnText'||type==='all'" class="btnText">
      <slot name="btnText">
        <!--<fxd-btn type="inset">确定</fxd-btn>-->
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .fxd-cell{
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    overflow: hidden;
    margin:0 auto;
    border: 1px solid #00aaee;
    border-radius: .15rem;
    height: 1rem;
    & > .input{//中间的input样式
      width: 100%;
      border: none;
      outline: none;
      flex:1 auto;
      font-size: .32rem;
      margin:0 .3rem;
      color: #00aaee;
    }
    &.imgText .imgText, &.all .imgText{//图片样式
      display: flex;
      align-items: center;
      justify-content: center;
      width: .6rem;
      height: .5rem;
      border-right: 1px solid #00aaee;
      padding:0 .22rem;
    }
    &.btnText .btnText, &.all .btnText{//按钮样式
      width: 4rem;
      height: 1rem;
      &.dis{
        pointer-events: none;
        background: #ccc;
      }
    }
    &[error]{//错误样式
      border:1px solid red
    }
  }
</style>
<script type="text/ecmascript-6">
    import regArr from "../../../config/regular"
    import Toast from '../../common/toask/'
    export default{
        name:'fxd-cell',
        data(){
            return {
                myValue:this.value, //input里面的值
                regObj:null, //规则对象
                myPlaceholder:this.placeholder,
                myMaxlength:this.maxlength, //最大长度控制
                myError:this.error, //是否错误
                myReadonly:this.readonly, //是否只读
                myVerify:typeof this.verify==='boolean'?false:true//判断要不要进行验证，默认是要的
            }
        },
        props:['inputType','type','value','placeholder','maxlength','error','verify','readonly'],
        mounted() {
            this.init();
        },
        methods:{
            init(){
                if(!!this.inputType&&this.myVerify){//获取规则json

                    this.regObj = regArr.filter(t=>{

                        return t.type===this.inputType

                    })[0];
                    this.$refs.dom.setAttribute('type',this.regObj.textType)//设置类型默认为text

                    this.myMaxlength = this.regObj.maxlength//强制设置类型长度

                    this.myPlaceholder = `请输入${this.regObj.name}`;

                    this.max_length();
                }
            },
            blur(){
                this.myVerify&&this.verify_reg();
            },
            max_length(){//设置最大长度默认不设置

                if(!!this.myMaxlength&&this.myValue.length>this.myMaxlength){

                    this.myValue = this.myValue.substr(0,this.myMaxlength)
                }
            },
            verify_reg(){//验证正则表达式
                this.myError = false
                const set_dis_focus = ()=>{
                    this.myError = true
                    this.$refs.dom.focus();
                }
                if(!!this.regObj){

                    if(!this.myValue){

                        Toast(`${this.regObj.name}不能为空`);

                        set_dis_focus();
                        return false

                    }

                    if(!(this.regObj.reg.test(this.myValue))){

                        Toast(`${this.regObj.name}格式不正确`);

                        set_dis_focus();
                        return false

                    }

                }
                this.$emit('verify_cb', this)

            }
        },
        watch:{
            myValue() {//控制输入长度
                this.myVerify&&this.max_length();
            }
        },
    }
</script>

