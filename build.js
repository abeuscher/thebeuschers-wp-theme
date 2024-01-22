const chokidar = require("chokidar");
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const siteSettings = require("./settings.js")();

const buildTemplates = require("./build/buildTemplates.js");
const buildScripts = require("./build/buildScripts.js");
const buildStyles = require("./build/buildStyles.js");

const clearDir = (directory, cb) => {
  fs.rmSync(directory, { recursive: true, force: true });
  fs.mkdir(path.join(directory), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Directory cleared");
    if (cb) {
      cb();
    }
  });
};

const buildSite = () => {
  //Write templates
  buildTemplates(siteSettings);
  buildScripts(siteSettings);
  buildStyles(siteSettings);
  try {
    fse.copySync(siteSettings.assetSrc, siteSettings.assetWrite, { overwrite: true });
    fse.copyFile(
      siteSettings.srcDir + siteSettings.siteThumb,
      siteSettings.assetWrite + siteSettings.siteThumb,
    );
    console.log("Assets copied");
  } catch (err) {
    console.error(err);
  }
};

clearDir(siteSettings.templatesWrite, buildSite);

const templateWatcher = chokidar.watch(siteSettings.templatesSrc);
templateWatcher.on("change", () => {
  buildTemplates(siteSettings);
});

const scriptWatcher = chokidar.watch(siteSettings.jsWatch);
scriptWatcher.on("change", () => {
  buildScripts(siteSettings);
});

const stylesheetWatcher = chokidar.watch(siteSettings.scssSrc);
stylesheetWatcher.on("change", () => {
  buildStyles(siteSettings);
});
