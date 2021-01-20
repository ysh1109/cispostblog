import {FETECHING_POST_SUCCESS ,FETECHING_POST_FAILURE,FETECHING_POST_REQUEST  } from './type.js'

export const fetechingPostRequest = () => ({type: FETECHING_POST_REQUEST});

export const fetechingPostSuccess = (json) => ({
    type: FETECHING_POST_SUCCESS,
    payload:json
});

export const fetechingPostFailure = (error) => ({type: FETECHING_POST_FAILURE,payload:error});


export const fetchPost =() => {
    return async dispatch => {
        dispatch(fetechingPostRequest())
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts');
            let json  = await response.json();
            dispatch(fetechingPostSuccess(json))
        }catch(error) {
            dispatch(fetechingPostFailure(error));
        }
    }
}