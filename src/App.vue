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
import actionsheet from './components/common/actionsheet/actionsheet.vue'
import fmask from './components/common/mask/mask.vue'
import alert from './components/common/alert/alert.vue'
import toask from './components/common/toask/toask.vue'

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

