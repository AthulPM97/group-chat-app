import Auth from "./pages/Auth";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { history } from "./helpers/history";
import { useSelector } from "react-redux";

function App() {
  //custom history object config
  history.navigate = useNavigate();
  history.location = useLocation();

  //store
  const isLoggedIn = useSelector((x) => x.auth.isLoggedIn);

  return (
    <Routes>
      {!isLoggedIn && <Route path="/" element={<Auth />} />}
      {isLoggedIn && <Route path="/home" element={<Home />} />}
    </Routes>
  );
}

export default App;
