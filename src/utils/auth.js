export const saveAccessTokenToSession = (access_token) => {
  sessionStorage.setItem("AccessToken", access_token);
};
export const clearAccessTokenToSession = () => {
  sessionStorage.removeItem("AccessToken");
};
export const getAccessTokenToSession = () =>
  sessionStorage.getItem("AccessToken") || "";
