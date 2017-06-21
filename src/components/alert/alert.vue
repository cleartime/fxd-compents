<template>
  <div class="alert">
  </div>
</template>

<style lang="scss" scoped>
@import '../../lib/reset.css';

</style>

<script>
  export default {
    name:'toast',
    props: {
    },
    data() {
      return {
      };
    },
    mounted() {
       alert(1)
    },
  };
</script>