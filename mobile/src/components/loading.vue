<template>
  <div>
    等3秒
  </div>
</template>
<style lang="scss" scoped>
  div{
    font-size: .32rem;
  }
</style>
<script type="text/ecmascript-6">
    import {Loading} from '../../../build/';
  export default{
      mounted() {
          Loading.open();
          setTimeout(()=>{
              Loading.close();
          },3000)
      },
  }
</script>
