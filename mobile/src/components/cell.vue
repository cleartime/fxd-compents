<template>
    <div class="fxd-cell">

       <fxd-cell :placeholder="item.placeholder"></fxd-cell>

        <fxd-cell :placeholder="item.placeholder1" readonly></fxd-cell>

        <fxd-cell :placeholder="item.placeholder2" maxlength="5"></fxd-cell>

        <fxd-cell :placeholder="item.placeholder3" error></fxd-cell>

        <fxd-cell  v-model="item.val5" inputType="mobile"></fxd-cell>

        <fxd-cell  v-model="item.val5" inputType="mobile" :verify="true"></fxd-cell>

        <fxd-cell  v-model="item.val" :placeholder="item.placeholder"></fxd-cell>


        <fxd-cell  v-model="item.val2" :placeholder="item.placeholder" type="imgText" >
            <img width="100%" src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=46b46c21dd2a283457ab3e593adca28f/4a36acaf2edda3cc5a34c41c08e93901213f923d.jpg" alt="" slot="imgText">
        </fxd-cell>

        <fxd-cell  type="btnText"  v-model="item.val3"  :placeholder="item.placeholder">
            <fxd-button slot="btnText" type="inset" >确定</fxd-button>
        </fxd-cell>


        <fxd-cell type="all"   v-model="item.val4" :placeholder="item.placeholder">
            <img width="100%" src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=46b46c21dd2a283457ab3e593adca28f/4a36acaf2edda3cc5a34c41c08e93901213f923d.jpg" alt="" slot="imgText">
            <fxd-button slot="btnText" type="inset" >确定</fxd-button>
        </fxd-cell>

    </div>
</template>
<style lang="scss" scoped>
    .fxd-cell>div{
        margin:.3rem auto
    }

</style>
<script type="text/ecmascript-6">
    export default{
        data(){
          return{
              item:{
                  placeholder:'提示框',
                  placeholder1:'只读',
                  placeholder2:'控制最大长度5',
                  placeholder3:'错误提示',
                  val:'输入框',
                  val2:'左边是个图片',
                  val3:'右边是个按钮',
                  val4:'左边图片右边按钮',
                  val5:'空的什么也不验证',
                  verify:false,
              }
          }
        },
        methods:{
        },
    }
</script>
