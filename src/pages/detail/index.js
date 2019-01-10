import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image} from '@tarojs/components'
import {AtTabs,AtTabsPane,AtIcon,AtFloatLayout} from 'taro-ui'
import Banner from '../../components/banner/banner';
import './detail.less'


export default class Detail extends Component {
constructor(){
    super(...arguments)
    this.state={
      tabList:[
          { title: '商品详情' },
          { title: '评价' }
        ],
      current: 0,
      isOpened:false,
      buyNum:1,
      type:1,
      btnText:'确定',
      shopInfo:{
        shopName:'都会开始发生回复康师傅',
        price:99.00,
        stores:1000,
        img:'',
        content:'',
        sales:100
      }
    }
  }

  /**
   * tablist切换
   * @param {*} value 
   */
  handleClick (value) {
    this.setState({
      current: value
    })
  }

/**
 * 购买、收藏弹出选择信息
 */
  openBuyShop=(e)=>{
    console.log(e.target.dataset.type)
    let btnVal=''
    if(e.target.dataset.type==1){
      //加入购物车
      btnVal='加入购物车'
    }else{
      //下一步
      btnVal='下一步'
    }
    this.setState({
      isOpened:true,
      btnText:btnVal,
      type:e.target.dataset.type
    })
  }

  cart=(e)=>{
    //减
    if(this.state.buyNum<=0){
      return false;
    }else{
      this.setState({
      buyNum:this.state.buyNum-1,
      shopInfo:{
        shopName:this.state.shopInfo.shopName,
        price:this.state.shopInfo.price,
        stores:this.state.shopInfo.stores+1,
        img:this.state.shopInfo.img,
        content:this.state.shopInfo.content,
        sales:this.state.shopInfo.sales
      }
    })
    }
  }

  add=(e)=>{
    //加
    this.setState({
      buyNum:this.state.buyNum+1,
      shopInfo:{
        shopName:this.state.shopInfo.shopName,
        price:this.state.shopInfo.price,
        stores:this.state.shopInfo.stores-1,
        img:this.state.shopInfo.img,
        content:this.state.shopInfo.content,
        sales:this.state.shopInfo.sales
      }
    })
  }

  /**
   * 返回首页
   */
  goHome=(e)=>{
    Taro.navigateTo({
      url:`../../pages/index/index`
    })
  }

  nextDo=(e)=>{
    console.log(e.target.dataset.type)
    if(e.target.dataset.type==1){
      //购物车页面
    }else{
      //确定下单页面
      Taro.navigateTo({
        url:`../../pages/orders/orders`
      })
    }
  }

  config = {
    navigationBarTitleText: '商品详情'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let {shopInfo}=this.state
    return (
      <View className='detail-mode'>
        <Banner></Banner>
        <View className='detail-top'>
          <View className='title'>{shopInfo.shopName}</View>
          <View className='price'>￥{shopInfo.price}</View>
          <View className='tags'>
            <Text>运费:￥10.00</Text>
            <Text>剩余:{shopInfo.stores}</Text>
            <Text>销量:{shopInfo.sales}</Text>
          </View>
        </View>
        <View className='push-mode'>
          <Text>配送方式:</Text>
          <Text className='push-val'>快递</Text>
        </View>
        
        <View className='detail-con'>
          <AtTabs
            current={this.state.current}
            scroll
            tabList={this.state.tabList}
            onClick={this.handleClick.bind(this)}
          >
          <AtTabsPane className='detail-con-item' current={this.state.current} index={0}>
            内容
          </AtTabsPane>
          <AtTabsPane className='detail-con-item' current={this.state.current} index={1}>
            评价
          </AtTabsPane>
        </AtTabs>
        </View>

        <View className='buy-footer'>
          <View className='home' onClick={this.goHome}>
            <AtIcon value='home' color='#999'></AtIcon>
            <Text className='text'>首页</Text>
          </View>
           <View className='home'>
            <AtIcon value='shopping-cart' color='#ff1000'></AtIcon>
            <Text className='text'>购物车</Text>
          </View>
          <View className='join-car' data-type='1' onClick={this.openBuyShop.bind(this)}>加入购物车</View>
          <View className='go-buy' data-type='2' onClick={this.openBuyShop.bind(this)}>立即购买</View>
        </View>
        <AtFloatLayout isOpened={this.state.isOpened} onClose={this.handleClose}>
          <View className='shop-title'>
            <Image src={require('../../assets/imgs/banner_01.jpg')} className='img'>
            </Image>
            <View className='name'>
              <Text>{shopInfo.shopName}</Text>
              <Text className='price'>￥{shopInfo.price}</Text>
            </View>
          </View>
          <View className='shop-num'>
            <View className='sy-num'>
              <Text>购买数量:</Text>
              <Text className='sy-text'>剩余{shopInfo.stores}件</Text>
            </View>
            <View className='add-mode'>
              <Text className='cart' onClick={this.cart.bind(this)}>-</Text>
              <Text className='value'>{this.state.buyNum}</Text>
              <Text className='add' onClick={this.add.bind(this)}>+</Text>
            </View>
          </View>
          <View className='btn' data-type={this.state.type} onClick={this.nextDo.bind(this)}>{this.state.btnText}</View>
        </AtFloatLayout>
      </View>
    )
  }
}