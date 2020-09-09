// TODO not in use any more, see actions/tradeActions.js

import axios from 'axios';

const instance = axios.create(
  {
    baseURL: 'http://localhost:3005/'
  }
)

export default instance;
