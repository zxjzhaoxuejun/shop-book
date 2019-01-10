import Taro, { Component } from '@tarojs/taro'
import { View,Text,Picker,Image} from '@tarojs/components'
import {AtList,AtListItem,AtInput,AtIcon,AtRadio,AtMessage} from 'taro-ui'
import './orders.less'


export default class Orders extends Component {
constructor(){
    super(...arguments)
    this.state={
      shopInfo:{
        shopName:'都会开始发生回复康师傅',
        price:99.00,//价格
        stores:1000,//存货
        img:'',
        sales:2//购买数量
      },
      selector: ['普通快递', '顺丰快递', '申通快递', 'EMS快递','中通快递','圆通快递'],
      deliveryCosts:[10,20,10,15,10,10],//快递费
      selectorChecked: '普通快递',
      checkCosts:10,//选择的快递费
      message:'',
      adderss:'',
      allMoney:0
    }
  }

  onChange = e => {
    console.log(e.detail.value)
      this.setState({
        selectorChecked: this.state.selector[e.detail.value],
        checkCosts: this.state.deliveryCosts[e.detail.value]
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

  }

  handleChange=(value)=>{//留言
    this.setState({
      message:value
    })
  }

  handleRadioChange (value) {//地址选择
    console.log(value)
    this.setState({
      adderss:value
    })
  }

  submitForm=(e)=>{//答案提交
   
    let ordersInfo={}
    if(this.state.adderss==''){
      Taro.atMessage({//type为：success,error,warning
        'message': '收件人地址必填!',
        'type': 'error',
      })
    }else{
      ordersInfo['price']=this.state.shopInfo.price
      ordersInfo['shopName']=this.state.shopInfo.shopName
      ordersInfo['sales']=this.state.shopInfo.sales
      ordersInfo["adderss"]=this.state.adderss
      ordersInfo['message']=this.state.message
      ordersInfo['selectorChecked']=this.state.selectorChecked
      ordersInfo['checkCosts']=this.state.checkCosts
      ordersInfo['allMoney']=this.state.allMoney
    }
    console.log(ordersInfo)
  }


  config = {
    navigationBarTitleText: '确定订单'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let {shopInfo}=this.state
    let shopMoney=shopInfo.sales*shopInfo.price
    this.state.allMoney=shopMoney+ this.state.checkCosts
    return (
      <View className='order-mode'>
        <AtMessage />
        <View className='adderss'>
          <AtList>
            <AtListItem title='添加地址' arrow='right' />
          </AtList>
          <View className='check-info'>
            <AtRadio
              options={[
          { label: '湖南省永州市冷水滩区中央新城C10-1702 联系人：赵学军 联系方式：18520820070', value: '湖南省永州市冷水滩区中央新城C10-1702 联系人：赵学军 联系方式：18520820070'},
          { label: '单选项二', value: 'option2' },
        ]}
              value={this.state.adderss}
              onClick={this.handleRadioChange.bind(this)}
            /> 
          </View>
        </View>

        <View className='order-info'>
          <View className='shop-name'>
            <AtIcon value='menu' size='20'></AtIcon>
            <Text className='name'>深圳双创小店</Text>
          </View>
          <View className='shop-info'>
            <Image src={require('../../assets/imgs/banner_01.jpg')} className='img'></Image>
            <View className='shop-title'>{shopInfo.shopName}</View>
            <View className='price-num'>
              <Text className='price'>￥{shopInfo.price}</Text>
              <Text className='num'>X {shopInfo.sales}</Text>
            </View>
          </View>
          <View className='count'>
            <Text>共{shopInfo.sales}件商品</Text>
            <Text className='x-count'>小计:</Text>
            <Text className='m-count'>￥{shopMoney}</Text>
          </View>
        </View>

        <View className='magges'>
            <View>
              <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                <View className='picker'>
                  <Text>
                   配送方式：
                  </Text>
                  <Text>{this.state.selectorChecked}</Text>
                </View>
              </Picker>
            </View>
            <AtInput
              name='message'
              title='买家留言'
              type='text'
              placeholder='给商家留言'
              value={this.state.message}
              onChange={this.handleChange.bind(this)}
            />
        </View>

        <View className='menoy'>
          <View className='menoy-title'>
            <Text>商品金额</Text>
            <Text>￥{shopMoney}</Text>
          </View>
          <View className='menoy-count'>
            <Text>快递运费:</Text>
            <Text className='money-text'>￥{this.state.checkCosts}</Text>
          </View>
          <View className='menoy-all'>
            <Text>合计:</Text>
            <Text className='money-text'>￥{this.state.allMoney}</Text>
            <Text className='submit' onClick={this.submitForm.bind(this)}>提交订单</Text>
          </View>
        </View>
      </View>
    )
  }
}