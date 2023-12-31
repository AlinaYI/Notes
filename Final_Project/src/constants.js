// constants are just references to values (string values here)
// collected in one place and defined as const
//
// You do not have to use constants
// But done well they:
// - Make it easier to avoid typos
// - Help make use of IDE completion
// - Make it easy if the value changes
//    - only need to change the value here
//    - the constant reference doesn't change

export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_COLORS: 'required-colors'
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const PAGES ={
  HOME: "home",
  GUESS: "guess",
  CHAT: "chat",
  ABOUT: "about",
  SHOPPINGCART: "shoppingcart",
};

export const MESSAGES = {
  // The [] below uses the variable value as the key
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  // Here we use 'dog' to simulate a bad password
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_TASK]: 'Please enter the task to do',
  default: 'Something went wrong.  Please try again',
};


export const ACTIONS = {
  LOG_IN: "logIn",
  LOG_OUT: "logOut",
  REPORT_ERROR: "reportError",
  PAGE: "page",
  TOGGLE_MODE: "toggleMode",
};
