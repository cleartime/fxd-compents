## 这个是Alert组件


::: 使用方法
```js
import { Alert } from 'fxd-component-example'
Alert('alert');
// 如果需要弹出提示内容比如一段html既可用以下方式
Alert({
    title:'alert',
    content:'alert'
});
// Alert会返回promise，data是个boolean值既你点击的是取消还是确定
Alert({
    title:"alert",
    content:'<div>alert</div>'
}).then((data)=>{
    //点击之后进行的操作
})
```

::: Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题，**必选参数** | string | — | — |
| content | 内容,可以插入html | string | - | - |

