<template>
  <div>
    <h2>{{name}}组件部分</h2>
    <Loading v-if='who.Loading'></Loading>
    <Actionsheet v-if='who.Actionsheet'></Actionsheet>
    <Alert v-if='who.Alert'></Alert>
    <Btn v-if='who.Button'></Btn>
    <Cell v-if='who.Cell'></Cell>
    <CellPicker v-if='who.CellPicker'></CellPicker>
    <Fxd-Mask v-if='who.Mask'></Fxd-Mask>
    <MobileVerify v-if='who.MobileVerify'></MobileVerify>
    <Picker v-if='who.Picker'></Picker>
    <RadioTip v-if='who.RadioTip'></RadioTip>
    <Toask v-if='who.Toask'></Toask>
  </div>
</template>
<style lang="scss" scoped>
  h2{
    font-size: .65rem;
    margin:.5rem 0;
  }
</style>
<script type="text/ecmascript-6">
    import Loading from "../components/loading.vue";
    import Actionsheet from "../components/actionsheet.vue";
    import Alert from "../components/alert.vue";
    import Btn from "../components/button.vue";
    import Cell from "../components/cell.vue";
    import CellPicker from "../components/cellPicker.vue";
    import Mask from "../components/mask.vue";
    import MobileVerify from "../components/mobileVerify.vue";
    import Picker from "../components/picker.vue";
    import RadioTip from "../components/radioTip.vue";
    import Toask from "../components/toask.vue";
  export default{
    data(){
      return{
          who:{},
          name:''
      }
    },
    computed:{
    },
    mounted() {
    },
    components:{
        Loading,
        Actionsheet,
        Alert,
        Btn,
        Cell,
        CellPicker,
        'Fxd-Mask':Mask,
        MobileVerify,
        Picker,
        RadioTip,
        Toask
    },
    methods:{
    },
    watch: {
        '$route' (val) {
            this.who = {};
            this.name = val.query.name;
            if(!!val)
               this.who[val.query.name] = true;
        }
    }
  }
</script>
