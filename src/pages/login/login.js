import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import {AtForm,AtButton,AtInput,AtMessage} from 'taro-ui'
import './login.less'
import requestHttps from '../../utils/request'
import {isPhone,isPassword,isRquire} from '../../utils/vilidate'
import {encode,decode} from '../../utils/base64'

export default class Reg extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      tel:'',
      password:''
    };
  }

  onSubmit=(e)=>{
    console.log(this.state)
    if(!isPhone(this.state.tel)){
      Taro.atMessage({
        //type为：success,error,warning
        message: "请输入正确手机号!",
        type: "error"
      })
      return false
    }

    if(!isPassword(this.state.password,6,24)){
      Taro.atMessage({
        //type为：success,error,warning
        message: "密码设置6-24位!",
        type: "error"
      })
      return false
    }

this.state.password=encode(this.state.password)
    //提交
      requestHttps(
        `shops/login`,
        "GET",
        this.state,
        res => {
          console.log(res);
          if (res.code == 1) {
            //登录成功后将用户信息存储，跳转到首页
            Taro.setStorageSync('userInfo',this.state)
            Taro.navigateTo({
              url: `../../pages/index/index`
            });
          }else{
            Taro.atMessage({
              //type为：success,error,warning
              message: res.msg,
              type: 'error'
            })
            this.state.password=''
          }
        },
        err => {
          Taro.atMessage({
            //type为：success,error,warning
            message: err,
            type: 'error'
          })
        }
      );

  }
  changeUrl=(e)=>{
    Taro.navigateTo({
      url: `../../pages/login/reg`
    });
  }

  handleChangeTel=(e)=>{
    this.setState({
      tel:e
    })
  }

  handleChangePass=(e)=>{
    this.setState({
      password:e
    })
  }

  config = {
    navigationBarTitleText: '会员登录'
  }

  componentWillMount () { }

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let {tel,password}=this.state
    return (
      <View className='form-mode'>
        <AtMessage />
        <View className='title'>会员登录</View>
        <AtForm>
        <AtInput
          name='tel'
          title='手机号码'
          type='text'
          placeholder='手机号码'
          value={tel}
          onChange={this.handleChangeTel.bind(this)}
        />
        <AtInput
          name='password'
          title='密码'
          type='password'
          placeholder='请设置6-24位的密码'
          value={password}
          onChange={this.handleChangePass.bind(this)}
        />
        <AtButton onClick={this.onSubmit.bind(this)} type='primary' className='submit'>立即登录</AtButton>
        <View className='change-url' onClick={this.changeUrl.bind(this)}>未有账号，立即注册</View>
      </AtForm>
      </View>
    )
  }
}

