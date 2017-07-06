/**
 * Created by gxx on 2017/7/6.
 */
const json = [{
    type:'name',
    name:'姓名',
    reg:/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/
},{
    type:'idCard',
    name:'身份证号码',
    reg:/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/
},{
    type:'mobile',
    name:'手机号',
    reg:/^(1[3|4|5|7|8][0-9])\d{8}$/
},{
    type:'code',
    name:'手机验证码',
    reg:/^\d{0~6}$/
},]
export default json