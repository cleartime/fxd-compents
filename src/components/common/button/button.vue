<template>
  <div
          class="fxd-btn"
          :disabled="disabled"
          :class="!!type?type:''"
  >
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
    .fxd-btn{
      font-size: .44rem;
      height: 1rem;
      line-height: 1rem;
      border-radius: .1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: #1da9ff;
      color: #fff;
      width: 90%;
      margin: 0 auto;
      &:active{
        background: #77bce6;
      }
      &.inset{
        width: auto;
        height: 100%;
        border-radius: 0;
        font-size: .32rem;
        line-height: normal;
      }
      &[disabled]{
        background: #ccc;
        pointer-events: none;
      }
    }
</style>

<script>
export default {
  name: 'fxd-button',
  data(){
    return {
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  },
  props: ['disabled','type']
};
</script>
