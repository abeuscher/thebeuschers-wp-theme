const SiteHeader = require("../templates/inc/header.pug");
const parseHTML = require("./utils/parse-html");

let oldNav = document.querySelectorAll(".navbar-fixed-top")[0];
oldNav.parentNode.style = "padding-top:0!important";
// replace el with newEL
oldNav.parentNode.replaceChild(
  parseHTML(SiteHeader({ siteurl: "https://thebeuschers.com/" })),
  oldNav,
);
