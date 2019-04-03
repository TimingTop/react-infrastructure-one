import * as actionTypes from '../constants/actionTypes';


export function getName() {
    return {
        type: actionTypes.USER_GET_NAME
    }
}

export function getAge() {
    return {
        type: actionTypes.USER_GET_AGE
    }
}

export function getInfo() {
    return {
        type: actionTypes.USER_GET_INFO
    }
}
