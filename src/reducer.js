import { ACTIONS } from './constants';

const defaultState = {
  server: '', connect: false, openLoginModal: false, messages: [],
};

export default (state = defaultState, action) => {
  const {
    type, nickname, server, isConnected, error, message, data,
  } = action;

  switch (type) {
    case ACTIONS.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        openLoginModal: !state.openLoginModal,
      };
    case ACTIONS.CONNECTION_STATUS_CHANGE:
      return {
        ...state,
        messages: isConnected ? [{ type: 'system', text: 'You had join the chat', timestamp: Date.now() }] : state.messages,
        openLoginModal: isConnected ? false : state.openLoginModal,
        connect: isConnected,
      };
    case ACTIONS.ON_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          ...error,
        },
      };
    case ACTIONS.LOGIN_SUBMIT:
      return {
        ...state,
        nickname,
        server,
      };
    case ACTIONS.EDIT_MESSAGE:
      return {
        ...state,
        message,
        messageSubmit: false,
      };
    case ACTIONS.MESSAGE_SUBMIT:
      return {
        ...state,
        messageSubmit: true,
      };
    case ACTIONS.RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...data,
            type: data.nickname === state.nickname ? 'me' : data.type,
          },
        ].sort((a, b) => (b.timestamp - a.timestamp)),
      };
    default:
      return state;
  }
};
