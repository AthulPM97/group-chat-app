import React, { useState } from "react";
import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";
import { Button } from "react-bootstrap";

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true);

  const modeChangeHandler = () => {
   setLoginMode(mode => !mode);
  }

  return (
    <React.Fragment>
      {loginMode && <LoginForm onModeChange={modeChangeHandler}/>}
      {!loginMode && <SignupForm onModeChange={modeChangeHandler}/>}
    </React.Fragment>
  );
};

export default Auth;
