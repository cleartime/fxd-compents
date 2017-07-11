<template>
    <fMask v-if="visible">
        <transition name="msgbox-bounce">
            <div class="dialog" :class="[content?'text':'']">
                <div class="alert">
                    <h2>{{title}}</h2>
                    <div v-if="content" class="content" id="content">
                        <p v-html="content"></p>
                    </div>
                    <p class="btn"><span v-if="!content"  @click='handleAction(0)' class="cancel">取消</span><span class="submit" @click="handleAction(1)">确认</span></p>
                </div>
            </div>
        </transition>
    </fMask>
</template>
<style lang="scss" scoped>
    .msgbox-bounce-enter {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0.7);
    }
    .msgbox-bounce-leave-active {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0.9);
    }
    .dialog {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &.text{
            .alert{
                width: 80%;
            }
        }
    }
 .alert{
     height: auto;
     background: #fff;
     z-index: 101;
     overflow: hidden;
    border-radius: .3rem;
    line-height: .22rem;
     padding: 10px;
   font-size: .28rem;
   width: 4rem;

   h2{
       text-align: center;
     padding: .4rem .3rem;
     font-weight: normal;
     font-size: .35rem;
     border-bottom: 1px solid #EBEBEB;
   }
     .content{
            border:1px solid #EBEBEB;
         padding: .1rem;
         line-height:2;
         overflow: auto;
            max-height: calc(100vh - 4rem);
     }

   .btn{
     position: relative;
     text-align: center;
     display: flex;
     justify-content: space-around;
       span{
           padding: .4rem .3rem;
           flex: 1;
           &:nth-child(2){
               height: 100%;
               border-left:1px solid #EBEBEB;
          }
       }
   }
    .submit{
      color: #00aaee;
    }
 }
</style>
<script>
    import fMask from '../mask/mask.vue';
    export default{
        name: 'alert',
        data() {
            return {
                visible: false,
                callback:null,
            }
        },
        props: ['title','content'],
        components: {
            fMask,
        },
        mounted(){
        },
        methods: {
            handleAction(type){
                let sha = ['是的','你就四傻','系统判定你四傻','别挣扎了你就是傻','傻了吧']
                this.callback(type);
                this.content = sha[Math.floor(Math.random()*10)]
//                this.visible = false
            },
        }
    }
</script>
