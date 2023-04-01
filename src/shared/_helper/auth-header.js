export function authHeader() {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return { Authorization: "Bearer " + token, "Content-Type": "text/plain" };
  } else {
    return {};
  }
}
