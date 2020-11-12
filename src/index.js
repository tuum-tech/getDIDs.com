import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/Homepage';
import About from 'pages/About';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route } from "react-router-dom";

import './index.scss'


ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/">
        <App />
      </Route>
     
      <Route path="/about">
        <About />
      </Route>
    </CookiesProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
