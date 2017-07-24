## 这个是MobileVerify组件

## 这个是CellPicker组件

::: 使用方法
```html
<template>

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


</template>
```

```js
 export default{
        data(){
            return{
                item:{
                    mobile:{
                        val:'',
                    },
                    imgCode:{   // 此数据对象不存在则不现实图形验证码
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
                console.log('切换图片的操作')
            },
            mobile_verify_send_code_cb(){
                console.log('发送验证码的操作')
            },
            mobile_verify_submit_cb(){
                console.log('提交按钮的操作')
            }
        }
    }
```

::: Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data |  数据 | object |- | - |
| type | 验证码类型 | string | imgCode为显示图形验证码，默认不显示 | - |
| submit | 是否显示确定按钮 | boolean | - | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| mobile_verify_change_pic_cb | 切换图片的回调 | - |
| mobile_verify_send_code_cb | 发送验证码的回调 | - |
| mobile_verify_submit_cb | 提交按钮的回调 | - |


