//export const URL = 'https://api.lenkazion.nomoredomains.work';
export const URL = 'http://localhost:3000';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({email, password}) => {
  return fetch(`${URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};
export const authorize = (email, password) => {
  return fetch(`${URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const checkToken = (token) => {
  return fetch(`${URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(handleResponse)
  .then(data => data)
}

export const logout = () => {
  return fetch(`${URL}/logout`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
};