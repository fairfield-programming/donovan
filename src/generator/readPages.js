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

    return parts.slice(0, -1) + '.html'

}

function getPageContentsFromTemplate() {

    const output = {};
    const paths = getPagesFromTemplate();

    paths.forEach((i) => {

        const pageContents = fs.readFileSync(path.join(global.templateDir, "src/pages", i));
        const pageModule = getPageModule(pageContents);

        const pageHtml = getPageHtml(pageModule);

        output[pathToHTMLPath(i)] = pageHtml;

    });

    return output;

}

module.exports = {
    getFilesRecursively,
    getPageContentsFromTemplate,
    getPagesFromTemplate
};