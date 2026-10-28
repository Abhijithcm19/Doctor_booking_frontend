// axios.js

import axios from 'axios';
import { BASE_URL } from '../config';

const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1/auth`, 
});

export default instance;
