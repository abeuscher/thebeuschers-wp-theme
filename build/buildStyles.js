const sass = require("sass");
const fs = require("fs");

const buildStyles = (siteSettings) => {
  console.log("Writing css file");
  const fileData = sass.compile(siteSettings.scssSrc + "style.scss", {
    style: "compressed",
    quietDeps: true,
  });
  fs.writeFile(siteSettings.scssWrite, fileData.css, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = buildStyles;
