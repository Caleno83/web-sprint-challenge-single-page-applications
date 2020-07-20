import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = props => {
     
    return (

        <>
            <h1>You Build It, You Eat It</h1>
            <button>
                <Link to="/pizza">Build Your Pizza</Link>
            </button>
        </>

     )
}

export default HomePage;