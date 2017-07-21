<template>
  <div class="fxd-header">
      <fxd-header title="这是标题"/>

      <fxd-header title="这是标题" backSwitch="false"/>

      <fxd-header  title="这是标题">
          <img height="50%" src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=46b46c21dd2a283457ab3e593adca28f/4a36acaf2edda3cc5a34c41c08e93901213f923d.jpg" alt="">
      </fxd-header>

      <fxd-header title="我可以直接跳到alert组件页面" @header_back_cb="header_back_cb" backUrl='true'/>

  </div>
</template>
<style lang="scss" scoped>
    .fxd-header>div{
        margin:1rem auto;
        position: inherit;
    }
</style>
<script type="text/ecmascript-6">
  export default{
      methods:{
          header_back_cb(){
              this.$router.push('/Alert')
          }
      },
  }
</script>
