<template>
  <div class="dialog alert">
      <h2>{{msg}}</h2>
      <p><span @click='cancel' class="cancel">取消</span><span class="submit" @click="submit">确认</span></p>
  </div>
</template>
<style lang="scss" scoped>
 .alert{
    position: fixed;
   left: 50%;
   top:50%;
   z-index: 101;
    background: #fff;
    border-radius: .3rem;
    line-height: 22px;
    height:2.1rem;
     text-align: center;
     max-width: 90%;
     min-width: 3rem;
   font-size: .28rem;
   width: 4rem;
   margin-left: -2rem;
   background:#fff;
   h2{
     padding: .4rem .3rem;
     font-weight: normal;
     font-size: .35rem;
     border-bottom: 1px solid #EBEBEB;
   }
   p{
     position: relative;
       padding: .4rem .3rem;
     text-align: center;
     display: flex;
     justify-content: space-around;
     &:after{
       position: absolute;
       left: 50%;
       top: 0;
       width: 1px;
       height: 100%;
       content: '';
       background: #EBEBEB;
     }
   }
    .submit{
      color: #00aaee;
    }
 }
</style>
<script>
    export default{
        name: 'alert',
        props: ['msg'],
        methods: {
            cancel(){
              this.$emit('alertCb',0);
            },
            submit(){
              this.$emit('alertCb',1);
            }
        }
    }
</script>
