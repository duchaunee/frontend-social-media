import axiosInstance from "../axios";

export const URL_VERIFY_EMAIL = "/users/verify";
export const URL_GET_ME = "/users/me";
export const URL_GET_USER = "/users/get-user";
export const URL_GET_RELATIONSHIP = "/users/relationship";
///
export const URL_REQUEST_RESET_PASSWORD = "/users/request-reset-password";

//verify de show ra trang nhap code 5 pin
export const URL_VERIFY_RESET_PASSWORD = "/users/verify-reset-password";

export const URL_RESET_PASSWORD = "/users/validate-reset-password";

export const URL_GET_ALL_FRIEND = "/users/all-friends";
export const URL_SUGGEST_FRIEND = "/users/suggested-friends";
export const URL_REQUEST_FRIEND_RECEIVED = "/users/get-request-friend";
export const URL_REQUEST_ADD_FRIEND = "/users/request-friend";
export const URL_UNDO_REQUEST_FRIEND = "/users/undo-request-friend";
export const URL_RESPONSE_REQUEST_FRIEND = "/users/response-request-friend";
export const URL_UNFRIEND = "/users/unfriend";
export const URL_GET_ALL_FRIEND_SENT = "/users/friends-sent";

export const URL_CHANGE_PASSWORD = "/users/change-password";
export const URL_UPDATE_USER = "/users/update-user";

const userApi = {
  verifyEmail(userId, token) {
    return axiosInstance.get(`${URL_VERIFY_EMAIL}/${userId}/${token}`);
  },
  getMe() {
    return axiosInstance.get(URL_GET_ME);
  },
  getUser(user_id) {
    return axiosInstance.get(URL_GET_USER + "/" + user_id);
  },
  getRelationship(body) {
    return axiosInstance.post(URL_GET_RELATIONSHIP, body);
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
  getAllFriendSent() {
    return axiosInstance.post(URL_GET_ALL_FRIEND_SENT);
  },
  getAllFriends() {
    return axiosInstance.post(URL_GET_ALL_FRIEND);
  },
  getSuggestFriend({ limit }) {
    return axiosInstance.get(URL_SUGGEST_FRIEND + "?limit=" + limit);
  },
  getRequestFriendReceived({ limit }) {
    return axiosInstance.get(URL_REQUEST_FRIEND_RECEIVED + "?limit=" + limit);
  },
  requestAddFriend(body) {
    return axiosInstance.post(URL_REQUEST_ADD_FRIEND, body);
  },
  undoRequestFriend(body) {
    return axiosInstance.post(URL_UNDO_REQUEST_FRIEND, body);
  },
  responseRequestFriend(body) {
    console.log("body: ", body);
    return axiosInstance.post(URL_RESPONSE_REQUEST_FRIEND, body);
  },
  unfriend(body) {
    return axiosInstance.post(URL_UNFRIEND, body);
  },
  //////
  changePassword(body) {
    return axiosInstance.post(URL_CHANGE_PASSWORD, body);
  },
  updateUser(body) {
    return axiosInstance.post(URL_UPDATE_USER, JSON.stringify(body));
  },
};

export default userApi;
