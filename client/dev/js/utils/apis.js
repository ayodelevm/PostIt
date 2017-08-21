import 'isomorphic-fetch';
// import apiUrls from './apiUrls';


export const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(Promise.reject.bind(Promise));
};

export const getEndpoint = (endpoint, token) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = `${'http://localhost:3002'}${endpoint}` || endpoint;
  return fetch(url, {
    credentials: 'include',
    headers: auth
  }).then(checkStatus);
};

export const postEndpoint = (endpoint, data, token) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = `${'http://localhost:3002'}${endpoint}` || endpoint;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth.Authorization
    },
    credentials: 'include'
  }).then(checkStatus);
};

export const updateEndpoint = (endpoint, data, token) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = `${'http://localhost:3002'}${endpoint}` || endpoint;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      [auth.Authorization]: auth.Authorization
    },
    credentials: 'include'
  }).then(checkStatus);
};

export const deleteEndpoint = (endpoint, data, token) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = `${'http://localhost:3002'}${endpoint}` || endpoint;
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      [auth.Authorization]: auth.Authorization
    },
    credentials: 'include'
  }).then(checkStatus);
};
