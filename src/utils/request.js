import Taro from '@tarojs/taro'
import C from '../config/config'

const requestHttps = function( url,method,data,success,err){
    var _ = this;
    Taro.showLoading({
        title: '请稍后...'
      })
    Taro.request({
    url: C.url+url,
    data: data,
    method:method,
    complete:function(){
       Taro.hideLoading(); 
    },
    success:function(res){
      Taro.hideLoading();
      console.log(res)
      success.call(_,res.data)
    },
    fail:function(){
        err.call(_,"请求失败!")
    },
    // header: {'content-type': 'application/json'}
    })
}
export default requestHttps;