import { responseHandler } from "../../../shared/_helper";
import { userService } from "../../../shared/_services";

export const getPosts = async ({ commit }) => {
  commit("SET_LOADER", true);
  await userService.getPosts().then(
    (response) => {
      console.log(response);
      commit("SET_LOADER", false);
      commit("SET_POSTS", response.data);
      return Promise.resolve(response);
    },
    (error) => {
      commit("SET_LOADER", false);
      commit("SET_POSTS", []);
      responseHandler(error.response.status);
      return Promise.reject(error);
    }
  );
};

export const getPost = async ({ commit }, { id }) => {
  commit("SET_LOADER", true);
  await userService.getPost(id).then(
    (response) => {
      console.log(response);
      commit("SET_POST", { title: response.data.title, content: response.data.content });
      commit("SET_LOADER", false);
      return Promise.resolve(response);
    },
    (error) => {
      commit("SET_LOADER", false);
      responseHandler(error.response.status);
      return Promise.reject(error);
    }
  );
};

export const create = async ({ commit }, { title, author_id, content }) => {
  commit("SET_LOADER", true);
  await userService.createPost(title, author_id, content).then(
    (response) => {
      commit("SET_LOADER", false);
      commit("SET_POST", { title: null, content: null });

      commit("SET_ERROR", {
        type: "success",
        msg: "Post created successfully.",
      });
      return Promise.resolve(response);
    },
    (error) => {
      commit("SET_LOADER", false);
      commit("SET_ERROR", {
        type: "danger",
        msg: "Duplicate title or Please fill all the details properly.",
      });
      return Promise.reject(error);
    }
  );
};

export const update = async ({ commit }, { id, title, author_id, content }) => {
  commit("SET_LOADER", true);
  await userService.updatePost(id, title, author_id, content).then(
    (response) => {
      commit("SET_LOADER", false);

      commit("SET_ERROR", {
        type: "success",
        msg: "Post updated successfully.",
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
