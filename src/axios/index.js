import axios from "axios";
import {
  clearAccessTokenToSession,
  getAccessTokenToSession,
  saveAccessTokenToSession,
} from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
// axiosInstance.defaults.timeout = 2000;

let accessToken = getAccessTokenToSession();

axiosInstance.interceptors.request.use(
  (request) => {
    if (accessToken) {
      // request.headers.authorization = getAccessTokenToSession();
      request.headers.authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { url } = response.config;
    if (url === "/auth/login") {
      accessToken = response.data.accessToken;
      saveAccessTokenToSession(accessToken);
    } else if (url === "/auth/logout") {
      accessToken = "";
      clearAccessTokenToSession();
    }
    return response.data;
  },
  (error) => {
    console.log("Error trong axios: ", error);
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
