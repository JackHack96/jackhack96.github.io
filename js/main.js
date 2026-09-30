(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var sidebar = document.getElementById("sidebar-wrapper");
  var scrollTop = document.querySelector(".scroll-to-top");

  function setMenu(open) {
    sidebar.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!sidebar.classList.contains("active"));
  });

  // Close the menu when a link inside it is followed
  sidebar.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Show the scroll to top button once the page has been scrolled
  function onScroll() {
    scrollTop.classList.toggle("visible", window.scrollY > 100);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
