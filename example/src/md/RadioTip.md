## 这个是RadioTip组件

### 基本用法

```html
<template>
  <fxd-radio-tip :tipList="tipList" agreeText="同意发薪贷"></fxd-radio-tip>
</template>
```

```js
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                tipList:['注册协议','隐私保密协议']
            }
        }
    }
</script>
```
### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| tipList | 数据列表 | array | — | — |
| agreeText | 提示语 | string | - | - |

