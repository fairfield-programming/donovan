const fs = require('fs');
const path = require('path');

const { getPageModule, getPageHtml } = require('./runPage.js')

const getFilesRecursively = (directory) => {
    const filesInDirectory = fs.readdirSync(directory);
    const files = [];
    for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);
        if (fs.statSync(absolute).isDirectory()) {
            files.push(...getFilesRecursively(absolute));
        } else {
            files.push(file);
        }
    }
    return files;
};

function getPagesFromTemplate() {

    const pathToPages = path.join(global.templateDir, "src/pages");
    const pages = getFilesRecursively(pathToPages) || [];

    return pages;

}

function pathToHTMLPath(path) {

    const parts = path.split('.')
    const url = parts.slice(0, -1).join();

    if (url.endsWith('index')) return [ url + '.html' ]

    return [ url + '.html', url + '/index.html' ]

}

function getPageContentsFromTemplate() {

    const output = {};
    const paths = getPagesFromTemplate();

    paths.forEach((i) => {

        const pageContents = fs.readFileSync(path.join(global.templateDir, "src/pages", i));
        const pageModule = getPageModule(pageContents);

        const pageHtml = getPageHtml(pageModule);

        const generatedPaths = pathToHTMLPath(i);

        generatedPaths.forEach(path => {

            output[path] = pageHtml;

        })

    });

    return output;

}

module.exports = {
    getFilesRecursively,
    getPageContentsFromTemplate,
    getPagesFromTemplate
};