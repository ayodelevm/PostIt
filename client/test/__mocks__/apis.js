
// const checkStatus = (response) => {
//   if (response.ok) {
//     return response.json();
//   }
//   return response.json().then(Promise.reject());
// };

// const apis = (endpoint, token) => {
//   console.log('I was called========');
//   const auth = { Authorization: '' };
//   if (token) {
//     auth.Authorization = `Bearer ${token}`;
//   }
//   const url = endpoint;
//   return fetch(url, {
//     credentials: 'include',
//     headers: auth
//   }).then(checkStatus);
// };

// export default (url, { method, body, headers, credentials })
//   .then((res) => {
//     return Promise.resolve(res)
//   })

// export const postEndpoint = (endpoint, data, token) => {
//   const auth = { Authorization: '' };
//   if (token) {
//     auth.Authorization = `Bearer ${token}`;
//   }
//   const url = endpoint;
//   return fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: auth.Authorization
//     },
//     credentials: 'include'
//   }).then(checkStatus);
// };

// export const updateEndpoint = (endpoint, data, token) => {
//   const auth = { Authorization: '' };
//   if (token) {
//     auth.Authorization = `Bearer ${token}`;
//   }
//   const url = endpoint;
//   return fetch(url, {
//     method: 'PUT',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: auth.Authorization
//     },
//     credentials: 'include'
//   }).then(checkStatus);
// };

// export const deleteEndpoint = (endpoint, data, token) => {
//   const auth = { Authorization: '' };
//   if (token) {
//     auth.Authorization = `Bearer ${token}`;
//   }
//   const url = endpoint;
//   return fetch(url, {
//     method: 'DELETE',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//       [auth.Authorization]: auth.Authorization
//     },
//     credentials: 'include'
//   }).then(checkStatus);
// };

// export default apis;
