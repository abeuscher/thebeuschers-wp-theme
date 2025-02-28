const SiteHeader = require("../templates/inc/header.pug");
const parseHTML = function (htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.firstChild;
};

document.addEventListener("DOMContentLoaded", function () {
  const oldNav = document.querySelector(".navbar-fixed-top");

  if (oldNav) {
    // Remove top padding from parent container
    if (oldNav.parentNode) {
      oldNav.parentNode.style.paddingTop = "0";
    }

    try {
      // Generate the new header HTML
      const newHeaderHTML = SiteHeader({ siteurl: "https://thebeuschers.com/" });
      // Convert to DOM element and replace old nav
      const newHeader = parseHTML(newHeaderHTML);
      oldNav.parentNode.replaceChild(newHeader, oldNav);
      console.log("Navigation successfully replaced");
    } catch (error) {
      console.error("Error replacing navigation:", error);
    }
  } else {
    console.warn("Navigation element (.navbar-fixed-top) not found");
  }
});
