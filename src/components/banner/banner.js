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
    console.log(this.props.bannerType);
    let httpImg = "";
    if (this.props.bannerType == 0) {
      httpImg = Pic.imgUrl;
    }
    console.log(bannerArr);
    const bHtml = bannerArr.map(item => {
      return (
        <SwiperItem className='banner'>
          <Image src={httpImg + item.b_img} alt='banner' className='img' />
        </SwiperItem>
      );
    });
    return (
      <Swiper
        className='test-h'
        indicatorColor='#666'
        indicatorActiveColor='#fff'
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
