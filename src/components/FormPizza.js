import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import order from '../Img/orders.jpg'
import styled from 'styled-components';

const FormContainer = styled.div`
    background-image: url(${order});
    background-repeat: no-repeat;
    background-size: cover;
    height: 870px;
    padding-top: 30px;
    h1 {
        font-size: 2rem;
        margin-left: 10px;
        padding-bottom: 20px;
        text-align: center;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 420px;
        margin: 10px auto;
        padding: 50px;
        border: 2px solid black;
        border-radius: 5px;
        background-color: white;
        height: auto;
      }
      label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 10px;
        font-size: 1.6rem;
      }

      .name {
          input {
              font-size: 1.7rem;
              padding-left: 30px;
          }
      }
    
      input {
        width: 300px;
        margin: 5px 0 0 0;
        border: 2px solid gray;
        border-radius: 6px;
        padding: 10px;
        font-size: 2.1rem;
        
      }

      .size {
          
              margin-bottom: 10ox;
          
          select {
              margin-top: 10px;
              padding: 5px;
              border: 2px solid gray;
              border-radius: 6px;
          }
      }
    
      .error {
        font-size: 1.5rem;
        color: red;
      }
    
      .toppings {
        display: inline-block;
        margin: 20px 0 0 10px;
      }
    
      .toppings input {
        width: 20px;
        display: inline-block;
        margin-right: 5px;
      }

      textArea {
          margin-top: 20px;
          padding: 20px 20px;
          width: 300px;
          height: 90px;
          text-align: left;
          font-size: 1.7rem;
      }

      button {
        width: 150px;
        background-color: black;
        color: white;
        font-size: 1.2rem;
        margin: 20px 0 0 85px;
        padding: 8px 11px;
        cursor: pointer;
        border: 2px black solid;
        border-radius: 5px;
      }
    
      button:disabled {
        background-color: white;
        border: 1px solid silver;
        color: gray;
        cursor: not-allowed;
      }
    
      pre {
        font-size: 1.5rem;
        text-align: center;
      }
`



const FormPizza = ({ orders, setOrders }) => {

    //this is the react state
    const defaultState = {
        name: "",
        size: "small",
        anchovies: false,
        pepperoni: false,
        olive: false,
        bacon: false,
        instructions: ""
    }

    const initialErrors = {
        name: "",
        size: "",
        instructions: ""
    }

    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState(initialErrors);
    const [buttonDisabled, setButtonDisabled] = useState(true);


    //formState schema

        let formSchema = yup.object().shape({
            name: yup.string().required("Please provide name.").min(2),
            size: yup.string().required('Please choose any size'),
            anchovies: yup.boolean(),
            pepperoni: yup.boolean(),
            olive: yup.boolean(),
            bacon: yup.boolean(),
            instructions: yup.string().required('Please enter a special order')
        });
    
    //this is use to valid the button to disabled
    useEffect(() => {
            formSchema.isValid(formState).then(valid => setButtonDisabled(!valid));
    }, [formState, formSchema]);

    //this is for onSubmit function 
    const formSubmit = e => {
        e.preventDefault();
        console.log('Form Submitted', formState)

        //adding axios to check if users are submited to the form

        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                    console.log("form submitted success", res)
        //I set setUser here so it can retrieve the user data to the DOM
                    setOrders(res.data);
        //this one is to add all the user 
                    alert('Pizza added to order!');
                    setFormState({
                        name: "",
                        size: "",
                        instructions: ""
                    })
            })
            .catch(err => {
                    console.log("This is the Error", err)
            });
    }

    //this is to validate change in formSchema
    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({ ...errors, [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({ ...errors, [e.target.name]: err.errors[0]
            });
    });

};

    
    const handleChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
              e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
      
        validateChange(e);
        setFormState(newFormData);
    };


          
    return (

        <FormContainer>
            <form onSubmit={formSubmit}>
                <h1>Order Your Pizza Here!</h1>
                <label className="name">
                    <input 
                        data-cy="name"
                        type="text"
                        name='name'
                        label='name'
                        placeholder="Please, Enter Your Name Here"
                        value={formState.name}
                        onChange={handleChange}
                        errors={errors}
                    />
                    {errors.name.length > 0 ? (
                    <p className='error'>{errors.name}</p>) : null}
                </label>
                <label className='size'>
                    What Size Do You like?
                    <select name='size' onChange={handleChange}>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                    </select>
                </label>
                <label className='toppings'>
                    <input data-cy='anchovies' type='checkbox' name='anchovies' value={formState.anchovies} onChange={handleChange} />
                    anchovies
                </label>
                <label className='toppings'>
                    <input data-cy='pepperoni' type='checkbox' name='pepperoni' value={formState.pepperoni} onChange={handleChange} />
                    pepperoni
                </label>
                <label className='toppings'>
                    <input data-cy='olive' type='checkbox' name='olive' value={formState.olive} onChange={handleChange} />
                    olive
                </label>
                <label className='toppings'>
                    <input data-cy='bacon' type='checkbox' name='bacon' value={formState.bacon} onChange={handleChange} />
                    bacon
                </label>
                <label>
                    <textarea
                        data-cy="instructions" 
                        type='text'
                        name='instructions'
                        placeholder="Please Type Instructions Here!"
                        value={formState.instructions}
                        onChange={handleChange}
                    />
                    {errors.instructions.length > 0 ? (
                    <p className='error'>{errors.instructions}</p>) : null}
                </label>
                <button data-cy="submit-button" disabled={buttonDisabled}>Submit</button>
                <pre>{JSON.stringify(orders, null, 2)}</pre>
            </form>
            
        </FormContainer>

    )
}

export default FormPizza;