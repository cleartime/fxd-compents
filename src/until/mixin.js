/**
 * Created by gxx on 2017/7/6.
 */
import toask from '../components/common/toask/toask.vue'
export const toaskMixin = {
    data(){
        return{
            toaskSwitch:false,
            toaskSwitchTime:null,
            time1:null,
            time2:null,
            _timeInterval:null,
            timeIntervalnum:2,
        }
    },
    components: {
        toask,
    },
    methods:{
        toask_switch(){
            if(!this.time1&&!this.time2){
                this.time1 = +new Date();
            }else if(!!this.time1&&!this.time2){
                this.time2 = +new Date();
            }else{
                if(this.time2>this.time1){
                    this.time1 = +new Date();
                }else{
                    this.time2 = +new Date();
                }
            }
            if(!!this.time1&&!!this.time2){
                if(this.time1>this.time2){
                    this._timeInterval = this.time1-this.time2
                }else{
                    this._timeInterval = this.time2-this.time1
                }
            }
            if(!!this._timeInterval&&((this._timeInterval/1000)<this.timeIntervalnum)){
                return false
            }else{
                clearTimeout(this.toaskSwitchTime);
                this.toaskSwitch = !this.toaskSwitch;
                this.toaskSwitchTime = setTimeout(()=>{
                    clearTimeout(this.toaskSwitchTime);
                    this.toaskSwitch = !this.toaskSwitch;
                },this.timeIntervalnum*1000)
            }

        }
    }

};
