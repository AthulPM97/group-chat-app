import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../store/group-slice";

const Sidebar = () => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const token = useSelector((x) => x.auth.token);
  const myGroups = useSelector((x) => x.group.myGroups);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${baseUrl}/groups`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch(groupActions.setMygroups(response.data.groups));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <ListGroup as="ul" className="mt-2">
      <ListGroup.Item disabled>
        <strong>Your groups</strong>
      </ListGroup.Item>
      {myGroups.map((item) => {
        return (
          <ListGroup.Item action href={`/groups/${item.id}`} key={item.id}>
            {item.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Sidebar;
