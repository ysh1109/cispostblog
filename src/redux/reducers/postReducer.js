import {FETECHING_POST_SUCCESS ,FETECHING_POST_FAILURE,FETECHING_POST_REQUEST,DELETE,EDIT  } from '../actions/type.js';

const initialState = {
    posts: [],
    errorMessage: "checking",
    isFetching: false
};

const postReducer = (state = initialState,action) => {
    console.log("reducer ----> ",action.type)
    switch(action.type){
        case FETECHING_POST_REQUEST: 
        console.log("post request ----> ",action.type)
            return {...state,isFetching:true};
        case FETECHING_POST_FAILURE:
            console.log("post failure ----> ",action.type)
            return {...state,errorMessage:action.payload};
        case FETECHING_POST_SUCCESS:
            console.log(action.payload)
            initialState.posts = [...action.payload
            ]
            return {...state,isFetching:false,
                posts:action.payload
            };
        case DELETE:
            console.log(action.value)

            const newPosts = [...initialState.posts]
            console.log(newPosts)
            

            const index = newPosts.findIndex((items)=>items.id == action.value)
            

            newPosts.splice(index,1)

            initialState.posts = [...newPosts]
            return {...state,
                posts:newPosts
            } ;      

        case EDIT:
            console.log(action.value)

            const updatedPosts = [...initialState.posts]

            const editIndex = updatedPosts.findIndex((items)=>items.id == action.value.id)
            
            updatedPosts[editIndex].id = action.value.id;
            updatedPosts[editIndex].title = action.value.title;
            updatedPosts[editIndex].body = action.value.body;

            initialState.posts = [...updatedPosts]
            

            return {...state,
                posts:updatedPosts
            } ;          
        default:
            console.log("default ----> ",action.type)
            return state;        
    }
}


export default postReducer;