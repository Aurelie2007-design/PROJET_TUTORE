const API_URL = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

export function apiFetch(endpoint, options = {}) {

  return fetch(API_URL + endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken(),
      ...options.headers
    }
  }).then(res => res.json());
}

