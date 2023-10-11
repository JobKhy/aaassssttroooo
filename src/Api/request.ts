import axios from 'axios';
import { rawUrl } from '../constants';

export const request = axios.create({
  baseURL: rawUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



