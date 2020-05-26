import React from 'react';
import './cal.css';
import { Fill } from '../fill/fill';
import { Table } from '../table/table';
import { TableData } from '../table/tabledata'

//各个产品单手的吨数
const minimumPriceMovement = {
  螺纹: 10,
  热卷: 10,
  铁矿: 100,
  焦煤: 60,
  焦炭: 100,
  橡胶: 10,
  燃油: 10,
  沥青: 10,
  lpg: 20,
  pta: 5,
  eg: 10,
  郑醇: 10,
  pp: 5,
  eb: 5,
  豆一: 10,
  豆粕: 10,
  菜粕: 10,
  豆油: 10,
  棕榈: 10,
  郑棉: 5,
  白糖: 10,
  鸡蛋: 10,
  苹果: 10

}

export class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.tableData = [];
    this.state = {
      setValue:[],
      totalValue: 200000,
      stopLossValue: 1000,
      futuresProducts:'',
      strikePrice: '',
      stopLostPrice: '',
      minimumPriceMovementValue: 10
    }
    this.setTotal = this.setTotal.bind(this);
    this.setStopLoss = this.setStopLoss.bind(this);
    this.setProducts = this.setProducts.bind(this);
    this.setLossValue = this.setLossValue.bind(this);
    this.setStrikePrice = this.setStrikePrice.bind(this);
    this.calculation = this.calculation.bind(this);
    this.getTime = this.getTime.bind(this);
    this.handleSetValue = this.handleSetValue.bind(this);
    this.getId = this.getId.bind(this);
    this.removeData = this.removeData.bind(this);
  }
  
  //通过fill.js 传输产品，单笔价值量，止损止盈和单笔亏损
  setTotal(e) {
    this.setState({totalValue: e});
    
  };

  setLossValue(e) {
    this.setState({stopLossValue: e})
    
  };

  setProducts(e) {
    this.setState({
      futuresProducts: e, 
      minimumPriceMovementValue: minimumPriceMovement[e]
    })

    
  };

  setStopLoss(e) {
    this.setState({stopLostPrice: e})
   
  };

  setStrikePrice(e) {
    this.setState({strikePrice: e})
  
  };

  


  //计算出最终下单的手数
  calculation() {
    let volume;
    let totalVolume = Math.floor(this.state.totalValue/(this.state.minimumPriceMovementValue * this.state.strikePrice));
    let lossvalue =  Math.abs(this.state.strikePrice - this.state.stopLostPrice);
    let lossVolume = Math.floor(this.state.stopLossValue / (lossvalue*this.state.minimumPriceMovementValue));
    return volume = totalVolume > lossVolume ? lossVolume : totalVolume
    
  }
  
  //获取提交计算时的时间
  getTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    if (hour < 10) {
      hour = '0'+ hour;
    } ;
    if (min < 10) {
      min = '0'+ min ;
    } ;
    if (sec < 10) {
      sec = '0'+ sec ;
    };

    return `${hour}:${min}:${sec}`
  }

  getId() {
    //通过utc时间设定一个唯一的id
    let id = Date.now();
    return id
  }

  handleSetValue(){
    //获取当前数据组
    let objset;
    objset = this.state.setValue


    if (this.state.futuresProducts !== '' && this.state.stopLostPrice !== '' && this.state.strikePrice !== '') {
    let obj1 = {
          time: this.getTime(),
          futuresProducts: this.state.futuresProducts,
          strikePrice: this.state.strikePrice,
          stopLostPrice: this.state.stopLostPrice,
          volume: this.calculation(),
          id: this.getId()
    }
    
    objset.push(obj1)
    //通过push增加新数组，设置state
    this.setState({setValue: objset})
  } else {
    alert('数据填写不完整，请检查数据')
  }
  }
   
  //点击结果列表中的减号可以删去数据结果
  removeData(removedata) {
    let data = this.state.setValue;
    data = data.filter(currentData => currentData.id !== removedata.id)
    this.setState({setValue: data})
  }

  render(){
    return(
      <div>
        <Fill  total={this.setTotal} loss={this.setLossValue} products={this.setProducts} stopLoss={this.setStopLoss} strikePrice={this.setStrikePrice} onclick={this.handleSetValue}/>
        <Table  data={this.state.setValue} removeData={this.removeData} />
      </div>
    )
  }
}
