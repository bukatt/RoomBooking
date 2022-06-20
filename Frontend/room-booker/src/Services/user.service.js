import axios from "axios";
import Endpoints from "../Endpoints/Endpoints";

export const loginAPI = ({username, password}) => {
  let options = { headers: {'content-type': 'application/x-www-form-urlencoded' }}
  const params = new URLSearchParams();

  params.append("username", username);
  params.append("password", password);
  return axios
    .post(Endpoints.login, params, options)
    .then((response) => {
      return response.data;
    });
};
