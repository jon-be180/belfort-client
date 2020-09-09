import React from 'react';
import './Charts.css';
import LightweightChart from './LightweightChart';

class Charts extends React.Component {

  constructor() {
    super();


    this.data = [
      {
        type: "line",
        data: [
          { time: '2018-10-21', value: 174.64 },
          { time: '2018-10-22', value: 176.89 },
          { time: '2018-10-23', value: 180.43 },
          { time: '2018-10-24', value: 182.01 },
          { time: '2018-10-25', value: 180.63 },
          { time: '2018-10-26', value: 179.64 },
          { time: '2018-10-27', value: 176.89 },
          { time: '2018-10-28', value: 168.43 },
        ]
      },
      {
        type: "candles",
        data: [
          { time: '2018-10-20', open: 170.34, high: 170.99, low: 169.57, close: 175.85 },
          { time: '2018-10-21', open: 176.34, high: 180.99, low: 172.57, close: 179.85 },
          { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
          { time: '2018-10-23', open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
          { time: '2018-10-24', open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
          { time: '2018-10-25', open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
          { time: '2018-10-26', open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
          { time: '2018-10-27', open: 170.88, high: 171.34, low: 160.91, close: 164.23 },
          { time: '2018-10-28', open: 156.88, high: 163.34, low: 140.91, close: 152.23 },
        ]
      }
    ];
  }

  render() {
    return (
      <>
      <LightweightChart data={ this.data} />
      list of paper traders
      ideally i can get gekko to print candles and historical strategy values
      </>
    );
  }
}

export default Charts;
