import React from 'react';
import './table.css';
import { TableData } from './tabledata';

export class Table extends React.Component {
  render() {
  return (
    <div className='table'>
    <table>
      <thead>
      <tr>
        <th>时间 </th>
        <th>品种</th>
        <th>手数</th>
        <th>进场</th>
        <th>止损</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        {this.props.data.map(data => {
          return <TableData data={data} id={data.id} removeData={this.props.removeData} key={data.id}/>
        })}
      </tbody>
    </table>
    </div>
  )
  }
}
