<template>
  <div>
    <!--<alert :msg="msg"></alert>-->
    <!--<toask :msg='msg'></toask>-->
    <!--<fmask/>-->
    <!--<fxd-header title="这是标题" @header_back_cb="header_back_cb"/>-->
    <!--<actionsheet></actionsheet>-->
    <!--<cell1cell :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message" @text_input_cb="val=>{item.message=cell1cell>&ndash;&gt;&ndash;&gt;-->
    <!--<cell1cell :showIcon="true" :showCode="true" :iconUrl="icon" :placeholder='placeholder' :type="type" :model="item.message2" @text_input_cb="val=>{item.message2=cell1cell>&ndash;&gt;&ndash;&gt;-->
    <!--<loading></loading>-->
            <!--:data="item"-->
            <!--@mobile_verify_img_cb="mobile_verify_img_cb"-->
            <!--@mobile_verify_sendcode_cb="mobile_verify_sendcode_cbmobileVerify1rify>-->
    <!--<div @click="submit">提交</div>-->
    <!--<fmask></fmask>-->
    <!--<fxd-button @click.native="submit">确定</fxd-button>-->
    <!--<cell v-model="type" @input.native="e=>type=e.target.value" type="mobile" :verify="false"></cell>-->
        <!--<mobileVerify-->
                      <!--:data="item"-->
                      <!--@mobile_verify_change_pic_cb="mobile_verify_change_pic_cb"-->
                      <!--@mobile_verify_send_code_cb="mobile_verify_send_code_cb"-->
                      <!--@mobile_verify_submit_cb="mobile_verify_submit_cb"></mobileVerify>-->
      <!--<cellPicker :data="list" valueKey="desc_" @cell_picker_submit_cb="cell_picker_submit_cb"></cellPicker>-->
    <!--<cellPicker :data="list1" @cell_picker_submit_cb="cell_picker_submit_cb"></cellPicker>-->
      <!--<picker :data="list" valueKey="desc_"></picker>-->
      <!--<picker :data="list2"></picker>-->
    <cell inputType="password"></cell>
  </div>
</template>

<style lang="scss">
  @import './lib/transition.css';
  @import './lib/reset.css';
  @import 'lib/config';
</style>

<script>
import actionsheet from './components/common/actionsheet/actionsheet.vue'
import fmask from './components/common/mask/mask.vue'
import Alert from './components/common/alert/'
import Loading from './components/common/loading/'
import button from './components/common/button/button.vue'

import picker from './components/ui/picker/picker.vue'
import cellPicker from './components/ui/cellPicker/cellPicker.vue'
import cell from './components/ui/cell/cell.vue'
import radioTip from './components/ui/radioTip/radioTip.vue'
import header from './components/ui/header/header.vue'

import {bus} from './until/evenbus'
import mobileVerify from './components/feature/mobileVerify/mobileVerify.vue'
  export default {
    name: 'app',
    data() {
      return {
          msg:'确定要退出么',
          placeholder:'请输入电话号码',
          type:'sfsdfds',
          list2:{
              placeholder:'请选择借款用途1', //提示语
              values:[{
                  flex: 1,
                  values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                  className: 'slot1',
                  textAlign: 'right'
              }, {
                  divider: true,
                  content: '-',
                  className: 'slot2'
              }, {
                  flex: 1,
                  values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                  className: 'slot3',
                  textAlign: 'left'
              }]
          },
          list:{
              placeholder:'请选择借款用途', //提示语
              values: [{
                  "id_": "9c7c91c7b6c7436691bc2c89c65d953a",
                  "code_": "1",
                  "desc_": "资金周转",
                  "status_": "1",
                  "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a"
                  },
                  {
                      "id_": "bfcaf33c5f3d4afba355893849e54c4e",
                      "code_": "2",
                      "desc_": "购物",
                      "status_": "1",
                      "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a"
                  },
                  {
                      "id_": "e9380580f0fa4d308fb0e753b793415d",
                      "code_": "3",
                      "desc_": "旅游",
                      "status_": "1",
                      "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a"
                  },
                  {
                      "id_": "e59ef2ff6e3d44078be2d4ade17b7269",
                      "code_": "4",
                      "desc_": "医疗",
                      "status_": "1",
                      "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a"
                  },
                  {
                      "id_": "7b731966a9d148b18191d01f39bf81f9",
                      "code_": "5",
                      "desc_": "教育",
                      "status_": "1",
                      "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a"
                  },
                  {
                      "id_": "bc744d6769b34df7896e8b3249aad675",
                      "code_": "6",
                      "desc_": "其它",
                      "status_": "1",
                      "dic_index_id_": "a5ecbe4804354f22be6d64b2f93cc20a"
                  }]
          },
          item:{
              mobile:{
//                  icon:require('./public/img/mobile.png'),
                  val:'',
              },
              imgCode:{
//                  icon:require('./public/img/code.png'),
                  iconUrl:'',
                  val:'',
              },
              code:{
//                  icon:require('./public/img/code.png'),
                  val:'',
              },

          },
      }
    },
    components: {
        fmask,
        actionsheet,
        cellPicker,
        cell,
        radioTip,
        mobileVerify,
        picker,
        'fxd-header':header,
        'fxd-button':button
    },
    mounted() {
    },
    methods: {
        submit(){
          console.log(this.type)
        },
        mobile_verify_change_pic_cb(){
            console.log(3)
        },
        mobile_verify_send_code_cb(){
            console.log(1)
        },
        mobile_verify_submit_cb(){
            console.log(2)
        },
        cell_picker_submit_cb(data){
            console.log(data)
        },
        header_back_cb(){
            console.log(33)
        }
    }
  }
</script>

