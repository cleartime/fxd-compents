<template>
    <div>
        <div @click="alert">点击试试看吧，有惊喜哦！</div>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
    import {Alert} from '../../../build/';
    export default{
        methods:{
            alert(){
                Alert('你四不四傻！')
            }
        },
    }
</script>
