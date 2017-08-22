/**
 * Created by gxx on 2017/7/6.
 */
const json = [{
    type:'name',
    name:'姓名',
    maxlength:6,
    textType:'text',
    reg:/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/
},{
    type:'idCard',
    name:'身份证号码',
    maxlength:18,
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
    reg:/^\S{0,6}$/
},{
    type:'password',
    name:'密码',
    maxlength:'',
    textType:'password',
    reg:/$/
}]
export default json