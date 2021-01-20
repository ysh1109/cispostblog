import {FETECHING_COMMENT_SUCCESS ,FETECHING_COMMENT_FAILURE,FETECHING_COMMENT_REQUEST ,DELETE,EDIT_COMMENT } from '../actions/type.js'

const initialState = {
    comments: [],
    errorMessage: "",
    isFetching: false
};

const commentReducer = (state = initialState,action) => {
    switch(action.type){
        case FETECHING_COMMENT_REQUEST: 
        console.log("post request ----> ",action.type)
            return {...state,isFetching:true};
        case FETECHING_COMMENT_FAILURE:
            console.log("post failure ----> ",action.type)
            return {...state,errorMessage:action.payload};
        case FETECHING_COMMENT_SUCCESS:
            console.log(action.payload)
            const sampleComments = action.payload
            const selectedComments = []
            let setComments = []
            sampleComments.map((comment,index)=>{
                    if(comment.postId == action.value) {
                        selectedComments.push(comment)
                         setComments = [...selectedComments]
                    }
                })
             initialState.comments = setComments   
            return {...state,isFetching:false,
                comments:setComments
            };

        case DELETE:
            console.log(action.value)

            const newPosts = [...initialState.comments]
            console.log(newPosts)
            

            const index = newPosts.findIndex((items)=>items.id == action.value)
            

            newPosts.splice(index,1)

            initialState.comments = [...newPosts]
            return {...state,
                comments:newPosts
            } ;      
        case EDIT_COMMENT:
            console.log(action.value)

            const updatedPosts = [...initialState.comments]

            const editIndex = updatedPosts.findIndex((items)=>items.id == action.value.id)
            
            updatedPosts[editIndex].id = action.value.id;
            updatedPosts[editIndex].name = action.value.name;
            updatedPosts[editIndex].body = action.value.body;

            initialState.comments = [...updatedPosts]
            

            return {...state,
                posts:updatedPosts
            } ;          
        default:
            return state;        
    }
}


export default commentReducer;