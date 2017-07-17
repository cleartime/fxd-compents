/**
 * Created by gxx on 2017/7/17.
 */

/**
 * 数组克隆，通过和一个空函数的合并，即可实现我们的克隆功能。
 * @param arr
 * @returns {Array.<*>}
 */
export const arrayClone = (arr)=>{
    return [].concat(arr);
}