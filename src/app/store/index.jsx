import {createStore, applyMiddleware} from 'redux';

import allReducers from '../reducers';

let store = createStore(allReducers);

export default config => {
    return store;
}
