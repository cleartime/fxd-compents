<template>
    <div class="radioTip">
        <span class="radio" :class="[tick?'tick':'']" @click="switch_tick"></span>
        <span class="agree" @click="switch_tick">{{agreeText}}</span>
        <span class="tip" v-for="i in tipList">《{{i}}》</span>
    </div>
</template>
<style lang="scss" scoped>
.radioTip{
    display:flex;
    /*justify-content:flex-start;*/
    align-item:center;
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
        height:.28rem
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
        data(){
            return {
                tick:false,
                agreeText:'同意发薪贷',
                tipList:['注册协议','隐私保密协议']
            }
        },
        props:[],
        mounted() {

        },
        methods:{
            switch_tick(){
                this.tick = !this.tick
            }
        },
        watch: {}
    }
</script>

