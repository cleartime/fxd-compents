<template>
    <div>
        <div @click="alert">点击试试看吧，有惊喜哦！</div>

        <div @click="alert2" class="alert2">吃瓜群众</div>
    </div>
</template>
<style lang="scss" scoped>
    div{
        font-size: .32rem;
    }
    .alert2{
        position: fixed;
        right: .3rem;
        bottom: .3rem;
    }
</style>
<script type="text/ecmascript-6">
    import {Alert,Toask} from '../../../build/';
    export default{
        data(){
            return{
                clickAlert1:false,
            }
        },
        methods:{
            alert(){
                Alert('你四不四傻！');
                this.clickAlert1 = true;
            },
            alert2(){
                if(this.clickAlert1){
                    Alert({
                        title:"你果然四傻",
                        content:'<div>哈哈哈哈哈哈哈</div>'
                    }).then((data)=>{
                    })
                    return
                }
                Toask('点击有惊喜哦！')
            }
        },
    }
</script>
