import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image,RichText } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtIcon, AtFloatLayout, AtMessage } from "taro-ui";
import Banner from "../../components/banner/banner";
import "./detail.less";
import requestHttps from "../../utils/request";
import Pic from "../../config/config";

export default class Detail extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      tabList: [{ title: "商品详情" }, { title: "评价" }],
      current: 0,
      isOpenedMode: false,
      buyNum: 0,
      type: 1,
      btnText: "确定",
      shopInfo: {
        id: "",
        shop_name: "",
        price: 0.0,
        stores: 0,
        img: "",
        content: "",
        sales: 0
      },
      imgs: [{b_img:require('../../assets/imgs/detail_1.jpg')}]
    };
  }

  /**
   * tablist切换
   * @param {*} value
   */
  handleListClick = e => {
    this.setState({
      current: e,
      isOpenedMode: false
    });
  };

  /**
   * 购买、收藏弹出选择信息
   */
  openBuyShop = e => {
    
    if(!Taro.getStorageSync('userInfo')){
      //判断用户是否登录，没有登录先去登录
      Taro.navigateTo({
        url: `../../pages/login/login`
      });

      return false
    }
    console.log(e.target.dataset.type);
    let btnVal = "";
    if (e.target.dataset.type == 1) {
      //加入购物车
      btnVal = "加入购物车";
    } else {
      //下一步
      btnVal = "下一步";
    }
    this.setState({
      isOpenedMode: true,
      btnText: btnVal,
      type: e.target.dataset.type
    });
  };

  cart = e => {
    //减
    if (this.state.buyNum <= 0) {
      return false;
    } else {
      this.setState({
        buyNum: this.state.buyNum - 1,
        shopInfo: {
          shop_name: this.state.shopInfo.shop_name,
          price: this.state.shopInfo.price,
          stores: this.state.shopInfo.stores + 1,
          img: this.state.shopInfo.img,
          content: this.state.shopInfo.content,
          sales: this.state.shopInfo.sales,
          id: this.state.shopInfo.id
        }
      });
    }
  };

  add = e => {
    //加
    this.setState({
      buyNum: this.state.buyNum + 1,
      shopInfo: {
        shop_name: this.state.shopInfo.shop_name,
        price: this.state.shopInfo.price,
        stores: this.state.shopInfo.stores - 1,
        img: this.state.shopInfo.img,
        content: this.state.shopInfo.content,
        sales: this.state.shopInfo.sales,
        id: this.state.shopInfo.id
      }
    });
  };

  /**
   * 返回首页
   */
  goHome = e => {
    Taro.navigateTo({
      url: `../../pages/index/index`
    });
  };

  nextDo = e => {
    console.log(e.target.dataset.type);
    if (e.target.dataset.type == 1) {
      //购物车页面
    } else {
      //确定下单页面
      if (this.state.buyNum == 0) {
        Taro.atMessage({
          //type为：success,error,warning
          message: "请选择商品数量!",
          type: "error"
        });
        return false;
      }
      let id = this.state.shopInfo.id,
        sales = this.state.buyNum;
      Taro.navigateTo({
        url: `../../pages/orders/orders?id=${id}&num=${sales}`
      });
    }
  };

  config = {
    navigationBarTitleText: "商品详情"
  };

  componentWillMount() {
    requestHttps(
      `shops/detail?id=${this.$router.params.id}`,
      "GET",
      "",
      res => {
        this.setState({
          shopInfo: res
        });
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  

  render() {
    let { shopInfo } = this.state;
    return (
      <View className='detail-mode'>
        <AtMessage />
        <Banner bannerUrl={this.state.imgs} bannerType='1' />
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
            <AtTabsPane
              className='detail-con-item'
              current={this.state.current}
              index={0}
            >
              <View className='text-title'>
                【编著简介】
              </View>
              <View className='figure-info'>
                <Image src={require('../../assets/imgs/peo.jpg')} className='pic-t'></Image>
                <View className='info-list'>
                  <Text className='info-list-name'>胥苗龙</Text>
                  <Text className='info-list-item'>青年创业导师</Text>
                  <Text className='info-list-item'>互联网战略与品牌IP营销专家</Text>
                  <Text className='info-list-item'>芝麻创投、网创家传媒创始人</Text>
                  <Text className='info-list-item'>webrand创始人与中国品牌艾丕奖总召集人</Text>
                  <Text className='info-list-item'>深圳市互联网创业创新服务促进会执行会长</Text>
                </View>
              </View>

              <View className='text-title'>
                【本书介绍】
              </View>
              <View className='book-info'>
                随着市场经济的快速发展，身处其中的精英群体面临日益残酷的竞争，技能、经验及能力在快速变化的商业社会中需要不断的更新迭代，而只有建立个人品牌，才能具备可持续的价值，拓展商业边界，提高市场竞争力，降低职业生涯风险，提高创业成功率。
              </View>
              <View className='book-info'>
                本书涵盖了个人品牌的认知、定位、塑造、营销、管理及工具共六部分二十四章节，把个人品牌从认知到实操一一道尽。以短篇、语录的形式展现，阅读体验俱佳。内容丰富，案例鲜活，看完全书能够快速上手打造属于自己的个人品牌，实现个人价值最大化。
              </View>
              <View className='book-info'>
               本书适用于企业家、创业者、职业经理人、普通工作者、自由职业者、求职者等广大群体。
               

              {/* <RichText nodes={shopInfo.content}></RichText> */}


              </View>

            </AtTabsPane>
            <AtTabsPane
              className='detail-con-item'
              current={this.state.current}
              index={1}
            >
              暂无评价
            </AtTabsPane>
          </AtTabs>
        </View>

        <View className='buy-footer'>
          <View className='home' onClick={this.goHome}>
            <AtIcon value='home' color='#999' />
            <Text className='text'>首页</Text>
          </View>
          <View className='home'>
            <AtIcon value='shopping-cart' color='#ff1000' />
            <Text className='text'>购物车</Text>
          </View>
          <View
            className='join-car'
            data-type='1'
            onClick={this.openBuyShop.bind(this)}
          >
            加入购物车
          </View>
          <View
            className='go-buy'
            data-type='2'
            onClick={this.openBuyShop.bind(this)}
          >
            立即购买
          </View>
        </View>
        <AtFloatLayout
          isOpened={this.state.isOpenedMode}
          onClose={this.handleClose}
        >
          <View className='shop-title'>
            <Image src={Pic.imgUrl + shopInfo.img} className='img' />
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
              <Text className='cart' onClick={this.cart.bind(this)}>
                -
              </Text>
              <Text className='value'>{this.state.buyNum}</Text>
              <Text className='add' onClick={this.add.bind(this)}>
                +
              </Text>
            </View>
          </View>
          <View
            className='btn'
            data-type={this.state.type}
            onClick={this.nextDo.bind(this)}
          >
            {this.state.btnText}
          </View>
        </AtFloatLayout>
      </View>
    );
  }
}
