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
  buildTemplates(siteSettings);
};
const runScripts = (eventType, filename) => {
  buildScripts(siteSettings);
  siteSettings;
};
const runStyles = (eventType, filename) => {
  buildStyles(siteSettings);
};

const buildSite = () => {
  //Write templates
  buildTemplates(siteSettings);
  buildScripts(siteSettings);
  buildStyles(siteSettings);
  try {
    fse.copySync(siteSettings.assetSrc, siteSettings.assetWrite, { overwrite: true });
    console.log("Assets copied");
  } catch (err) {
    console.error(err);
  }
};

clearDir(siteSettings.templatesWrite, buildSite);

fs.watch(siteSettings.templatesSrc, runTemplates);
fs.watch(siteSettings.jsWatch, runScripts);
fs.watch(siteSettings.scssSrc, runStyles);
