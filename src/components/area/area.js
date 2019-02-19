import Taro, { Component } from '@tarojs/taro'
import { View, Picker,Text } from '@tarojs/components'
import requestHttps from '../../utils/request'
import './area.less'

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selector: [],
      selectorChecked: [],
      areas:[{"code":"110101","name":"东城区"},{"code":"110102","name":"西城区"},{"code":"110103","name":"崇文区"},{"code":"110104","name":"宣武区"},{"code":"110105","name":"朝阳区"},{"code":"110106","name":"丰台区"},{"code":"110107","name":"石景山区"},{"code":"110108","name":"海淀区"},{"code":"110109","name":"门头沟区"},{"code":"110111","name":"房山区"},{"code":"110112","name":"通州区"},{"code":"110113","name":"顺义区"},{"code":"110114","name":"昌平区"},{"code":"110115","name":"大兴区"},{"code":"110116","name":"怀柔区"},{"code":"110117","name":"平谷区"}],
      citys:[{"code":"110100","name":"北京市"}],
      provinces:[{"code":"110000","name":"北京市"}],
    }
  }

  onChange = e => {
    console.log(e.detail)
    this.props.handleCity(this.state.selector[0][e.detail.value[0]].name+this.state.selector[1][e.detail.value[1]].name+this.state.selector[2][e.detail.value[2]].name);
    this.setState({
      selectorChecked: this.state.selector[0][e.detail.value[0]].name+this.state.selector[1][e.detail.value[1]].name+this.state.selector[2][e.detail.value[2]].name
    })
  }

  columnChangeVal=(e)=>{
    console.log(e.detail)
    let columnVal=this.state.selector[e.detail.column][e.detail.value]
    console.log(columnVal)
    if(e.detail.column==0){//省选择
      //展示市级列表
      this.getCitys(columnVal.code)
    }else if(e.detail.column==1){//市级选择
      //展示县区
      this.getAreas(columnVal.code)
    }else{
     
    }
  }

  getCitys=(pid)=>{
    requestHttps('shops/getcitys','GET',{pid:pid},(res)=>{
      //请求成功
      if(res.code==1){
        this.getAreas(res.data[0].code)
        this.setState({
          citys:res.data,
          selector:[this.state.provinces,res.data,this.state.areas],
        })
      }
    },(err)=>{
      //请求失败
      console.log(err)
    })
  }

  getAreas=(pid)=>{
    requestHttps('shops/getareas','GET',{pid:pid},(res)=>{
      //请求成功
      if(res.code==1){
        this.setState({
          areas:res.data,
          selector:[this.state.provinces,this.state.citys,res.data],
        })
      }
    },(err)=>{
      //请求失败
      console.log(err)
    })
  }

  
  

  componentWillMount () {}

  componentDidMount () {
    requestHttps('shops/getprovinces','GET','',(res)=>{
      //请求成功
      if(res.code==1){
        this.setState({
          provinces:res.data,
          selector:[res.data,this.state.citys,this.state.areas],
        })
      }
    },(err)=>{
      //请求失败
      console.log(err)
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='container'>
        <Picker mode='multiSelector' range={this.state.selector} onChange={this.onChange.bind(this)} rangeKey='name' onColumnChange={this.columnChangeVal}>
                <View className='picker'>
                  城市选择<Text className='checke-val'>{this.state.selectorChecked}</Text>
                </View>
              </Picker>
      </View>
    )
  }
}