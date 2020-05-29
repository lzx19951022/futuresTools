import React from 'react';
import './cal.css';
import { Fill } from '../fill/fill';
import { Table } from '../table/table';



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
};

export class Cal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      setValue:[],
      totalValue: '',
      stopLossValue: '',
      futuresProducts:'',
      strikePrice: '',
      stopLostPrice: '',
      minimumPriceMovementValue: 10,
      defaultTotalValue: '',
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
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }
  
  //通过fill.js 表单传输产品，单笔价值量，止损止盈和单笔亏损
  setTotal(e) {
    this.setState({totalValue: e});
    //存储单笔价值量数据到浏览器
    localStorage.setItem('totalValue', e)
    
  };

  setLossValue(e) {
    //缓存单笔止损金额数据到浏览器
    this.setState({stopLossValue: e})
    localStorage.setItem('lossValue', e)
    
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
 
    let totalVolume = Math.floor(this.state.totalValue/(this.state.minimumPriceMovementValue * this.state.strikePrice));
    let lossvalue =  Math.abs(this.state.strikePrice - this.state.stopLostPrice);
    let lossVolume = Math.floor(this.state.stopLossValue / (lossvalue*this.state.minimumPriceMovementValue));
    return totalVolume > lossVolume ? lossVolume : totalVolume
  }
  
  //获取提交计算时的时间
  getTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let month = (date.getMonth() + 1);
    let day = date.getDate()
    
    //时间个位数时前面补0
    if (hour < 10) {
      hour = '0'+ hour;
    } ;
    if (min < 10) {
      min = '0'+ min ;
    } ;
    if (sec < 10) {
      sec = '0'+ sec ;
    };
    if (month < 10) {
      month = '0'+ month ;
    };
    if (day < 10) {
      day = '0'+ day ;
    };

    return `${hour}:${min}:${sec}`
  };

  getId() {
    //通过utc时间设定一个唯一的id，用作删除数据时的索引
    let id = Date.now();
    return id
  };

  handleSetValue(){
    //获取当前数据组
    let objset;
    objset = this.state.setValue;
    if (this.state.futuresProducts !== '' && this.state.stopLostPrice !== '' && this.state.strikePrice !== '') {
    let obj1 = {
          time: this.getTime(),
          futuresProducts: this.state.futuresProducts,
          strikePrice: this.state.strikePrice,
          stopLostPrice: this.state.stopLostPrice,
          volume: this.calculation(),
          id: this.getId()
    }
    //新数据添加至数组的头部
    objset.unshift(obj1);
    //浏览器保存历史计算数据
    let objset2 = JSON.stringify(objset);
    localStorage.setItem('storage', objset2);
    //通过push增加新数组，设置state
    this.setState({setValue: objset})
    } else {
    alert('数据填写不完整，请检查数据')
  }
  }
   
  //点击结果列表中的删除符号可以删去数据结果
  removeData(removedata) {
    let data = this.state.setValue;
    data = data.filter(currentData => currentData.id !== removedata.id)
    this.setState({setValue: data})
    let objset2 = JSON.stringify(data);
    localStorage.setItem('storage', objset2);
  }

  //在页面加载完成时判断本地存储数据是否存在，存在的话加载本地的存储数据
  handleLoad() {
    //恢复表格数据
    if (localStorage.getItem('storage')) {
      let storage = localStorage.getItem('storage')
      let storageToObj = JSON.parse(storage)
      this.setState({setValue: storageToObj})
    console.log('表格缓存成功调用')
    }

    //恢复浏览器端存储的价值量和止损数据
    if (localStorage.getItem('totalValue')) {
      let totalValue = localStorage.getItem('totalValue');
      this.setState({totalValue: totalValue})
    }
    if (localStorage.getItem('lossValue')) {
      let lossValue = localStorage.getItem('lossValue');
      this.setState({stopLossValue: lossValue})

    }
  }
  
  //删除表格中的历史记录
  clearTableStorage() {
    localStorage.removeItem('myCat');
  }

  render(){
    return(
      <div>
        <Fill  total={this.setTotal} loss={this.setLossValue} products={this.setProducts} stopLoss={this.setStopLoss} strikePrice={this.setStrikePrice} 
        onclick={this.handleSetValue} clearStorage={this.clearStorage} totalValue={this.state.totalValue} lossValue={this.state.stopLossValue}
        />
        <Table  data={this.state.setValue} removeData={this.removeData} />
      </div>
    )
  }
}