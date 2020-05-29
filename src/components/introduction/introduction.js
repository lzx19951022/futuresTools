import React from 'react'
import './introduction.css'

export class Introduction extends React.Component {
  render() {

    if (this.props.firstTime !== '1.0.0') {
    return(
      <div id='bgc'>
        <div className='introduction'>
          <h2>使用说明</h2>
          <br/>
          <p>本应用目前为Beta版本，在使用时可能会出现奔溃及计算错误的情况，对于以上情况本应用不承担任何责任</p>
          <br/>
          <p>输入产品时无需合约号，例如“螺纹”、“eg”等，英文产品不区分大小写。应用会根据你设定的产品，预估进场位和预估止损，结合单笔价值量和单笔亏损金额计算后获得同时在单笔价值量和单笔亏损范围内的手数。
             如果你有预估进场位和预估止损位的话，这个小工具就很适合帮助你快速计算下单手数，同时记录成表格方便你复制到excel或者直接参考。</p>
          <br/>
          <p>历史数据会保存到你的本地浏览器缓存中，只要不清除缓存，保持同一设备同一浏览器访问,应用会一直保存你当前设定的单笔价值量，单笔亏损和之前计算的结果（手动点删除除外）清除浏览器缓存后所有记录就会清除。</p>
          <button onClick={this.props.introduction}>我已知晓</button>
        </div>
      </div>
    )
    } else {
      return(
        <div style={{display:'none'}}></div>
      )
    }

  }
}