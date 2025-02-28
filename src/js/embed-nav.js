const SiteHeader = require("../templates/inc/header.pug");
const parseHTML = function (htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.firstChild;
};

// Execute immediately without waiting for DOM load
const oldNav = document.querySelector(".navbar-fixed-top");

if (oldNav) {
  // Remove top padding from parent container
  if (oldNav.parentNode) {
    oldNav.parentNode.style.paddingTop = "0";
  }

  try {
    // Generate the new header HTML with embedded flag
    const newHeaderHTML = SiteHeader({
      siteurl: "https://thebeuschers.com/",
      themeDir: "https://thebeuschers.com/wp-content/themes/thebeuschers/",
      isEmbedded: true,
    });

    // Convert to DOM element
    const newHeader = parseHTML(newHeaderHTML);

    // Replace old nav
    oldNav.parentNode.replaceChild(newHeader, oldNav);

    // Apply embedded-specific styles
    const embeddedStyles = document.createElement("style");
    embeddedStyles.textContent = `
      .embedded-header {
        height: auto !important;
      }
    `;
    document.head.appendChild(embeddedStyles);

    console.log("Navigation successfully replaced with embedded version");
  } catch (error) {
    console.error("Error replacing navigation:", error);
  }
} else {
  console.warn("Navigation element (.navbar-fixed-top) not found");
}
