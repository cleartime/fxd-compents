<template>
    <div class="radioTip">
        <span class="radio" :class="[myTick?'tick':'']" @click="switch_tick"></span>
        <span class="agree" @click="switch_tick">{{agreeText}}</span>
        <span class="tip" v-for="(t,i) in myTipList" @click="tip(t,i)">《{{t}}》</span>
    </div>
</template>
<style lang="scss" scoped>
.radioTip{
    display:flex;
    width: 90%;
    margin:0 auto;
    position: relative;
    align-items: center;
    .radio{
        &.tick:after{
            content:'';
            position: absolute;
            width: .18rem;
            height: .13rem;
            top: .03rem;
            left: .012rem;
            border: 2px solid #0091ff;
            border-top: none;
            border-right: none;
            transform: rotate(-55deg);
         }
        border:1px solid #0091ff;
        background:#fff;
        border-radius:5px;
        width:.28rem;
        height:.28rem;
        margin-right: .1rem;
    }
    .agree{
        color: #9fa0a0;
    }
    .agree,.tip{
        font-size: .24rem
    }
    .tip{
        color:#0091ff
    }
}
</style>
<script type="text/ecmascript-6">
    export default{
        name:'fxd-radioTip',
        data(){
            return {
                myTick: this.tick || true, //默认选中
                myTipList:this.tipList,//组件内不能修改props的值需要用个备份变量来修改内部组件值
            }
        },
        props:['tick','agreeText','tipList'],
        mounted() {
            if(!!this.tipList&&(typeof this.tipList == "string")){//判断tipList是不是一个string如果是的就当成数组长度为1来处理
                this.myTipList = new Array(this.tipList);
            }
        },
        methods:{
            switch_tick(){//点击钩子的回调
                this.myTick = !this.myTick;
                this.$emit('tick_cb',this.myTick);//返回当前选中状态
            },
            tip(item,index){//点击协议的回调
                this.$emit('tip_cb',item,index);//item返回当前值，index返回当前索引
            }
        },
    }
</script>

