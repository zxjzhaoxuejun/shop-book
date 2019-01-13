import Taro, { Component } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./banner.less";
import Pic from "../../config/config";

class Banner extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  render() {
    const bannerArr = this.props.bannerUrl;
    console.log(bannerArr);
    const bHtml = bannerArr.map(item => {
      return (
        <SwiperItem className='banner'>
          <Image src={Pic.imgUrl + item.b_img} alt='banner' className='img' />
        </SwiperItem>
      );
    });
    return (
      <Swiper
        className='test-h'
        indicatorColor='#666'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        {bHtml}
      </Swiper>
    );
  }
}

export default Banner;
