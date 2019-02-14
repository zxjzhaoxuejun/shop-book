import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker, Image, Button,Radio,RadioGroup,Label} from "@tarojs/components";
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
import requestHttps from "../../utils/request";
import Pic from "../../config/config";

export default class Orders extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      user: "",
      city: "",
      tel: "",
      ems: "",
      shopInfo: {
        id: "",
        shop_name: "",
        price: 0,
        stores: 0,
        img: "",
        sales: 0
      },
      selector: ["自取，不要快递",
        "普通快递",
        "顺丰快递",
        "申通快递",
        "EMS快递",
        "中通快递",
        "圆通快递"
      ],
      deliveryCosts: [0,10, 20, 10, 15, 10, 10],
      selectorChecked: "普通快递",
      checkCosts: 10,
      message: "",
      adderss: "",
      adderssLists: [],
      allMoney: 0,
      isOpened: false,
      buyNum: 0,
      cityId:''
    }; //价格 //存货 //购买数量 //快递费 //选择的快递费
  }

  onSelectChange = e => {
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

  handleChange = value => {
    //留言
    this.setState({ message: value });
  };

  handleRadioChange(e) {
    //地址选择
    this.setState({ adderss: e.detail.value});
  }

  handEdit(id,e){//地址修改
    console.log(id,e);
    requestHttps(
        `shops/editaddress`,
        "GET",
        {id:id},
        res => {
          console.log(res);
          if(res.code==1){
            this.setState({
              user:res.data.recipients,
              tel:res.data.tel,
              city:res.data.disrection,
              ems:res.data.code,
              isOpened:true,
              cityId:res.data.id
            })
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  handDel(id,e){
    //地址删除收件人地址
    let users=Taro.getStorageSync('userInfo')
        requestHttps(
          `shops/deladdress`,
          "GET",
          {id:id},
          res => {
            console.log(res);
            Taro.atMessage({
              //type为：success,error,warning
              message: res.msg,
              type: "success"
            });
            this.getAddress(users)
          },
          err => {
            console.log(err);
          }
        )
  }

  handleNameChange = e => {
    //地址添加
    this.setState({ user: e });
  };
  handleTelChange = e => {
    //地址添加
    this.setState({ tel: e });
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
    let isTrue = true;
    if (!this.isPoneAvailable(this.state.tel)) {
      isTrue = false;
      Taro.atMessage({
        //type为：success,error,warning
        message: "手机号码输入不正确!",
        type: "error"
      });
    }
    if (this.state.user == "") {
      isTrue = false;
      Taro.atMessage({
        //type为：success,error,warning
        message: "收件人必填!",
        type: "error"
      });
    }
    if (this.state.city == "") {
      isTrue = false;
      Taro.atMessage({
        //type为：success,error,warning
        message: "收件人地址必填!",
        type: "error"
      });
    }
    if (isTrue) {
      let users=Taro.getStorageSync('userInfo')

      let cityDatas={}
        cityDatas['recipients']=this.state.user,
        cityDatas['disrection']=this.state.city,
        cityDatas['tel']=this.state.tel,
        cityDatas['code']=this.state.ems,
        cityDatas['uid']=users.tel
      

      if(this.state.cityId==''){
        //添加提交收件人地址
        requestHttps(
          `shops/disrection`,
          "GET",
          cityDatas,
          res => {
            console.log(res);
            Taro.atMessage({
              //type为：success,error,warning
              message: res.msg,
              type: "success"
            });
            this.getAddress(users)
          },
          err => {
            console.log(err);
          }
        )
      }else{
        //修改地址提交
        cityDatas['id']=this.state.cityId
        requestHttps(
          `shops/update`,
          "GET",
          cityDatas,
          res => {
            Taro.atMessage({
              //type为：success,error,warning
              message: res.msg,
              type: "success"
            });
            this.getAddress(users)
          },
          err => {
            console.log(err);
          }
        )
      }
      this.setState({
        user: "",
        city: "",
        tel: "",
        ems: "",
        cityId:'',
        isOpened: false
      });
    }
  };

  isPoneAvailable = str => {
    //手机号校验
    var myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  };

  //产生随机数函数
  rndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
    return "DL" + rnd;
  }

  submitForm = e => {
    //答案提交

    let ordersInfo = {};
    let isTrue = true;
    let users=Taro.getStorageSync('userInfo')

    if(this.state.checkCosts!=0){//无需快递时，不需要选择收货地址
      if (this.state.adderss == "") {
        isTrue = false;
        Taro.atMessage({
          //type为：success,error,warning
          message: "收件人地址必填!",
          type: "error"
        });
      }
    }

    if (isTrue) {
      //提交
      ordersInfo["uid"]=users.tel;
      ordersInfo["price"] = this.state.shopInfo.price;
      ordersInfo["shop_name"] = this.state.shopInfo.shop_name;
      ordersInfo["buy_num"] = this.state.buyNum;
      ordersInfo["adderss"] = this.state.adderss;
      ordersInfo["message"] = this.state.message;
      ordersInfo["k_name"] = this.state.selectorChecked;
      ordersInfo["costs"] = this.state.checkCosts;
      ordersInfo["allmoney"] = this.state.allMoney;
      ordersInfo["order_number"] = this.rndNum(3) + new Date().getTime();
      //提交订单
      requestHttps(
        `shops/orders`,
        "GET",
        ordersInfo,
        res => {
          // console.log(res);
          if (res.code == 1) {
            Taro.navigateTo({
              url: `http://www.sieia.org/index.php/index/pay/submit?order_number=${
                ordersInfo["order_number"]
              }`
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  };

  getAddress(isUser){
    //获取用户添加的收货地址
    requestHttps(
          `shops/isaddress?uid=${isUser.tel}`,
          "GET",
          "",
          res => {
            console.log(res)
            if(res.code==1){
              let addCity = res.data.map((item)=>{
                return {value: `地址:${item.disrection};收件人:${item.recipients};联系方式:${item.tel};邮政编码:${item.code};` ,checked:false,id:item.id}
              })
              // console.log(addCity)
              this.setState({
                adderssLists:addCity
              })
            }
          },
          err => {
            console.log(err);
          }
        );
  }

  config = { navigationBarTitleText: "提交订单" };

  componentWillMount() {
    let isUser=Taro.getStorageSync('userInfo')
    if(!isUser){
      //判断用户是否登录，没有登录先去登录
      Taro.navigateTo({
        url: `../../pages/login/login`
      });
      return false
    }

    //查询用户已有的收件地址显示
    this.getAddress(isUser)

    //购买详情页
    requestHttps(
      `shops/detail?id=${this.$router.params.id}`,
      "GET",
      "",
      res => {
        this.setState({
          shopInfo: res,
          buyNum: this.$router.params.num
        });
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
    let { shopInfo, buyNum } = this.state;
    let shopMoney = buyNum * shopInfo.price;
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
             <RadioGroup>
                {this.state.adderssLists.map((item,i) => {
                  return (
                    <Label className='city-lists' for={i} key={i}  onChange={this.handleRadioChange.bind(this)}>
                      <Radio value={item.value} checked={item.checked}>{item.value}</Radio>
                      <View className='btn'><Text className='edit' onClick={this.handEdit.bind(this,item.id)}>修改</Text><Text className='del' onClick={this.handDel.bind(this,item.id)}>删除</Text></View>
                    </Label>
                  )
                })}
              </RadioGroup>
          </View>
        </View>

        <View className='order-info'>
          <View className='shop-name'>
            <AtIcon value='menu' size='20' />
            <Text className='name'>深圳双创小店</Text>
          </View>
          <View className='shop-info'>
            <Image src={Pic.imgUrl + shopInfo.img} className='img' />
            <View className='shop-title'>{shopInfo.shop_name}</View>
            <View className='price-num'>
              <Text className='price'>￥{shopInfo.price}</Text>
              <Text className='num'>X {buyNum}</Text>
            </View>
          </View>
          <View className='count'>
            <Text>共{buyNum}件商品</Text>
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
                name='tel'
                title='联系电话'
                type='text'
                placeholder='手机号码'
                value={this.state.tel}
                onChange={this.handleTelChange.bind(this)}
              />
              <AtInput
                name='ems'
                title='邮政编码'
                type='text'
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
