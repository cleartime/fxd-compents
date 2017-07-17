# fxd-compents-testInput


## 参数详解


```
type类型和regular.js里面的type对应
readonly只读
verify是否校验，默认校验的，不要求校验的话:verify="false"就行了
placeholder默认提示
maxlength最大长度默认是规则里面的maxlength
```


## 举个栗子

<fxd-cell v-model="abc" @input.native="e=>abc=e.target.value" type="mobile" readonly :verify="false"></fxd-cell>

