import { ACTIONS } from './constants';

export default (state = { server: '', connect: false, openLoginModal: false }, action) => {
  const { type, nickname, server, isConnected } = action;
  switch (type) {
    case ACTIONS.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        openLoginModal: !state.openLoginModal,
      };
    case ACTIONS.CONNECTION_STATUS_CHANGE:
      return {
        ...state,
        connect: isConnected,
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
