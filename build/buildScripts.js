const esbuild = require("esbuild");
const pugPlugin = require("esbuild-plugin-pug");

const buildScripts = (siteSettings) => {
  console.log("Writing theme script file");
  esbuild.build({
    entryPoints: [siteSettings.jsSrc],
    bundle: true,
    minify: true,
    outfile: siteSettings.jsWrite,
    platform: "node",
    plugins: [pugPlugin()],
  });

  console.log("Writing embed script file");
  esbuild.build({
    entryPoints: [siteSettings.embedSrc],
    bundle: true,
    minify: true,
    outfile: siteSettings.embedWrite,
    platform: "node",
    plugins: [pugPlugin()],
  });
};

module.exports = buildScripts;
