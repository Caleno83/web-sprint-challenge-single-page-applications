import React from 'react';


const FormPizza = props => {
     
    return (

        <>
        <form>
            <h1>Order Your Pizza Here!</h1>
            <label className='name'>
                <input 
                type="text"
                name='name'
                label='name'
                value='Please, Enter Your Name Here'
                />
            </label>
            <label className='size'>
                What Size Do You like?
                <select name='size'>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                </select>
            </label>
            <label className='toppings'>
                Anchovies
                <input type='checkbox' name='anchovies' value='pepperoni' />
                Pepperoni
                <input type='checkbox' name='pepperoni' value='pepperoni' />
                Olive
                <input type='checkbox' name='olive' value='pepperoni' />
                Bacon
                <input type='checkbox' name='bacon' value='pepperoni' />
            </label>
            <label>
                <textarea 
                type='text'
                name='instructions'
                value='Please Type Instructions Here'
                />
            </label>
            <button>Submit</button>
        </form>
        </>

     )
}

export default FormPizza;