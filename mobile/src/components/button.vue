<template>
    <div class="fxd-btn">
        <fxd-button></fxd-button>

        <fxd-button> 我的宽度是90%</fxd-button>


        <fxd-button type="inset" >我的宽度不固定</fxd-button>

        <fxd-button disabled >我是不可点击的</fxd-button>

        <fxd-button type="inset" disabled>我的宽度不固定并且不可点击</fxd-button>

    </div>
</template>
<style lang="scss" scoped>
    .fxd-btn>div{
        margin:1rem auto;
    }
</style>
<script type="text/ecmascript-6">
    export default{
        methods:{
        },
    }
</script>
