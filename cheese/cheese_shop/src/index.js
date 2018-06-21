import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';

const storeFromMiddleWare = applyMiddleware()(createStore)

ReactDOM.render(
                <Provider store = {storeFromMiddleWare(reducers)}>
                  <App />
                </Provider>,
                document.getElementById('root'));
                
registerServiceWorker();

/**
 *  "start": "node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    //"start": "react-scripts start",
    //"build": "react-scripts build",
    //"test": "react-scripts test --env=jsdom",
    //"eject": "react-scripts eject"
 * 
 */