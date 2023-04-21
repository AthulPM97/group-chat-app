import axios from "axios";
import { useRef } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { history } from "../../helpers/history";

const AddGroupForm = () => {
  //refs
  const groupNameRef = useRef();

  //store
  const token = useSelector((x) => x.auth.token);

  //handlers
  const createGroupHandler = (e) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    e.preventDefault();
    const data = {
      groupName: groupNameRef.current.value,
    };
    axios
      .post(`${baseUrl}/groups/create-group`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        alert(response.data.message);
        history.navigate(0);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Form onSubmit={createGroupHandler}>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Enter group name"
            ref={groupNameRef}
          />
          <Button type="submit">Create group</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default AddGroupForm;
