<template>
  <div>
    3秒之后自动关闭
  </div>
</template>
<style lang="scss" scoped>
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
