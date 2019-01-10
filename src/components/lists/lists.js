import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";

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
  buyShop(e) {
    e.stopPropagation();
    Taro.navigateTo({ url: `../../pages/orders/orders` });
  }

  /**
   * 商品详情
   * @param {*} id
   */
  shopDetails() {
    Taro.navigateTo({
      url: `../../pages/detail/index`
    });
  }
  render() {
    return (
      <View className='lists-mode' onClick={this.shopDetails}>
        <Image
          src={require("../../assets/imgs/banner_01.jpg")}
          alt='商品封面图'
          className='shop-img'
        />
        <View className='shop-con'>
          <View className='shop-title'>
            书品名称书品名称书品名称书品名称书品名称
          </View>
          {/* <View>
            <Text>胥苗龙 著</Text>
            <Text>库存量:1000</Text>
          </View> */}
          <View className='shop-price'>
            <Text className='red-color'>￥99</Text>
            <AtIcon
              value='shopping-cart'
              size='30'
              color='#f10000'
              onClick={this.buyShop.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Lists;
