import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Store/store';
import * as ReactDOMClient from 'react-dom/client';

axios.interceptors.request.use(
  (req) => {
    const token = store.getState().auth?.user?.token
    console.log(token)
    req.headers = {...req.headers, "Authorization": "Bearer " + token}
    return req
  },
  (err) => {
    console.error("An error occurred.")
    return Promise.reject(err);
  }
);

const root = ReactDOMClient.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
