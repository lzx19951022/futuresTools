import React from 'react';
import './tabledata.css';
import { Table } from './table';

export class TableData extends React.Component {
  render() {


    return (
      <table>
        <tbody>
        <tr>
          <td>{this.props.time}</td>
          <td>{this.props.products}</td>
          <td>{this.props.volume}</td>
          <td>{this.props.strikePrice}</td>
          <td>{this.props.stopLossPrice}</td>
        </tr>
        </tbody>
      </table>
    )

  }
}
