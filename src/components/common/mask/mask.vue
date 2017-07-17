<template>
    <div>
        <div id="mask" @click='close'>
            <slot></slot>
        </div>
    </div>
</template>
<style>
    #mask{
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(000,000,000,.3);
    }
</style>
<script>

    export default {
        name: 'Mask',
        mounted(){
            document.getElementById('mask').addEventListener('touchmove',(e)=>e.stopPropagation())
        },
        methods: {
            close(user) {
            }
        }
    }
</script>
