import React,{useState} from 'react'
import './Register.css'
import {connect} from 'react-redux';

import { Link,useHistory } from 'react-router-dom';
function Register(props) {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const register =e => {
        e.preventDefault();
        props.onRegister(email,password)
        history.push('/login')

    }

    return (
        <div className="register">
            
           
            <div className="register_box">
            <h2>Register</h2>
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
                    onClick={register}
                    className="register_regbtnn">Register</button>
                </form>  
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.signUp.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onRegister: (email,password) => dispatch({type: 'REGISTER',value:{email,password}}),
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Register)
