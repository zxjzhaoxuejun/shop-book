import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker, Image, Button } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtInput,
  AtIcon,
  AtRadio,
  AtMessage,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtForm
} from "taro-ui";
import "./orders.less";

export default class Orders extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      user: "",
      city: "",
      phone: "",
      ems: "",
      shopInfo: {
        shopName: "都会开始发生回复康师傅",
        price: 99.0,
        stores: 1000,
        img: "",
        sales: 2
      },
      selector: [
        "普通快递",
        "顺丰快递",
        "申通快递",
        "EMS快递",
        "中通快递",
        "圆通快递"
      ],
      deliveryCosts: [10, 20, 10, 15, 10, 10],
      selectorChecked: "普通快递",
      checkCosts: 10,
      message: "",
      adderss: "",
      adderssLists: [
        {
          label:
            "湖南省永州市冷水滩区中央新城C10-1702 联系人：赵学军 联系方式：18520820070",
          value:
            "湖南省永州市冷水滩区中央新城C10-1702 联系人：赵学军 联系方式：18520820070"
        }
      ],
      allMoney: 0,
      isOpened: false
    }; //价格 //存货 //购买数量 //快递费 //选择的快递费
  }

  onSelectChange = e => {
    console.log(e.detail.value);
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
      checkCosts: this.state.deliveryCosts[e.detail.value]
    });
  };

  addAdderss = e => {
    //打开添加地址
    this.setState({ isOpened: true });
  };

  closeAdd = e => {
    //关闭添加地址
    this.setState({ isOpened: false });
  };

  /**
   * 返回首页
   */
  goHome = e => {
    Taro.navigateTo({
      url: `../../pages/index/index`
    });
  };

  nextDo = e => {};

  handleChange = value => {
    //留言
    this.setState({ message: value });
  };

  handleRadioChange(value) {
    //地址选择
    console.log(value);
    this.setState({ adderss: value });
  }

  handleNameChange = e => {
    //地址添加
    this.setState({ user: e });
  };
  handleTelChange = e => {
    //地址添加
    this.setState({ phone: e });
  };
  handleCityChange = e => {
    //地址添加
    this.setState({ city: e });
  };
  handleEmsChange = e => {
    //地址添加
    this.setState({ ems: e });
  };
  submitAddChange = e => {
    let addCity = `地址:${this.state.city};收件人:${this.state.user};联系方式:${
      this.state.phone
    };邮政编码:${this.state.ems};`;
    console.log(addCity);
    let addItem = { label: addCity, value: addCity };
    let newCity = [addItem, ...this.state.adderssLists];
    this.setState({
      user: "",
      city: "",
      phone: "",
      ems: "",
      isOpened: false,
      adderssLists: newCity
    });
  };

  submitForm = e => {
    //答案提交

    let ordersInfo = {};
    if (this.state.adderss == "") {
      Taro.atMessage({
        //type为：success,error,warning
        message: "收件人地址必填!",
        type: "error"
      });
    } else {
      ordersInfo["price"] = this.state.shopInfo.price;
      ordersInfo["shopName"] = this.state.shopInfo.shopName;
      ordersInfo["sales"] = this.state.shopInfo.sales;
      ordersInfo["adderss"] = this.state.adderss;
      ordersInfo["message"] = this.state.message;
      ordersInfo["selectorChecked"] = this.state.selectorChecked;
      ordersInfo["checkCosts"] = this.state.checkCosts;
      ordersInfo["allMoney"] = this.state.allMoney;
    }
    console.log(ordersInfo);
  };

  config = { navigationBarTitleText: "确定订单" };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let { shopInfo } = this.state;
    let shopMoney = shopInfo.sales * shopInfo.price;
    this.state.allMoney = shopMoney + this.state.checkCosts;
    return (
      <View className='order-mode'>
        <AtMessage />
        <View className='adderss'>
          <AtList>
            <AtListItem
              onClick={this.addAdderss.bind(this)}
              title='添加地址'
              arrow='right'
            />
          </AtList>
          <View className='check-info'>
            <AtRadio
              options={this.state.adderssLists}
              value={this.state.adderss}
              onClick={this.handleRadioChange.bind(this)}
            />
          </View>
        </View>

        <View className='order-info'>
          <View className='shop-name'>
            <AtIcon value='menu' size='20' />
            <Text className='name'>深圳双创小店</Text>
          </View>
          <View className='shop-info'>
            <Image
              src={require("../../assets/imgs/banner_01.jpg")}
              className='img'
            />
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
            <Picker
              mode='selector'
              range={this.state.selector}
              onChange={this.onSelectChange.bind(this)}
            >
              <View className='picker'>
                <Text>配送方式：</Text>
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
            <Text className='submit' onClick={this.submitForm.bind(this)}>
              提交订单
            </Text>
          </View>
        </View>

        <AtModal isOpened={this.state.isOpened}>
          <AtModalHeader>添加收件地址</AtModalHeader>
          <AtModalContent>
            <AtForm>
              <AtInput
                name='user'
                title='收件人'
                type='text'
                placeholder='收件人名称'
                value={this.state.user}
                onChange={this.handleNameChange.bind(this)}
              />
              <AtInput
                name='city'
                title='收件人地址'
                type='text'
                placeholder='收件人地址'
                value={this.state.city}
                onChange={this.handleCityChange.bind(this)}
              />
              <AtInput
                name='phone'
                title='联系电话'
                type='phone'
                placeholder='手机号码'
                value={this.state.phone}
                onChange={this.handleTelChange.bind(this)}
              />
              <AtInput
                name='ems'
                title='邮政编码'
                type='number'
                placeholder='请输入邮政编码'
                value={this.state.ems}
                onChange={this.handleEmsChange.bind(this)}
              />
            </AtForm>
          </AtModalContent>
          <AtModalAction>
            {" "}
            <Button onClick={this.closeAdd.bind(this)}>取消</Button>{" "}
            <Button onClick={this.submitAddChange}>添加</Button>{" "}
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}
