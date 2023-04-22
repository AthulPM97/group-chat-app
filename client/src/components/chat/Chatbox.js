import { Container, Table } from "react-bootstrap";
import Replybox from "./Replybox";
import Chatrow from "./Chatrow";

const Chatbox = (props) => {
  const { messages } = props;

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
