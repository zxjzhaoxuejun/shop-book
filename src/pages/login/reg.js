import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import {AtForm,AtInput,AtButton,AtMessage} from 'taro-ui'
import './login.less'
import requestHttps from '../../utils/request'
import {isPhone,isPassword,isRquire} from '../../utils/vilidate'
import {encode,decode} from '../../utils/base64'

export default class Reg extends Component {

  constructor() {
    super(...arguments);
    this.state = {
        nickname:'',
        tel:'',
        password:''
    };
  }

  config = {
    navigationBarTitleText: '会员注册'
  }

  onSubmit=(e)=>{
    console.log(this.state)

// console.log(encode('123131'))
// console.log(decode('MTIzMTMx'))
    if(!isRquire(this.state.nickname)){
      Taro.atMessage({
        //type为：success,error,warning
        message: "昵称必填!",
        type: "error"
      })
      return false
    }

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

    //提交
    
      this.state.password=encode(this.state.password)
    
      requestHttps(
        `shops/shop_user`,
        "GET",
        this.state,
        res => {
          console.log(res);
          if (res.code == 1) {
            Taro.navigateTo({
              url: `../../pages/login/login`
            });
          }else{
              Taro.atMessage({
              //type为：success,error,warning
              message: res.msg,
              type: 'error'
            })
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
      url: `../../pages/login/login`
    });
  }
  handleChangeName=(e)=>{
    this.setState({
      nickname:e
    })
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

  

  componentWillMount () { }

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let {nickname,tel,password}=this.state
    return (
      <View className='form-mode'>
        <AtMessage />
        <View className='title'>会员注册</View>
        <AtForm>
        <AtInput
          name='nickname'
          title='昵称'
          type='text'
          placeholder='昵称'
          value={nickname}
          onChange={this.handleChangeName.bind(this)}
        />
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
        <AtButton onClick={this.onSubmit.bind(this)} type='primary' className='submit'>立即注册</AtButton>
        <View className='change-url' onClick={this.changeUrl.bind(this)}>已有账号，直接登录</View>
      </AtForm>
      </View>
    )
  }
}

