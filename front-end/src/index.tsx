import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from "./App";
import {store} from "./store/store";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <GoogleOAuthProvider clientId="576029847210-gl3sgfaghi6qrjulsq197m4ci7ekr4k3.apps.googleusercontent.com">
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
