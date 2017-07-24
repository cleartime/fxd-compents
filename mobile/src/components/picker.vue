<template>
    <div>
        <fxd-picker :data="list" @picker_cancel_cb="picker_cancel_cb"  @picker_submit_cb="picker_submit_cb" @picker_change_cb="picker_change_cb"></fxd-picker>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
    import {Toask} from '../../../build/';
    export default{
        data(){
          return{
              list:{
                  placeholder:'请选择时间', //提示语
                  values:[{
                      flex: 1,
                      values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                      className: 'slot1',
                      textAlign: 'right'
                  }, {
                      divider: true,
                      content: '-',
                      className: 'slot2'
                  }, {
                      flex: 1,
                      values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                      className: 'slot3',
                      textAlign: 'left'
                  }]
              },
          }
        },
        methods:{
            picker_cancel_cb(){

            },
            picker_submit_cb(cb){
                let time1 = cb[0]
                if(time1===undefined){
                    time1 = '2015-01'
                }
                Toask(`你选择的时间是${time1}~${cb[1]}`)
            },
            picker_change_cb(){

            }
        },
    }
</script>
