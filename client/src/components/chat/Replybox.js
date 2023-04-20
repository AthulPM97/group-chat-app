import axios from "axios";
import { useRef } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

const Replybox = () => {
  //refs
  const messageRef = useRef();

  //store
  const name = useSelector((x) => x.auth.name);
  const token = useSelector((x) => x.auth.token);

  //handlers
  const sendMessageHandler = (e) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    e.preventDefault();
    const message = {
      name: name,
      content: messageRef.current.value,
    };
    console.log(message);
    axios
      .post(`${baseUrl}/chat`, message, { headers: { Authorization: token } })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <Form style={{ display: "flex" }} onSubmit={sendMessageHandler}>
      <FormControl type="text" ref={messageRef} />
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default Replybox;
