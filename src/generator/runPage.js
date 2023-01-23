const Babel = require('@babel/standalone')
const BabelJSX = require('@babel/preset-react')

const metadataToHead = require('../utility/metadataToHead.js');

const vm = require('node:vm');

const contextObject = { 
    require: (name) => {

        if (name == 'donovan/jsx-runtime') return require('../core/jsx-runtime.js')
        return require(name)

    },
    module: {},
    project: global.project,
    console
};

function getPageModule(contents) {

    var output = Babel.transform(contents, { presets: ["env", [ BabelJSX, { runtime: "automatic", importSource: "donovan" } ]] }).code;

    contextObject.project = global.project;

    vm.createContext(contextObject);
    vm.runInContext(output, contextObject);

    return contextObject;

}

function getPageHtml(pageModule) {

    const bodyFunction = (pageModule?.module?.exports) || (() => { });
    const headFunction = (pageModule?.module?.exports?.getHead) || (() => { });
    const metadataFunction = (pageModule?.module?.exports?.metadata) || (() => { });

    const headData = headFunction() || metadataToHead(metadataFunction()) || "";

    return `<!doctype html><html><head>${headData}</head><body>${bodyFunction()}</body></html>`;

}

module.exports.getPageModule = getPageModule;
module.exports.getPageHtml = getPageHtml;