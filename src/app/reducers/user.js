
import * as ActionTypes from '../constants/actionTypes';
import {combineReducers} from 'redux'

 function name(state = '', action) {
    switch(action.type) {
        case ActionTypes.USER_GET_NAME:
            return state;
        default:
            return state;
    }
}

 function age(state = 0, action) {
    switch(action.type) {
        case ActionTypes.USER_GET_AGE:
            return state;
        default: 
            return state;
    }
}

export default combineReducers({
    name: name,
    age: age
});

