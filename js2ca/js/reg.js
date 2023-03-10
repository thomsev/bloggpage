const form = document.getElementById("register-form");

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const email = form.elements.email.value;
  const password = form.elements.password.value;

  if (password.length < 10) {
    alert("Password must be at least 10 symbols long.");
    return;
  }

  if (email.endsWith("@stud.noroff.no") || email.endsWith("@noroff.no")) {
    alert("Email must end with @stud.noroff.no or @noroff.no");
    return;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Registration successful!");
});