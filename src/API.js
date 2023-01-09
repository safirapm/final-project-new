import axios from "axios";

const api = process.env.REACT_APP_APIKEY;
const baseURL = process.env.REACT_APP_BASEURL;

export const getAllUsers = async () => {
  const users = await axios.get(`${baseURL}api/v1/all-user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      apiKey: api,
    },
  });
  return users.data.data;
};
