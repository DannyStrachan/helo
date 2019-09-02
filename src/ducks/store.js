import {createStore, applyMiddleware} from "redux"
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'

export default createStore(reducer, applyMiddleware(promiseMiddleware));
 

// import {createStore,} from "redux"
// import reducer from './reducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

// export default createStore(reducer, composeEnhancers());
 