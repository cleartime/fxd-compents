<template>
    <div>
        <fxd-mobileVerify
        type="imgCode"
        :data="item"
        @mobile_verify_change_pic_cb="mobile_verify_change_pic_cb"
        @mobile_verify_send_code_cb="mobile_verify_send_code_cb"
        @mobile_verify_submit_cb="mobile_verify_submit_cb"></fxd-mobileVerify>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                item:{
                    mobile:{
                        icon:'',
                        val:'',
                    },
                    imgCode:{
                        icon:'',
                        iconUrl:'',
                        val:'',
                    },
                    code:{
                        icon:'',
                        val:'',
                    },

                },
            }
        },
        methods:{
            mobile_verify_change_pic_cb(){

            },
            mobile_verify_send_code_cb(){

            },
            mobile_verify_submit_cb(){

            }
        }
    }
</script>
