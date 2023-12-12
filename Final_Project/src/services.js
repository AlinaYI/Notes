export function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( (error) => Promise.reject({ error }) )
    .then( (err) => Promise.reject(err) );
  });
}

export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( (error) => Promise.reject({ error }) )
    .then( (err) => Promise.reject(err) );
  });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
  .catch(() => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( (error) => Promise.reject({ error }) )
    .then( (err) => Promise.reject(err) );
  });
}

export function fetchAddMessage(username, message) {
  return fetch("/api/messages", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ username, message }),
  })
  .catch(() => Promise.reject({ error: "networkError" }))
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch((error) => Promise.reject({ error }))
      .then((err) => Promise.reject(err));
  });
}

export function fetchMessages() {
  return fetch("/api/messages")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        return {};
      }
    })
    .catch(error => {
      console.error('Fetch messages error:', error);
      return Promise.reject({ error: error.message });
    });
}




export function fetchUsers() {
  return fetch("/api/users")
    .catch(() => Promise.reject({ error: "networkError" }))
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return [];
      }
      return response.json().catch(() => {
        throw new Error('Response was not valid JSON');
      });
    })
    .catch(error => {
      console.error("Error:", error);
      return Promise.reject({ error: error.message });
    });
}

export function fetchChangeTheme() {
  return fetch('/api/user', {
      method: 'PATCH',
  })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          return response.json()
              .catch(error => Promise.reject({ error }))
              .then(err => Promise.reject(err));
      });
}