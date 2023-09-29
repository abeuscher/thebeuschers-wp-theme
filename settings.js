const pugPhpFilter = require("pug-php-filter");

const srcDir = "./src/";
const themeDir = "./public_html/wp-content/themes/thebeuschers/";

const settings = () => {
  return {
    sitename: "The Beuschers Real Estate",
    siteThumb: "screenshot.png",
    srcDir: srcDir,
    jsWatch: srcDir + "js/",
    templatesSrc: srcDir + "templates/",
    templatesWrite: themeDir,
    embedSrc: srcDir + "js/embed-nav.js",
    embedWrite: themeDir + "js/embed-nav.js",
    jsSrc: srcDir + "js/app.js",
    jsWrite: themeDir + "js/app.js",
    scssSrc: srcDir + "scss/",
    scssWrite: themeDir + "style.css",
    assetSrc: srcDir + "public_transfer/",
    assetWrite: themeDir,
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
