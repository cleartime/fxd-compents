<template>
    <div>
        <div class="cellSwiper" @click="handleChange">
            <span class="swiper-right">123123</span>
            <span class="swiper-left" :class="[visible?'act':'']"></span>
        </div>
        <swiper v-if="visible"></swiper>
    </div>
</template>
<style lang="scss" scoped>
    .cellSwiper{
        font-size: .32rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        overflow: hidden;
        margin:0 auto;
        border: 1px solid #00aaee;
        border-radius: .15rem;
        height: 1rem;
        .swiper-right{
            color: #00aaee;
            flex: 1;
            padding-left: .3rem;
        }
        .swiper-left{
            height: 100%;
            width: 1.1rem;
            border-left: 1px solid #00aaee;
            display: flex;
            align-items: center;
            justify-content: center;
            &:after{
                content: '';
                border-right: .02rem solid #00aaee;
                border-top: .02rem solid #00aaee;
                display: inline-block;
                height: .22rem;
                margin: 0 .12rem 0 .08rem;
                transform: rotate(135deg);
                width: .22rem;
            }
            &.act{
                &:after{
                    transition: all 1s;
                    transform: rotate(45deg);
                }
            }
        }
    }
</style>
<script>

    import swiper from '../swiper/swiper.vue'
    export default{
        name: 'fxd-cellSwiper',
        props:['list'],
        data(){
            return{
                visible: false
            }
        },
        computed:{
        },
        components: {
            swiper,
        },
        mounted() {
        },
        methods:{
            handleChange(){
                this.visible = !this.visible
            }
        },
        watch:{
        },
    }
</script>
