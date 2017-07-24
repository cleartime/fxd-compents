<template>
  <div id="app">
    <div class="nav">
      <h2 class="base">基础组件</h2>
      <ul>
        <li v-for="(i,index) in navList" @click="linkto(i,index)"><span :class="[index===whichIndex?'act':'']">{{i}}</span></li>
      </ul>
    </div>
    <router-view class="body"></router-view>
    <div class="iframe">
      <iframe :src="url" frameborder="0" width="100%" height="525px"></iframe>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../node_modules/highlight.js/styles/github.css';
  #app{
    display: flex;
    flex-direction: row;
    font-size: .32rem;
    font-weight: 600;
    color: #7f8c8d;
    h2{
      color: #2c3e50;
    }
    ul{
      list-style: none;
      li{
        line-height: 2;
        span:hover{
          cursor:pointer;
          border-bottom:2px solid #42b983;
        }
        span.act{
          color:#42b983
        }
      }
    }
    .nav{
      height: 100%;
      overflow-y: auto;
      width: 5rem;
      position: fixed;
      left: 1rem;
    }
    .body{
      position: absolute;
      left: 7rem;
      width: 20rem;
      &>h2, &>h3, &>h4, &>h5 {
        font-weight: 400;
        color: #1f2f3d;
      }
      &>pre{
        line-height: 1.8;
        font-family: Menlo,Monaco,Consolas,Courier,monospace;
        font-size: 12px;
        padding: 18px 24px;
        background-color: #f9fafc;
        border: 1px solid #eaeefb;
        margin-bottom: 25px;
        border-radius: 4px;
        -webkit-font-smoothing: auto;
      }
      &>table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        color: #5e6d82;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.5em;

      }
      &>table td:first-child, &>table th:first-child {
        padding-left: 10px;
      }
      &>table td, &>table th {
        border-bottom: 1px solid #eaeefb;
        padding: 10px;
        max-width: 250px;
      }
      &>table th {
        text-align: left;
        border-top: 1px solid #eaeefb;
        background-color: #eff2f7;
        white-space: nowrap;
      }
    }
    .iframe{
      background: url('./assets/funny.png') no-repeat;
      background-size: 100%;
      position: fixed;
      width: 300px;
      right: 2rem;
      top:50%;
      margin-top: -388px;
      height: 610px;
      padding: 83px 20px;
      iframe{
        /*background: #fff;*/
      }
    }
  }
  @media screen  and (max-width: 414px) {
  }

</style>

<script>
    import FxdUi from '../../build/';
  export default {
      name: 'app',
    data() {
      return {
          whichIndex:null,
          url:'http://192.168.6.133/fxd-component-mobile',
      }
    },
    computed:{
        navList(){
            return Object.keys(FxdUi).filter((t,i)=>i>1).sort();
        },
    },
    mounted() {
    },
    methods:{
        linkto(i,index){
            this.whichIndex = index;
            this.$router.push({ path: i});
            this.url = `http://192.168.6.133/fxd-component-mobile/#/${i}`
        }
    },
  }


</script>

