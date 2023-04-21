import React from "react";
import { Container } from "react-bootstrap";
import Chatbox from "../components/chat/Chatbox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { chatActions } from "../store/chat-slice";

const Home = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  //states
  const [count, setCount] = useState(0);

  //store
  const messages = useSelector((x) => x.chat.messages);
  const token = useSelector((x) => x.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
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
    const intervalId = setInterval(() => {
      console.log("get data called");
      setCount(count + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [count]);
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Chat App</h1>
      <Chatbox messages={messages}/>
    </Container>
  );
};

export default Home;
