import React from "react";
import { Container } from "react-bootstrap";
import Chatbox from "../components/chat/Chatbox";

const Home = () => {
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Chat App</h1>
      <Chatbox />
    </Container>
  );
};

export default Home;
