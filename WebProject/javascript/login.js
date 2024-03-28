import { login } from "./module.js";
document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.querySelector(".username");
  const passwordInput = document.querySelector(".password");
  const submitButton = document.querySelector(".submit");

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const loginResult = login(username, password);

    if (loginResult) {
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "../Pages/home.html";
    } else {
      alert("Invalid username or password");
    }
  });
});
