import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StepZilla from "react-stepzilla";
import Step1 from "../components/steps/Step1";
import Form from "../components/Form/FormContainer";
import Step3 from "../components/steps/Step3";
import Step4 from "../components/steps/Step4";

const steps = [
  { name: "", component: <Step1 /> },
  { name: "", component: <Form /> },
  { name: "", component: <Step3 /> },
  { name: "", component: <Step4 /> }
];

function App({ history }) {
  const handleChange = step => {
    history.push({
      pathname: "/",
      search: `?step=${step}`
    });
  };

  return (
    <div className="App">
      <StepZilla steps={steps} onStepChange={handleChange} />
    </div>
  );
}

const RoutedApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" render={App} />
    </Switch>
  </BrowserRouter>
);

export default RoutedApp;
