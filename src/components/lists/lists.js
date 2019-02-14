import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Pic from '../../config/config'
import "./lists.less";

class Lists extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  /**
   * 购买商品
   * @param {书id} id
   */
  buyShop(id,e) {
    e.stopPropagation();
    console.log(id)
    Taro.navigateTo({ url: `../../pages/orders/orders?id=${id}&num=1` });
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
  render() {
    const shopsArr=this.props.shops
    const htmlList=shopsArr.map((item)=>{
      return <View className='lists-mode' onClick={this.shopDetails.bind(this,item.id)} key={item.id}>
        <Image
          src={Pic.imgUrl+item.img}
          alt='商品封面图'
          className='shop-img'
        />
        <View className='shop-con'>
          <View className='shop-title'>
            {item.shop_name}
          </View>
          <View className='shop-price'>
            <Text className='red-color'>￥{item.price}</Text>
            <AtIcon
              value='shopping-cart'
              size='30'
              color='#f10000'
              onClick={this.buyShop.bind(this,item.id)}
            />
          </View>
        </View>
      </View>
    })
    return (
      <View>{htmlList}</View>
    );
  }
}

export default Lists;
