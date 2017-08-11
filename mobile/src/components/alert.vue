<template>
    <div>
        <div @click="alert">点击下！</div>
        <div @click="alert2">点击下吧！</div>
    </div>
</template>
<style lang="scss" scoped>
    div{
        font-size: .32rem;
    }
    .alert2{
        position: fixed;
        right: .3rem;
        bottom: .3rem;
    }
</style>
<script type="text/ecmascript-6">
    import {Alert,Toask} from '../../../build/';
    export default {
        data() {
            return {
                clickAlert1:false,
            }
        },
        methods: {
            alert() {
                Alert('alert');
            },
            alert2() {
                Alert('alert2');
            },
        },
    }
</script>
