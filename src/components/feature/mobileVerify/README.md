# fxd-compents-testInput


## 参数详解


```
type:类型  type="imgCode"显示图形验证码，否则不现实
submit:确定按钮 submit='true'显示
data:数据形如
    mobile:{
       icon:require('./public/img/mobile.png'),
       val:'',
   },
   imgCode:{
       icon:require('./public/img/code.png'),
       iconUrl:require('./public/img/code.png'),
       val:'',
   },
   code:{
       icon:require('./public/img/code.png'),
       val:'',
   }
mobile_verify_send_code_cb 发送验证码的自定义事件
mobile_verify_submit_cb 点击按钮自定义事件
mobile_verify_change_pic_cb 发送图形码的自定义事件
```


## 举个栗子


<mobileVerify type="imgCode" :data="item" @mobile_verify_change_pic_cb="mobile_verify_change_pic_cb" @mobile_verify_send_code_cb="mobile_verify_send_code_cb" @mobile_verify_submit_cb="mobile_verify_submit_cb"></mobileVerify>

