<template>
  <div>
    <alert :msg="msg"></alert>
    <toask :msg='msg'></toask>
    <fmask/>
    <actionsheet></actionsheet>
  </div>
</template>

<style lang="scss">

@import './lib/reset.css';
@import 'lib/config';
</style>

<script>
import actionsheet from './components/actionsheet/actionsheet.vue'
import fmask from './components/mask/mask.vue'
import alert from './components/alert/alert.vue'
import toask from './components/toask/toask.vue'

  export default {
    name: 'app',
    data() {
      return {
        msg:'确定要退出么'
      }
    },
    components: {
      alert,
      toask,
      fmask,
      actionsheet
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

