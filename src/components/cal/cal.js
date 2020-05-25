import React from 'react';
import './cal.css';
import { Fill } from '../fill/fill';
import { Table } from '../table/table';
import { TableData } from '../table/tabledata'


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
      totalValue: 200000,
      stopLossValue: 1000,
      futuresProducts:'',
      strikePrice: '',
      stopLostPrice: '',
      minimumPriceMovementValue: 10,
      append:'',
    }
    this.setTotal = this.setTotal.bind(this);
    this.setStopLoss = this.setStopLoss.bind(this);
    this.setProducts = this.setProducts.bind(this);
    this.setLossValue = this.setLossValue.bind(this);
    this.setStrikePrice = this.setStrikePrice.bind(this);
    this.calculation = this.calculation.bind(this);
    this.hanldeTableData = this.hanldeTableData.bind(this)
  }
  
  //通过fill.js 传输产品，单笔价值量，止损止盈和单笔亏损
  setTotal(e) {
    this.setState({totalValue: e})
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
  
  calculation() {
    let volume;
    let totalVolume = Math.floor(this.state.totalValue/(this.state.minimumPriceMovementValue * this.state.strikePrice));
    let lossvalue =  Math.abs(this.state.strikePrice - this.state.stopLostPrice);
    let lossVolume = Math.floor(this.state.stopLossValue / (lossvalue*this.state.minimumPriceMovementValue));

    return volume = totalVolume > lossVolume ? lossVolume : totalVolume
  }

  getTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (hour < 10) {
      hour = `0${hour}`;
    } else if (min < 10) {
      min = `0${min}`;
    } else if (sec < 10) {
      sec = `0${sec}`;
    }

    return `${hour}:${min}:${sec}`
  }

  hanldeTableData() {
    this.tableData.push(<TableData time={this.getTime()} products={this.state.futuresProducts} volume={this.calculation()} strikePrice={this.state.strikePrice} stopLossPrice={this.state.stopLostPrice}/>);
    this.setState({append: this.tableData})
  }


  render(){
    return(
      <div>
        <Fill  total={this.setTotal} loss={this.setLossValue} products={this.setProducts} stopLoss={this.setStopLoss} strikePrice={this.setStrikePrice} />
        <input  type="submit" className="button" onClick={this.hanldeTableData}  value="提交" />
        <Table />
        <div>
        {this.tableData}
        </div>
      </div>
    )
  }
}
