// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api/v1/auth', 
});

export default instance;
