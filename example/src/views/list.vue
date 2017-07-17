<template>
  <div>
    这个是list页面
    <div v-if="who.Cell">
      <fxd-cell></fxd-cell>
    </div>
    <div v-if="who.Button">
      <fxd-button></fxd-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
    import FxdLoading from "../../../src/components/common/loading/loading";
    import FxdButton from "../../../src/components/common/button/button";
  export default{
    data(){
      return{
          who:{}
      }
    },
    computed:{
    },
    mounted() {

    },
    components:{
        FxdButton, FxdLoading
    },
    methods:{
    },
    watch: {
        '$route' (val) {
            this.who = {};
            if(!!val)
               this.who[val.query.name] = true;
        }
    }
  }
</script>
