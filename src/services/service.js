import axios from "axios";
import { toastSuccess, toastError } from "../constants/Toastify";

const baseUrl = "https://bootcamp.akbolat.net/";
const endPoints = {
  login: "auth/local",
  register: "auth/local/register",
  product: "products"
}

const REGISTER_API_URL = `${baseUrl}${endPoints.register}`;
const LOGIN_API_URL = `${baseUrl}${endPoints.login}`;

// Register user
const register = async (userData) => {
  const response = await axios
    .post(REGISTER_API_URL, userData)
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      toastSuccess("You have successfully registered!");
    })
    .catch((err) => {
      toastError(err.response.data.message);
    });

  return response;
};

// Login user
const login = async (userData) => {
  const response = await axios
    .post(LOGIN_API_URL, userData)
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      toastSuccess("You have successfully logged in!");
    })
    .catch((err) => {
      toastError(err.response.data.message);
    });

  return response;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  toastSuccess("You have successfully logged out!");
};

export const fetchOneProduct = async (productId) => {
  const data = await axios.get(`${baseUrl}/${endPoints.product}/${productId}`);
  return data;
};

const authService = {
  register,
  logout,
  login
};

export default authService;
