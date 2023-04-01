export const SET_POSTS = (state, data) => {
  state.data = data
}

export const SET_LOADER = (state, status) => {
  state.loader = status
}

export const SET_ERROR = (state, data) => {
  state.message = data.msg;
  state.msgType = data.type;
};

export const SET_POST = (state, data) => {
  state.title = data.title;
  state.content = data.content;
};
