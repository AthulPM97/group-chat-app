import { Container, Table } from "react-bootstrap";
import Chatrow from "./Chatrow";
import GroupReplyBox from "./GroupReplyBox";

const GroupChatbox = (props) => {
  const { messages, groupId } = props;

  return (
    <Container>
      <Table striped bordered hover style={{ minHeight: "100px" }}>
        <tbody>
          {messages.map((item) => (
            <Chatrow
              key={item.id}
              message={item.content}
              sender={item.name}
            />
          ))}
        </tbody>
      </Table>
      <GroupReplyBox groupId={groupId} />
    </Container>
  );
};

export default GroupChatbox;
