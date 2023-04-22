import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const ManageGroups = () => {
  //store
  const myGroups = useSelector((x) => x.group.myGroups);

  return (
    <Container>
      <ListGroup>
        {myGroups.map((item) => {
          return (
            <ListGroup.Item key={item.id} action href={`/manage-groups/${item.id}`}>
              {item.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default ManageGroups;
