<template>
    <div>
        <h2>有图形验证码</h2>
        <fxd-mobileVerify
        type="imgCode"
        :data="item"
        @mobile_verify_change_pic_cb="mobile_verify_change_pic_cb"
        @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
        @mobile_verify_submit_cb="mobile_verify_submit_cb"></fxd-mobileVerify>


        <h2>无图形验证码</h2>
        <fxd-mobileVerify
                :data="item2"
                @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
                @mobile_verify_submit_cb="mobile_verify_submit_cb"></fxd-mobileVerify>



        <h2>有图形验证码有提交按钮</h2>
        <fxd-mobileVerify
                submit="true"
                type="imgCode"
                :data="item"
                @mobile_verify_change_pic_cb="mobile_verify_change_pic_cb"
                @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
                @mobile_verify_submit_cb="mobile_verify_submit_cb"></fxd-mobileVerify>


        <h2>无图形验证码有提交按钮</h2>
        <fxd-mobileVerify
                submit="true"
                :data="item2"
                @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
                @mobile_verify_submit_cb="mobile_verify_submit_cb"></fxd-mobileVerify>

    </div>
</template>
<style lang="scss" scoped>
    h2{
        font-size: .32rem;
        margin:1rem auto;
    }
</style>
<script type="text/ecmascript-6">
    import {Toask} from '../../../build/';
    export default{
        data(){
            return{
                item:{
                    mobile:{
                        val:'',
                    },
                    imgCode:{
                        iconUrl:'',
                        val:'',
                    },
                    code:{
                        val:'',
                    },
                },
                item2:{
                    mobile:{
                        val:'',
                    },
                    code:{
                        val:'',
                    },
                }
            }
        },
        methods:{
            mobile_verify_change_pic_cb(){
                Toask('切换图片的操作')
            },
            mobile_verify_send_code_cb(){
                Toask('发送验证码的操作')
            },
            mobile_verify_submit_cb(){
                Toask('提交按钮的操作')
            }
        }
    }
</script>
