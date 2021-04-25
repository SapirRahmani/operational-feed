import React from "react";
import { Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import RegistrationPage from "./components/RegistrationPage";
import { ROUTES } from "../../app.constants";

const Login = () => {
  return (
    <>
      <Route exact path={`${ROUTES.LOGIN}`} component={SignInPage} />
      <Route
        exact
        path={`${ROUTES.LOGIN}${ROUTES.REGISTER}`}
        component={RegistrationPage}
      />
    </>
  );
};

export default Login;
