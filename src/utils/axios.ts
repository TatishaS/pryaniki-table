import axios from 'axios';

const token = window.localStorage.getItem('pryaniki-token');

export const axiosInstance = axios.create({
  baseURL: 'https://test.v5.pryaniky.com',
  headers: {
    'x-auth': token,
  },
});
