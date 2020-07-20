import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = props => {
     
    return (

        <>
            <div>
                <h1>Lambda Eats</h1>
            </div>
            <nav>
                <Link to='/'>Home</Link>
            </nav>
        </>

     )
}

export default NavBar;