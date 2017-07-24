## 这个是Cell组件

::: 使用方法
```html
<template>
    <fxd-cell :placeholder="item.placeholder"></fxd-cell>

    <fxd-cell :placeholder="item.placeholder1" readonly></fxd-cell>

    <fxd-cell :placeholder="item.placeholder2" maxlength="5"></fxd-cell>

    <fxd-cell :placeholder="item.placeholder3" error></fxd-cell>

    <fxd-cell  v-model="item.val5" inputType="mobile"></fxd-cell>

    <fxd-cell  v-model="item.val5" inputType="mobile" :verify="true"></fxd-cell>

    <fxd-cell  v-model="item.val" :placeholder="item.placeholder"></fxd-cell>


    <fxd-cell  v-model="item.val2" :placeholder="item.placeholder" type="imgText" >
        <img width="100%" src="/" alt="" slot="imgText">
    </fxd-cell>

    <fxd-cell  type="btnText"  v-model="item.val3"  :placeholder="item.placeholder">
        <fxd-button slot="btnText" type="inset" >确定</fxd-button>
    </fxd-cell>


    <fxd-cell type="all"   v-model="item.val4" :placeholder="item.placeholder">
        <img width="100%" src="/" alt="" slot="imgText">
        <fxd-button slot="btnText" type="inset" >确定</fxd-button>
    </fxd-cell>
</template>
```

```js
<script type="text/ecmascript-6">
    export default{
        data(){
          return{
              item:{
                  placeholder:'提示框',
                  placeholder1:'只读',
                  placeholder2:'控制最大长度5',
                  placeholder3:'错误提示',
                  val:'输入框',
                  val2:'左边是个图片',
                  val3:'右边是个按钮',
                  val4:'左边图片右边按钮',
                  val5:'空的什么也不验证',
                  verify:false,
              }
          }
        }
    }
</script>
```
::: Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model |  绑定的数据 | - | object | - |
| placeholder | 提示 | string | - | - |
| readonly | 是否只读 | - | - | false |
| maxlength | 最大长度 | number | - | - |
| error | 错误提示 | - | - | false |
| inputType | 验证类型 | string | 此属性对应规则数组，如填写则一切都根据规则数组来验证 | - |
| type | 样式类型 | string | imgText为左边添加通常为图片，btnText为右边添加通常为按钮，all左右都能添加 |- |
| verify | 是否验证 | bool | - | false |


::: 规则数组config
```js
[{
    type:'name',
    name:'姓名',
    maxlength:6,
    textType:'text',
    reg:/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/
},{
    type:'idCard',
    name:'身份证号码',
    maxlength:15,
    textType:'number',
    reg:/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/
},{
    type:'mobile',
    name:'手机号',
    maxlength:11,
    textType:'number',
    reg:/^(1[3|4|5|7|8][0-9])\d{8}$/
},{
    type:'code',
    name:'手机验证码',
    maxlength:6,
    textType:'text',
    reg:/^\d{0,6}$/
},{
    type:'imgCode',
    name:'图形验证码',
    maxlength:6,
    textType:'text',
    reg:/^\d{0,6}$/
}]
```