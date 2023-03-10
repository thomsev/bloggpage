const form = document.querySelector("form");
const emailInput = document.getElementById("username");
const passwordInput = document.getElementById("password");


form.addEventListener("submit", handleFormSubmit);


function handleFormSubmit(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;


  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  if (email === storedEmail && password === storedPassword) {
    const token = generateSessionToken();


    setCookie("sessionToken", token, 24 * 60 * 60);

    localStorage.setItem("userEmail", email);

    window.location.href = "blogpost.html";
  } else {
    alert("Invalid email or password.");
  }
}

function generateSessionToken() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
}

function setCookie(name, value, expirationSeconds) {
  const expirationDate = new Date(Date.now() + expirationSeconds * 1000);
  document.cookie = `${name}=${value};expires=${expirationDate.toUTCString()}`;
}