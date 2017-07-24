<template>
  <div>
    不知道怎么关闭就乖乖等3秒吧
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
