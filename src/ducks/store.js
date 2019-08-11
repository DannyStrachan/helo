import {createStore} from "redux"
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export default createStore(reducer, composeEnhancers());
 