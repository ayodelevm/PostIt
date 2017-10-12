import 'isomorphic-fetch';

/**
 * Function processing network response based on the status code in response
 * @param {object} response
 * @returns {object} response
 */
export const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(Promise.reject.bind(Promise));
};

/**
 * Funtion  handling all fetch request to a GET endpoint
 * @param {string} endpoint
 * @param {string} token
 * @returns {function} fetch
 */
export const getEndpoint = (endpoint, token) => {
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = endpoint;
  return fetch(url, {
    credentials: 'include',
    headers: auth
  }).then(checkStatus);
};

/**
 * Function handling all fetch request to a POST endpoint
 * @param {string} endpoint
 * @param {object} payload
 * @param {string} token
 * @returns {function} fetch
 */
export const postEndpoint = (endpoint, payload, token) => {
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = endpoint;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth.Authorization
    },
    credentials: 'include'
  }).then(checkStatus);
};

/**
 * Function handling all fetch request to a PUT endpoint
 * @param {string} endpoint
 * @param {object} payload
 * @param {string} token
 * @returns {function} fetch
 */
export const updateEndpoint = (endpoint, payload, token) => {
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = endpoint;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth.Authorization
    },
    credentials: 'include'
  }).then(checkStatus);
};

/**
 * Function handling all fetch request to a DELETE endpoint
 * @param {string} endpoint
 * @param {object} payload
 * @param {string} token
 * @returns {function} fetch
 */
export const deleteEndpoint = (endpoint, payload, token) => {
  const auth = { Authorization: '' };
  if (token) {
    auth.Authorization = `Bearer ${token}`;
  }
  const url = endpoint;
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      [auth.Authorization]: auth.Authorization
    },
    credentials: 'include'
  }).then(checkStatus);
};
