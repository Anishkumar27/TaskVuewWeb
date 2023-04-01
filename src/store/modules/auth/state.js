export default {
  userName: null,
  userId: null,

  isAuthenticated: sessionStorage.getItem("accessToken") ? true : false,
  loader: false,

  message: null,
  msgType: null,
};
