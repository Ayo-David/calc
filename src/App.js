import React from "react";
import Container from './calculate'
import Calculate from "./CalculatorClass";
import Calculator from "./container3";

const App = () => {

  return (
    <div className="container">
      <div className="app__container">

        {/* <Container /> */}
        {/* <Calculator /> */}
        <Calculate />
      </div>
    </div>
  );
}

export default App;