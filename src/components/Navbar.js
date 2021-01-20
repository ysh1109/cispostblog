import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {MenuItems} from './MenuItem'
import './Navbar.css'
class Navbar extends Component {

    state ={
        clicked:false
    }
    handleClick = () => {
        this.setState({clicked : !this.state.clicked})
    }
    render(){
        return(
           <nav className="NavbarItems">
               <Link style={{textDecoration:'none'}} to="/">
                   <h1 className="navbar-logo">CISBLOG<i className="fab fa-react"></i></h1>

               </Link>
               <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked?'fas fa-times':'fas fa-bars'}></i>

               </div>

               <ul className={this.state.clicked?'nav-menu active':'nav-menu'}>
                   {MenuItems.map((item,index)=>{
                       return (
                            <li key={index}>
                            <Link to={item.url} onClick={this.handleClick}>
                                <a className={item.cName} >{item.title}</a>
                            </Link>
                            </li>
                       )
                   })}
                  

               </ul>
           </nav>

        )
    }
}


export default Navbar;