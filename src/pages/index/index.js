import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import Head from '../../components/head/head';
import './index.less'
import Tabs from '../../components/tabs/tabs';
import Footer from '../../components/footer/footer';
import requestHttps from '../../utils/request'
import Area from '../../components/area/area';

export default class Index extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      list:[],
      banner:[]
    };
  }

  config = {
    navigationBarTitleText: '深圳双创频道'
  }

  componentWillMount () { }

  componentDidMount () {
    requestHttps('shops','GET','',(res)=>{
      //请求成功
      // console.log(res)
      this.setState({
        list:res.list,
        banner:res.banner
      })

    }),(err)=>{
      //请求失败
      console.log(err)
    }
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Head banner={this.state.banner}></Head>
        <Tabs lists={this.state.list}></Tabs>
        <Footer></Footer>
        <Area></Area>
      </View>
    )
  }
}

