<template>
    <fMask v-if="visible">
        <transition name="smallBig">
            <div class="dialog" :class="[content?'text':'']" v-if="dialogVisible">
                <div class="alert">
                    <h2>{{title}}</h2>
                    <div v-if="content" class="content" id="content">
                        <p v-html="content"></p>
                    </div>
                    <p class="btn"><span v-if="!content"  @click='handleAction(0)' class="cancel">{{no}}</span><span class="submit" @click="handleAction(1)">{{yes}}</span></p>
                </div>
            </div>
        </transition>
    </fMask>
</template>
<style lang="scss" scoped>
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
        name: 'fxd-alert',
        data() {
            return {
                dialogVisible:false,
                visible: false,
                callback:null,
                yes:'确定',
                no:'取消'
            }
        },
        props: ['title','content'],
        components: {
            fMask,
        },
        mounted(){
            setTimeout(()=>{
                this.dialogVisible = !this.dialogVisible
            },0)
        },
        methods: {
            random(){
                let num = Math.floor(Math.random()*10);
                return num>4?this.random():num
            },
            handleAction(type){
                if(this.yes === '欣然接受'){
                    this.visible = false
                }
                let sha = ['傻是取消不了的','你就四傻','系统判定你四傻','别挣扎了你就四傻','傻了吧']
                this.callback(type);
                if(!type){
                    this.no = sha[this.random()];
                    return
                }
                this.content = '承认了自己很傻了吧= =';
                this.yes = '欣然接受';
            },
        }
    }
</script>
