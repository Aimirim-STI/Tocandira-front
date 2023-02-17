/** This module contains the implementation
 * of the actions accepted by auth redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import {AxiosError} from 'axios';
// Local Imports
import * as actionTypes from './actionTypes';
import { emitNetworkErrorAlert, openVerifyPopup} from '../popups/actions';

// #######################################

/** Redux action to */
/** Description.
* @param ``: 
* @returns */
const saveData=(dplist) => ({type:actionTypes.GET_DPDATA, dplist:dplist});

// /** Redux action to */
const saveDataVerify=(dplist, dpname) => ({type:actionTypes.VERIFY_DPDATA_PENDING, dplist:dplist, dpname:dpname});

/** Redux action to */
export const updateDataPending=() => ({type:actionTypes.UPDATE_DPDATA_PENDING});

/** The request done prior to `saveParams` function */
export const getData=(api_instance) => (dispatch) => {
    api_instance.get('/datapoints')
    .then( (res) => dispatch(saveData(res.data)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert())
            }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

/** The request done prior to `saveParams` function */
export const postDataVerify=(api_instance, dpname) => (dispatch) => {
    api_instance.post('/test/' + dpname)
    .then( (res) => dispatch(saveDataVerify(res.data, dpname)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                // dispatch(invalidConnection());
            }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

/** The request done prior to `saveParams` function */
export const putDataComfirm=(api_instance, dplist) => (dispatch) => {
    dplist.forEach((row) => {
        api_instance.put('/datapoint/' + row.name + '/confirm')
        .then( (res) => {
            dispatch(getData(api_instance))
        })
        .catch( (req) => {
                if(req.code===AxiosError.ERR_NETWORK){
                    // dispatch(invalidConnection());
                }else{
                    // dispatch(invalidEntry(req.response.data.detail));
                }
            }
        )
    })
};