<template>
    <div>
        <fxd-picker :data="list" @picker_cancel_cb="picker_cancel_cb"  @picker_submit_cb="picker_submit_cb" @picker_change_cb="picker_change_cb"></fxd-picker>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
          return{
              list:[{
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
              }],
          }
        },
        methods:{
            picker_cancel_cb(){

            },
            picker_submit_cb(){

            },
            picker_change_cb(){

            }
        },
    }
</script>
