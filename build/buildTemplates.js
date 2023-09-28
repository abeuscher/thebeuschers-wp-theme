const pug = require("pug");
const fs = require("fs");

const buildTemplates = (siteSettings) => {
  //Write templates
  fs.readdir(siteSettings.templatesSrc, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }
    files.forEach((file) => {
      if (file.indexOf(".pug") > -1) {
        const newFile = (siteSettings.templatesWrite + file).replace(".pug", ".php");
        console.log("Writing template " + newFile);
        fs.writeFile(
          newFile,
          pug.renderFile(siteSettings.templatesSrc + file, siteSettings.pugSettings, {
            siteurl: "/",
          }),
          (err) => {
            if (err) {
              console.error(err);
            }
          },
        );
      }
    });
  });
};
module.exports = buildTemplates;
