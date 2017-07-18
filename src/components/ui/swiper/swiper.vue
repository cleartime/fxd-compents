<template>
    <Fxd-mask>
        <transition name="">
            <div class="swiper">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </div>
        </transition>
    </Fxd-mask>
</template>
<style lang="scss" scoped>
    .swiper{
        position: fixed;
        z-index: 101;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5.2rem;
        background: #fff;
    }
</style>
<script>
    import mask from '../../common/mask/mask.vue'
    export default{
        name: 'fxd-swiper',
        props:['list'],
        data(){
            return{
                visible: false
            }
        },
        computed:{
        },
        components: {
            'Fxd-mask':mask,
        },
        mounted() {
        },
        methods:{
        },
        watch:{
        },
    }
</script>
