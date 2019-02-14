import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import Lists from '../../components/lists/lists';
import Footer from '../../components/footer/footer';
import requestHttps from '../../utils/request'
import './carts.less'

export default class Carts extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      list:[],
    };
  }

  config = {
    navigationBarTitleText: '购物车'
  }

  componentWillMount () { }

  componentDidMount () {
    let isUser=Taro.getStorageSync('userInfo')
    if(!isUser){
      //判断用户是否登录，没有登录先去登录
      Taro.navigateTo({
        url: `../../pages/login/login`
      });
      return false
    }
    
    requestHttps('shops/cartlists','GET',{uid:isUser.tel},(res)=>{
      //请求成功
      console.log(res)
      if(res.code==1){
        this.setState({
          list:res.data,
        })
      }
    },(err)=>{
      //请求失败
      console.log(err)
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='carts'>
        <View className='count'>购物车共<Text className='num'>{this.state.list.length}</Text>件宝贝</View>
        <Lists shops={this.state.list}></Lists>
        <Footer></Footer>
      </View>
    )
  }
}

