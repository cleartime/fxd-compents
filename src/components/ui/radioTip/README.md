# fxd-compents-radioTip


## 参数详解


```
tick(bool): 是否选中，默认选中
agreeText(string): 文字
tipList(arr|string): 比如借款协议，数组形式也可以是一个string


tick_cb(fu)：点击单选的callback返回bool
tip_cb(fu)：点击协议的callback返回2个参数，第一个是当前值，第二个是index
```


## 举个栗子
<radioTip :tick="false" :agreeText="'同意发薪贷'" :tipList="['注册协议','隐私保密协议']" @tick_cb="tick_cb" @tip_cb="tip_cb"></radioTip>

