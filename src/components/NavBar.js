import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
width: 100%;
height: 80px;
font-size: 2.1rem;
display: flex;
justify-content: space-between;
padding: 30px;
background-color: black;
    h1 {
        color: white;
    }

    nav {
        a {
            text-decoration: none;
            color: white;
            
                &:hover {
                    color: blue;
                }
        }
    }
`

const NavBar = props => {
     
    return (

        <NavContainer>
            <div>
                <h1>Lambda Eats</h1>
            </div>
            <nav>
                <Link to='/'>Home</Link>
            </nav>
        </NavContainer>

     )
}

export default NavBar;