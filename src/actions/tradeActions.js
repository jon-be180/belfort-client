import queryString from 'query-string';

//@TODO use backend api not fetch()
//
//i've gone with the naming convention of
//CRUD
//LOAD_entity
//RECEIVE_entity
//with function of loadX() populateX()


// what is the name convention for this? CRUD assumed
// i dont think this function ever gets a value passed in
export const createTrade = (trade) => {

  return function (dispatch) {
    dispatch({ type: 'CREATE', trade: trade });

    return fetch('http://192.168.1.179:3005/trade', {
      method: 'POST', 
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryString.stringify(trade)
    })
    .then(

    )
  }
}

export const editTrade = (trade) => {
  return { 
    trype: 'EDIT', 
    trade: trade
  };
}

export const deleteTrade = (tradeId, userId) => {
  return function (dispatch) {
    dispatch({ type: 'DELETE', tradeId: tradeId });

    return fetch('http://192.168.1.179:3005/trade/'+tradeId+'/delete')
    .then(
      //@TODO this seems kinda pointless, cant i just get the reducer involved? perhaps if this action can be called publically from elsewhere but where would it get the json variable from to do that?!
      //@TODO it is wasteful but works
    )
  }
}

export const completeTrade = (tradeId, userId) => {

  return function (dispatch) {
    dispatch({ type: 'COMPLETE', tradeId: tradeId });

    return fetch('http://192.168.1.179:3005/trade/'+tradeId+'/complete')
    .then(
      //@TODO should just change state rather than reload it all
    )
  }
}

// call this to populate the state with trades
export const loadUsersActiveTrades = (userId) => {
  return {
    type: 'LOAD_ACTIVE_TRADES',
    userId
  };
}

// call this to populate the state with inactive trades
export const loadUsersInactiveTrades = (userId) => {
  return {
    type: 'LOAD_INACTIVE_TRADES',
    userId
  };
}


// this parses the api response into another action, though this seems pointless to split
// as there's only one valid "by-user" comination
export const populateUsersActiveTrades = (userId, json) => {

  return {
    type: 'RECEIVE_ACTIVE_TRADES',
    userId,
    activeTrades: json,
    receivedAt: Date.now()
  }
}

// this parses the api response into another action, though this seems pointless to split
// as there's only one valid "by-user" comination
export const populateUsersInactiveTrades = (userId, json) => {

  return {
    type: 'RECEIVE_INACTIVE_TRADES',
    userId,
    inactiveTrades: json,
    receivedAt: Date.now()
  }
}


// this parses the api response into another action, though this seems pointless to split
// as there's only one valid "by-user" comination
export const populatePrices = (json) => {

  return {
    type: 'RECEIVE_PRICES',
    prices: json,
    receivedAt: Date.now()
  }
}

export const fetchActiveTrades = (userId) => {

  return function (dispatch) {
    dispatch({ type: 'LOAD_ACTIVE_TRADES', userId: userId})

    return fetch('http://192.168.1.179:3005/activeTrades')
    .then(
      response => response.json()
    )
    .then(
      json => dispatch(populateUsersActiveTrades(userId, json))
    )
    /* @TODO might want to move to this one in the future
     * removing for now because guide uses fetch() instead
    const response = await backend.get('trades', userId).catch(error => {
      // error state
      // nothing to load so dont
      dispatch({
        type: 'LOAD',
        userId: userId,
        trades: []
      });
    });
  
    dispatch({
      type: 'LOAD',
      userId: userId,
      trades: [] // response.trades
    });
    */
  }
}

export const fetchInactiveTrades = (userId) => {

  return function (dispatch) {
    dispatch({ type: 'LOAD_INACTIVE_TRADES', userId: userId})

    return fetch('http://192.168.1.179:3005/inactiveTrades')
    .then(
      response => response.json()
    )
    .then(
      json => dispatch(populateUsersInactiveTrades(userId, json))
    )
    /* @TODO might want to move to this one in the future
     * removing for now because guide uses fetch() instead
    const response = await backend.get('trades', userId).catch(error => {
      // error state
      // nothing to load so dont
      dispatch({
        type: 'LOAD',
        userId: userId,
        trades: []
      });
    });
  
    dispatch({
      type: 'LOAD',
      userId: userId,
      trades: [] // response.trades
    });
    */
  }
}
export const fetchPrices = () =>  {

  return function (dispatch) {
    dispatch({ type: 'LOAD_PRICES' });

    return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=0')
      .then(
        res => res.json()
      )
      .then(
        (result) => {
          dispatch(populatePrices({ 'BTCUSD': result.prices[0][1] }))
        },
        (error) => {
          
        }
      );
  }
}

