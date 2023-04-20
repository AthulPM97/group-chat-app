import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { login } from "../../store/thunks/login-thunk";
import { useDispatch } from "react-redux";

const LoginForm = (props) => {
  //refs
  const emailRef = useRef();
  const passwordRef = useRef();

  //store
  const dispatch = useDispatch();

  //handlers
  const loginHandler = (e) => {
    e.preventDefault();
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(login(credentials));
    // const baseUrl = process.env.REACT_APP_API_URL;

    // axios.post(`${baseUrl}/user/login`, credentials).then(response => {
    //     console.log(response);
    //     alert(response.data.message);
    //     localStorage.setItem('token', response.data.token);
    // }).catch(err => console.log(err));
  };
  const changeModeHandler = () => {
    props.onModeChange();
  };

  return (
    <Container>
      <div className="text-center mb-3">
        <h3>Login</h3>
      </div>
      <Form onSubmit={loginHandler}>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button variant="outline-warning" onClick={changeModeHandler}>
          Don't have an account? Sign up!
        </Button>
      </div>
    </Container>
  );
};

export default LoginForm;
