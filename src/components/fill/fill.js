import React from 'react';
import './fill.css'

export class Fill extends React.Component {
  constructor(props){
    super(props);
    this.setTotal = this.setTotal.bind(this);
    this.setStopLoss = this.setStopLoss.bind(this);
    this.setProducts = this.setProducts.bind(this);
    this.setLossValue = this.setLossValue.bind(this);
    this.setStrikePrice = this.setStrikePrice.bind(this);
  }

  setTotal(e) {
    //设定单笔价值量
    this.props.total(e.target.value)
  };

  setLossValue(e) {
    //设定单笔止损金额
    this.props.loss(e.target.value)
  };

  setProducts(e) {
    //设定品种
    this.props.products(e.target.value)
  };

  setStopLoss(e) {
    //设定止损点位
    this.props.stopLoss(e.target.value)
  };

  setStrikePrice(e) {
    //设定止盈点位
    this.props.strikePrice(e.target.value)
  };


  render() {
  return (
    <div>
      <div className='container' id='container1'>
        <div>
          <label for='totalValue'>单笔价值量: </label>
          <input type='text' id='totalValue' onChange={this.setTotal} value='200000'/> 
        </div>
        <div>
          <label for='stopLossValue'>单笔止损金额:  </label>
          <input type='text' id='stopLossValue' onChange={this.setLossValue} value='1000'/> 
        </div>
      </div>
      <div >
        <div className='container' id='container2'>
          <div>
            <label for='futuresProducts'>品种: </label>
            <input type='text' id='futuresProducts' onChange={this.setProducts} /> 
          </div>
          <div>
            <label for='takeProfitPrice' >进场价: </label>
            <input type='text' id='takeProfitPrice' onChange={this.setStrikePrice} /> 
          </div>
          <div>
            <label for='stopLossPrice'>止损价格: </label>
            <input type='text' id='stopLossPrice' onChange={this.setStopLoss} /> 
          </div>
          <input  type="submit" className="button" onClick={this.props.onclick}  value="提交2" />
        </div>
      </div>
    </div>
  )
  }
}