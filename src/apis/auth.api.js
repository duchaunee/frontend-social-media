import axiosInstance from "../axios";

export const URL_LOGIN = "/auth/login";
export const URL_REGISTER = "/auth/register";
export const URL_LOGOUT = "/auth/logout";

const authApi = {
  register(body) {
    return axiosInstance.post(URL_REGISTER, body);
  },
  login(body) {
    return axiosInstance.post(URL_LOGIN, body);
  },
  logout() {
    return axiosInstance.post(URL_LOGOUT);
  },
};

export default authApi;
