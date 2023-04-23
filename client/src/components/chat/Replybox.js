import { useSelector } from "react-redux";
import axios from "axios";
import { useRef, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

const Replybox = () => {
  //refs
  const messageRef = useRef();

  //states
  const [image, setImage] = useState(null);

  //store
  const name = useSelector((x) => x.auth.name);
  const token = useSelector((x) => x.auth.token);

  const baseUrl = process.env.REACT_APP_API_URL;
  //handlers
  const sendMessageHandler = (e) => {
    e.preventDefault();
    const message = {
      name: name,
      content: messageRef.current.value,
    };
    messageRef.current.value = "";
    console.log(message);
    axios
      .post(`${baseUrl}/chat`, message, { headers: { Authorization: token } })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const imageChangeHandler = (e) => {
    setImage(() => e.target.files[0]);
  };

  const imageUploadHandler = () => {
    const blob = new Blob([image], { type: image.type });
    axios.post(`${baseUrl}/chat/upload`, blob, {
      headers: {
        "Content-Type": image.type,
        Authorization: token,
      },
    }).then(response => {
      console.log(response);
    }).catch(err => console.log(err));
  };

  return (
    <Form style={{ display: "flex" }} onSubmit={sendMessageHandler}>
      <FormControl type="text" ref={messageRef} />
      <input type="file" onChange={imageChangeHandler} />
      <Button variant="outline-primary" onClick={imageUploadHandler}>
        Upload
      </Button>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default Replybox;
