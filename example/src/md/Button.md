## 这个是Button组件

::: 使用方法
```html
<template>
    <fxd-button></fxd-button>

    <fxd-button> 我的宽度是90%</fxd-button>

    <fxd-button type="inset" >我的宽度不固定</fxd-button>

    <fxd-button disabled >我是不可点击的</fxd-button>

    <fxd-button type="inset" disabled>我的宽度不固定并且不可点击</fxd-button>

</template>
```

::: Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type |  按钮类型 | inset表示为内联元素 |string | 默认为块状元素宽度为90% |
| disabled | 能否点击 | boolean | - | - |

