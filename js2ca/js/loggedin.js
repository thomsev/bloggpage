const sessionToken = getCookie("sessionToken");

if (!sessionToken) {

  window.location.href = "login.html";
} else {

  const userEmail = localStorage.getItem("userEmail");
  const message = document.createElement("p");
  message.textContent = `Welcome, ${userEmail}!`;
  document.body.appendChild(message);
}

function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}