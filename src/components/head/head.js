import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar, AtIcon } from "taro-ui";
import Banner from "../banner/banner";
import "./head.less";

class Head extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      searchVal: ""
    };
  }
  onSearchChange(value) {
    this.setState({
      searchVal: value
    });
  }
  render() {
    return (
      <View>
        <AtSearchBar
          value={this.state.searchVal}
          onChange={this.onSearchChange.bind(this)}
          fixed
        />
        <Banner bannerUrl={this.props.banner} bannerType='0' />
      </View>
    );
  }
}

export default Head;
