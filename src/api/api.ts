import axios from 'axios';

export const apiPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
});
