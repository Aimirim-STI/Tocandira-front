/** This module contains the global
 * reducer build and configuration
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - axios 
*/

// Imports from modules
import axios from 'axios';
// Local Imports
import * as actionTypes from './actionTypes'

// #######################################

/** Initial state of the global redux */
const initialState = {
    baseURL: "",
    backend_instance: null
};

/** Global reducer definition */
const reducer = (state=initialState, action) => {
    let apiURL;
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {
        case actionTypes.SET_CONF:
            newState.baseURL = action.conf.root;
            apiURL = action.conf.api_protocol +action.conf.api_ip +action.conf.api_root;
            newState.backend_instance = axios.create({baseURL: apiURL});
            break
        case actionTypes.SET_AUTH:
            newState.backend_instance.defaults.headers.common = {...state.backend_instance.defaults.headers.common};
            newState.backend_instance.defaults.headers.common['Authorization'] = action.token_type+' '+action.token;
            break
        case actionTypes.UNSET_AUTH:
            newState.backend_instance.defaults.headers.common = {...state.backend_instance.defaults.headers.common};
            delete newState.backend_instance.defaults.headers.common['Authorization'];
            break
        default:
            // console.debug('[reducers/global]',action)
            break
    }
    return(newState);
};

export default reducer;