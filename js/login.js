/**
 * @constant {string} API_BASE_URL - The base URL for the API.
 */
const API_BASE_URL = "https://nf-api.onrender.com";

/**
 * @type {HTMLFormElement} loginForm - The login form element.
 */
const loginForm = document.querySelector(".login-form");

/**
 * @type {string|null} accessToken - The access token stored in local storage. 
 */
const accessToken = localStorage.getItem("accessToken");

/**
 * Makes a request to the API to retrieve posts if the access token is available.
 * 
 * @param {string} accessToken - The access token to use for authentication.
 * @throws {Error} If the request fails.
 */
if (accessToken) {
  fetch(`${API_BASE_URL}/api/v1/social/posts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to get posts");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Listens for the submit event on the login form and sends a request to the API to authenticate the user.
 * 
 * @param {Event} event - The event object.
 */
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userToLogin = {
    email: email,
    password: password,
  };

  fetch(`${API_BASE_URL}/api/v1/social/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userToLogin),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to log in");
      }
    })
    .then((data) => {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      window.location.href = "loggedin.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
