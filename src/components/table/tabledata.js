import React from 'react';
import './tabledata.css';

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
          <td><button onClick={this.removeData}>-</button></td>
        </tr>
    )
  }
}

