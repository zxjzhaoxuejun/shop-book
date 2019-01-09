import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'



export default class Detail extends Component {

  config = {
    navigationBarTitleText: '商品详情'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='details-mode'>
        详情
      </View>
    )
  }
}