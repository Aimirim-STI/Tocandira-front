/** This module contains the auth
 * reducer build and configuration
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Local Imports
import * as actionTypes from './actionTypes'

// #######################################

/** Initial state of the auth redux */
const initialState = {
    open_ds:false,
    open_dp:false,
    open_verify:false,
};

/** Auth reducer definition */
const reducer = (state=initialState, action) => {
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {
        case actionTypes.OPEN_DATASOURCE:
            newState.open_ds = action.open;
            break
        case actionTypes.OPEN_DATAPOINT:
            newState.open_dp = action.open;
            break
        case actionTypes.OPEN_VERIFY:
            newState.open_verify = action.open;
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;