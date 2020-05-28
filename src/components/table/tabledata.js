import React from 'react';
import './tabledata.css';
import closePic from './close.png'

export class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.removeData = this.removeData.bind(this)
  }


  removeData() {
    this.props.removeData(this.props.data);
  }


  render() {
    return (
        <tr>
          <td>{this.props.data.time}</td>
          <td>{this.props.data.futuresProducts}</td>
          <td>{this.props.data.volume}</td>
          <td>{this.props.data.strikePrice}</td>
          <td>{this.props.data.stopLostPrice}</td>
          <td><button onClick={this.removeData}><img srcSet={closePic} alt='close' className='closeImg'/></button></td>
        </tr>
    )
  }
}

