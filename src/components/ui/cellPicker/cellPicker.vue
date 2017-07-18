<template>
    <div>
        <div class="cellSwiper" @click="handleChange">
            <span class="swiper-right placeholder" v-if="showPlaceholder">{{data.placeholder}}</span>
            <span class="swiper-right" v-if="!showPlaceholder">{{localValue}}</span>
            <span class="swiper-left" :class="[visible?'act':'']"></span>
        </div>
        <picker v-if="visible" :valueKey="valueKey" :data="list" @picker_cancel_cb="picker_cancel_cb"  @picker_submit_cb="picker_submit_cb" @picker_change_cb="picker_change_cb"></picker>
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
            &.placeholder{
                color: #767d84;
            }
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
                    transition: all .3s;
                    transform: rotate(45deg);
                }
            }
        }
    }
</style>
<script>

    import picker from '../picker/picker.vue'
    export default{
        name: 'fxd-cellPicker',
        props:['data','valueKey'],
        data(){
            return{
                showPlaceholder:true, //picker有数据的时候关闭提示语
                visible: false, //子组件开关
                localValue:'', //picker切换的当前值
                list:this.data
            }
        },
        components: {
            picker,
        },
        methods:{
            /**
             * 选择框点击的事件
             */
            handleChange(){
                this.visible = !this.visible
            },
            /**
             * 子组件picker切换的时候同步绑定到父组件中
             * @param data
             */
            picker_change_cb(data){
                this.showPlaceholder = false;
                this.localValue =  data[0].desc_;
            },
            /**
             * picker取消的时候还原Placeholder提示语
             */
            picker_cancel_cb(){
                this.showPlaceholder = true;
            },
            /**
             * picker点击确定的事件
             * @param data
             */
            picker_submit_cb(data){
                this.$emit('cell_picker_submit_cb',data);
            }
        }
    }
</script>
