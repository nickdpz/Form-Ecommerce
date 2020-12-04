import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/Global.css';

import App from './routes';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers';

import initialState from './fields/initialState';

const store = createStore(reducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);