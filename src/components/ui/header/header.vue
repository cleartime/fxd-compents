<template>
    <div class="header-outline">
        <div class="header">
            <span class="header-back" :class="[backSwitch?'dis':'']" @click="back"></span>
            <span class="header-title">{{title}}</span>
            <slot>
                <span class="header-qrcode" :class="[qrCodeSwitch?'':'dis']"><img src="/" alt="" ></span>
            </slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .header-outline{
        position: fixed;
        height: .96rem;
        width: 100%;
        top:0;
        left: 0;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #0894ec;
        font-size: .32rem;
        height: 100%;
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
        props:['title','qrCodeSwitch','backSwitch','backUrl'],
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
                this.$emit('header_back_cb')
                if(!this.backUrl){
                    history.back();
                }
            }
        },
        watch:{
        },
    }
</script>
