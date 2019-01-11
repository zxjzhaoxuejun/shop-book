import Taro,{Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtTabs,AtTabsPane} from 'taro-ui';
import Lists from '../lists/lists';


class Tabs extends Component{
  constructor(){
    super(...arguments)
    this.state={
      tabList:[
          { title: '最新商品' },
          { title: 'BOSS自营' }
        ],
      current: 0
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render(){
    return(
      <AtTabs
        current={this.state.current}
        scroll
        tabList={this.state.tabList}
        onClick={this.handleClick.bind(this)}
      >
      <AtTabsPane current={this.state.current} index={0}>
        <Lists shops={this.props.lists}></Lists>
      </AtTabsPane>
      <AtTabsPane current={this.state.current} index={1}>
        <Lists shops={this.props.lists}></Lists>
      </AtTabsPane>
    </AtTabs>
    )
  }

}

export default Tabs;