<template>
    <div class="header">
        <span class="header-back" @click="back" :class="[backSwitch?'dis':'']"></span>
        <span class="header-title">{{title}}</span>
        <span class="header-qrcode" :class="[qrCodeSwitch?'':'dis']"><img src="/" alt="" ></span>
    </div>
</template>
<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #0894ec;
        font-size: .32rem;
        height: .96rem;
        color: #fff;
        .header-title{
        }
        .header-back{
            &.dis{
                opacity: 0;
                pointer-events: none;
            }
            &:active{
                background: #1da9ff;
            }
            margin-left: .3rem;
            width: .4rem;
            height: .4rem;
            border:2px solid #fff;
            border-radius: 50%;
            position: relative;
            &:after{
                border: 2px solid #fff;
                border-bottom-width: 0;
                border-left-width: 0;
                content: " ";
                top: 50%;
                left: 50%;
                margin-left: -.06rem;
                position: absolute;
                width: .12rem;
                height: .12rem;
                transform: translateY(-50%) rotate(-135deg);
            }
            &:before{
                content: '';
                background: #fff;
                height: 2px;
                width: .12rem;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -.06rem;
                margin-top: -1px;
            }
        }
        .header-qrcode{
            margin-right: .3rem;
            &.dis{
                opacity: 0;
                pointer-events: none;
            }
        }
    }
</style>
<script>
    export default{
        name: 'fxd-header',
        props:['title','qrCodeSwitch','backSwitch'],
        data(){
            return{
                visible: false
            }
        },
        computed:{
        },
        components: {
        },
        mounted() {
        },
        methods:{
            back(){
                this.$emit('header_back_cb');
                history.back();
            }
        },
        watch:{
        },
    }
</script>
