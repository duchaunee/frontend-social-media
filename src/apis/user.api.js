import axiosInstance from "../axios";

export const URL_VERIFY_EMAIL = "/users/verify";
export const URL_GET_ME = "/users/me";
///
export const URL_REQUEST_RESET_PASSWORD = "/users/request-reset-password";

//verify de show ra trang nhap code 5 pin
export const URL_VERIFY_RESET_PASSWORD = "/users/verify-reset-password";

export const URL_RESET_PASSWORD = "/users/validate-reset-password";
export const URL_SUGGEST_FRIEND = "/users/suggested-friends";
export const URL_REQUEST_FRIEND_RECEIVED = "/users/get-request-friend";
export const URL_REQUEST_ADD_FRIEND = "/users/request-friend";

const userApi = {
  verifyEmail(userId, token) {
    return axiosInstance.get(`${URL_VERIFY_EMAIL}/${userId}/${token}`);
  },
  getMe() {
    return axiosInstance.get(URL_GET_ME);
  },
  // ============ PASSWORD
  requestResetPassword(body) {
    return axiosInstance.post(URL_REQUEST_RESET_PASSWORD, body);
  },
  verifyResetPassword(userId) {
    return axiosInstance.get(URL_VERIFY_RESET_PASSWORD + "/" + userId);
  },
  resetPassword(userId, code) {
    return axiosInstance.get(URL_RESET_PASSWORD + "/" + userId + "/" + code);
  },
  // ============ FRIENDS
  getSuggestFriend({ limit }) {
    return axiosInstance.get(URL_SUGGEST_FRIEND + "?limit=" + limit);
  },
  getRequestFriendReceived({ limit }) {
    return axiosInstance.get(URL_REQUEST_FRIEND_RECEIVED + "?limit=" + limit);
  },
  requestAddFriend(body) {
    return axiosInstance.post(URL_REQUEST_ADD_FRIEND, body);
  },
};

export default userApi;
