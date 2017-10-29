import { ACTIONS } from './constants';

export default (state = { server: '', connect: false, openLoginModal: false }, action) => {
  const {
    type, nickname, server, isConnected, error,
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
    default:
      return state;
  }
};
