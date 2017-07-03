# fxd-compents-testInput


## 参数详解


```
placeholder(string): 提示
inputType(string): 类型默认为text
model(string|obj): 同v-model
text_input_cb(fu): 必填，按照格式来`@text_input_cb="val=>{message=val}"`；message为model参数

showIcon(bool)：表示是否显示图片，默认靠左
iconRight(bool)：显示图片靠右（showIcon为true才生效）
iconUrl(string)：图片url（showIcon为true才生效）


showCode(bool)：是否显示验证码
timeInterval(number)：倒计时时间，默认为59
send_code_cb(fu)：点击验证码callback
```


## 举个栗子
<textInput :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message" @text_input_cb="val=>{item.message=val}"></textInput>

