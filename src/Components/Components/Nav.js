import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ButtonContainer} from "./ButtonContainer";
class Nav extends Component {
    render() {
        return (
           <Navwrapper className="nav Nav-expand-sm " >
                <div className="nav-home">    
                <ButtonContainer>              
                 <Link to='/' className="nav-link text-white mx-2">Home</Link>
                 </ButtonContainer>
                 </div>
               <ul className="navbar-nav items-align-center ">
                <li className="nav-item text-dark mx-3 mt-2">
                   <Link to="/Salesform" className="nav-link text-white">Sales Details</Link>
                   </li>
               </ul>
               <ul className="navbar-nav items-align-center">
                   <li className="nav-item mx-auto mt-2">
               <Link to="/SalesTracking" className="nav-link text-white">Sales</Link>
               </li>
               </ul>
               <Link to="/Inventory" className="nav-link text-white items-align-center mt-2">Inventory</Link>


           </Navwrapper>
        );
    }
}
 const Navwrapper= styled.nav`
 background: var(--mainBlue);
 .nav-link{
     color: var(--mainWhite)!important;
     font-size-adjust: 1.3rem;
     text-transform: capitalize;
 }
 `
 export default Nav;