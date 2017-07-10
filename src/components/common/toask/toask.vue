<template>
  <div class="dialog toast">
      <p>{{msg}}</p>
  </div>
</template>
<style lang="scss" scoped>
  .dialog {
    font-size:.32rem;
    z-index: 101;
    width: 100%;
    position: fixed;
    bottom: 28%;
    display: flex;
    justify-content: center;
    align-items: center;
      left: 0;
    p {
      padding: 10px;
      border-radius: 5px;
      background: rgba(000,000,000,.5);
      color: #fff;
    }
  }
</style>
<script>
    export default{
        name: 'toast',
        props: ['msg'],
    }
</script>
