/**
 * @constant {string} API_BASE_URL - The base URL for the API.
 */

const API_BASE_URL = 'https://nf-api.onrender.com';

/**
 * Sends a request to register a user.
 *
 * @async
 * @function registerUser
 * @param {string} url - The URL for the registration endpoint.
 * @param {Object} userData - The user data to be sent in the request.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} The response from the registration endpoint.
 * @throws {Error} If the request fails.
 */

async function registerUser(url, userData) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    if (!response.ok) {
      return alert(json.errors[0].message)
    }

    // Store the JWT tokens in localStorage
    localStorage.setItem('accessToken', json.access_token);
    localStorage.setItem('refreshToken', json.refresh_token);
    localStorage.setItem('user', JSON.stringify(json));

    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @type {HTMLFormElement} registerForm - The register form element.
 */
const registerForm = document.querySelector('.register-form');

/**
 * Listens for the submit event on the register form and sends a request to register the user.
 *
 * @function submitCallback
 * @param {Event} event - The event object.
 */
registerForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (name && !/^[a-zA-Z0-9_]+$/.test(name)) {
    alert("Name must contain only letters, digits, and underscores.");
    return;
  }

  if (password.length < 10) {
    alert("Password must be at least 10 symbols long.");
    return;
  }

  /* if (email.endsWith("@stud.noroff.no") || email.endsWith("@noroff.no")) {
    alert("Email must end with @stud.noroff.no or @noroff.no");
    return;
  }
  */

  const userToRegister = {
    name: name,
    email: email,
    password: password,
  };

  registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, userToRegister)
    .then(data => {
      // Registration successful, redirect to login page
      // window.location.href = 'login.html';
    })
    .catch(error => console.error(error));

});
