const fs = require('fs')
const path = require('path')

const {
    getFilesRecursively,
    getPageContentsFromTemplate,
    getPagesFromTemplate
} = require('./readPages.js');

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

}

module.exports = run;