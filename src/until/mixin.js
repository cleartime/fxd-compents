/**
 * Created by gxx on 2017/7/6.
 */
export const verify = {
    data(){
        return{
            requiredChildrenList:[],//验证过的list数组
            childrenList:[],
            childrenFilterList:[],
            requiredNextChildren:null,//验证下一个元素
        }
    },
    computed: {
        childrenTrulyList(){
            return this.$children.filter(t=>{//过滤需要验证的cell
                if(t.$options._componentTag === 'cell'&&t.myVerify)
                    return t
            })
        },
    },
    methods:{
        /**
         * 验证的函数
         * @param children 传入一个数组里面是要过来的组件按顺序排列
         * @returns {Promise} 只返回验证成功
         */
        required(children){
            this.childrenList = !!children ? [...children] : this.childrenTrulyList; //过滤之后的数组

            return new Promise( (resolve )=> { // 只返回验证成功不返回验证失败，只许成功不许失败
                let i=0;
                do{
                    if(this.requiredNextChildren===null || this.requiredNextChildren==this.childrenList[i]){ // 开始的时候或者一下个要验证的数组才进行验证
                        this.childrenList[i].blur();
                    }
                    if(!this.requiredChildrenList.length){
                        break
                    }
                    i++;

                    if(this.requiredChildrenList.length>=this.childrenList.length){ // 都验证完成了才返回成功
                        resolve()
                    }
                }
                while (i<this.childrenList.length)
            })
        },
        /**
         *  组件上绑定的自定义时间@verify_cb="verify_cb",这个必须要写
         * @param children 当前组件
         */
        verify_cb(children){
            this.childrenList.forEach((t,i)=>{
                if(!~this.requiredChildrenList.indexOf(children)){ //去重
                    if(t === children){
                        this.requiredChildrenList.push(t);//如果验证通过加到requiredChildrenList数组里面去
                        if(i<this.childrenTrulyList.length){
                            this.requiredNextChildren = this.childrenTrulyList[i+1]; //取下一个要验证的cell之后会再do循环作对比
                        }
                    }
                }
            })
        }
    },
};







