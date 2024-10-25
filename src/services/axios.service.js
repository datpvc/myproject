import axios from 'axios';

const BASE_URL = 'https://671259446c5f5ced662323ac.mockapi.io/datpvc/api/v1/';

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
