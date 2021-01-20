import React,{useState} from 'react'
import './Register.css'
import {connect} from 'react-redux';

import { Link,useHistory } from 'react-router-dom';
function Login(props) {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const login =e => {
        e.preventDefault()
        if(email!=props.user.email || password!=props.user.password){
            alert('Invalid Credentials')
        }else {
            props.onLogin(email,password)
            history.push('/')
         }
    }

    return (
        <div className="register">
            
            <div className="register_box">
            <h2>Login</h2>
                <form >
                    <h5>E-mail</h5>
                    <input value ={email} placeholder="enter your email"
                    onChange={e=>setEmail(e.target.value) }
                    type="text" />
                    <h5>password</h5>
                    <input value={password} placeholder="enter password"
                    onChange={e=>setPassword(e.target.value) }
                    type="password" />
                    <button
                     type="submit"
                    onClick={login}
                    className="register_regbtnn">Login</button>
                </form>  
            </div>

        </div>
    )
}


const mapStateToProps = state => {
    return {
        user: state.signUp
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email,password) => dispatch({type: 'LOGIN',value:{email,password}}),
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)
