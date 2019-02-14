import Taro,{Component} from '@tarojs/taro';
import {View,Text} from '@tarojs/components';
import './footer.less'


class Footer extends Component{
  constructor(){
    super(...arguments)
    this.state={
      
    }
  }
  pageToJump(){//返回首页
    Taro.navigateTo({
      url: `../../pages/index/index`
    });
  }
  goToBuyRecord(){//购买记录
    Taro.navigateTo({
      url: `../../pages/records/index`
    });
  }
  render(){
    return(
      <View className='footer-mode'>
        <View className='footer-list'>
          <Text onClick={this.pageToJump.bind(this)}>小店首页</Text>
          <Text> | </Text>
          <Text onClick={this.goToBuyRecord.bind(this)}>购买记录</Text>
        </View>
        <View className='copy-right'>
          <View>深圳网创传媒技术有限公司</View>
          <View>地址：深圳市福田区上梅林凯丰路28号合源堂3楼</View>
        </View>
      </View>
    )
  }

}

export default Footer;