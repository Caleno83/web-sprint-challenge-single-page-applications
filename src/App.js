import React, { useState } from "react";
import HomePage from "./component/HomePage";
import FormPizza from "./component/FormPizza";
import NavBar from "./component/NavBar";
import { Route } from 'react-router-dom';


const App = () => {

  const [pizzaOrders, setPizzaOrders] = useState([]);

  return (
    <>
      <NavBar />
      <Route exact path="/">
      <HomePage orders={pizzaOrders} />
      </Route>
      <Route path="/pizza">
      <FormPizza orders={pizzaOrders} setOrders={setPizzaOrders} />
      </Route>
    </>
  );
};

export default App;
