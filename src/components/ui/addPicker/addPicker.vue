<template>
    <div>
        <div class="cellSwiper" @click="handleChange">
            <span class="swiper-right placeholder" v-if="showPlaceholder">{{data.placeholder}}</span>
            <span class="swiper-right" v-if="!showPlaceholder">{{province_name}}{{city_name}}{{county_name}}</span>
            <span class="swiper-left" :class="[visible?'act':'']"></span>
        </div>
        <picker v-if="visible"  :data="flfterList" @picker_cancel_cb="picker_cancel_cb" valueKey="name" @picker_submit_cb="picker_submit_cb" @picker_change_cb="picker_change_cb"></picker>
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
                localValue: '', //picker切换的当前值
                list: this.data,
                province_name_Arr: [],
                city_name_Arr: [],
                county_name_Arr: [],
                flfterList:{},
                province_name:'',
                city_name:'',
                county_name:'',
                default_city_name_Arr: [],
                default_county_name_Arr: []
            }
        },
        components: {
            picker,
        },
        mounted() {
            this.list.values.forEach((i,index)=>{
                if(i.type==1){
                    i.id = index;
                    this.province_name_Arr.push({
                        id:index,
                        name:i.name
                    });
                    i.sub.forEach((j,index)=>{
                        if(j.type==0){
                            j.id = `c${index}`
                            this.city_name_Arr.push({
                                id: `c${index}`,
                                pid: i.id,
                                name: j.name
                            })
                            if(i.id==0){
                                this.default_city_name_Arr.push({
                                    id: `c${index}`,
                                    pid: i.id,
                                    name: j.name
                                })
                            }
                            j.sub.forEach((h)=>{
                                this.county_name_Arr.push({
                                    pid: j.id,
                                    name: h.name
                                })
                                if(j.id=='c0'){
                                    this.default_county_name_Arr.push({
                                        pid: j.id,
                                        name: h.name
                                    })
                                }
                            })
                        }
                    })
                }
            })
            this.flfterList = {
                placeholder: this.data.placeholder||'',
                values:[{
                flex: 1,
                  values: this.province_name_Arr,
                  className: 'slot1',
                  textAlign: 'province'
              }, {
                flex: 1,
                  values: this.default_city_name_Arr,
                  className: 'city',
                  className: 'center'
              }, {
                  flex: 1,
                  values: this.default_county_name_Arr,
                  className: 'county',
                  textAlign: 'left'
              }]
            }
        },
        methods:{
            handleChange(){
                this.visible = !this.visible
            },
            /**
             * 子组件picker切换的时候同步绑定到父组件中
             * @param data
             */
            picker_change_cb(obj){
                this.showPlaceholder = false;
                let { picker, values } = obj;
                try{
                    // if(values[0].id !== values[1].pid){
                    //     for(let i=0,len=this.city_name_Arr.length;i<len;i++){
                    //         if(this.city_name_Arr[i].pid==values[0].id){
                    //             picker.setSlotValue(1, this.city_name_Arr[i]);
                    //             break
                    //         }
                    //     }
                    // }
                    // this.getCitySlotValue(picker, values)
                    // console.log(this.getCountySlotValue(values).length)
                    // if(values[1].pid !== values[0].id){
                    //     console.log(values[0])
                    //     picker.setSlotValue(1, values[0]);
                    // }
                }catch(e){}
            },
            getCitySlotValue(picker, values){
                if(values[0].id !== values[1].pid){
                    for(let i=0,len=this.city_name_Arr.length;i<len;i++){
                        if(this.city_name_Arr[i].pid==values[0].id){
                            console.log(this.city_name_Arr[i])
                            picker.setSlotValue(1, this.city_name_Arr[i]);
                            break
                        }
                    }
                }
            },
            getCountySlotValue(picker, values){
                if(values[1].id !== values[2].pid){
                    for(let i=0,len=this.county_name_Arr.length;i<len;i++){
                        if(values[1].id == this.county_name_Arr[i].pid){
                            picker.setSlotValue(2, this.county_name_Arr[i]);
                            break
                        }
                    }
                }
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
