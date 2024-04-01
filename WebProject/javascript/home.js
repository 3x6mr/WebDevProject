document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  const usersBtn = document.querySelector(".user");
  const loginBtn = document.querySelector(".login-btn");
  const logoutBtn = document.querySelector(".logout");
  if (isLoggedIn) {
    usersBtn.style.display = "flex";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
  }
  if (!isLoggedIn) {
    usersBtn.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
  }
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", false);
    window.location.reload();
  });

  const mountain = document.querySelector(".mountain");
  const speed = document.querySelector(".speed");
  const classic = document.querySelector(".classic");

  mountain.addEventListener("click", function (e) {
    localStorage.setItem("section", "mountain");
    window.location.href = "../Pages/products.html";
  });
  speed.addEventListener("click", function (e) {
    localStorage.setItem("section", "speed");
    window.location.href = "../Pages/products.html";

    console.log("speed clicked");
  });
  classic.addEventListener("click", function (e) {
    localStorage.setItem("section", "classic");
    window.location.href = "../Pages/products.html";

    console.log("classic clicked");
  });
});

var menu = document.querySelector(".menu-icon");
var links = document.querySelector(".links");
menu.addEventListener("click", function (e) {
  console.log("menu clicked");
  if (links.classList.contains("active")) {
    links.style.display = "block";
    links.classList.remove("active");
  } else {
    links.style.display = "none";
    links.classList.add("active");
  }
  e.stopPropagation();
});
