const initialState = {
    user : [],
    email :'',
    password: '',
    isLogin:false
};

const signUpReducer = (state=initialState,action) => {

    switch(action.type){
        case 'REGISTER':
            console.log(action.value)
            initialState.email = action.value.email
            initialState.password = action.value.password
            return {
                ...state,
                email:action.value.email,
                password:action.value.password
            }
        case 'LOGIN' :
            if(initialState.email  == action.value.email && initialState.password == action.value.password){
                return {
                    ...state,
                    isLogin:true
                }
            }   
        default:
            return state
    }
}

export default signUpReducer;