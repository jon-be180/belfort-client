import React from 'react';

import TradesSummary from './Summary';
import ActiveTradesList from './ListActive';
import InactiveTradesList from './ListInactive';
import TradesAdd from './Add';

export default function Trades() {

  //@TODO fetch from db
  const accountId = 1;

  const account = {
   size: 60000,
   exposure: 99,
   pnl: 198, // for the current calendar year
   winRatio: 99, // for the current calendar year
  }

  return (
    <>
      <TradesSummary exposure={account.exposure} pnl={account.pnl} winRatio={account.winRatio} accountSize={account.size} />
      <ActiveTradesList />
      <TradesAdd exchangeAccountId={accountId} />
      <InactiveTradesList />
    </>
  );

}
