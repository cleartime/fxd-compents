<template>
  <div>
    <h2>{{name}}组件部分</h2>
    <FxdLoading v-if='who.Loading'></FxdLoading>
  </div>
</template>
<style lang="scss" scoped>
  h2{
    font-size: .65rem;
    margin:0;
  }
</style>
<script type="text/ecmascript-6">
    import FxdLoading from "../components/loading.vue";
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
        FxdLoading
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
