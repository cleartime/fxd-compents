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

let msgQueue = [];
let currentMsg=null;
let Alert = (options = {}) => {
    let title = ''; //标题
    let content = ''; //内容
    if(typeof options === 'string'){
        title = options; //标题
    }else{
        title = options.title; //标题
        content = options.content; //内容
    }


    let instance = getAnInstance();

    Vue.nextTick(() => {
        instance.visible = true;
        document.body.appendChild(instance.$el);
        instance.title = title
        instance.content = content
    });

    return new Promise(function(resolve, reject) { // eslint-disable-line
        msgQueue.push({
            resolve,
            reject
        });
        currentMsg = msgQueue.shift();
        instance.callback = defaultCallback;
    });

};

const defaultCallback = action => {
    currentMsg.resolve(action);
};


export default Alert;
