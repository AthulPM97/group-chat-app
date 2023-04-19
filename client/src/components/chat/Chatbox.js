import { Button, Container, Form, FormControl, Table } from "react-bootstrap";
import Replybox from "./Replybox";
import Chatrow from "./Chatrow";

const messages = [
  { id: 1, sender: "athul", message: "Hello" },
  { id: 2, sender: "john", message: "Hi!" },
];
const Chatbox = () => {
  return (
    <Container>
      <Table striped bordered hover style={{minHeight: '100px'}}>
        <tbody>
          {messages.map((item) => (
            <Chatrow key={item.id} message={item.message} sender={item.sender}/>
          ))}
        </tbody>
      </Table>
      <Replybox />
    </Container>
  );
};

export default Chatbox;
