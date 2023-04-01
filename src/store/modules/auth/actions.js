import router from "../../../routes";
import { responseHandler } from "../../../shared/_helper";
import { userService } from "../../../shared/_services";

export const getProfile = async ({ commit }, { id }) => {
  commit("SET_LOADER", true);
  await userService.getProfile(id).then(
    async (response) => {
      commit("SET_LOADER", false);
      commit("SET_PROFILE", response.data);
      return Promise.resolve(response);
    },
    (error) => {
      commit("SET_LOADER", false);
      commit("UNSET_PROFILE", null);
      responseHandler(error.response.status);
      return Promise.reject(error);
    }
  );
};

export const login = async ({ commit }, { email, password }) => {
  commit("SET_LOADER", true);
  await userService.login(email, password).then(
    (response) => {
      commit("SET_LOADER", false);
      const user = parseJwt(response.data);
      commit("SET_AUTHENTICATION", true);
      sessionStorage.setItem("accessToken", response.data);
      sessionStorage.setItem("userId", user.user_id);
      router.push("/");
      return Promise.resolve(response);
    },
    (error) => {
      commit("SET_LOADER", false);
      commit("SET_ERROR", {
        type: "danger",
        msg: "Invalid credentials.",
      });
      commit("SET_AUTHENTICATION", false);
      return Promise.reject(error);
    }
  );
};

export const logout = async ({ commit }) => {
  commit("UNSET_PROFILE", null);
  sessionStorage.clear();
  responseHandler(401, null);
};

export const register = async ({ commit }, { name, email, password }) => {
  commit("SET_LOADER", true);
  await userService.register(name, email, password).then(
    (response) => {
      commit("SET_LOADER", false);
      commit("SET_ERROR", {
        type: "success",
        msg: "Registeration successfull. Now you can login.",
      });
      return Promise.resolve(response);
    },
    (error) => {
      commit("SET_LOADER", false);
      commit("SET_ERROR", {
        type: "danger",
        msg: "Please fill all the details properly.",
      });
      return Promise.reject(error);
    }
  );
};

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
