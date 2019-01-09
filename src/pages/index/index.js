import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import Head from '../../components/head/head';
import './index.less'
import Tabs from '../../components/tabs/tabs';
import Footer from '../../components/footer/footer';

export default class Index extends Component {

  config = {
    navigationBarTitleText: '深圳双创频道'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Head></Head>
        <Tabs></Tabs>
        <Footer></Footer>
      </View>
    )
  }
}

