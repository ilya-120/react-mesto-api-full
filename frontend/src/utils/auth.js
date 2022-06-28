const BASE_URL = 'https://api.ilya120.nomoreparties.sbs';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
};

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse);
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
    .then(data => {
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('email', data.email);

      return data;
    });
};

export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  })
    .then(checkResponse);
};
