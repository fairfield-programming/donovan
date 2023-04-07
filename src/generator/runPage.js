const Babel = require("@babel/standalone");
const BabelJSX = require("@babel/preset-react");

const metadataToHead = require("../utility/metadataToHead.js");

const vm = require("node:vm");
const fs = require("fs");
const path = require("path");

// function importCssFile(name) {

//     const contents = fs.readFileSync(name, 'utf-8');

//     fs.writeFileSync(path.join(process.cwd(), 'public', `${'3fF7F52AaVf3'}.css`), contents);

// }

let contextObject = {
  module: {},
  exports: {},
  global: {},
  console,
};

function getPageModuleFromPath(currentPath) {
  const contents = fs.readFileSync(currentPath, "utf-8");
  return getPageModule(contents, currentPath);
}

function getPageModule(contents, currentPath) {
  var output = Babel.transform(contents, {
    presets: [
      "env",
      [BabelJSX, { runtime: "automatic", importSource: "donovan" }],
    ],
  }).code;

  contextObject = {
    ...contextObject,
    project: global.project,
    require: (name) => {
      const currentModulePath = currentPath;

      if (name == "donovan/jsx-runtime")
        return require("../core/jsx-runtime.js");
      if (name == "donovan") return require("../core/index.js");
      if (!name.startsWith(".") && !name.startsWith("/")) return require(name);

      const extension = path.extname(name).slice(1);

      if (extension == "jsx")
        return getPageModuleFromPath(path.join(process.cwd(), "template", name))
          .module.exports;

      if (extension == "css") {
        console.log("Using CSS");
        return null;
      }
      //return importCssFile(path.join(currentModulePath, '../', name))

      return null;
    },
  };

  vm.createContext(contextObject);
  vm.runInContext(output, contextObject);

  return contextObject;
}

function getPageHtml(pageModule) {
  const bodyFunction = pageModule?.module?.exports || (() => {});
  const headFunction = pageModule?.module?.exports?.getHead || (() => {});
  const metadataFunction = pageModule?.module?.exports?.metadata || (() => {});

  const headData = headFunction() || metadataToHead(metadataFunction()) || "";

  return `<!doctype html><html><head>${headData}</head><body>${bodyFunction()}</body></html>`;
}

module.exports.getPageModule = getPageModule;
module.exports.getPageHtml = getPageHtml;
