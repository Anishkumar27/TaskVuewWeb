import axios from "axios";
import { authHeader } from "../_helper/auth-header";

const rootUrl = "http://localhost:8080/";

/************** Authentication **************/
function login(email, password) {
  return axios.post(rootUrl + "login", JSON.stringify({ email, password }), {
    headers: { "Content-Type": "text/plain" },
  });
}

function register(nickname, email, password) {
  return axios.post(
    rootUrl + "register",
    JSON.stringify({ nickname, email, password }),
    { headers: { "Content-Type": "text/plain" } }
  );
}
/************** Authentication **************/

/************** Account **************/
function getProfile(id) {
  return axios.get(rootUrl + "profile/" + id, { headers: authHeader() });
}
/************** Account **************/

/************** Posts **************/
function getPosts() {
  return axios.get(rootUrl + "posts", { headers: authHeader() });
}
function getPost(id) {
  return axios.get(rootUrl + "posts/" + id, { headers: authHeader() });
}
function createPost(title, author_id, content) {
  console.log(title, author_id, content);
  return axios.post(
    rootUrl + "posts",
    JSON.stringify({ title, author_id, content }),
    { headers: authHeader() }
  );
}
function updatePost(id, title, author_id, content) {
  return axios.put(
    rootUrl + "posts/" + id,
    JSON.stringify({ title, author_id, content }),
    { headers: authHeader() }
  );
}
/************** Posts **************/

export const userService = {
  login,
  register,
  getProfile,

  getPost,
  getPosts,
  createPost,
  updatePost,
 };
