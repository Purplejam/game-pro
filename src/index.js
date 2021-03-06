import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.tsx';
import thunk from 'redux-thunk';
import { BrowserRouter} from "react-router-dom";
import store from "./store/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
  <React.StrictMode>
  	<Provider store={store}>
  		<App/>
   </Provider>
  </React.StrictMode>
 </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
