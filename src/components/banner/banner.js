import Taro,{Component} from '@tarojs/taro';
import {View,Swiper,SwiperItem,Image} from '@tarojs/components';
import './banner.less'

class Banner extends Component{
  constructor(){
    super(...arguments)
    this.state={
      
    }
  }
  render(){
   
    return(
      <Swiper
        className='test-h'
        indicatorColor='#666'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem className='banner'>
          <Image src={require('../../assets/imgs/banner_01.jpg')} alt='banner' className='img'></Image>
          
        </SwiperItem>
        <SwiperItem className='banner'>
          <Image src={require('../../assets/imgs/banner_01.jpg')} alt='banner' className='img'></Image>
        </SwiperItem>
        <SwiperItem className='banner'>
          <Image src={require('../../assets/imgs/banner_01.jpg')} alt='banner' className='img'></Image>
        </SwiperItem>
      </Swiper>
    )
  }

}

export default Banner;