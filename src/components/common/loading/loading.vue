<template>
    <transition name="mint-indicator">
      <div class="loading" @click="preventDefault" v-if="visible" >
          <div class="loading-outline" >
              <img :src="imgUrl" alt="" >
          </div>
      </div>
    </transition>
</template>
<style lang="scss" scoped>
    .mint-indicator-enter,
    .mint-indicator-leave-active {
        opacity: 0;
    }
  .loading {
      position: fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background: rgba(000,000,000,.3);
      box-shadow: 0 0 10rem .1rem rgba(000,000,000,.7) inset;
      .loading-outline{
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          img{
              transform: scale(.7);
              padding: .3rem;
              background: rgba(000,000,000,.7);
              border-radius: .2rem;
          }
      }
  }
</style>
<script>
    let num = 1;//默认第一张图片，因为总共是4张
    let time1 = null;//Interval定时器
    let time2 = null;//Timeout定时器
    let time3 = null;//AnimationFrame
    export default{
        name: 'fxd-loading',
        props: ['msg'],
        data(){
            return{
                visible:false,
                imgUrl:'',
            }
        },
        mounted() {
            (function() {//兼容requestAnimationFrame，cancelAnimationFrame不支持的浏览器
                var lastTime = 0;
                var vendors = ['ms', 'moz', 'webkit', 'o'];
                for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
                }
                if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
                if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }());

            time3 = requestAnimationFrame(this.step);//默认Interval是从1秒后才开始工作的，所以这里开始就强制加载一次
            time1 = setInterval(()=>{//定时每秒循环一次
                time3 = requestAnimationFrame(this.step);
            },1000)
        },
        beforeDestroy(){//卸载清除
            this.cancel();
        },
        methods:{
            preventDefault(e){//阻止冒泡
                e.preventDefault()
            },
            cancel(){//取消几个定时器和AnimationFrame
                clearInterval(time1);
                clearTimeout(time2);
                cancelAnimationFrame(time3);
            },
            step(){
                this.imgUrl = require('../../../public/img/loading'+num+'.png');//加载几个图片
                num++;
                if (num < 5) {//加载到第四个之后再从第一个重头再来
                    time2 = setTimeout(()=>{
                        time3 = requestAnimationFrame(this.step);
                    },400)//每个图片间隔4秒和安卓一致
                    return
                }
                num=1;
            },
        },
    }
</script>
