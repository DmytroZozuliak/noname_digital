import axios from 'axios';

export const apiPlaceholder = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 1000,
});
