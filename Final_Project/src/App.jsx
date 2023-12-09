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
import Home from './Home';
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
    }

    

    function onLogin( username ) {
        fetchLogin(username)
        .then( () => {
            dispatch({ type: ACTIONS.LOG_IN, username });
            dispatch({ type: ACTIONS.REPORT_SUCCESS, success: "Logged in successfully!" });
            setPage("home");
            return fetchUsers();
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
    <div className={`app ${state.darkTheme ? "dark": ""}`}>
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

          <Home/>
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
