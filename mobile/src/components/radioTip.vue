<template>
    <div>
       <fxd-radio-tip :tipList="tipList" agreeText="同意发薪贷"></fxd-radio-tip>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                tipList:['注册协议','隐私保密协议']
            }
        }
    }
</script>
