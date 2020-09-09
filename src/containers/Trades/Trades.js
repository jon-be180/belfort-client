import React from 'react';

import TradesSummary from './Summary';
import ActiveTradesList from './ListActive';
import InactiveTradesList from './ListInactive';
import TradesAdd from './Add';

export default function Trades() {

  //@TODO fetch from db
  const accountSize = 6000;
  const accountId = 1;
  const exposure = 99;
  const pnl = 99;
  const winRatio = 99;

  return (
    <>
      <TradesSummary exposure={exposure} pnl={pnl} winRatio={winRatio} accountSize={accountSize} />
      <ActiveTradesList />
      <TradesAdd exchangeAccountId={accountId} />
      <InactiveTradesList />
    </>
  );

}
