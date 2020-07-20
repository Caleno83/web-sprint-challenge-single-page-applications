import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';




const FormPizza = ({orders, setOrders}) => {

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

        <>
        <form onSubmit={formSubmit}>
            <h1>Order Your Pizza Here!</h1>
            <label className='name'>
                <input 
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
                <input type='checkbox' name='anchovies' value={formState.anchovies} onChange={handleChange} />
                Anchovies
            </label>
            <label>
                <input type='checkbox' name='pepperoni' value={formState.pepperoni} onChange={handleChange} />
                Pepperoni
            </label>
            <label>
                <input type='checkbox' name='olive' value={formState.olive} onChange={handleChange} />
                Olive
            </label>
            <label>
                <input type='checkbox' name='bacon' value={formState.bacon} onChange={handleChange} />
                Bacon
            </label>
            <label>
                <textarea 
                type='text'
                name='instructions'
                placeholder="Please Type Instructions Here!"
                value={formState.instructions}
                onChange={handleChange}
                />
                {errors.instructions.length > 0 ? (
                <p className='error'>{errors.instructions}</p>) : null}
            </label>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
        <pre>{JSON.stringify(orders, null, 2)}</pre>
        </>

     )
}

export default FormPizza;