<template>
    <transition name="mint-toast-pop">
          <div class="dialog toast" v-if="visible" >
              <p>{{message}}</p>
          </div>
    </transition>
</template>
<style lang="scss" scoped>
    .mint-toast-pop-enter, .mint-toast-pop-leave-active {
        opacity: 0
    }
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
        name: 'fxd-toast',
        props: ['message'],
        data() {
            return {
                visible: false
            };
        },
    }
</script>
