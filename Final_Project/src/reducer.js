import {
  LOGIN_STATUS,
  CLIENT,
  ACTIONS,
  MESSAGES,
} from './constants';

export const initialState = {
  error: "",
  username: "",
  darkTheme: false,
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  messages: {},
  users: {},
  isMessagePending: false,
  isUsersPending: false,
};

function reducer(state, action) {
  switch(action.type) {

    case ACTIONS.LOG_IN:   // actions are the change in state, not how that change happened
      return {
        ...state,
        error: '', // constantly resetting this is a "pain point", and a sign of something to improve!
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        isMessagePending: false,
        isUsersPending: false,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
        messages: {},
        users: {},
        };

    case ACTIONS.TOGGLE_MODE:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };

    case ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    
    case ACTIONS.UPDATE_MESSAGES:
      return {
        ...state,
        messages: action.messages,
        isMessagePending: false,
      };

    case ACTIONS.UPDATE_USERS:
      return {
        ...state,
        users: action.users,
        isUsersPending: false,
      };

    case ACTIONS.WAIT_ON_MESSAGES:
      return {
        ...state,
        isMessagePending: true,
      };

    case ACTIONS.WAIT_ON_USERS:
      return {
        ...state,
        isUsersPending: true,
      };


    case ACTIONS.REPORT_ERROR:
      // We could move the "pick the message" logic from Status.jsx here. Better? It depends.
      return {
        ...state,
        error: MESSAGES[action.error] || "ERROR"// ERROR is just to ensure a truthy value
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); // reporting detail for debugging aid, not shown to user
  }
}

export default reducer;
