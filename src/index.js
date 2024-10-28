import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import spinnerSlice from './redux/spinnerSlice';
import userSlice from './redux/userSlice';
import addToCartSlice from './redux/addToCartSlice';

import './index.css';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const store = configureStore({
  reducer: {
    spinnerSlice,
    userSlice,
    addToCartSlice,
  },
});
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
