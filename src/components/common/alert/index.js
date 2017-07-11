/**
 * Created by gxx on 2017/7/10.
 */

import Vue from 'vue';
var alert = require('./alert.vue');


const AlertConstructor = Vue.extend(alert); //获取toask构造器

let getAnInstance = () => { //获取当前的实例
    return new AlertConstructor({
        el: document.createElement('div')
    });
};

let removeDom = event => {   //移除dom节点
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

// AlertConstructor.prototype.close = function() { //关闭alert
    // this.visible = false;
    // this.$el.addEventListener('transitionend', removeDom);
    // this.closed = true;
    // returnAnInstance(this);
    // instance.visible = false;
    // msgQueue = [];
    // currentMsg = null;
    // console.log(this)
// };



let msgQueue = [];
let currentMsg=null;
let Alert = (options = {}, callback) => {
    let title = options.title || ''; //标题
    let content = options.content || ''; //内容
    // if (options.callback && !callback) {
    //     callback = options.callback;
    // }

    let instance = getAnInstance();
    instance.callback = function(a){
        return a
    }
    Vue.nextTick(() => {
        instance.visible = true;
        document.body.appendChild(instance.$el);
        instance.title = title
        instance.content = content
    });
    // instance.callback = new Promise(function (resolve,reject) {
    //     resolve()
    // })
    return new Promise(function(resolve, reject) { // eslint-disable-line
        msgQueue.push({
            callback: callback,
            resolve: resolve,
            reject: reject
        });
        currentMsg = msgQueue.shift();
        instance.callback = defaultCallback;
    });

};

const defaultCallback = action => {
    currentMsg.resolve(action);
};


export default Alert;
