import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import requestHttps from '../../utils/request'


export default class Area extends Component {
  state = {
    selector: [],
    selectorChecked: '',
    areas:[],
    citys:[],
    provinces:[]
  }

  onChange = e => {
    console.log(e.detail)
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
    }
    
  }

  getCitys=(pid)=>{
    requestHttps('shops/getcitys','GET',{pid:pid},(res)=>{
      //请求成功
      if(res.code==1){
        this.getAreas(res.data[0].code)
        this.setState({
          citys:res.data,
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

  

  componentWillMount () { }

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
        <View className='page-body'>
          <View className='page-section'>
            <View>
              <Picker mode='multiSelector' range={this.state.selector} onChange={this.onChange} rangeKey='name' onColumnchange={this.columnChangeVal}>
                <View className='picker'>
                  省市区选择：{this.state.selectorChecked}
                </View>
              </Picker>
            </View>
          </View>
        </View>
      </View>
    )
  }
}