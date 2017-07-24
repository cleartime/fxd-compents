<template>
  <div id="app">
    <fxd-header :title="title" v-if="backSwitch" class="fxd-header"/>
    <router-view class="body"></router-view>
  </div>
</template>

<style lang="scss" scoped>
  #app{
  .fxd-header{
    }
    .body{
      width: 90%;
      margin: 1.5rem auto 0;
    }

  }

</style>

<script>
  export default {
      name: 'app',
    data() {
      return {
          title:'',
          backSwitch:false
      }
    },
    computed:{
    },
    mounted() {
        this.route();
    },
    methods:{
          route(to){
              this.backSwitch = false;
              if(!to){
                  to = this.$route
              }
              let path = to.path.slice(1);
              if(!!path){
                  this.backSwitch = true;
                  this.title = path
              }
          }
    },
      watch:{
          '$route'(to){
              this.route(to)
          }
      }
  }
</script>

