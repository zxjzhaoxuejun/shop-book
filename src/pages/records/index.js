import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image} from '@tarojs/components'
import Footer from '../../components/footer/footer';
import requestHttps from '../../utils/request'
import Pic from '../../config/config'
import './record.less'

export default class Records extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      list:[],
    };
  }

/**
   * 商品详情
   * @param {*} id
   */
  shopDetails(id,e) {
    Taro.navigateTo({
      url: `../../pages/detail/index?id=${id}`
    });
  }

  /**
   * 未支付调用支付接口再次支付
   * 支付成功或者失败的订单，放弃再次支付
   */
  paySubmit(e){
    console.log(e.currentTarget.dataset)
    if(e.currentTarget.dataset.type=='未支付'){
      Taro.navigateTo({
        url: `http://www.sieia.org/index.php/index/pay/submit?order_number=${
          e.currentTarget.dataset.num
        }`
      });
    }
  }

  config = {
    navigationBarTitleText: '购买记录'
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
    
    requestHttps('shops/orderlists','GET',{uid:isUser.tel},(res)=>{
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
      <View className='record'>
        {this.state.list.map((item)=>{
          return(
            <View className='record-list'>
              <View className='record-con'>
                <Image onClick={this.shopDetails.bind(this,item.id)} src={Pic.imgUrl+item.img} alt='商品封面图'className='shop-img'></Image>
                <View className='title' onClick={this.shopDetails.bind(this,item.id)}>{item.shop_name}</View>
                <View className='money'>
                  <Text className='price'>￥{item.price}</Text>
                  <Text className='num'>X {item.buy_num}</Text>
                  <Text className='pay-staus' onClick={this.paySubmit.bind(this)} data-type={item.status} data-money={item.allmoney} data-num={item.order_number}>{item.status}</Text>
                </View>
              </View>
              <View className='record-count'>
                共计{item.buy_num}件商品 合计：￥{item.allmoney}
              </View>
            </View>
          )
        })}
        <Footer></Footer>
      </View>
    )
  }
}

