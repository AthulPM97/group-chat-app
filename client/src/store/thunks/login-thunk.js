import axios from "axios";
import { authActions } from "../auth-slice";
import { history } from "../../helpers/history";

export const login = (credentials) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${baseUrl}/user/login`, credentials);
      console.log(response);
      if (response.status === 200) {
        dispatch(authActions.login({token: response.data.token, name: response.data.name}));
        alert(response.data.message);
        history.navigate('/home');
      }
    };
    try {
      await sendRequest();
    } catch (err) {
      alert(err.response.data.message);
    }
  };
};
