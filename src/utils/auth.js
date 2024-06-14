export const saveAccessTokenToSession = (access_token) => {
  localStorage.setItem("AccessToken", access_token);
};
export const clearAccessTokenToSession = () => {
  localStorage.removeItem("AccessToken");
};
export const getAccessTokenToSession = () =>
  localStorage.getItem("AccessToken") || "";
