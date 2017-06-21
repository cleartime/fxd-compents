<template>
  <div>
    <alert></alert>
  </div>
</template>

<style lang="scss">
  div{
  color:green
  }
</style>

<script>


import alert from './components/alert/alert.vue'

  export default {
    name: 'app',
    data() {
      return {
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

