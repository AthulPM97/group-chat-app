import Auth from "./pages/Auth";

import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { history } from "./helpers/history";
import { useSelector } from "react-redux";
import Navigation from "./components/UI/Navigation";
import React from "react";
import AddGroupForm from "./components/groups/AddGroupForm";
import Sidebar from "./components/UI/Sidebar";
import { Col, Row } from "react-bootstrap";
import GroupChat from "./pages/GroupChat";
import ManageGroups from "./components/groups/ManageGroups";
import ManageGroup from "./components/groups/ManageGroup";

function App() {
  //custom history object config
  history.navigate = useNavigate();
  history.location = useLocation();

  //store
  const isLoggedIn = useSelector((x) => x.auth.isLoggedIn);

  return (
    <React.Fragment>
      {isLoggedIn && <Navigation />}
      <Row>
        {isLoggedIn && (
          <Col md={2}>
            <Sidebar />
          </Col>
        )}
        <Col>
          <Routes>
            {!isLoggedIn && <Route path="*" element={<Auth />} />}
            {isLoggedIn && <Route path="/" element={<Navigate to="/home" />} />}
            {isLoggedIn && <Route path="/home" element={<Home />} />}
            {isLoggedIn && (
              <Route path="/add-group" element={<AddGroupForm />} />
            )}
            {isLoggedIn && (
              <Route path="/groups/:groupId" element={<GroupChat />} />
            )}
            {isLoggedIn && (
              <Route path="/manage-groups" element={<ManageGroups />} />
            )}
            {isLoggedIn && <Route path="/manage-groups/:groupId" element={<ManageGroup />} />}
          </Routes>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default App;
