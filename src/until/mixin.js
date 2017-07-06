/**
 * Created by gxx on 2017/7/6.
 */
import toask from '../components/common/toask/toask.vue'
export const toaskMixin = {
    data(){
        return{
            toaskSwitch:false,
            toaskSwitchTime:null,
        }
    },

    components: {
        toask,
    },
    methods:{
        toask_switch(){
            clearTimeout(this.toaskSwitchTime);
            this.toaskSwitch = !this.toaskSwitch;
            this.toaskSwitchTime = setTimeout(()=>{
                this.toaskSwitch = !this.toaskSwitch;
            },1000)
        }
    }

};
