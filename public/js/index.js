document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".navbar-burger");
    const menu = document.querySelector(".navbar-menu");
  
    if (burger && menu) {
      burger.addEventListener("click", function () {
        menu.classList.toggle("is-active");
      });
    }
  });