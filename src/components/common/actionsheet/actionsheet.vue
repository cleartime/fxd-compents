<template>
  <div class="dialog actionsheet">
    <!--<ul>-->
      <!--<li :class="!index?'title':''" v-for="(i,index) in msg">-->
        <!--{{i}}-->
      <!--</li>-->
    <!--</ul>-->
    <ul>
      <li class="title">
        热线服务时间：9:00-17:30（工作日）
      </li>
      <li>
        <a href='tel:4008-678-655'>
          4008-678-655
        </a>
      </li>
    </ul>
    <p @click="cancel" class="act">取消</p>
  </div>
</template>
<style lang="scss" scoped>
  .actionsheet{
    position: fixed;
    bottom:0;
    width: 98%;
    left: 1%;
    z-index: 101;
    font-size: .28rem;
    text-align: center;
    ul{
      border-radius: .2rem;
      background: #fff;
      li {
        font-size: .4rem;
        color: #0090ff;
        line-height:2.5;
        border-bottom: 1px solid #ececec;
        &.title{
          color: #595757;
          font-size: .28rem;
        }
        a{
          text-decoration: none;
          color: #0090ff;
        }
      }
    }
    p{
      font-size: .4rem;
      color: #0090ff;
      line-height: 2.5;
      border-radius: .2rem;
      background: #fff;
      margin-top: .1rem;
    }
  }

</style>
<script>
    export default{
        name: 'actionsheet',
        props: ['msg'],
        methods: {
            cancel(){
              this.$emit('actionsheetCb');
            },
        }
    }
</script>
