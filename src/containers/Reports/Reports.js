import React from 'react';
import ReportsTradeHistory from './TradeHistory';

export default function Reports() {
  return (
    <>
    Change this to list all trades grouped by month, show a month, perhaps show a chart of entry + exits??
    Accordion of months perhaps, then show the same Accordion as the trades tab for that month, default open the current month and show a total in the accordion of p+l, exposure, %age of successful trades, total trades
      <ReportsTradeHistory />
    </>
  );
  
}
