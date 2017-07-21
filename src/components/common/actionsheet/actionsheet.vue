<template>
  <Fxd-mask v-if="maskVisible" @click.native="cancel">
    <transition name="picker" v-on:after-leave="afterLeave">
      <div class="dialog actionsheet" v-if="visible" >
        <!--<ul>-->
          <!--<li :class="!index?'title':''" v-for="(i,index) in msg">-->
            <!--{{i}}-->
          <!--</li>-->
        <!--</ul>-->
        <ul>
          <li class="title" @click.stop.prevent>
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
    </transition>
  </Fxd-mask>
</template>
<style lang="scss" scoped>
  .actionsheet{
    position: fixed;
    bottom:0;
    width: 90%;
    left: 5%;
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
    import mask from '../../common/mask/mask.vue';
    export default{
        name: 'fxd-actionsheet',
        data(){
            return{
                maskVisible:true, // mask开关
                visible:false
            }
        },
        props: ['msg'],
        components: {
            'Fxd-mask':mask,
        },
        mounted() {
            this.visible = !this.visible // 初始化打开picker
        },
        methods: {
            cancel(){
                this.visible = !this.visible;
                this.$emit('actionsheetCb');
            },
            afterLeave(){
                this.maskVisible = false
            }
        }
    }
</script>
