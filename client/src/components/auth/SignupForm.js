import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { signup } from "../../store/auth-slice";
import { validate } from "./validate";
import axios from "axios";

const SignupForm = () => {
  //history
  // const history = useHistory();

  //refs
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  //store
  // const dispatch = useDispatch();

  //handlers
  const signupHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredPassword = passwordRef.current.value;

    //validation
    const credentials = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      password: enteredPassword,
    };

    const baseUrl = process.env.REACT_APP_API_URL;
    // if (validate(credentials)) {
    //   // localStorage.setItem('email', enteredEmail);
    //   // dispatch(signup(credentials));
    //   // history.push("/home");
    // }
    console.log(credentials);
    axios
      .post(`${baseUrl}/user/signup`, credentials)
      .then((response) => {
        console.log(response);
        if(response.status === 201) {
          alert('Succefully signed up!');
        }
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.message);
      });
  };

  return (
    <Container>
      <div className="text-center mb-3">
        <h3>Sign Up</h3>
      </div>
      <Form onSubmit={signupHandler}>
        <Form.Group className="mb-2">
          <Form.Control type="text" placeholder="Name" ref={nameRef} required />
        </Form.Group>
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
            type="number"
            placeholder="Phone number"
            ref={phoneRef}
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
            Sign Up
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignupForm;
