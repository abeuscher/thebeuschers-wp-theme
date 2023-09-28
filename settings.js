const pugPhpFilter = require("pug-php-filter");

const settings = () => {
  return {
    sitename: "",
    jsWatch: "./src/js/",
    templatesSrc: "./src/templates/",
    templatesWrite: "./public_html/wp-content/themes/thebeuschers/",
    embedSrc: "./src/js/embed-nav.js",
    embedWrite: "./public_html/wp-content/themes/thebeuschers/js/embed-nav.js",
    jsSrc: "./src/js/app.js",
    jsWrite: "./public_html/wp-content/themes/thebeuschers/js/app.js",
    scssSrc: "./src/scss/",
    scssWrite: "./public_html/wp-content/themes/thebeuschers/style.css",
    assetSrc: "./src/public_transfer/",
    assetWrite: "./public_html/wp-content/themes/thebeuschers/",
    pugSettings: {
      pretty: false,
      filters: {
        php: pugPhpFilter,
      },
      extension: "php",
      siteurl: "/",
    },
  };
};

module.exports = settings;
