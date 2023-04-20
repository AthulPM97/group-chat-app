import { Container, Table } from "react-bootstrap";
import Replybox from "./Replybox";
import Chatrow from "./Chatrow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { chatActions } from "../../store/chat-slice";

const Chatbox = () => {
  //store
  const messages = useSelector((x) => x.chat.messages);
  const token = useSelector((x) => x.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${baseUrl}/chat`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch(chatActions.setMessages(response.data.messages));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Table striped bordered hover style={{ minHeight: "100px" }}>
        <tbody>
          {messages.map((item) => (
            <Chatrow
              key={item.id}
              message={item.content}
              sender={item.userName}
            />
          ))}
        </tbody>
      </Table>
      <Replybox />
    </Container>
  );
};

export default Chatbox;
