import axios from "axios";
import { useRef } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddMembersForm = (props) => {
  const phoneNoRef = useRef();

  const baseUrl = process.env.REACT_APP_API_URL;

  const token = useSelector((x) => x.auth.token);

  const addMemberHandler = (e) => {
    e.preventDefault();
    const data = {
      phone: phoneNoRef.current.value,
    };
    console.log(data);
    axios
      .post(`${baseUrl}/groups/${props.groupId}`, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        phoneNoRef.current.value = '';
      })
      .catch((err) => console.log(err));
  };
  return (
    <Form onSubmit={addMemberHandler}>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Enter user's phone number"
          ref={phoneNoRef}
        />
        <Button type="submit" variant="outline-primary">
          Add member
        </Button>
      </FormGroup>
    </Form>
  );
};

export default AddMembersForm;
