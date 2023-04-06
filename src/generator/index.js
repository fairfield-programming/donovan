const fs = require('fs')
const path = require('path')

const { generateRobotTxt } = require('./robots.js');
const { generateSitemaps } = require('./sitemap.js');

const {
    getFilesRecursively,
    getPageContentsFromTemplate,
    getPagesFromTemplate
} = require('./readPages.js');
const { createTailwind } = require('./tailwind_generator.js');

function run() {

    const all = {
        ...getPageContentsFromTemplate()
    };

    Object.keys(all).map(i => {

        const totalPath = path.join(process.cwd(), "public", i);

        const dir = path.dirname(totalPath);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(totalPath, all[i]);

    })

    generateRobotTxt();
    generateSitemaps(all);
    //createTailwind();

}

module.exports = run;