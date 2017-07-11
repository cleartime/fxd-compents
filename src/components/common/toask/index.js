/**
 * Created by gxx on 2017/7/10.
 */

import Vue from 'vue';
var toask = require('./toask.vue');


const ToastConstructor = Vue.extend(toask); //获取toask构造器
let toastPool = [];  //

let getAnInstance = () => { //获取当前的实例
    if (toastPool.length > 0) {
        let instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

let returnAnInstance = instance => {
    if (instance) {
        toastPool.push(instance);
    }
};

let removeDom = event => {   //移除dom节点
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

ToastConstructor.prototype.close = function() { //关闭toask
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

let Toast = (options = {}) => {
    let duration = options.duration || 2000; //延迟时间

    let instance = getAnInstance();
    instance.closed = false;
    clearTimeout(instance.timer);
    instance.message = typeof options === 'string' ? options : options.message;

    document.body.appendChild(instance.$el);
    Vue.nextTick(function() {
        instance.visible = true;
        instance.$el.removeEventListener('transitionend', removeDom);
        instance.timer = setTimeout(function() {
            if (instance.closed) return;
            instance.close();
        }, duration);
    });
    return instance;
};

export default Toast;
