import Taro, { Component} from '@tarojs/taro'
import { View,Text,Image} from '@tarojs/components'
import {AtTabs,AtTabsPane,AtIcon,AtFloatLayout,AtMessage} from 'taro-ui'
import Banner from '../../components/banner/banner';
import './detail.less'
import requestHttps from '../../utils/request';
import Pic from '../../config/config'


export default class Detail extends Component {
constructor(){
    super(...arguments)
    this.state={
      tabList:[
          { title: '商品详情' },
          { title: '评价' }
        ],
      current: 0,
      isOpenedMode:false,
      buyNum:0,
      type:1,
      btnText:'确定',
      shopInfo:{
        id:'',
        shop_name:'',
        price:0.00,
        stores:0,
        img:'',
        content:'',
        sales:0
      }
    }
  }

  /**
   * tablist切换
   * @param {*} value 
   */
  handleListClick= (e)=>{
    this.setState({
      current: e,
      isOpenedMode:false
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
      isOpenedMode:true,
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
        shop_name:this.state.shopInfo.shop_name,
        price:this.state.shopInfo.price,
        stores:this.state.shopInfo.stores+1,
        img:this.state.shopInfo.img,
        content:this.state.shopInfo.content,
        sales:this.state.shopInfo.sales,
        id:this.state.shopInfo.id
      }
    })
    }
  }

  add=(e)=>{
    //加
    this.setState({
      buyNum:this.state.buyNum+1,
      shopInfo:{
        shop_Name:this.state.shopInfo.shop_name,
        price:this.state.shopInfo.price,
        stores:this.state.shopInfo.stores-1,
        img:this.state.shopInfo.img,
        content:this.state.shopInfo.content,
        sales:this.state.shopInfo.sales,
        id:this.state.shopInfo.id
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
      if(this.state.buyNum==0){
        Taro.atMessage({
          //type为：success,error,warning
          message: "请选择商品数量!",
          type: "error"
        });
        return false
      }
        let id=this.state.shopInfo.id,
        sales=this.state.buyNum
      Taro.navigateTo({
        url:`../../pages/orders/orders?id=${id}&num=${sales}`
      })
    }
  }

  config = {
    navigationBarTitleText: '商品详情'
  }

  componentWillMount () {
     requestHttps(`shops/detail?id=${this.$router.params.id}`,'GET','',(res)=>{
       this.setState({
         shopInfo:res
       })
       console.log(res)
     },(err)=>{
        console.log(err)
     })
   }

  componentDidMount () {
    
   
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let {shopInfo}=this.state
    return (
      <View className='detail-mode'>
         <AtMessage />
        <Banner></Banner>
        <View className='detail-top'>
          <View className='title'>{shopInfo.shop_name}</View>
          <View className='price'>￥{shopInfo.price}</View>
          <View className='tags'>
            <Text>运费:￥10.00</Text>
            <Text>剩余:{shopInfo.stores}</Text>
            <Text>销量:{shopInfo.sales}</Text>
          </View>
        </View>
        <View className='push-mode'>
          <Text>配送方式:</Text>
          <Text className='push-val'>普通快递</Text>
        </View>
        
        <View className='detail-con'>
          <AtTabs
            current={this.state.current}
            scroll
            tabList={this.state.tabList}
            onClick={this.handleListClick.bind(this)}
          >
          <AtTabsPane className='detail-con-item' current={this.state.current} index={0}>
            {shopInfo.content}
          </AtTabsPane>
          <AtTabsPane className='detail-con-item' current={this.state.current} index={1}>
            暂无评价
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
        <AtFloatLayout isOpened={this.state.isOpenedMode} onClose={this.handleClose}>
          <View className='shop-title'>
            <Image src={Pic.imgUrl+shopInfo.img} className='img'>
            </Image>
            <View className='name'>
              <Text>{shopInfo.shop_name}</Text>
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