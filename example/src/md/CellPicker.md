## 这个是CellPicker组件

::: 使用方法
```html
<template>

    <fxd-cellPicker :data="list" valueKey="desc_" @cell_picker_submit_cb="cell_picker_submit_cb"></fxd-cellPicker>

</template>
```

```js
export default{
        data(){
          return {
              list:{
                  placeholder:'请选择借款用途', //提示语
                  values: [{
                      "id_": "9c7c91c7b6c7436691bc2c89c65d953a",
                      "code_": "1",
                      "desc_": "资金周转",
                      "status_": "1",
                      "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a",
                      'tip':'你快要破产了'
                  },
                      {
                          "id_": "bfcaf33c5f3d4afba355893849e54c4e",
                          "code_": "2",
                          "desc_": "购物",
                          "status_": "1",
                          "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a",
                          'tip':'你是个败家的'
                      },
                      {
                          "id_": "e9380580f0fa4d308fb0e753b793415d",
                          "code_": "3",
                          "desc_": "旅游",
                          "status_": "1",
                          "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a",
                          'tip':'你是个多动症患者'
                      },
                      {
                          "id_": "e59ef2ff6e3d44078be2d4ade17b7269",
                          "code_": "4",
                          "desc_": "医疗",
                          "status_": "1",
                          "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a",
                          'tip':'你要快要狗带了'
                      },
                      {
                          "id_": "7b731966a9d148b18191d01f39bf81f9",
                          "code_": "5",
                          "desc_": "教育",
                          "status_": "1",
                          "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a",
                          'tip':'你是个小学生'
                      },
                      {
                          "id_": "bc744d6769b34df7896e8b3249aad675",
                          "code_": "6",
                          "desc_": "其它",
                          "status_": "1",
                          "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a",
                          'tip':'你你你'
                      }]
              },
          }
        },
        methods:{
            cell_picker_submit_cb(cb){
                Toask(`你选择了${cb[0].desc_}，你的code值为${cb[0].code_}`)
            }
        },
    }
```

::: Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data |  数据 | object |- | - |
| valueKey | 要显示的key值 | string | - | - |



### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| cell_picker_submit_cb | 点击确定的回调 | 返回当前对象 |

