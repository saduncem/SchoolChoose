import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.scss';
import { Provider} from 'react-redux';
 import { configureStore } from "@reduxjs/toolkit";
 import rootReducer from "./store/index";

import App from './App';

const store = configureStore({
  reducer: rootReducer
});
ReactDOM.render(
  <React.StrictMode>
  
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
   
  </React.StrictMode>,
  document.getElementById('root')
);
