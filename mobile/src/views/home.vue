<template>
    <div class="home">
        <div class="nav">
            <h2 class="base">基础组件</h2>
            <ul>
                <li v-for="(i,index) in navList" @click="linkto(i)">{{i}}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .home{
        font-size: .32rem;
        h2{
            padding: .5rem 0;
            font-size: .64rem;
            text-align:center;
            color: #2c3e50;
        }
        ul{
            list-style: none;
            margin:0;
            -webkit-padding-start:0;
            li{
                padding-left:.5rem;
                line-height: 2.5;
                position: relative;
                &:active{
                    background:#ccc;
                }
                &:after{
                    border: 2px solid #c8c8cd;
                    border-bottom-width: 0;
                    border-left-width: 0;
                    content: " ";
                    top: 50%;
                    right: 20px;
                    position: absolute;
                    width: .2rem;
                    height: .2rem;
                    transform: translateY(-50%) rotate(45deg);
                }
            }
        }
    }

</style>

<script>
    import FxdUi from '../../../build/';
    import FxdHeader from "../../../src/components/ui/header/header";
    export default {
        components: {FxdHeader}, name: 'home',
        data() {
            return {
                whichIndex:null
            }
        },
        computed:{
            navList(){
                return Object.keys(FxdUi).filter((t,i)=>i>1).sort();
            }
        },
        mounted() {
        },
        methods:{
            linkto(i){
                this.$router.push({ path: i})
            }
        },
    }
</script>

