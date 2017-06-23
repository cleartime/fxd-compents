<template>
  <div>
    <alert :msg="msg"></alert>
  </div>
</template>

<style lang="scss">
@import './lib/reset.css';
</style>

<script>

import alert from './components/alert/alert.vue'

  export default {
    name: 'app',
    data() {
      return {
        msg:'确定要退出么'
      }
    },
    components: {
      alert,
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

