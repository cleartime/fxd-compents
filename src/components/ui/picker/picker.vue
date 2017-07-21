<template>
    <Fxd-mask v-if="maskVisible" @click.native="submit">
        <transition name="picker" v-on:after-leave="afterLeave">
        <div class="picker-outline" v-if="visible" @click.stop.prevent>
            <header class="picker-outline-header">
                <button @click.stop.prevent="cancel">取消</button>
                <h1>{{data.placeholder}}</h1>
                <button @click.stop.prevent="submit">确定</button>
            </header>
            <Picker :slots="slots" :itemHeight="72" @change="onValuesChange" :value-key="valueKey"></Picker>
        </div>
        </transition>
    </Fxd-mask>
</template>
<style lang="scss">
    .picker-outline{
        position: fixed;
        z-index: 101;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5.2rem;
        background: #cdd5da;
        .picker-outline-header{
            margin-bottom:.25rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: .32rem;
            background-color: #f7f7f8;
            border-top:1px solid #a8abb0;
            border-bottom:1px solid #a8abb0;
            height: .88rem;
            h1{
                color: #5f646e;
            }
            button{
                color: #0894ec;
                font-size: .3rem;
                border:none;
                background: none;
            }
        }
    }
    /* picker-start */
    .picker {
        overflow: hidden;
    }
    .picker-toolbar {
        height: .4rem;
    }
    .picker-items {
        -webkit-mask-box-image: linear-gradient(to top,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 0;
        text-align: right;
        font-size: .48rem;
        position: relative;
    }
    .picker-center-highlight {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        width: 100%;
        top: 50%;
        margin-top: -.36rem;
        pointer-events: none
    }
    .picker-center-highlight:before, .picker-center-highlight:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: #a8abb0;
        display: block;
        z-index: 15;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .picker-center-highlight:before {
        left: 0;
        top: 0;
        bottom: auto;
        right: auto;
    }
    .picker-center-highlight:after {
        left: 0;
        bottom: 0;
        right: auto;
        top: auto;
    }

    .picker-slot {
        font-size: .36rem;
        overflow: hidden;
        position: relative;
        max-height: 100%
    }
    .picker-slot.picker-slot-left {
        text-align: left;
    }
    .picker-slot.picker-slot-center {
        text-align: center;
    }
    .picker-slot.picker-slot-right {
        text-align: right;
    }
    .picker-slot.picker-slot-divider {
        color: #000;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }
    .picker-slot-wrapper {
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .picker-slot-wrapper.dragging, .picker-slot-wrapper.dragging .picker-item {
        -webkit-transition-duration: 0s;
        transition-duration: 0s;
    }
    .picker-item {
        height: .72rem;
        line-height: .72rem;
        padding: 0 .1rem;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #707274;
        left: 0;
        top: 0;
        width: 100%;
        box-sizing: border-box;
        -webkit-transition-duration: .3s;
        transition-duration: .3s;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .picker-slot-absolute .picker-item {
        position: absolute;
    }
    .picker-item.picker-item-far {
        pointer-events: none
    }
    .picker-item.picker-selected {
        color: #000;
        -webkit-transform: translate3d(0, 0, 0) rotateX(0);
        transform: translate3d(0, 0, 0) rotateX(0);
    }
    .picker-3d .picker-items {
        overflow: hidden;
        -webkit-perspective: 7rem;
        perspective: 7rem;
    }
    .picker-3d .picker-item, .picker-3d .picker-slot, .picker-3d .picker-slot-wrapper {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d
    }
    .picker-3d .picker-slot {
        overflow: visible
    }
    .picker-3d .picker-item {
        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out
    }
    /* picker-end */
</style>
<script>
    import mask from '../../common/mask/mask.vue';
    import { Picker } from 'mint-ui';
    export default{
        name: 'fxd-picker',
        props:['data','valueKey'],
        data(){
            return{
                value:null, // 返回给父组件的值
                maskVisible:true, // mask开关
                visible: false, // picker开关
                slots: [this.data] // picker数据
            }
        },
        components: {
            Picker,
            'Fxd-mask':mask,
        },
        mounted() {
            this.visible = !this.visible // 初始化打开picker
            if(!this.valueKey){
                this.slots = this.data.values
            }
        },
        methods:{
            /**
             * 取消的事件
             */
            cancel(){
              this.visible = !this.visible;
              this.$emit('picker_cancel_cb');
            },
            /**
             * 确定的事件返回当前选中的一个数组对象
             */
            submit(){
                this.visible = !this.visible;
                this.$emit('picker_submit_cb',this.value);
            },
            /**
             * picker切换的事件返回当前选中的一个数组对象
             * @param picker
             * @param values
             */
            onValuesChange(picker, values) {
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
                this.value = values;
                this.$emit('picker_change_cb',values);
            },
            /**
             * picker动画离开的时候同时关闭mask
             * 如果父组件是cellPicker同时也关闭他
             */
            afterLeave(){
                this.maskVisible = !this.maskVisible;
                try{this.$parent.visible = false}catch (e){}
            }
        }
    }
</script>
