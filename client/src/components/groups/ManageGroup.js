import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";

const ManageGroup = () => {
  const { groupId } = useParams();

  const [members, setMembers] = useState([]);

  const token = useSelector((x) => x.auth.token);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${baseUrl}/groups/manage/${groupId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log(response);
        setMembers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //handlers
  const makeAdminHandler = (name) => {
    const data = {
      name: name,
      groupId: groupId,
    };
    axios
      .post(`${baseUrl}/admin/make-admin`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  const deleteMemberHandler = (name) => {
    const data = {
      name,
      groupId,
    };

    axios
      .post(`${baseUrl}/admin/delete-member`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {members.map((member) => {
          const isAdmin = member.isAdmin == 1;
          return (
            <li
              key={member.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <span style={{ marginRight: "10px" }}>{member.name}</span>
              {!isAdmin && (
                <Button
                  variant="outline-primary"
                  style={{ marginRight: "10px" }}
                  onClick={makeAdminHandler.bind(null, member.name)}
                >
                  Make Admin
                </Button>
              )}
              {!isAdmin && (
                <Button
                  variant="danger"
                  onClick={deleteMemberHandler.bind(null, member.name)}
                >
                  Remove
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default ManageGroup;
