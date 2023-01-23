const Babel = require('@babel/standalone')
const BabelJSX = require('@babel/preset-react')

const metadataToHead = require('../utility/metadataToHead.js');

const vm = require('node:vm');
const fs = require('fs');
const path = require('path');

const contextObject = { 
    require: (name) => {

        if (name == 'donovan/jsx-runtime') return require('../core/jsx-runtime.js')
        if (!name.startsWith('.') && !name.startsWith('/')) return require(name)

        return getPageModuleFromPath(path.join(process.cwd(), 'template', name)).module.exports

    },
    module: {},
    exports: {},
    project: global.project,
    console
};

function getPageModuleFromPath(path) {

    const contents = fs.readFileSync(path, 'utf-8');
    return getPageModule(contents);

}

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