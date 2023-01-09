// https://redux.js.org/advanced/async-actions
const initialState = {
  activeTrades: [],
  inactiveTrades: [],
  isFetching: false,
  didInvalidate: false
}

// why upper case the T ? when the filename is lower?
// if state is the value to modify how does CRUD work?!
const TradeReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'CREATE':
      //TODO call the api, use the insertId returned to add to the trade
      
      // @see https://redux.js.org/basics/reducers
      return Object.assign({}, state, {
        activeTrades: [
          ...state.activeTrades,
          action.trade
        ]
      })
    case 'EDIT':
      return state.activeTrades.map((trade, index) => {
        if(index === action.index) {
          return Object.assign({}, trade, action.trade);
        }
        //@TODO added this to make the warning go away, not too sure what it does
        return trade
      });
    case 'DELETE':
      return {
        ...state,
        activeTrades: state.activeTrades.filter((item, index) => item.ID !== action.tradeId),
        inactiveTrades: state.inactiveTrades.filter((item, index) => item.ID !== action.tradeId)
      };
    case 'COMPLETE':
      var trade = state.activeTrades.filter((item,index) => item.ID === action.tradeId);
      return {
        ...state,
        inactiveTrades: [...state.inactiveTrades, trade[0]],
        activeTrades: state.activeTrades.filter((item, index) => item.ID !== action.tradeId)
      };
     case 'LOAD_PRICES':
      // load them using the backend api then dispatch the action to parse it
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'RECEIVE_PRICES':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        prices: action.prices,
        lastUpdated: action.receivedAt
      });

    case 'LOAD_ACTIVE_TRADES':
      // load them using the backend api then dispatch the action to parse it
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'RECEIVE_ACTIVE_TRADES':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        activeTrades: action.activeTrades,
        lastUpdated: action.receivedAt
      });

    case 'LOAD_INACTIVE_TRADES':
      // load them using the backend api then dispatch the action to parse it
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'RECEIVE_INACTIVE_TRADES':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        inactiveTrades: action.inactiveTrades,
        lastUpdated: action.receivedAt
      });
    case 'INVALIDATE_TRADES':
      return Object.assign({}, state, {
        didInvalidate: true
      });
    default:
      return state;
  }
}

// why export when all other functions are epxorted in line??
export default TradeReducer;
