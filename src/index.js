import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './theme';
import App from './App';
import './styles/style.scss';
import * as serviceWorker from './serviceWorker';
import * as data from './helpers/data';

// The logger is only for development only
const loggerMiddlerware = createLogger({diff: true});
const middleware = [thunkMiddleware, loggerMiddlerware];

const initialState = {
  shifts: data.shifts,
  shop: data.shop,
};

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App/>
      </MuiPickersUtilsProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
