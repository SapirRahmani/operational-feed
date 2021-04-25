import React from 'react'
import { BrowserRouter } from "react-router-dom";
import RTL from './RTL'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store, persistor} from "./redux/store";

const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ["Varela Round", 'Arial', 'sans-serif'].join(',')
  },
  palette: {
    type: 'dark',
    primary: {
      contrastText: "#fff",
      light: "#64b5f6",
      main: '#2196f3',
    },
    success: {
      main: "#81c784"
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});



render(
  <>
    {/* <style jsx global>
      {`body {
        margin: 0px;
        padding: 0px;}
        `}
    </style> */}
    <MuiThemeProvider>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <RTL>
              <App />
            </RTL>
          </BrowserRouter>
        </ThemeProvider>
        </PersistGate>
      </Provider>
    </MuiThemeProvider>
  </>,
  document.getElementById('root')
)