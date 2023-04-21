import { Navbar, Nav, Button, NavbarBrand, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="/home">Chat App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">Global Chat</Nav.Link>
          <Nav.Link href="/add-group">Create group</Nav.Link>
        </Nav>
        <Button variant="outline-danger">Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Navigation;
