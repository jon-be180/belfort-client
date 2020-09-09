import React from 'react';

export default function ReportsTradeHistory() {

  return (
  <div className="grid-x grid-padding-x align-center">
      <div className="cell large-3">
        <h4>Trade History</h4>
        <table className="unstriped">
          <thead>
          <tr>
            <td>Month</td>
            <td>Return</td>
            <td>Trades</td>
            <td>Account</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>June</td>
            <td>4%</td>
            <td>1</td>
            <td>ac</td>
          </tr>
          <tr>
            <td>July</td>
            <td>4%</td>
            <td>1</td>
            <td>ac</td>
          </tr>
          <tr>
            <td>August</td>
            <td>4%</td>
            <td>1</td>
            <td>ac</td>
          </tr>

        </tbody>
        </table>
      </div>
  </div>
  );
}
