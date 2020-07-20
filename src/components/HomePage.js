import React from 'react';
import { Link } from 'react-router-dom';
import pizza from '../Img/pizza.jpg'
import FormPizza from './FormPizza';
import styled from 'styled-components';

const HomeContainer = styled.div`
background-image: url(${pizza});
width: 100%;
height: 610px;
background-repeat: no-repeat;
background-size: cover;
    h1 {
        font-size: 5rem;
        text-align: center;
        padding: 140px 0 0 650px;
    }
    button {
        color: black;
        margin: 110px 0 0 950px;
        padding: 15px;
        border: 2px solid black;
        border-radius: 5px;
            &:hover {
                background-color: gray;
            }

            a {
                color: black;
                text-decoration: none;
                font-size: 2rem;
                    &:hover {
                        color: silver;
                    }
            }       
        }
`

const HomePage = ({ orders }) => {
     
    return (

        <HomeContainer>
            <h1>You Build It, You Eat It</h1>
            <button>
                <Link to="/pizza">Build Your Pizza</Link>
            </button>
        </HomeContainer>

     )
}

export default HomePage;