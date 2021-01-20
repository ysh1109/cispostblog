import {FETECHING_COMMENT_SUCCESS ,FETECHING_COMMENT_FAILURE,FETECHING_COMMENT_REQUEST  } from './type.js'

export const fetechingCommentRequest = () => ({type: FETECHING_COMMENT_REQUEST});

export const fetechingCommentSuccess = (json,userId) => ({
    type: FETECHING_COMMENT_SUCCESS,
    payload:json,
    value:userId
});

export const fetechingCommentFailure = (error) => ({type: FETECHING_COMMENT_FAILURE,payload:error});


export const fetchComment =(userId) => {
    return async dispatch => {
        dispatch(fetechingCommentRequest())
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/comments/');
            let json  = await response.json();
            console.log(`results : ${JSON.stringify(json)}`)
            dispatch(fetechingCommentSuccess(json,userId))
        }catch(error) {
            dispatch(fetechingCommentFailure(error));
        }
    }
}