<template>
    <div>
        <fxd-mask v-if="visible">
            <div @click='cancel'>别看了，这里什么都没有</div>
        </fxd-mask>
    </div>
</template>
<style lang="scss" scoped>
    div{
        font-size: .32rem;
        text-align: center;
        margin-top: 50%;
    }
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
          return{
              visible:true
          }
        },
        methods:{
            cancel(){
                this.visible = !this.visible
            }
        },
    }
</script>
