import React from 'react';
import { createRoot } from 'react-dom/client';
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



const container :any= document.getElementById('root');
const root:any = createRoot(container);

root.render(
  <>
  
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </>
);