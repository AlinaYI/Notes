import { useEffect, useReducer, useState } from 'react';

import './App.css';
import reducer, { initialState } from './reducer';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
} from './constants';

import {
  fetchSession,
  fetchLogin,
} from './services';

import Login from './Login';
import Navbar from "./Navbar";
import Guess from "./Guess";
import Chat from "./Chat";
import Loader from "./Loading";
import ShoppingCart from "./ShoppingCart";

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [page, setPage] = useState("home"); 

    function onNavigate(e) {
        if (e.target.classList.value === "navbar-option" ) {
            setPage(e.target.dataset.page);
        }
    }


    function checkForSession() {
      fetchSession()
        .then((session) => {
          const { username} = session.userData;
          dispatch({ type: ACTIONS.LOG_IN, username });
          return fetchUsers();
        })
        .catch((err) => {
          if (err?.error === SERVER.AUTH_MISSING) {
            return Promise.reject({ error: CLIENT.NO_SESSION });
          }
          return Promise.reject(err);
        })
        .then((users) => {
          updateUsers(users.users);
          render({ state, appEl });
          waitOnMessages();
          render({ state, appEl });
          return fetchMessages();
        })
        .catch((err) => {
          logout();
          render({ state, appEl });
        })
        .then((messages) => {
          const { messagesList } = messages;
          updateMessages(messagesList);
          render({ state, appEl });
          const scrollDiv = document.querySelector(".messages");
          scrollDiv.scrollTop = scrollDiv.scrollHeight;
          const inputEl = document.querySelector(".to-send");
          inputEl.focus();
          setInterval(checkForMessages, 5000);
        })
        .catch((err) => {
          if (err?.error == CLIENT.NO_SESSION) {
            logout();
            render({ state, appEl });
            return;
          }
        });
    }

    function onLogin( username ) {
        fetchLogin(username)
        .then( () => {
            dispatch({ type: ACTIONS.LOG_IN, username });
            dispatch({ type: ACTIONS.SET_PAGE, page: "home" });
        })
        .catch( err => {
            dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
        });
    }

    function onLogout() {
        dispatch({ type: ACTIONS.LOG_OUT });
        fetchLogout() // We don't really care about server results
            .catch( err => {
            dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
            });
        setPage("");
    }
    
    const onChangeMode = () => {
      dispatch({ type: ACTIONS.TOGGLE_MODE });
    };

    function checkForMessages() {
      fetchUsers()
        .then((users) => {
          updateUsers(users.users);
          render({ state, appEl });
          waitOnMessages();
          return fetchMessages();
        })
        .catch((err) => {
          console.log(err);
        })
        .then((messages) => {
          const { messagesList } = messages;
          updateMessages(messagesList);
          render({ state, appEl });
          const scrollDiv = document.querySelector(".messages");
          scrollDiv.scrollTop = scrollDiv.scrollHeight;
          const inputEl = document.querySelector(".to-send");
          inputEl.focus();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(
        () => {
          checkForSession();    
        },
        [] // Only run on initial render
    );
    
    useEffect(() => {
    window.history.pushState({}, "", `/${page}`);
    checkForSession();
    }, [page]);
    
  return (
    <div className="app">
      { state.error && <Status error={state.error}/> }
      {state.loginStatus === LOGIN_STATUS.PENDING && <Loader />}
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin} />}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
      <>
      <Navbar
          username={state.username}
          onChangeMode={onChangeMode}
          darkTheme={state.darkTheme}
          onNavigate={onNavigate}
          onLogout={onLogout}
      />
      <main className={`main-content ${state.darkTheme ? "dark" : ""}`}>
        {page === "home" && (
            <>
            <div className="home">
              <h1>Welcome to the Game Center!</h1>
            </div>
            </>
        )}

        {page === "guess" && (
          <Guess/>
        )}

        {page === "chat" && (
          <Chat/>
        )}
        {page === "shoppingcart" && (
          <ShoppingCart/>
        )}
      </main>
      </>
        )}
    </div>
  );
}

export default App;
