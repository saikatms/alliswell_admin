import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./components/Reducers/rootReducer";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { red, grey, blueGrey, green, blue } from "@material-ui/core/colors";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
