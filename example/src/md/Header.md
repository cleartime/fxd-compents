## 这个是Header组件

::: 使用方法
```html
<template>

      <fxd-header title="这是标题"/> // 形如<fxd-header></fxd-header>可以简写为<fxd-header/>

      <fxd-header title="这是标题" backSwitch="false"/>

      <fxd-header  title="这是标题">
          <img height="50%" src="/" alt="">
      </fxd-header>

      <fxd-header title="我可以直接跳到alert组件页面" @header_back_cb="header_back_cb" backUrl='true'/>

</template>
```

::: Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| backSwitch |  返回按钮的显示 | boolean | - | true |
| title | 标题 | string | - | - |



### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| header_back_cb | 点击返回的回调，此时backUrl为true | - |
