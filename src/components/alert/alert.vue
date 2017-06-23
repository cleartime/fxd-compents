<template>
  <div class="alert">
    <p class='alert-msg'>{{msg}}</p>
     <div class='alert-btn'>
        <span @click='submit'>确定</span>
        <span @click='cancel'>取消</span>
     </div>
  </div>
</template>

<style lang="scss" scoped>
$masterColor: #1da9ff !default;

    .alert {
      width:90%;
      margin: 0 auto;
      text-align: center;
      height:2rem;
      line-height:1rem;
      font-size: .16rem;
      border-radius: 5px;
      border: 1px solid $masterColor;
      .alert-msg {
        font-size: .2rem;
        color: red;
        border-bottom: 1px solid $masterColor;
      }
      .alert-btn {
        width:100%;
        display:flex;
        align-items:center;
        justify-items:center;
        span {
          flex: 1;
          
        }
        span:last-child {
            border-left: 1px solid $masterColor;
          }
      }
    }

</style>

<script>
  export default {
    name:'alert',
    props: ['msg'],
    data() {
      return {
      };
    },
    mounted() {
    },
    methods:{
      submit(){
        alert(1)
      },
      cancel(){
        alert(2)
      },
      cb(){
      }
    }
  };
</script>