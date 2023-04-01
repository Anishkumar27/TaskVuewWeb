export const SET_LOADER = (state, status) => {
  state.loader = status;
};

export const SET_ERROR = (state, data) => {
  state.message = data.msg;
  state.msgType = data.type;
};

export const SET_AUTHENTICATION = (state, status) => {
  state.isAuthenticated = status;
};

export const SET_PROFILE = (state, data) => {
  state.name = data.nickname;
  state.id = data.id;
  state.email = data.email;
  state.isAuthenticated = true;
};

export const UNSET_PROFILE = (state, data) => {
  state.name = null;
  state.id = null;
  state.email = null;
  state.isAuthenticated = false;
};
