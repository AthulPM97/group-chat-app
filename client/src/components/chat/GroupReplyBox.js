import axios from "axios";
import { useRef } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

const GroupReplyBox = (props) => {
  const { groupId } = props;

  const messageRef = useRef();

  const token = useSelector((x) => x.auth.token);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_API_URL;
    const data = {
      groupId: groupId,
      content: messageRef.current.value,
    };
    axios
      .post(`${baseUrl}/groups/send`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
      })
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

export default GroupReplyBox;
