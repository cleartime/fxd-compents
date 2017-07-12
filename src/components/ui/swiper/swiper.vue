<template>
    <div class="banner" id="slide">
        <transition :name="transitionName">
            <img :src="data.img" width="100%" @click="linkto" v-if='key' :key='key'>
        </transition>
        <ul>
            <li v-for='(i,index) in list.list' :class="index==tag?'act':''" @click='touch(null,null,index)'></li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    .banner{
        width: 100%;
        position: relative;
        height: 234px;
        img{
            position: absolute;
            top:0;
            left: 0;
            z-index: 10;
        }
        ul{
            position: absolute;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 10px;
            z-index: 11;
            bottom: 20px;
            li{
                width: 10px;
                height: 10px;
                display: inline-block;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                margin:10px 5px;
                &.act{
                    background:#fff
                }
            }
        }
    }
</style>
<script>
    import touch from 'touchjs'
    export default{
        name: 'fxd-swiper',
        props:['list'],
        data(){
            return{
                data:{},
                key:'a',
                tag:0,
                transitionName:'slide-right',
                time:null,
            }
        },
        computed:{
            slide(){
                return document.getElementById('slide');
            }
        },
        mounted() {
            let _this = this;
            this.data = this.list.list[this.tag];
            touch.on( _this.slide, 'swipeleft', ()=>{
                _this.transitionName = 'slide-right';
                _this.touch(1,'swipeleft');
            });
            touch.on( _this.slide, 'swiperight', ()=>{
                _this.transitionName = 'slide-left';
                _this.touch(-1,'swiperight');
            });
            _this.list.interval && _this.interval(_this, _this.list.interval);
        },
        methods:{
            touch(parms, type, index){
                this.list.interval&&clearInterval(this.time);
                this.list.interval&&this.interval(this, this.list.interval);
                let num = this.tag;
                let len = this.list.list.length-1;
                if(index==num){
                    return
                }
                if(num==0&&type=='swiperight'){
                    num = len;
                }
                else if(num==len&&type=='swipeleft'){
                    num = 0;
                }else{
                    num = num+parms
                }
                if(!parms&&!type&&index.toString()){
                    num = index;
                }
                this.key = false;
                this.$nextTick(function () {
                    this.data = this.list.list[num];
                    this.tag = num;
                })
            },
            linkto(){
                let link = this.list.list[this.tag].link;
                this.$store.commit('NEXT_PAGE', link);
            },
            interval(self, data){
                self.time = setInterval(()=>{
                    self.touch(-1,'swiperight');
                },data||3000)
            }
        },
        watch:{
            'data' (a,b) {
                if(a!=b&&!!b){
                    this.key = 'b'
                }
            },
        },
    }
</script>
