import 'isomorphic-fetch';
import apiUrls from './apiUrls';


export const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(Promise.reject.bind(Promise));
};

export const getEndpoint = (endpoint) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const url = `${'http://localhost:3002'}${endpoint}`;
  return fetch(url, {
    credentials: 'include'
  }).then(checkStatus);
};

export const postEndpoint = (endpoint, data) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const url = `${'http://localhost:3002'}${endpoint}`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(checkStatus);
};

export const updateEndpoint = (endpoint, data) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const url = `${'http://localhost:3002'}${endpoint}`;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(checkStatus);
};

export const deleteEndpoint = (endpoint, data) => {
  // const url = `${apiUrls.BASE_PATH}${endpoint}`;
  const url = `${'http://localhost:3002'}${endpoint}`;
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(checkStatus);
};
