import { Button, Form, FormControl } from "react-bootstrap";

const Replybox = () => {
  return (
    <Form style={{ display: "flex" }}>
      <FormControl type="text"></FormControl>
      <Button variant="primary">Send</Button>
    </Form>
  );
};

export default Replybox;
