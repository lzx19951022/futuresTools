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
          <label htmlFor='totalValue'>单笔价值量: </label>
          <input type='text' id='totalValue' onChange={this.setTotal} defaultValue={this.props.totalValue} /> 
        </div>
        <div>
          <label htmlFor='stopLossValue'>单笔止损金额:  </label>
          <input type='text' id='stopLossValue' onChange={this.setLossValue} defaultValue={this.props.lossValue}/> 
        </div>
      </div>
      <div >
        <div className='container' id='container2'>
          <div className='container2Item'>
            <label htmlFor='futuresProducts'>品种: </label>
            <input type='text' id='futuresProducts' onChange={this.setProducts} /> 
          </div>
          <div className='container2Item'>
            <label htmlFor='takeProfitPrice' >进场价: </label>
            <input type='text' id='takeProfitPrice' onChange={this.setStrikePrice} /> 
          </div>
          <div className='container2Item'>
            <label htmlFor='stopLossPrice'>止损价格: </label>
            <input type='text' id='stopLossPrice' onChange={this.setStopLoss} /> 
          </div>
          <div className='container2Item2'>
          <input  type="submit" className="button" onClick={this.props.onclick}  value="计算" />
          </div>
        </div>
      </div>
    </div>
  )
  }
}

