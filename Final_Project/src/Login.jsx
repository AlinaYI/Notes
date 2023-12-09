import { useState } from 'react';
import './Form.css';

// The "onLogin" below is not an automatic event
// such events only happen on JSX representing native HTML elements
// Here it just a prop name like any other
function LoginForm({ onLogin }) {
  // This state is local to this component
  // it is used only inside this component
  // until login is complete
  // when we call the passed action function
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); // Remember this! Can be very confusing if page reloads
    if(username) {  // Don't allow blank username to try login
      // We could enforce more requirements, but I'm keeping this simple
      onLogin(username); // "action" function we were passed in
    }
  }

  return (
      <>
      <div className="login-container">
        <div className='form'>
          <h1 className="title">Login</h1>
          <form action="#/login" onSubmit={onSubmit}>
            <div className='input-field'>
              <input
                type="text"
                className="username"
                name="username"
                value={username}
                onInput={onChange}
                placeholder="Type your username here!"
              />
            </div>
            <button className='btn' type="submit">Login</button>
          </form>

        </div>
      </div>
      </>
      
  );

}

export default LoginForm;
