import * as ActionTypes from '../constants/actionTypes';

export default function language(state = {
    locale: 'en',
    messages: {},
}, action = {}) {
    switch(action.type) {
        case ActionTypes.USER_GET_AGE:
            return {...state};
        default:
            return state;
    }
}