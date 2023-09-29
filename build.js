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
  });
  if (cb) {
    cb();
  }
};

const runTemplates = (eventType, filename) => {
  if (eventType === "change") {
    buildTemplates(siteSettings);
  }
};
const runScripts = (eventType, filename) => {
  if (eventType === "change") {
    buildScripts(siteSettings);
  }
};
const runStyles = (eventType, filename) => {
  if (eventType === "change") {
    buildStyles(siteSettings);
  }
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

fs.watch(siteSettings.templatesSrc, { recursive: true, persistent: true }, runTemplates);
fs.watch(siteSettings.jsWatch, { recursive: true, persistent: true }, runScripts);
fs.watch(siteSettings.scssSrc, { recursive: true, persistent: true }, runStyles);
