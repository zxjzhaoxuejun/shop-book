import Taro from '@tarojs/taro'

/**
 * 
 * @param {手机号} val 
 * @param {错误提示信息} msg 
 */
export const isPhone = function(val){
    let reg= /^1[0-9]{10}$/;
    if(!reg.test(val)){
        return false;
    }else{
      return true
    }
}


/**
 * 必填
 * @param {姓名，昵称} val 
 * @param {错误提示} msg 
 */
export const isRquire = function(val){
    if(val==''){
      return false
    }else{
      return true;
    }
}

/**
 * 
 * @param {邮箱} val 
 * @param {提示信息} msg 
 */
export const isEmail = function(val){
    let reg= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!reg.test(val)){
      return false;
    }
}

/**
 * 
 * @param {字符长度} val 
 * @param {*} min
 * @param {*} max
 */
export const isPassword = function(val,min,max){
    if(val.length<min){
      return false
    }else if(val.length>max){
      return false
    }else{
      return true
    }
}
